"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  useTransition,
} from "react";

import {
  AchievementUnlockModal,
  type UnlockedAchievement,
} from "@/src/features/gamification/achievements/components/achievement-unlock-modal";

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

  const [
    completed,
    setCompleted,
  ] = useState(initialCompleted);

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    unlockedAchievements,
    setUnlockedAchievements,
  ] = useState<
    UnlockedAchievement[]
  >([]);

  function handleToggle() {
    startTransition(async () => {
      try {
        if (completed) {
          await incompleteContentAction(
            contentId,
          );

          setCompleted(false);
        } else {
          const response =
            await completeContentAction(
              contentId,
            );

          setCompleted(true);

          if (
            response.unlockedAchievements
              ?.length
          ) {
            setUnlockedAchievements(
              response.unlockedAchievements as UnlockedAchievement[],
            );
          }
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
    <>
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

      {unlockedAchievements.length >
        0 && (
        <AchievementUnlockModal
          achievements={
            unlockedAchievements
          }
          onClose={() =>
            setUnlockedAchievements(
              [],
            )
          }
        />
      )}
    </>
  );
}