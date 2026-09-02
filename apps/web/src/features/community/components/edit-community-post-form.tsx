"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateCommunityPostAction } from "../actions";

const categories = [
  "general",
  "question",
  "discussion",
  "study-tip",
  "knowledge",
] as const;

type Props = {
  postId: string;
  initialData: {
    title: string;
    content: string;
    category: string;
  };
};

export function EditCommunityPostForm({
  postId,
  initialData,
}: Props) {
  const router = useRouter();

  const [title, setTitle] =
    useState(initialData.title);

  const [category, setCategory] =
    useState<string>(initialData.category);

  const [content, setContent] =
    useState(initialData.content);

  const [error, setError] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      setError("Please enter a title.");
      return;
    }

    if (trimmedTitle.length > 200) {
      setError(
        "Title must be 200 characters or less.",
      );
      return;
    }

    if (!trimmedContent) {
      setError("Please enter some content.");
      return;
    }

    if (trimmedContent.length > 5000) {
      setError(
        "Content must be 5000 characters or less.",
      );
      return;
    }

    startTransition(async () => {
      try {
        await updateCommunityPostAction(postId, {
          title: trimmedTitle,
          content: trimmedContent,
          category,
        });

        router.replace(
          `/learn/community/${postId}`,
        );
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="edit-post-title"
          className="text-sm font-bold text-slate-900"
        >
          Title
        </label>

        <input
          id="edit-post-title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          maxLength={200}
          disabled={isPending}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
        />

        <p className="mt-1 text-xs text-slate-400">
          {title.length}/200
        </p>
      </div>

      <div>
        <label
          htmlFor="edit-post-category"
          className="text-sm font-bold text-slate-900"
        >
          Category
        </label>

        <select
          id="edit-post-category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          disabled={isPending}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
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
          htmlFor="edit-post-content"
          className="text-sm font-bold text-slate-900"
        >
          Content
        </label>

        <textarea
          id="edit-post-content"
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          maxLength={5000}
          rows={10}
          disabled={isPending}
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
        />

        <p className="mt-1 text-right text-xs text-slate-400">
          {content.length}/5000
        </p>
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
            router.push(
              `/learn/community/${postId}`,
            )
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
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}