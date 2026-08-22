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
        class: [
          "min-h-[420px] w-full px-6 py-6",
          "focus:outline-none",

          // Paragraphs
          "[&_p]:my-2",
          "[&_p]:leading-7",

          // Headings
          "[&_h1]:mb-4",
          "[&_h1]:mt-6",
          "[&_h1]:text-3xl",
          "[&_h1]:font-bold",
          "[&_h1]:leading-tight",

          "[&_h2]:mb-3",
          "[&_h2]:mt-6",
          "[&_h2]:text-2xl",
          "[&_h2]:font-bold",
          "[&_h2]:leading-tight",

          "[&_h3]:mb-2",
          "[&_h3]:mt-5",
          "[&_h3]:text-xl",
          "[&_h3]:font-bold",
          "[&_h3]:leading-tight",

          // Bullet list
          "[&_ul]:my-4",
          "[&_ul]:list-disc",
          "[&_ul]:pl-6",

          // Numbered list
          "[&_ol]:my-4",
          "[&_ol]:list-decimal",
          "[&_ol]:pl-6",

          // List items
          "[&_li]:my-1",
          "[&_li]:pl-1",
          "[&_li]:leading-7",

          // Blockquote
          "[&_blockquote]:my-5",
          "[&_blockquote]:border-l-4",
          "[&_blockquote]:border-indigo-400",
          "[&_blockquote]:rounded-r-xl",
          "[&_blockquote]:bg-indigo-50",
          "[&_blockquote]:px-5",
          "[&_blockquote]:py-3",
          "[&_blockquote]:italic",
          "[&_blockquote]:text-slate-700",

          // Code block
          "[&_pre]:my-5",
          "[&_pre]:overflow-x-auto",
          "[&_pre]:rounded-xl",
          "[&_pre]:bg-slate-950",
          "[&_pre]:p-5",
          "[&_pre]:font-mono",
          "[&_pre]:text-sm",
          "[&_pre]:text-slate-100",

          // Code inside code block
          "[&_pre_code]:bg-transparent",
          "[&_pre_code]:p-0",
          "[&_pre_code]:text-slate-100",
          "[&_pre_code]:font-mono",
          "[&_pre_code]:text-sm",

          // Inline code
          "[&_code]:rounded",
          "[&_code]:bg-slate-100",
          "[&_code]:px-1.5",
          "[&_code]:py-0.5",
          "[&_code]:font-mono",
          "[&_code]:text-sm",

          // Horizontal rule
          "[&_hr]:my-8",
          "[&_hr]:border-0",
          "[&_hr]:border-t",
          "[&_hr]:border-slate-300",

          // Links
          "[&_a]:text-indigo-600",
          "[&_a]:underline",
        ].join(" "),
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Toolbar editor={editor} />

      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}