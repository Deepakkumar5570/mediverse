"use client";

import { useState } from "react";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";

import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";

import { Callout } from "./callout";
import { Toolbar } from "./toolbar";
import { ImageDialog } from "./image-dialog";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function TiptapEditor({
  value,
  onChange,
}: Props) {
  const [isImageDialogOpen, setIsImageDialogOpen] =
    useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
        },
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
      }),

      TableKit,

      Highlight,

      Underline,

      Superscript,

      Subscript,

      Callout,
    ],

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

          // Underline
          "[&_u]:underline",
          "[&_u]:decoration-2",
          "[&_u]:underline-offset-2",

          // Highlight
          "[&_mark]:rounded",
          "[&_mark]:bg-yellow-200",
          "[&_mark]:px-0.5",

          // Superscript
          "[&_sup]:text-[0.7em]",
          "[&_sup]:leading-none",
          "[&_sup]:align-super",

          // Subscript
          "[&_sub]:text-[0.7em]",
          "[&_sub]:leading-none",
          "[&_sub]:align-sub",

          // Blockquote
          "[&_blockquote]:my-5",
          "[&_blockquote]:rounded-r-xl",
          "[&_blockquote]:border-l-4",
          "[&_blockquote]:border-indigo-400",
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

          "[&_pre_code]:bg-transparent",
          "[&_pre_code]:p-0",
          "[&_pre_code]:font-mono",
          "[&_pre_code]:text-sm",
          "[&_pre_code]:text-slate-100",

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

          // Images
          "[&_img]:my-6",
          "[&_img]:max-w-full",
          "[&_img]:rounded-xl",
          "[&_img]:border",
          "[&_img]:border-slate-200",
          "[&_img]:object-contain",

          // Tables
          "[&_table]:my-6",
          "[&_table]:min-w-[640px]",
          "[&_table]:w-full",
          "[&_table]:border-collapse",
          "[&_table]:text-sm",

          "[&_th]:border",
          "[&_th]:border-slate-300",
          "[&_th]:bg-slate-100",
          "[&_th]:px-4",
          "[&_th]:py-3",
          "[&_th]:text-left",
          "[&_th]:font-bold",
          "[&_th]:text-slate-900",

          "[&_td]:border",
          "[&_td]:border-slate-300",
          "[&_td]:px-4",
          "[&_td]:py-3",
          "[&_td]:align-top",
          "[&_td]:text-slate-700",

          // Selected table cells
          "[&_.selectedCell]:bg-indigo-50",
          "[&_.selectedCell]:shadow-[inset_0_0_0_2px_rgb(99_102_241)]",

          // Callout container
          "[&_.mediverse-callout]:my-6",
          "[&_.mediverse-callout]:rounded-xl",
          "[&_.mediverse-callout]:border",
          "[&_.mediverse-callout]:px-5",
          "[&_.mediverse-callout]:py-4",

          // Note
          "[&_.mediverse-callout[data-callout='note']]:border-blue-200",
          "[&_.mediverse-callout[data-callout='note']]:bg-blue-50",

          // Important
          "[&_.mediverse-callout[data-callout='important']]:border-violet-200",
          "[&_.mediverse-callout[data-callout='important']]:bg-violet-50",

          // Warning
          "[&_.mediverse-callout[data-callout='warning']]:border-amber-200",
          "[&_.mediverse-callout[data-callout='warning']]:bg-amber-50",

          // Tip
          "[&_.mediverse-callout[data-callout='tip']]:border-emerald-200",
          "[&_.mediverse-callout[data-callout='tip']]:bg-emerald-50",

          // Callout label
          "[&_.mediverse-callout::before]:block",
          "[&_.mediverse-callout::before]:mb-2",
          "[&_.mediverse-callout::before]:text-xs",
          "[&_.mediverse-callout::before]:font-bold",
          "[&_.mediverse-callout::before]:uppercase",
          "[&_.mediverse-callout::before]:tracking-wider",

          "[&_.mediverse-callout[data-callout='note']::before]:text-blue-700",
          "[&_.mediverse-callout[data-callout='note']::before]:content-['Note']",

          "[&_.mediverse-callout[data-callout='important']::before]:text-violet-700",
          "[&_.mediverse-callout[data-callout='important']::before]:content-['Important']",

          "[&_.mediverse-callout[data-callout='warning']::before]:text-amber-700",
          "[&_.mediverse-callout[data-callout='warning']::before]:content-['Warning']",

          "[&_.mediverse-callout[data-callout='tip']::before]:text-emerald-700",
          "[&_.mediverse-callout[data-callout='tip']::before]:content-['Tip']",

          // Callout content
          "[&_.mediverse-callout_p]:my-1",
          "[&_.mediverse-callout_p]:leading-7",
          "[&_.mediverse-callout_p]:text-slate-700",

          "[&_.mediverse-callout_ul]:my-3",
          "[&_.mediverse-callout_ul]:pl-6",

          "[&_.mediverse-callout_ol]:my-3",
          "[&_.mediverse-callout_ol]:pl-6",

          "[&_.mediverse-callout_li]:my-1",
        ].join(" "),
      },

      // Prevent newly typed text after a link from
      // continuing inside the link mark.
      handleKeyDown(view, event) {
        if (event.key !== " ") {
          return false;
        }

        const { state } = view;

        if (!state.selection.empty) {
          return false;
        }

        const { $from } = state.selection;
        const linkMark = state.schema.marks.link;

        if (!linkMark) {
          return false;
        }

        const hasLinkBefore =
          $from.nodeBefore?.marks.some(
            (mark) => mark.type === linkMark
          ) ?? false;

        if (!hasLinkBefore) {
          return false;
        }

        window.setTimeout(() => {
          const currentState = view.state;
          const storedMarks =
            currentState.storedMarks ?? [];

          const withoutLink = storedMarks.filter(
            (mark) => mark.type !== linkMark
          );

          view.dispatch(
            currentState.tr.setStoredMarks(
              withoutLink
            )
          );
        }, 0);

        return false;
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Toolbar
          editor={editor}
          onInsertImage={() =>
            setIsImageDialogOpen(true)
          }
        />

        <div className="overflow-x-auto bg-white">
          <EditorContent editor={editor} />
        </div>
      </div>

      {editor && isImageDialogOpen && (
        <ImageDialog
          editor={editor}
          onClose={() =>
            setIsImageDialogOpen(false)
          }
        />
      )}
    </>
  );
}