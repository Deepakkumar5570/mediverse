"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createCommunityCommentAction } from "../actions";

type Props = {
  postId: string;
};

export function CreateCommentForm({
  postId,
}: Props) {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const value = content.trim();

    if (!value) {
      setError("Please write an answer.");
      return;
    }

    if (value.length > 5000) {
      setError(
        "Answer must be 5000 characters or less.",
      );
      return;
    }

    startTransition(async () => {
      try {
        await createCommunityCommentAction({
          postId,
          content: value,
        });

        setContent("");

        router.refresh();
      } catch (error) {
        console.error(
          "Failed to create community answer:",
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

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-slate-950">
            Your answer
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Help another student learn something useful.
          </p>
        </div>

        <span className="hidden text-xs text-slate-400 sm:block">
          {content.length}/5000
        </span>
      </div>

      <textarea
        value={content}
        onChange={(event) =>
          setContent(event.target.value)
        }
        placeholder="Write a clear and helpful answer..."
        rows={6}
        maxLength={5000}
        disabled={isPending}
        className="mt-5 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
      />

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-400">
          Keep answers respectful, useful and relevant.
        </p>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Posting…" : "Post Answer"}
        </button>
      </div>
    </form>
  );
}