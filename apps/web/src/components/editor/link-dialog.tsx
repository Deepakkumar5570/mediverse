"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type { Editor } from "@tiptap/react";

type Props = {
  editor: Editor;
  onClose: () => void;
};

function isValidLink(value: string) {
  const url = value.trim();

  if (!url) {
    return false;
  }

  // Allow internal article links, anchors, and relative paths.
  if (
    url.startsWith("/") ||
    url.startsWith("#") ||
    url.startsWith("./") ||
    url.startsWith("../")
  ) {
    return true;
  }

  try {
    const parsed = new URL(url);

    return [
      "http:",
      "https:",
      "mailto:",
      "tel:",
    ].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function LinkDialog({
  editor,
  onClose,
}: Props) {
  const existingUrl =
    editor.getAttributes("link").href ?? "";

  const existingTarget =
    editor.getAttributes("link").target ?? "";

  const [url, setUrl] = useState(existingUrl);
  const [openInNewTab, setOpenInNewTab] =
    useState(existingTarget === "_blank");
  const [error, setError] = useState("");

  const inputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  function handleSubmit() {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      editor
        .chain()
        .focus()
        .unsetLink()
        .run();

      onClose();
      return;
    }

    if (!isValidLink(trimmedUrl)) {
      setError(
        "Enter a valid http, https, mailto, tel, or internal link."
      );
      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: trimmedUrl,
        target: openInNewTab
          ? "_blank"
          : null,
        rel: openInNewTab
          ? "noopener noreferrer nofollow"
          : null,
      })
      .run();

    onClose();
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 px-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mediverse-link-dialog-title"
        className="w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="border-b border-slate-200 px-5 py-4">
          <h2
            id="mediverse-link-dialog-title"
            className="text-sm font-semibold text-slate-900"
          >
            {existingUrl
              ? "Edit link"
              : "Insert link"}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Add a link to the selected text.
          </p>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div>
            <label
              htmlFor="mediverse-link-url"
              className="mb-1.5 block text-xs font-medium text-slate-700"
            >
              URL
            </label>

            <input
              ref={inputRef}
              id="mediverse-link-url"
              type="text"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com"
              className={[
                "w-full rounded-lg border border-slate-300",
                "bg-white px-3 py-2.5 text-sm text-slate-900",
                "outline-none transition",
                "placeholder:text-slate-400",
                "focus:border-indigo-400",
                "focus:ring-2 focus:ring-indigo-500/20",
              ].join(" ")}
            />

            {error && (
              <p className="mt-1.5 text-xs text-red-600">
                {error}
              </p>
            )}
          </div>

          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={openInNewTab}
              onChange={(event) =>
                setOpenInNewTab(
                  event.target.checked
                )
              }
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30"
            />

            <span className="text-sm text-slate-700">
              Open in new tab
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/70 px-5 py-3">
          <button
            type="button"
            onMouseDown={(event) => {
              event.preventDefault();
            }}
            onClick={() => {
              editor
                .chain()
                .focus()
                .unsetLink()
                .run();

              onClose();
            }}
            disabled={!editor.isActive("link")}
            className={[
              "rounded-lg px-3 py-2 text-xs font-medium",
              "text-red-600 transition",
              "hover:bg-red-50",
              "disabled:cursor-not-allowed",
              "disabled:opacity-40",
            ].join(" ")}
          >
            Remove link
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={onClose}
              className={[
                "rounded-lg border border-slate-200",
                "bg-white px-3.5 py-2",
                "text-xs font-medium text-slate-700",
                "transition hover:bg-slate-50",
              ].join(" ")}
            >
              Cancel
            </button>

            <button
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={handleSubmit}
              className={[
                "rounded-lg bg-indigo-600",
                "px-3.5 py-2",
                "text-xs font-semibold text-white",
                "transition hover:bg-indigo-700",
                "focus:outline-none",
                "focus:ring-2 focus:ring-indigo-500/30",
              ].join(" ")}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}