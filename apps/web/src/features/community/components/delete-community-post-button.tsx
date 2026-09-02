"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteCommunityPostAction } from "../actions";

type Props = {
  postId: string;
};

export function DeleteCommunityPostButton({
  postId,
}: Props) {
  const router = useRouter();

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const [error, setError] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    if (isPending) {
      return;
    }

    setError("");

    startTransition(async () => {
      try {
        await deleteCommunityPostAction(postId);

        router.replace("/learn/community");
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

        setShowConfirmation(false);
      }
    });
  }

  if (showConfirmation) {
    return (
      <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-4 sm:w-auto">
        <p className="text-sm font-black text-red-900">
          Delete this post?
        </p>

        <p className="mt-1 text-xs leading-5 text-red-700">
          This action cannot be undone. The post,
          answers and associated likes will be removed.
        </p>

        {error && (
          <p
            role="alert"
            className="mt-3 text-xs font-semibold text-red-700"
          >
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              setShowConfirmation(false)
            }
            disabled={isPending}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending
              ? "Deleting..."
              : "Delete Post"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setError("");
        setShowConfirmation(true);
      }}
      className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
    >
      🗑️ Delete Post
    </button>
  );
}