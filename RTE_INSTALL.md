# RTE V1-V4 Upgrade

Copy every folder in this package over the project root and allow overwrite.

Then install the editor dependencies:

```powershell
npm install @tiptap/core @tiptap/pm @tiptap/react @tiptap/starter-kit @tiptap/extension-heading @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-underline @tiptap/extension-text-align @tiptap/extension-task-item @tiptap/extension-task-list @tiptap/extension-character-count @tiptap/html lowlight @tiptap/extension-code-block-lowlight katex
```

Run `supabase/migrations/002_rich_text_v1_v4.sql` in Supabase SQL Editor.

Then run:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run typecheck
npm run dev
```

This upgrade preserves old Markdown articles. New articles use Tiptap JSON.

V4 is AI-ready metadata and chunk extraction only. It does not call an AI provider or create embeddings yet.

## Features included

- V1: visual editor, H2/H3, bold, italic, underline, lists, tasks, quote, code, link, image, undo/redo and JSON storage
- V2: autosave, media upload, word count, reading time and automatic table of contents
- V3: slash menu, Mine Note, formula block, image captions and reusable renderer
- V4: AI metadata, heading-based semantic chunks and embedding readiness fields

V4 intentionally stops before connecting an AI vendor. The generated chunks and metadata are stored so a later RAG pipeline can embed them with a selected provider.
