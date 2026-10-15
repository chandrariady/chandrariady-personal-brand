export type MediaAssetType =
  | "general"
  | "article_cover"
  | "diagram"
  | "mine_planning"
  | "project";

export type MediaAsset = {
  id: string;
  owner_id: string;
  storage_path: string;
  public_url: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  alt_text: string;
  caption: string;
  asset_type: MediaAssetType;
  created_at: string;
  updated_at: string;
};

export const mediaAssetTypes: {
  value: MediaAssetType;
  label: string;
}[] = [
  { value: "general", label: "General" },
  { value: "article_cover", label: "Article Cover" },
  { value: "diagram", label: "Diagram" },
  { value: "mine_planning", label: "Mine Planning" },
  { value: "project", label: "Project" },
];
