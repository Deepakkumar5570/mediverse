"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  deleteCommunityPostAction,
  updateCommunityPostAction,
} from "../actions";

type Props = {
  postId: string;
  initialTitle: string;
  initialContent: string;
  initialCategory: string;
};

export function CommunityPostOwnerActions({
  postId,
  initialTitle,
  initialContent,
  initialCategory,
}: Props) {
  const router = useRouter();

  const [isEditing, setIsEditing] =
    useState(false);

  const [title, setTitle] =
    useState(initialTitle);

  const [content, setContent] =
    useState(initialContent);

  const [category, setCategory] =
    useState(initialCategory);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const [error, setError] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function startEditing() {
    setError("");
    setShowDeleteConfirm(false);

    setTitle(initialTitle);
    setContent(initialContent);
    setCategory(initialCategory);

    setIsEditing(true);
  }

  function cancelEditing() {
    setError("");

    setTitle(initialTitle);
    setContent(initialContent);
    setCategory(initialCategory);

    setIsEditing(false);
  }

  function handleUpdate() {
    const nextTitle = title.trim();
    const nextContent = content.trim();
    const nextCategory = category.trim();

    if (!nextTitle) {
      setError("Title cannot be empty.");
      return;
    }

    if (nextTitle.length > 200) {
      setError(
        "Title must be 200 characters or less.",
      );
      return;
    }

    if (!nextContent) {
      setError("Question cannot be empty.");
      return;
    }

    if (nextContent.length > 10000) {
      setError(
        "Question must be 10000 characters or less.",
      );
      return;
    }

    setError("");

    startTransition(async () => {
      try {
        await updateCommunityPostAction(
          postId,
          {
            title: nextTitle,
            content: nextContent,
            category: nextCategory || "general",
          },
        );

        setIsEditing(false);

        router.refresh();
      } catch (error) {
        console.error(
          "Failed to update community post:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      }
    });
  }

  function handleDelete() {
    setError("");

    startTransition(async () => {
      try {
        await deleteCommunityPostAction(postId);

        router.push("/learn/community");
        router.refresh();
      } catch (error) {
        console.error(
          "Failed to delete community post:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );

        setShowDeleteConfirm(false);
      }
    });
  }

  /*
   * Edit mode
   *
   * The parent action row is a flex container,
   * so this editor intentionally takes the full row.
   */
  if (isEditing) {
    return (
      <div className="basis-full rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
              Edit question
            </p>

            <h3 className="mt-1 text-base font-black text-slate-950">
              Update your community post
            </h3>
          </div>

          <button
            type="button"
            onClick={cancelEditing}
            disabled={isPending}
            aria-label="Close editor"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-60"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="community-post-edit-title"
              className="mb-1.5 block text-xs font-bold text-slate-700"
            >
              Title
            </label>

            <input
              id="community-post-edit-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              maxLength={200}
              disabled={isPending}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-1.5 text-right text-xs text-slate-400">
              {title.length}/200
            </p>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="community-post-edit-category"
              className="mb-1.5 block text-xs font-bold text-slate-700"
            >
              Category
            </label>

            <input
              id="community-post-edit-category"
              type="text"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              maxLength={50}
              disabled={isPending}
              placeholder="general"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Question */}
          <div>
            <label
              htmlFor="community-post-edit-content"
              className="mb-1.5 block text-xs font-bold text-slate-700"
            >
              Question
            </label>

            <textarea
              id="community-post-edit-content"
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              rows={7}
              maxLength={10000}
              disabled={isPending}
              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-1.5 text-right text-xs text-slate-400">
              {content.length}/10000
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3">
              <p className="text-xs font-semibold leading-5 text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Editor actions */}
          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={cancelEditing}
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleUpdate}
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-950 px-5 text-xs font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Normal mode
   *
   * No margin/border here because the parent page
   * already provides the Post Actions container.
   */
  return (
    <>
      {/* Edit */}
      <button
        type="button"
        onClick={startEditing}
        disabled={isPending}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        ✏️ Edit
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={() => {
          setError("");
          setShowDeleteConfirm(true);
        }}
        disabled={isPending}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 text-xs font-bold text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        🗑️ Delete
      </button>

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="basis-full rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-lg">
              ⚠️
            </div>

            <div className="min-w-0">
              <p className="text-sm font-black text-red-900">
                Delete this question?
              </p>

              <p className="mt-1 text-xs leading-5 text-red-700">
                This action cannot be undone. The
                question, its answers, and associated
                likes will be removed.
              </p>
            </div>
          </div>

          {error && (
            <p className="mt-3 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-xs font-medium text-red-700">
              {error}
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                setShowDeleteConfirm(false)
              }
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-5 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Deleting..."
                : "Yes, Delete"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}