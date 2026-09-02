"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { CommunityAuthor } from "../services";

import {
  deleteCommunityCommentAction,
  updateCommunityCommentAction,
} from "../actions";

import { CommunityCommentLikeButton } from "./community-comment-like-button";

type Comment = {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

type CommentLikeData = {
  liked: boolean;
  likeCount: number;
};

type Props = {
  postId: string;
  comments: Comment[];
  likeData: Record<string, CommentLikeData>;
  authors: Record<string, CommunityAuthor>;
  isAuthenticated: boolean;
  currentUserId: string | null;
};

export function CommunityComments({
  postId,
  comments,
  likeData,
  authors,
  isAuthenticated,
  currentUserId,
}: Props) {
  const router = useRouter();

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editContent, setEditContent] =
    useState("");

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function startEditing(comment: Comment) {
    setError("");
    setEditingId(comment.id);
    setEditContent(comment.content);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditContent("");
    setError("");
  }

  function handleUpdate(commentId: string) {
    const value = editContent.trim();

    if (!value) {
      setError("Answer cannot be empty.");
      return;
    }

    if (value.length > 5000) {
      setError(
        "Answer must be 5000 characters or less.",
      );
      return;
    }

    setError("");

    startTransition(async () => {
      try {
        await updateCommunityCommentAction({
          commentId,
          content: value,
        });

        setEditingId(null);
        setEditContent("");

        router.refresh();
      } catch (error) {
        console.error(
          "Failed to update community answer:",
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

  function handleDelete(commentId: string) {
    setError("");

    startTransition(async () => {
      try {
        await deleteCommunityCommentAction(
          commentId,
        );

        setDeleteId(null);

        router.refresh();
      } catch (error) {
        console.error(
          "Failed to delete community answer:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );

        setDeleteId(null);
      }
    });
  }

  function formatDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Community answers
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            {comments.length}{" "}
            {comments.length === 1
              ? "Answer"
              : "Answers"}
          </h2>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
            💬
          </div>

          <h3 className="mt-4 text-lg font-black text-slate-950">
            No answers yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Be the first person to help answer this
            question.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => {
            const isOwner =
              currentUserId === comment.authorId;

            const commentLike =
              likeData[comment.id] ?? {
                liked: false,
                likeCount: 0,
              };

            const author =
              authors[comment.authorId];

            const isEditing =
              editingId === comment.id;

            const isDeleting =
              deleteId === comment.id;

            return (
              <article
                key={comment.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-start gap-3">
                  {/* Author Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-sm font-black text-indigo-700">
                    {author?.imageUrl ? (
                      <img
                        src={author.imageUrl}
                        alt={author.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      (
                        author?.name?.[0] ?? "M"
                      ).toUpperCase()
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {author?.name ??
                          "MediVerse Member"}
                      </span>

                      <span className="text-xs text-slate-400">
                        {formatDate(comment.createdAt)}
                      </span>

                      {comment.updatedAt.getTime() !==
                        comment.createdAt.getTime() && (
                        <span className="text-[11px] font-medium text-slate-400">
                          Edited
                        </span>
                      )}
                    </div>

                    {/* Content / Edit */}
                    {isEditing ? (
                      <div className="mt-4">
                        <textarea
                          value={editContent}
                          onChange={(event) =>
                            setEditContent(
                              event.target.value,
                            )
                          }
                          rows={5}
                          maxLength={5000}
                          disabled={isPending}
                          className="w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
                        />

                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-xs text-slate-400">
                            {editContent.length}/5000
                          </span>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={cancelEditing}
                              disabled={isPending}
                              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                            >
                              Cancel
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleUpdate(
                                  comment.id,
                                )
                              }
                              disabled={isPending}
                              className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isPending
                                ? "Saving..."
                                : "Save Answer"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                        {comment.content}
                      </p>
                    )}

                    {/* Actions */}
                    {!isEditing && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <CommunityCommentLikeButton
                          postId={postId}
                          commentId={comment.id}
                          initialLiked={
                            commentLike.liked
                          }
                          initialLikeCount={
                            commentLike.likeCount
                          }
                          isAuthenticated={
                            isAuthenticated
                          }
                        />

                        {isOwner && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                startEditing(
                                  comment,
                                )
                              }
                              disabled={isPending}
                              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-60"
                            >
                              ✏️ Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setError("");
                                setDeleteId(
                                  comment.id,
                                );
                              }}
                              disabled={isPending}
                              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                            >
                              🗑️ Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {/* Delete Confirmation */}
                    {isDeleting && (
                      <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
                        <p className="text-sm font-black text-red-900">
                          Delete this answer?
                        </p>

                        <p className="mt-1 text-xs leading-5 text-red-700">
                          This action cannot be undone.
                          Your answer and its likes will
                          be removed.
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
                              setDeleteId(null)
                            }
                            disabled={isPending}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                comment.id,
                              )
                            }
                            disabled={isPending}
                            className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isPending
                              ? "Deleting..."
                              : "Delete Answer"}
                          </button>
                        </div>
                      </div>
                    )}

                    {error &&
                      !isDeleting &&
                      isEditing && (
                        <p
                          role="alert"
                          className="mt-3 text-xs font-semibold text-red-600"
                        >
                          {error}
                        </p>
                      )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}