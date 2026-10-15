"use client";

import { useMemo, useState } from "react";
import { Database, HardDrive, Images } from "lucide-react";
import type { MediaAsset } from "@/lib/cms/media-types";
import MediaToolbar from "@/components/studio/media/MediaToolbar";
import MediaGrid from "@/components/studio/media/MediaGrid";
import UploadMediaDialog from "@/components/studio/media/UploadMediaDialog";
import MediaDetailDialog from "@/components/studio/media/MediaDetailDialog";

function totalSize(assets: MediaAsset[]) {
  const bytes = assets.reduce((sum, asset) => sum + Number(asset.size_bytes), 0);
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function MediaLibrary({
  initialAssets,
  loadError,
}: {
  initialAssets: MediaAsset[];
  loadError?: string;
}) {
  const [assets, setAssets] = useState(initialAssets);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selected, setSelected] = useState<MediaAsset | null>(null);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return assets.filter((asset) => {
      const typeMatch = type === "all" || asset.asset_type === type;
      const searchable = `${asset.original_name} ${asset.alt_text} ${asset.caption} ${asset.asset_type}`.toLowerCase();
      return typeMatch && (!normalized || searchable.includes(normalized));
    });
  }, [assets, query, type]);

  async function copy(asset: MediaAsset) {
    await navigator.clipboard.writeText(asset.public_url);
    setMessage(`Copied URL for ${asset.original_name}`);
    window.setTimeout(() => setMessage(""), 1800);
  }

  async function remove(asset: MediaAsset) {
    if (!window.confirm(`Delete ${asset.original_name} permanently?`)) return;
    const response = await fetch(`/api/cms/media/${asset.id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error || "Delete failed");
      return;
    }
    setAssets((current) => current.filter((item) => item.id !== asset.id));
    setSelected(null);
    setMessage("Asset deleted");
  }

  return (
    <>
      <header className="studio-page-head media-v2-head">
        <div>
          <span>CONTENT CONTROL / MEDIA</span>
          <h1>Media library</h1>
          <p>Manage visual assets used across Field Notes and project documentation.</p>
        </div>
      </header>

      <section className="media-v2-stats">
        <div><Images /><span>ASSETS</span><b>{String(assets.length).padStart(2, "0")}</b></div>
        <div><Database /><span>VISIBLE RESULTS</span><b>{String(filtered.length).padStart(2, "0")}</b></div>
        <div><HardDrive /><span>TOTAL SIZE</span><b className="size-value">{totalSize(assets)}</b></div>
      </section>

      <MediaToolbar
        query={query}
        selectedType={type}
        onQueryChange={setQuery}
        onTypeChange={setType}
        onUpload={() => setUploadOpen(true)}
      />

      {loadError && <div className="media-v2-error">{loadError}</div>}
      {message && <div className="media-v2-message">{message}</div>}

      <MediaGrid
        assets={filtered}
        onOpen={setSelected}
        onCopy={copy}
        onDelete={remove}
      />

      <UploadMediaDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={(asset) => {
          setAssets((current) => [asset, ...current]);
          setMessage("Asset uploaded");
        }}
      />

      <MediaDetailDialog
        asset={selected}
        onClose={() => setSelected(null)}
        onUpdated={(asset) => {
          setAssets((current) => current.map((item) => item.id === asset.id ? asset : item));
          setSelected(asset);
          setMessage("Metadata saved");
        }}
        onDelete={remove}
      />
    </>
  );
}
