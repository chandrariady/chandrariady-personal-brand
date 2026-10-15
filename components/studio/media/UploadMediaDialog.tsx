"use client";

import { useRef, useState } from "react";
import { ImagePlus, UploadCloud, X } from "lucide-react";
import {
  mediaAssetTypes,
  type MediaAsset,
  type MediaAssetType,
} from "@/lib/cms/media-types";

async function imageDimensions(file: File) {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(url);
    };
    image.src = url;
  });
}

export default function UploadMediaDialog({
  open,
  onClose,
  onUploaded,
}: {
  open: boolean;
  onClose: () => void;
  onUploaded: (asset: MediaAsset) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [assetType, setAssetType] = useState<MediaAssetType>("general");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  function selectFile(next: File | undefined) {
    if (!next) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(next);
    setPreview(URL.createObjectURL(next));
    setError("");
  }

  function close() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
    setAltText("");
    setCaption("");
    setAssetType("general");
    setError("");
    onClose();
  }

  async function upload() {
    if (!file) {
      setError("Choose an image first.");
      return;
    }

    setBusy(true);
    setError("");

    const dimensions = await imageDimensions(file);
    const form = new FormData();
    form.append("file", file);
    form.append("asset_type", assetType);
    form.append("alt_text", altText);
    form.append("caption", caption);
    form.append("width", String(dimensions.width));
    form.append("height", String(dimensions.height));

    try {
      const response = await fetch("/api/cms/media", {
        method: "POST",
        body: form,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      onUploaded(result.asset as MediaAsset);
      close();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="media-modal-backdrop" role="presentation">
      <section className="media-modal" role="dialog" aria-modal="true">
        <header>
          <div>
            <span>CONTENT CONTROL / UPLOAD</span>
            <h2>Add media asset</h2>
          </div>
          <button type="button" onClick={close} aria-label="Close upload dialog">
            <X />
          </button>
        </header>

        <div className="media-upload-layout">
          <button
            type="button"
            className={`media-dropzone ${preview ? "has-preview" : ""}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              selectFile(event.dataTransfer.files?.[0]);
            }}
          >
            {preview ? (
              <img src={preview} alt="Upload preview" />
            ) : (
              <>
                <UploadCloud />
                <strong>Drop image here</strong>
                <span>or click to browse</span>
                <small>JPEG, PNG, WebP or GIF · maximum 5 MB</small>
              </>
            )}
          </button>
          <input
            ref={inputRef}
            hidden
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => selectFile(event.target.files?.[0])}
          />

          <div className="media-upload-fields">
            <label>
              ASSET TYPE
              <select
                value={assetType}
                onChange={(event) =>
                  setAssetType(event.target.value as MediaAssetType)
                }
              >
                {mediaAssetTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              ALT TEXT
              <input
                value={altText}
                maxLength={300}
                onChange={(event) => setAltText(event.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </label>
            <label>
              CAPTION
              <textarea
                rows={4}
                value={caption}
                maxLength={500}
                onChange={(event) => setCaption(event.target.value)}
                placeholder="Optional public-facing caption"
              />
            </label>
            {file && (
              <div className="media-selected-file">
                <ImagePlus />
                <div>
                  <strong>{file.name}</strong>
                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            )}
            {error && <div className="media-v2-error">{error}</div>}
          </div>
        </div>

        <footer>
          <button type="button" onClick={close}>Cancel</button>
          <button type="button" className="primary" onClick={upload} disabled={busy}>
            <UploadCloud />
            {busy ? "Uploading..." : "Upload asset"}
          </button>
        </footer>
      </section>
    </div>
  );
}
