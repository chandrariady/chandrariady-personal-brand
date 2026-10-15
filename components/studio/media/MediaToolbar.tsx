import { ImagePlus, Search, X } from "lucide-react";
import { mediaAssetTypes } from "@/lib/cms/media-types";

export default function MediaToolbar({
  query,
  selectedType,
  onQueryChange,
  onTypeChange,
  onUpload,
}: {
  query: string;
  selectedType: string;
  onQueryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onUpload: () => void;
}) {
  return (
    <>
      <div className="media-v2-toolbar">
        <label>
          <Search />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search filename, alt text or caption..."
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onQueryChange("")}
            >
              <X />
            </button>
          )}
        </label>

        <button type="button" className="media-upload-main" onClick={onUpload}>
          <ImagePlus />
          Upload media
        </button>
      </div>

      <div className="media-v2-types">
        <button
          type="button"
          className={selectedType === "all" ? "active" : ""}
          onClick={() => onTypeChange("all")}
        >
          All
        </button>
        {mediaAssetTypes.map((type) => (
          <button
            type="button"
            key={type.value}
            className={selectedType === type.value ? "active" : ""}
            onClick={() => onTypeChange(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>
    </>
  );
}
