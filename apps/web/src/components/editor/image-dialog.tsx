"use client";

import { useRef, useState } from "react";
import type { Editor } from "@tiptap/react";

import { uploadContentImageAction } from "@/src/features/content/actions/upload-content-image";

type Props = {
  editor: Editor;
  onClose: () => void;
};

export function ImageDialog({
  editor,
  onClose,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleInsertImage() {
    if (!file) {
      setError("Please select an image.");
      return;
    }

    if (!altText.trim()) {
      setError("Please add alt text for accessibility.");
      return;
    }

    try {
      setIsUploading(true);
      setError("");

      const result = await uploadContentImageAction(file);

      editor
        .chain()
        .focus()
        .setImage({
          src: result.url,
          alt: altText.trim(),
        })
        .run();

      onClose();
    } catch (error) {
      console.error("Image insertion failed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to upload image.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-dialog-title"
      >
        {/* HEADER */}
        <div className="border-b border-slate-200 px-5 py-4">
          <h2
            id="image-dialog-title"
            className="text-base font-semibold text-slate-900"
          >
            Insert image
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add an educational image to this article.
          </p>
        </div>

        {/* BODY */}
        <div className="space-y-5 px-5 py-5">
          {/* FILE */}
          <div>
            <label
              htmlFor="article-image"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Image
            </label>

            <input
              ref={fileInputRef}
              id="article-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={isUploading}
              onChange={(event) => {
                const selectedFile =
                  event.target.files?.[0] ?? null;

                setFile(selectedFile);
                setError("");
              }}
              className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-2 text-xs text-slate-500">
              JPEG, PNG or WebP · Maximum 5 MB
            </p>
          </div>

          {/* SELECTED FILE */}
          {file && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="truncate text-sm font-medium text-slate-700">
                {file.name}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          )}

          {/* ALT TEXT */}
          <div>
            <label
              htmlFor="image-alt"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Alt text
            </label>

            <input
              id="image-alt"
              type="text"
              value={altText}
              disabled={isUploading}
              onChange={(event) => {
                setAltText(event.target.value);
                setError("");
              }}
              placeholder="e.g. Structure of a nephron"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:bg-slate-50"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Briefly describe what the image shows. This helps
              students using screen readers.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              {error}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleInsertImage}
            disabled={isUploading}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Insert image"}
          </button>
        </div>
      </div>
    </div>
  );
}