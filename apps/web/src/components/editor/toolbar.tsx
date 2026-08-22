"use client";

import type { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

type ToolbarButtonProps = {
  label: string;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

function ToolbarButton({
  label,
  title,
  active = false,
  disabled = false,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onClick={onClick}
      className={[
        "inline-flex h-9 min-w-9 items-center justify-center",
        "rounded-lg border px-2.5",
        "text-xs font-semibold transition",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
        active
          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export function Toolbar({
  editor,
}: Props) {
  if (!editor) return null;

  return (
    <div className="border-b border-slate-200 bg-slate-50/80 px-3 py-3">
      <div className="flex flex-wrap items-center gap-1.5">

        {/* TEXT */}
        <div className="mr-1 flex items-center gap-1">
          <ToolbarButton
            label="B"
            title="Bold"
            active={editor.isActive("bold")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
          />

          <ToolbarButton
            label="I"
            title="Italic"
            active={editor.isActive("italic")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
          />
        </div>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* HEADINGS */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="H1"
            title="Heading 1"
            active={editor.isActive("heading", {
              level: 1,
            })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 1,
                })
                .run()
            }
          />

          <ToolbarButton
            label="H2"
            title="Heading 2"
            active={editor.isActive("heading", {
              level: 2,
            })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 2,
                })
                .run()
            }
          />

          <ToolbarButton
            label="H3"
            title="Heading 3"
            active={editor.isActive("heading", {
              level: 3,
            })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 3,
                })
                .run()
            }
          />
        </div>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* LISTS */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="• List"
            title="Bullet list"
            active={editor.isActive("bulletList")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
          />

          <ToolbarButton
            label="1. List"
            title="Ordered list"
            active={editor.isActive("orderedList")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
          />
        </div>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* BLOCKS */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="Quote"
            title="Blockquote"
            active={editor.isActive("blockquote")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .run()
            }
          />

          <ToolbarButton
            label="Code"
            title="Code block"
            active={editor.isActive("codeBlock")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleCodeBlock()
                .run()
            }
          />

          <ToolbarButton
            label="—"
            title="Horizontal rule"
            onClick={() =>
              editor
                .chain()
                .focus()
                .setHorizontalRule()
                .run()
            }
          />
        </div>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* HISTORY */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="↶"
            title="Undo"
            disabled={
              !editor.can().chain().focus().undo().run()
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .undo()
                .run()
            }
          />

          <ToolbarButton
            label="↷"
            title="Redo"
            disabled={
              !editor.can().chain().focus().redo().run()
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .redo()
                .run()
            }
          />
        </div>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* CLEAR */}
        <ToolbarButton
          label="Clear"
          title="Clear formatting"
          onClick={() =>
            editor
              .chain()
              .focus()
              .unsetAllMarks()
              .clearNodes()
              .run()
          }
        />
      </div>
    </div>
  );
}