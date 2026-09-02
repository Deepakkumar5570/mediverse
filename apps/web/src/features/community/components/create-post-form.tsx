"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createCommunityPostAction } from "../actions";

const categories = [
  "general",
  "question",
  "discussion",
  "study-tip",
  "knowledge",
] as const;

export function CreatePostForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("general");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!content.trim()) {
      setError("Please enter some content.");
      return;
    }

    startTransition(async () => {
      try {
        await createCommunityPostAction({
          title: title.trim(),
          content: content.trim(),
          category,
        });

        router.replace("/learn/community");
      } catch (error) {
        console.error(
          "Failed to create community post:",
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
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="post-title"
          className="text-sm font-bold text-slate-900"
        >
          Title
        </label>

        <input
          id="post-title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="What would you like to share?"
          maxLength={200}
          disabled={isPending}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
        />

        <p className="mt-1 text-xs text-slate-400">
          {title.length}/200
        </p>
      </div>

      <div>
        <label
          htmlFor="post-category"
          className="text-sm font-bold text-slate-900"
        >
          Category
        </label>

        <select
          id="post-category"
          value={category}
          onChange={(event) =>
            setCategory(
              event.target.value as (typeof categories)[number],
            )
          }
          disabled={isPending}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item
                .replace("-", " ")
                .replace(/\b\w/g, (letter) =>
                  letter.toUpperCase(),
                )}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="post-content"
          className="text-sm font-bold text-slate-900"
        >
          Content
        </label>

        <textarea
          id="post-content"
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="Write something useful for the community..."
          rows={10}
          disabled={isPending}
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() =>
            router.push("/learn/community")
          }
          disabled={isPending}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Publishing..."
            : "Publish Post"}
        </button>
      </div>
    </form>
  );
}