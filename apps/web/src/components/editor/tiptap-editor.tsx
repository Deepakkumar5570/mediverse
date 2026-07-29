"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Toolbar } from "./toolbar";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function TiptapEditor({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[350px] rounded-md border p-4 focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="space-y-2">
      <Toolbar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
}