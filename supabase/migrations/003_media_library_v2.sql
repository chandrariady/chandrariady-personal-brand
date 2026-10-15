create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null unique,
  public_url text not null,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null default 0,
  width integer,
  height integer,
  alt_text text not null default '',
  caption text not null default '',
  asset_type text not null default 'general' check (
    asset_type in ('general','article_cover','diagram','mine_planning','project')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists media_assets_owner_created_idx
  on public.media_assets(owner_id, created_at desc);

create index if not exists media_assets_asset_type_idx
  on public.media_assets(asset_type);

alter table public.media_assets enable row level security;

drop policy if exists "Owners read media assets" on public.media_assets;
create policy "Owners read media assets"
  on public.media_assets for select to authenticated
  using (auth.uid() = owner_id);

drop policy if exists "Owners insert media assets" on public.media_assets;
create policy "Owners insert media assets"
  on public.media_assets for insert to authenticated
  with check (auth.uid() = owner_id);

drop policy if exists "Owners update media assets" on public.media_assets;
create policy "Owners update media assets"
  on public.media_assets for update to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "Owners delete media assets" on public.media_assets;
create policy "Owners delete media assets"
  on public.media_assets for delete to authenticated
  using (auth.uid() = owner_id);

create or replace function public.set_media_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists media_assets_set_updated_at on public.media_assets;
create trigger media_assets_set_updated_at
before update on public.media_assets
for each row execute function public.set_media_updated_at();
