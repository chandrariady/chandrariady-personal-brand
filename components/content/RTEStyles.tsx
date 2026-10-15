export default function RTEStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.rte-shell {
  margin-top: 22px;
  overflow: visible;
  border: 1px solid #29483d;
  border-radius: 12px;
  background: #06110d;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.015);
}

.rte-toolbar {
  position: sticky;
  top: 70px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 56px;
  padding: 9px 12px;
  overflow-x: auto;
  border-bottom: 1px solid #29483d;
  border-radius: 12px 12px 0 0;
  background: rgba(10, 29, 22, .98);
  backdrop-filter: blur(12px);
}

.rte-toolbar-group {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
}

.rte-tool {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: #91a59b;
  cursor: pointer;
  transition: color .15s ease, background .15s ease, border-color .15s ease;
}

.rte-tool:hover {
  border-color: #34584a;
  background: #112c21;
  color: #eef4f0;
}

.rte-tool.is-active {
  border-color: #7a5a30;
  background: #203225;
  color: #e0b877;
}

.rte-tool svg {
  width: 16px;
  height: 16px;
  stroke-width: 1.8;
}

.rte-tool-wide {
  width: auto;
  min-width: 92px;
  padding: 0 11px;
  border-color: #315244;
  background: #0d241b;
}

.rte-tool-wide span {
  font: 700 9px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.rte-toolbar-mining .rte-tool-wide:first-child {
  color: #e0b877;
}

.rte-toolbar-mining .rte-tool-wide:last-child {
  color: #c98c50;
}

.rte-separator {
  width: 1px;
  height: 24px;
  margin: 0 2px;
  flex: 0 0 1px;
  background: #29483d;
}

.rte-toolbar-spacer {
  flex: 1 1 auto;
  min-width: 6px;
}

.rte-canvas {
  position: relative;
  min-height: 560px;
  background:
    linear-gradient(rgba(255,255,255,.012), rgba(255,255,255,0) 90px),
    #06110d;
}

.rte-canvas .tiptap {
  min-height: 560px;
  max-width: 920px;
  margin: 0 auto;
  padding: 44px 52px 72px;
  outline: none;
  color: #c7d2cc;
  font-size: 16px;
  line-height: 1.82;
  caret-color: #d69a55;
}

.rte-canvas .tiptap > *:first-child {
  margin-top: 0;
}

.rte-canvas .tiptap p {
  margin: 0 0 18px;
}

.rte-canvas .tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  height: 0;
  color: #567165;
  pointer-events: none;
}

.rte-canvas .tiptap h2,
.rich-content h2 {
  margin: 42px 0 15px;
  color: #f3f6f4;
  font-family: var(--font-space), system-ui, sans-serif;
  font-size: clamp(25px, 2.2vw, 33px);
  font-weight: 650;
  line-height: 1.18;
  letter-spacing: -.025em;
}

.rte-canvas .tiptap h3,
.rich-content h3 {
  margin: 32px 0 12px;
  color: #edf2ef;
  font-family: var(--font-space), system-ui, sans-serif;
  font-size: clamp(20px, 1.65vw, 24px);
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: -.015em;
}

.rte-canvas .tiptap h2:first-child,
.rte-canvas .tiptap h3:first-child {
  margin-top: 0;
}

.rte-canvas .tiptap ul,
.rte-canvas .tiptap ol,
.rich-content ul,
.rich-content ol {
  margin: 10px 0 22px;
  padding-left: 28px;
}

.rte-canvas .tiptap li,
.rich-content li {
  margin: 6px 0;
  padding-left: 4px;
}

.rte-canvas .tiptap blockquote,
.rich-content blockquote {
  margin: 28px 0;
  padding: 17px 22px;
  border-left: 3px solid #c98c50;
  background: #0d2119;
  color: #d4ded9;
}

.rte-canvas .tiptap pre,
.rich-content pre {
  overflow-x: auto;
  margin: 26px 0;
  padding: 20px;
  border: 1px solid #29483d;
  border-radius: 9px;
  background: #030a08;
}

.rte-canvas .tiptap code,
.rich-content code {
  color: #dec49e;
}

.rte-canvas .tiptap a,
.rich-content a {
  color: #d29a59;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.rte-canvas .tiptap img,
.rich-content figure img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 28px auto 8px;
  border: 1px solid #29483d;
  border-radius: 10px;
}

.rich-content figure {
  margin: 30px 0;
}

.rich-content figcaption {
  margin-top: 9px;
  color: #71897e;
  font: 10px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  text-align: center;
}

.rte-canvas .tiptap hr,
.rich-content hr {
  margin: 38px 0;
  border: 0;
  border-top: 1px solid #345347;
}

.task-list {
  padding-left: 0 !important;
  list-style: none !important;
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.task-item input {
  margin-top: 7px;
  accent-color: #c98c50;
}

.mine-callout {
  margin: 28px 0;
  padding: 20px 22px;
  border: 1px solid #36594b;
  border-left: 4px solid #69a67d;
  border-radius: 9px;
  background: #0e241a;
}

.mine-callout > strong {
  display: block;
  margin-bottom: 9px;
  color: #77b48a;
  font: 800 9px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.mine-callout-caution {
  border-left-color: #c98c50;
}

.mine-callout-caution > strong {
  color: #d29a59;
}

.mine-callout-takeaway {
  border-left-color: #d3b273;
}

.formula-block {
  display: grid;
  gap: 12px;
  margin: 28px 0;
  padding: 21px 22px;
  border: 1px solid #765934;
  border-radius: 9px;
  background: #15130e;
}

.formula-block small {
  color: #c98c50;
  font: 800 9px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.formula-block code {
  color: #ead5b3;
  font-size: 18px;
}

.rte-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  padding: 10px 16px;
  border-top: 1px solid #29483d;
  border-radius: 0 0 12px 12px;
  background: #091811;
  color: #71897e;
  font: 9px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: .04em;
}

.rte-footer b {
  color: #70a982;
  font-weight: 700;
}

.slash-menu {
  position: absolute;
  z-index: 60;
  top: 84px;
  left: 42px;
  display: grid;
  width: 245px;
  padding: 8px;
  border: 1px solid #36594b;
  border-radius: 10px;
  background: #0a1813;
  box-shadow: 0 24px 60px rgba(0,0,0,.45);
}

.slash-menu > span {
  padding: 8px;
  color: #6f877b;
  font: 800 8px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: .15em;
}

.slash-menu button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #b9c6c0;
  text-align: left;
  cursor: pointer;
}

.slash-menu button:hover {
  background: #142b21;
  color: #fff;
}

.slash-menu svg {
  width: 16px;
  color: #c98c50;
}

.article-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 56px;
}

.article-toc {
  position: sticky;
  top: 100px;
  align-self: start;
  display: grid;
  gap: 4px;
  padding-left: 18px;
  border-left: 1px solid #315044;
}

.article-toc > span {
  margin-bottom: 8px;
  color: #68a47a;
  font: 800 8px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: .15em;
}

.article-toc a {
  display: flex;
  gap: 8px;
  padding: 5px 0;
  color: #879a91;
  font-size: 11px;
}

.article-toc a:hover {
  color: #d4b483;
}

.article-toc a b {
  color: #51695e;
  font: 8px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.article-toc a.toc-sub {
  padding-left: 13px;
}

.rich-content {
  color: #b8c5bf;
  font-size: 16px;
  line-height: 1.85;
}

.ai-panel > small {
  display: block;
  margin-top: 12px;
  color: #6f867b;
  line-height: 1.5;
}

.rte-loading {
  padding: 40px;
  color: #738a7f;
  text-align: center;
}

@media (max-width: 1180px) {
  .rte-toolbar {
    position: relative;
    top: 0;
  }

  .rte-toolbar-spacer {
    display: none;
  }
}

@media (max-width: 900px) {
  .article-main {
    grid-template-columns: 1fr;
  }

  .article-toc {
    position: static;
    grid-row: 1;
  }

  .rte-canvas .tiptap {
    min-height: 480px;
    padding: 30px 24px 60px;
  }

  .rte-tool-wide {
    min-width: 38px;
    width: 38px;
    padding: 0;
  }

  .rte-tool-wide span {
    display: none;
  }
}
        `,
      }}
    />
  );
}
