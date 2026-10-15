import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { MediaAssetType } from "@/lib/cms/media-types";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

const allowedAssetTypes: MediaAssetType[] = [
  "general",
  "article_cover",
  "diagram",
  "mine_planning",
  "project",
];

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  return error
    ? NextResponse.json({ error: error.message }, { status: 500 })
    : NextResponse.json({ assets: data || [] });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const requestedType = String(form.get("asset_type") || "general") as MediaAssetType;
  const assetType = allowedAssetTypes.includes(requestedType)
    ? requestedType
    : "general";
  const altText = String(form.get("alt_text") || "").slice(0, 300);
  const caption = String(form.get("caption") || "").slice(0, 500);
  const width = Number(form.get("width") || 0) || null;
  const height = Number(form.get("height") || 0) || null;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Maximum file size is 5 MB" },
      { status: 400 }
    );
  }

  if (!allowedTypes.includes(file.type as (typeof allowedTypes)[number])) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP and GIF are supported" },
      { status: 400 }
    );
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const storagePath = `${user.id}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("cms-media")
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message },
      { status: 400 }
    );
  }

  const { data: publicData } = supabase.storage
    .from("cms-media")
    .getPublicUrl(storagePath);

  const { data: asset, error: insertError } = await supabase
    .from("media_assets")
    .insert({
      owner_id: user.id,
      storage_path: storagePath,
      public_url: publicData.publicUrl,
      original_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      width,
      height,
      alt_text: altText,
      caption,
      asset_type: assetType,
    })
    .select()
    .single();

  if (insertError) {
    await supabase.storage.from("cms-media").remove([storagePath]);
    return NextResponse.json(
      { error: insertError.message },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      asset,
      url: asset.public_url,
      path: asset.storage_path,
    },
    { status: 201 }
  );
}
