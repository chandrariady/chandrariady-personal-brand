import { Copy, Expand, Trash2 } from "lucide-react";
import type { MediaAsset } from "@/lib/cms/media-types";

function bytes(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / 1024 / 1024).toFixed(2)} MB`;
}

export default function MediaCard({
  asset,
  onOpen,
  onCopy,
  onDelete,
}: {
  asset: MediaAsset;
  onOpen: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) {
  const extension = asset.original_name.split(".").pop()?.toUpperCase() || "IMG";

  return (
    <article className="media-v2-card">
      <button type="button" className="media-card-preview" onClick={onOpen}>
        <img src={asset.public_url} alt={asset.alt_text || asset.original_name} />
        <span>
          <Expand /> View details
        </span>
      </button>

      <div className="media-card-content">
        <small>{asset.asset_type.replaceAll("_", " ")}</small>
        <h3 title={asset.original_name}>{asset.original_name}</h3>
        <p>
          {extension} · {bytes(asset.size_bytes)}
          {asset.width && asset.height
            ? ` · ${asset.width} × ${asset.height}`
            : ""}
        </p>
        <footer>
          <button type="button" onClick={onCopy}>
            <Copy /> Copy URL
          </button>
          <button type="button" className="danger" onClick={onDelete}>
            <Trash2 /> Delete
          </button>
        </footer>
      </div>
    </article>
  );
}
