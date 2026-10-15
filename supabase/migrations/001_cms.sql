create extension if not exists pgcrypto;
create table if not exists public.articles (
 id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique,
 excerpt text not null default '', content text not null default '', category text not null default 'Field Notes',
 tags text[] not null default '{}', type text not null default 'field_note' check(type in ('deep_dive','field_note','quick_thought')),
 status text not null default 'draft' check(status in ('draft','published','archived')), cover_image text,
 featured boolean not null default false, seo_title text, seo_description text, published_at timestamptz,
 author_id uuid references auth.users(id) on delete set null, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create index if not exists articles_status_published_idx on public.articles(status,published_at desc);
create index if not exists articles_category_idx on public.articles(category);
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end $$;
drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at before update on public.articles for each row execute function public.set_updated_at();
alter table public.articles enable row level security;
drop policy if exists "Public reads published articles" on public.articles;
create policy "Public reads published articles" on public.articles for select using(status='published' or auth.role()='authenticated');
drop policy if exists "Authors insert own articles" on public.articles;
create policy "Authors insert own articles" on public.articles for insert to authenticated with check(auth.uid()=author_id);
drop policy if exists "Authors update own articles" on public.articles;
create policy "Authors update own articles" on public.articles for update to authenticated using(auth.uid()=author_id) with check(auth.uid()=author_id);
drop policy if exists "Authors delete own articles" on public.articles;
create policy "Authors delete own articles" on public.articles for delete to authenticated using(auth.uid()=author_id);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('cms-media','cms-media',true,5242880,array['image/jpeg','image/png','image/webp','image/gif']) on conflict(id) do nothing;
drop policy if exists "Public reads CMS media" on storage.objects;
create policy "Public reads CMS media" on storage.objects for select using(bucket_id='cms-media');
drop policy if exists "Authenticated uploads CMS media" on storage.objects;
create policy "Authenticated uploads CMS media" on storage.objects for insert to authenticated with check(bucket_id='cms-media');
drop policy if exists "Authenticated updates CMS media" on storage.objects;
create policy "Authenticated updates CMS media" on storage.objects for update to authenticated using(bucket_id='cms-media');
drop policy if exists "Authenticated deletes CMS media" on storage.objects;
create policy "Authenticated deletes CMS media" on storage.objects for delete to authenticated using(bucket_id='cms-media');
