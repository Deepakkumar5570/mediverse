"use client";


import { useEffect, useState } from "react";

import {
  ACHIEVEMENTS,
} from "../achievement-rules";

import {
  getUserAchievementsAction,
} from "../achievement.actions";

import {
  AchievementDetailModal,
  type AchievementDetail,
} from "./achievement-detail-modal";

type AchievementListProps = {
  userName: string;
};

export function AchievementList({
  userName,
}: AchievementListProps) {

  const [
    unlockedAchievements,
    setUnlockedAchievements,
  ] = useState<
    AchievementDetail[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedAchievement,
    setSelectedAchievement,
  ] = useState<
    AchievementDetail | null
  >(null);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const data =
          await getUserAchievementsAction();

        setUnlockedAchievements(
          data as AchievementDetail[],
        );
      } catch (error) {
        console.error(
          "Failed to load achievements:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    void loadAchievements();
  }, []);

  const unlockedMap =
    new Map(
      unlockedAchievements.map(
        (achievement) => [
          achievement.achievementKey,
          achievement,
        ],
      ),
    );

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 rounded bg-slate-200" />

          <div className="h-4 w-64 rounded bg-slate-200" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="h-32 rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Achievements
          </p>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Your Milestones
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep learning and practicing to unlock
                new achievements.
              </p>
            </div>

            <p className="text-sm font-bold text-slate-500">
              {unlockedAchievements.length} /{" "}
              {ACHIEVEMENTS.length} unlocked
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map(
            (achievement) => {
              const unlocked =
                unlockedMap.get(
                  achievement.key,
                );

              return (
                <button
                  key={achievement.key}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => {
                    if (unlocked) {
                      setSelectedAchievement(
                        unlocked,
                      );
                    }
                  }}
                  className={[
                    "w-full rounded-2xl border p-5 text-left transition",
                    unlocked
                      ? "cursor-pointer border-indigo-200 bg-indigo-50/50 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
                      : "cursor-default border-slate-200 bg-slate-50",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={[
                        "flex h-11 w-11 items-center justify-center rounded-xl text-xl",
                        unlocked
                          ? "bg-white shadow-sm"
                          : "bg-slate-200 grayscale",
                      ].join(" ")}
                    >
                      {unlocked
                        ? achievement.icon
                        : "🔒"}
                    </div>

                    {unlocked && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                        Unlocked
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-bold text-slate-950">
                    {achievement.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {achievement.description}
                  </p>

                  {achievement.xpReward >
                    0 && (
                      <p className="mt-3 text-xs font-bold text-indigo-600">
                        +{achievement.xpReward} XP
                      </p>
                    )}

                  {unlocked && (
                    <p className="mt-3 text-xs font-semibold text-slate-400">
                      Click to view & share
                    </p>
                  )}
                </button>
              );
            },
          )}
        </div>
      </section>

      <AchievementDetailModal
        achievement={
          selectedAchievement
        }
        userName={userName}
        onClose={() =>
          setSelectedAchievement(
            null,
          )
        }
      />
    </>
  );
}