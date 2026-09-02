"use client";

import { useState, useTransition } from "react";

import { toggleCommunityPostLikeAction } from "../actions";

type Props = {
  postId: string;
  initialLiked: boolean;
  initialLikeCount: number;
  isAuthenticated: boolean;
};

export function CommunityPostLikeButton({
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
          await toggleCommunityPostLikeAction(postId);

        setLiked(result.liked);
        setLikeCount(result.likeCount);
      } catch (error) {
        console.error(
          "Failed to toggle community post like:",
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
          ? "Sign in to like this post"
          : undefined
      }
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition ${
        liked
          ? "border-rose-200 bg-rose-50 text-rose-600"
          : "border-slate-200 bg-white text-slate-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
      } ${
        !isAuthenticated || isPending
          ? "cursor-not-allowed opacity-60"
          : ""
      }`}
    >
      <span className="text-base">
        {liked ? "❤️" : "🤍"}
      </span>

      <span>
        {likeCount}{" "}
        {likeCount === 1 ? "Like" : "Likes"}
      </span>

      {!isAuthenticated && (
        <span className="hidden text-xs font-medium sm:inline">
          Sign in to like
        </span>
      )}
    </button>
  );
}