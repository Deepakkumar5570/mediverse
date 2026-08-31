"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  completeContentAction,
  incompleteContentAction,
} from "../actions/progress.actions";

type ProgressButtonProps = {
  contentId: string;
  initialCompleted?: boolean;
};

export function ProgressButton({
  contentId,
  initialCompleted = false,
}: ProgressButtonProps) {
  const router = useRouter();

  const [completed, setCompleted] =
    useState(initialCompleted);

  const [isPending, startTransition] =
    useTransition();

  function handleToggle() {
    startTransition(async () => {
      try {
        if (completed) {
          await incompleteContentAction(
            contentId,
          );

          setCompleted(false);
        } else {
          await completeContentAction(
            contentId,
          );

          setCompleted(true);
        }

        router.refresh();
      } catch (error) {
        console.error(
          "Failed to update content progress:",
          error,
        );
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`rounded-lg px-4 py-2 font-medium transition ${
        completed
          ? "bg-green-600 text-white"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {isPending
        ? "Updating..."
        : completed
          ? "✓ Completed"
          : "Mark as Complete"}
    </button>
  );
}