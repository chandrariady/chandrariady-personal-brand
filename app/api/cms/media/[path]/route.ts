import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { MediaAssetType } from "@/lib/cms/media-types";

const allowedAssetTypes: MediaAssetType[] = [
  "general",
  "article_cover",
  "diagram",
  "mine_planning",
  "project",
];

type RouteProps = {
  params: Promise<{ path: string }>;
};

export async function PATCH(request: Request, { params }: RouteProps) {
  const { path: id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const requestedType = String(body.asset_type || "general") as MediaAssetType;

  if (!allowedAssetTypes.includes(requestedType)) {
    return NextResponse.json({ error: "Invalid asset type" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("media_assets")
    .update({
      alt_text: String(body.alt_text || "").slice(0, 300),
      caption: String(body.caption || "").slice(0, 500),
      asset_type: requestedType,
    })
    .eq("id", id)
    .eq("owner_id", user.id)
    .select()
    .single();

  return error
    ? NextResponse.json({ error: error.message }, { status: 400 })
    : NextResponse.json({ asset: data });
}

export async function DELETE(_: Request, { params }: RouteProps) {
  const { path: id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: asset, error: loadError } = await supabase
    .from("media_assets")
    .select("storage_path")
    .eq("id", id)
    .eq("owner_id", user.id)
    .single();

  if (loadError || !asset) {
    return NextResponse.json(
      { error: loadError?.message || "Asset not found" },
      { status: 404 }
    );
  }

  const { error: storageError } = await supabase.storage
    .from("cms-media")
    .remove([asset.storage_path]);

  if (storageError) {
    return NextResponse.json(
      { error: storageError.message },
      { status: 400 }
    );
  }

  const { error: deleteError } = await supabase
    .from("media_assets")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  return deleteError
    ? NextResponse.json({ error: deleteError.message }, { status: 400 })
    : NextResponse.json({ ok: true });
}
