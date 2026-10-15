"use client";

import type { ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
  CheckSquare,
  Minus,
  Pickaxe,
  Calculator,
} from "lucide-react";

function ToolButton({
  onClick,
  title,
  active = false,
  children,
  wide = false,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className={`rte-tool ${active ? "is-active" : ""} ${
        wide ? "rte-tool-wide" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Separator() {
  return <span className="rte-separator" aria-hidden="true" />;
}

export default function EditorToolbar({
  editor,
  onImage,
}: {
  editor: Editor;
  onImage: () => void;
}) {
  function setLink() {
    const previous = editor.getAttributes("link").href as
      | string
      | undefined;
    const url = window.prompt("Link URL", previous || "https://");

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  }

  function addMineNote() {
    const kind =
      window.prompt(
        "Type: note, observation, takeaway, caution",
        "note"
      ) || "note";
    const title =
      window.prompt("Callout title", "Mine Planning Note") ||
      "Mine Planning Note";

    editor.chain().focus().setMineCallout({ kind, title }).run();
  }

  function addFormula() {
    const formula = window.prompt(
      "Mining formula",
      "SR = Waste Tonnes / Ore Tonnes"
    );

    if (!formula) return;

    editor
      .chain()
      .focus()
      .insertFormula({
        formula,
        label: "Mining Formula",
      })
      .run();
  }

  return (
    <div className="rte-toolbar" aria-label="Rich text toolbar">
      <div className="rte-toolbar-group">
        <ToolButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </ToolButton>
        <ToolButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </ToolButton>
        <ToolButton
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
        >
          <UnderlineIcon />
        </ToolButton>
      </div>

      <Separator />

      <div className="rte-toolbar-group">
        <ToolButton
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 />
        </ToolButton>
        <ToolButton
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 />
        </ToolButton>
        <ToolButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List />
        </ToolButton>
        <ToolButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered />
        </ToolButton>
        <ToolButton
          title="Task list"
          active={editor.isActive("taskList")}
          onClick={() =>
            editor.chain().focus().toggleTaskList().run()
          }
        >
          <CheckSquare />
        </ToolButton>
        <ToolButton
          title="Quote"
          active={editor.isActive("blockquote")}
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          <Quote />
        </ToolButton>
        <ToolButton
          title="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() =>
            editor.chain().focus().toggleCodeBlock().run()
          }
        >
          <Code2 />
        </ToolButton>
      </div>

      <Separator />

      <div className="rte-toolbar-group">
        <ToolButton
          title="Add link"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <LinkIcon />
        </ToolButton>
        <ToolButton title="Insert image" onClick={onImage}>
          <ImageIcon />
        </ToolButton>
        <ToolButton
          title="Divider"
          onClick={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
        >
          <Minus />
        </ToolButton>
      </div>

      <Separator />

      <div className="rte-toolbar-group rte-toolbar-mining">
        <ToolButton
          title="Insert Mine Note"
          onClick={addMineNote}
          wide
        >
          <Pickaxe />
          <span>Mine Note</span>
        </ToolButton>
        <ToolButton
          title="Insert Formula"
          onClick={addFormula}
          wide
        >
          <Calculator />
          <span>Formula</span>
        </ToolButton>
      </div>

      <div className="rte-toolbar-spacer" />

      <div className="rte-toolbar-group rte-toolbar-history">
        <ToolButton
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 />
        </ToolButton>
        <ToolButton
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 />
        </ToolButton>
      </div>
    </div>
  );
}
