import { Images } from "lucide-react";
import type { MediaAsset } from "@/lib/cms/media-types";
import MediaCard from "@/components/studio/media/MediaCard";

export default function MediaGrid({
  assets,
  onOpen,
  onCopy,
  onDelete,
}: {
  assets: MediaAsset[];
  onOpen: (asset: MediaAsset) => void;
  onCopy: (asset: MediaAsset) => void;
  onDelete: (asset: MediaAsset) => void;
}) {
  if (!assets.length) {
    return (
      <div className="media-v2-empty">
        <Images />
        <span>NO MEDIA ASSETS FOUND</span>
        <p>Upload an image or clear the current search and type filters.</p>
      </div>
    );
  }

  return (
    <div className="media-v2-grid">
      {assets.map((asset) => (
        <MediaCard
          key={asset.id}
          asset={asset}
          onOpen={() => onOpen(asset)}
          onCopy={() => onCopy(asset)}
          onDelete={() => onDelete(asset)}
        />
      ))}
    </div>
  );
}
