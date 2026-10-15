$ErrorActionPreference = "Stop"
npm install @tiptap/core @tiptap/pm @tiptap/react @tiptap/starter-kit @tiptap/extension-heading @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-underline @tiptap/extension-text-align @tiptap/extension-task-item @tiptap/extension-task-list @tiptap/extension-character-count @tiptap/html lowlight @tiptap/extension-code-block-lowlight katex
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run typecheck
Write-Host "RTE dependencies installed and typecheck completed. Run npm run dev next."
