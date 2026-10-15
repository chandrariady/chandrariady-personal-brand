import MediaLibrary from "@/components/studio/media/MediaLibrary";
import MediaStyles from "@/components/studio/media/MediaStyles";
import { createClient } from "@/lib/supabase/server";
import type { MediaAsset } from "@/lib/cms/media-types";

export default async function MediaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = user
    ? await supabase
        .from("media_assets")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false })
    : { data: [], error: null };

  return (
    <div className="studio-page media-v2-page">
      <MediaStyles />
      <MediaLibrary
        initialAssets={(data || []) as MediaAsset[]}
        loadError={error?.message}
      />
    </div>
  );
}
