"use client";

import { useRouter } from "next/navigation";

export type UnlockedAchievement = {
  id: string;
  achievementKey: string;
  title: string;
  description: string;
  category:
    | "streak"
    | "lesson"
    | "mcq"
    | "practice"
    | null;
  icon: string;
  xpReward: number;
  unlockedAt: Date | string;
};

type Props = {
  achievements: UnlockedAchievement[];
  onClose: () => void;
};

export function AchievementUnlockModal({
  achievements,
  onClose,
}: Props) {
  const router = useRouter();

  if (achievements.length === 0) {
    return null;
  }

  const totalXp = achievements.reduce(
    (total, achievement) =>
      total + achievement.xpReward,
    0,
  );

  function handleViewAchievements() {
    onClose();
    router.push("/learn/profile");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-unlocked-title"
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 px-6 py-8 text-center text-white sm:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl shadow-lg ring-1 ring-white/20">
            🏆
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            Achievement Unlocked
          </p>

          <h2
            id="achievement-unlocked-title"
            className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
          >
            {achievements.length === 1
              ? achievements[0].title
              : `${achievements.length} Achievements Unlocked`}
          </h2>
        </div>

        {/* Achievements */}
        <div className="max-h-[55vh] overflow-y-auto p-5 sm:p-6">
          <div className="space-y-3">
            {achievements.map(
              (achievement) => (
                <div
                  key={achievement.achievementKey}
                  className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                      {achievement.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-black text-slate-950">
                          {achievement.title}
                        </h3>

                        {achievement.xpReward >
                          0 && (
                          <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-black text-indigo-700">
                            +{achievement.xpReward} XP
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm leading-5 text-slate-600">
                        {
                          achievement.description
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Total XP */}
          {totalXp > 0 && (
            <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-center text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                XP Earned
              </p>

              <p className="mt-1 text-2xl font-black">
                +{totalXp} XP
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleViewAchievements}
              className="flex-1 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              View Achievements
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}