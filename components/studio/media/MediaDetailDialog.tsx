"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Save, Trash2, X } from "lucide-react";
import {
  mediaAssetTypes,
  type MediaAsset,
  type MediaAssetType,
} from "@/lib/cms/media-types";

function bytes(value: number) {
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / 1024 / 1024).toFixed(2)} MB`;
}

export default function MediaDetailDialog({
  asset,
  onClose,
  onUpdated,
  onDelete,
}: {
  asset: MediaAsset | null;
  onClose: () => void;
  onUpdated: (asset: MediaAsset) => void;
  onDelete: (asset: MediaAsset) => void;
}) {
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [assetType, setAssetType] = useState<MediaAssetType>("general");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!asset) return;
    setAltText(asset.alt_text);
    setCaption(asset.caption);
    setAssetType(asset.asset_type);
    setError("");
  }, [asset]);

  if (!asset) return null;

  async function save() {
  if (!asset) return;

  setBusy(true);
  setError("");

  try {
    const response = await fetch(`/api/cms/media/${asset.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        alt_text: altText,
        caption,
        asset_type: assetType,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Could not save metadata");
    }

    onUpdated(result.asset as MediaAsset);
  } catch (saveError) {
    setError(
      saveError instanceof Error
        ? saveError.message
        : "Save failed"
    );
  } finally {
    setBusy(false);
  }
}

  async function copy() {
    if (!asset) return;
    await navigator.clipboard.writeText(asset.public_url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="media-modal-backdrop" role="presentation">
      <section className="media-modal media-detail-modal" role="dialog" aria-modal="true">
        <header>
          <div>
            <span>MEDIA CONTROL / ASSET DETAIL</span>
            <h2>{asset.original_name}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close detail dialog">
            <X />
          </button>
        </header>

        <div className="media-detail-layout">
          <div className="media-detail-preview">
            <img src={asset.public_url} alt={asset.alt_text || asset.original_name} />
            <dl>
              <div><dt>TYPE</dt><dd>{asset.mime_type}</dd></div>
              <div><dt>SIZE</dt><dd>{bytes(asset.size_bytes)}</dd></div>
              <div><dt>DIMENSIONS</dt><dd>{asset.width && asset.height ? `${asset.width} × ${asset.height}` : "Unknown"}</dd></div>
              <div><dt>UPLOADED</dt><dd>{new Date(asset.created_at).toLocaleDateString("en-GB")}</dd></div>
            </dl>
          </div>

          <div className="media-upload-fields">
            <label>
              ASSET TYPE
              <select
                value={assetType}
                onChange={(event) => setAssetType(event.target.value as MediaAssetType)}
              >
                {mediaAssetTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </label>
            <label>
              ALT TEXT
              <textarea rows={3} maxLength={300} value={altText} onChange={(event) => setAltText(event.target.value)} />
            </label>
            <label>
              CAPTION
              <textarea rows={4} maxLength={500} value={caption} onChange={(event) => setCaption(event.target.value)} />
            </label>
            <label>
              PUBLIC URL
              <div className="media-url-field">
                <input readOnly value={asset.public_url} />
                <button type="button" onClick={copy}>{copied ? <Check /> : <Copy />}</button>
              </div>
            </label>
            {error && <div className="media-v2-error">{error}</div>}
          </div>
        </div>

        <footer>
          <button type="button" className="danger-text" onClick={() => onDelete(asset)}>
            <Trash2 /> Delete permanently
          </button>
          <button type="button" className="primary" onClick={save} disabled={busy}>
            <Save /> {busy ? "Saving..." : "Save metadata"}
          </button>
        </footer>
      </section>
    </div>
  );
}
