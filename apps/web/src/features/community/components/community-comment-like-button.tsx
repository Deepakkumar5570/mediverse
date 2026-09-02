"use client";

import { useState, useTransition } from "react";

import { toggleCommunityCommentLikeAction } from "../actions";

type Props = {
  commentId: string;
  postId: string;
  initialLiked: boolean;
  initialLikeCount: number;
  isAuthenticated: boolean;
};

export function CommunityCommentLikeButton({
  commentId,
  postId,
  initialLiked,
  initialLikeCount,
  isAuthenticated,
}: Props) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] =
    useState(initialLikeCount);

  const [isPending, startTransition] =
    useTransition();

  function handleLike() {
    if (!isAuthenticated || isPending) {
      return;
    }

    startTransition(async () => {
      try {
        const result =
          await toggleCommunityCommentLikeAction(
            commentId,
            postId,
          );

        setLiked(result.liked);
        setLikeCount(result.likeCount);
      } catch (error) {
        console.error(
          "Failed to toggle community answer like:",
          error,
        );
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={!isAuthenticated || isPending}
      title={
        !isAuthenticated
          ? "Sign in to like this answer"
          : undefined
      }
      className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border px-3.5 text-xs font-bold transition ${
        liked
          ? "border-rose-200 bg-rose-50 text-rose-600"
          : "border-slate-200 bg-white text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
      } ${
        !isAuthenticated || isPending
          ? "cursor-not-allowed opacity-60"
          : ""
      }`}
    >
      <span className="text-sm">
        {liked ? "❤️" : "🤍"}
      </span>

      <span>
        {likeCount}{" "}
        {likeCount === 1 ? "Like" : "Likes"}
      </span>

      {!isAuthenticated && (
        <span className="hidden sm:inline">
          Sign in to like
        </span>
      )}
    </button>
  );
}