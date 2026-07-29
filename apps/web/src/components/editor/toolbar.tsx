"use client";

import type { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

export function Toolbar({
  editor,
}: Props) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 rounded-md border p-2">
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
      >
        Bold
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
      >
        Italic
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({
            level: 1,
          }).run()
        }
      >
        H1
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({
            level: 2,
          }).run()
        }
      >
        H2
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        • List
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
      >
        1. List
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().undo().run()
        }
      >
        Undo
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().redo().run()
        }
      >
        Redo
      </button>
    </div>
  );
}