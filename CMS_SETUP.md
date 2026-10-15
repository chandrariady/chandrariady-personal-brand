# CMS Setup: Field Notes Studio

This project includes a complete Supabase-backed CMS inside the existing website.

## Included

- Private sign-in at `/studio/login`
- Protected studio routes and authenticated API endpoints
- Dashboard and article manager
- Create, edit, preview, draft, publish, archive and delete
- Markdown with GitHub-flavoured Markdown support
- Categories, tags, content type and featured flag
- Cover-image upload to Supabase Storage
- Media library
- SEO title, SEO description and Open Graph metadata
- Public `/writing` listing with category filters
- Public `/writing/[slug]` article rendering
- PostgreSQL schema, RLS policies, storage policies and seed content

## 1. Create Supabase project

Create a new Supabase project. In the project dashboard, copy:

- Project URL
- Anon/public key
- Service role key

The service role key is included for future server-side administration. The current browser code never reads it.

## 2. Create editor account

In Supabase Dashboard:

1. Open Authentication.
2. Open Users.
3. Add a user using your chosen private email and password.
4. Use the same email in `NEXT_PUBLIC_STUDIO_EMAIL`.

Only that email is accepted by the studio middleware.

## 3. Run database migration

Open SQL Editor and run the complete content of:

```text
supabase/migrations/001_cms.sql
```

This creates:

- `public.articles`
- article indexes
- automatic `updated_at`
- row-level security policies
- public `cms-media` bucket
- authenticated storage policies

## 4. Seed initial articles

After the editor account exists, run:

```text
supabase/seed.sql
```

The seed assigns the articles to the earliest Authentication user in the project. For a clean project, that should be the editor account created in step 2.

## 5. Configure local environment

Copy:

```text
.env.example
```

to:

```text
.env.local
```

Fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STUDIO_EMAIL=YOUR_PRIVATE_EDITOR_EMAIL
```

Never commit `.env.local` or expose the service-role key in a variable prefixed with `NEXT_PUBLIC_`.

## 6. Install and run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000/studio/login
```

Public writing is at:

```text
http://localhost:3000/writing
```

## Studio workflow

1. Sign in.
2. Select New Field Note.
3. Enter title, slug and excerpt.
4. Write body content in Markdown.
5. Set category, type and tags.
6. Upload a cover image if needed.
7. Fill SEO fields.
8. Save Draft, Preview or Publish.
9. Published content appears under `/writing`.

## Supported Markdown examples

```md
# Main heading

## Section heading

**Bold text**

- Bullet item
- Another item

> Important note

[Descriptive link](https://example.com)

![Image description](https://example.com/image.jpg)
```

## Security design

- `/studio/*` is protected by Supabase Auth middleware.
- `NEXT_PUBLIC_STUDIO_EMAIL` restricts studio access to one approved email.
- Article mutation APIs call `auth.getUser()` before writing.
- RLS permits public access only to published records.
- Authenticated editor can see all records.
- Update and delete require `author_id` to match the logged-in user.
- Upload accepts JPEG, PNG, WebP and GIF up to 5 MB.

## Production notes

For Vercel, add the same environment variables in Project Settings. Update:

```env
NEXT_PUBLIC_SITE_URL=https://chandrariady.web.id
```

In Supabase Authentication URL Configuration, set the site URL to the production domain and add the local URL as an allowed redirect URL.
