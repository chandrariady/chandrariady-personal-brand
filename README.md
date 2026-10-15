# Chandra Riady Personal Brand

Full-stack Next.js starter for **Mining • Technology • AI**.

## Included
- Premium responsive landing page with a custom open-pit HUD, animated haul route, mine telemetry and topographic visual language
- Animated haul-truck loading sequence with reduced-motion accessibility support
- Writing index and article pages
- Interactive Indonesia mining map prototype using MapLibre
- Next.js backend routes: `/api/articles`, `/api/mines`, `/api/contact`
- Optional Resend integration for contact email
- SEO metadata and Vercel-ready configuration

## Run in VS Code
1. Extract the ZIP and open the folder in VS Code.
2. Open **Terminal > New Terminal**.
3. Run:

```bash
npm install
npm run dev
```

4. Open `http://localhost:3000`.

## Contact form
Copy `.env.example` to `.env.local`. Without environment values the route operates in development mode and logs validated submissions to the terminal. For real email delivery, create a Resend API key, verify a sending domain, and fill in the three values.

## Mining map data
`lib/data.ts` contains illustrative regional markers only. They are intentionally not represented as licences, concessions, resources, reserves or current operating status.

For a production map, first confirm the official source's API availability, licence, attribution, access controls and redistribution rights. A relevant authoritative reference is Minerba One Map Indonesia (MOMI). Do not scrape or republish protected layers without permission.

Recommended production ingestion pattern:
1. Government/public source or approved ArcGIS service
2. Scheduled ETL validation
3. PostGIS database
4. Read-only API with caching
5. MapLibre frontend with source attribution and update date

## Deploy with Vercel
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Add environment variables if using real contact email.
4. Deploy.
5. In Vercel, add `chandrariady.web.id` as a custom domain.
6. Copy the DNS records Vercel provides into the Hostinger DNS Zone.

Do not change nameservers unless you intentionally move DNS management. The safest first deployment is to update only the records requested by Vercel.

## Next production upgrades
- Replace `lib/data.ts` articles with MDX or a CMS such as Sanity
- Add Supabase/PostgreSQL for drafts, map records and admin workflows
- Add an authenticated `/studio` editor
- Add PostGIS for spatial queries
- Integrate AI only after a curated knowledge base and citation policy exist

## Mining UI v2
- Scroll-to-depth rail with live RL elevation, section markers and click navigation
- Project Dispatch board for MinePlan City, Indonesia Mining Map, Mining AI Lab and Learning Hub
- Detailed vector haul truck reused in the loader and hero viewport
- The depth rail is hidden on smaller screens to preserve reading space

## Full CMS

The project now includes Field Notes Studio backed by Supabase PostgreSQL, Authentication and Storage.

Read `CMS_SETUP.md` before running the CMS. The studio is available at `/studio/login` after the environment and database are configured.
