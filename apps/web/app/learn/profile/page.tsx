import { currentUser } from "@clerk/nextjs/server";

import { LearnLayout } from "@/src/components/learn";

import {
  getGamificationStatsAction,
} from "@/src/features/gamification";

import {
  getContinueLearningAction,
  getProgressSummaryAction,
} from "@/src/features/progress";

import { getMcqStatsAction } from "@/src/features/learn/practice/practice-analytics.actions";

import {
  getActivityStatsAction,
  getProfileAction,
  ProfileDashboard,
} from "@/src/features/profile";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return (
      <LearnLayout>
        <main className="relative isolate min-h-[calc(100vh-120px)] overflow-hidden bg-slate-50">
          {/* Ambient background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-[12%] top-[12%] h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
            <div className="absolute right-[10%] top-[28%] h-80 w-80 rounded-full bg-violet-200/25 blur-3xl" />
            <div className="absolute bottom-[5%] left-[40%] h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />
          </div>

          <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-5xl items-center justify-center px-5 py-16 sm:px-8">
            <section className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/80 bg-white/60 px-6 py-12 text-center shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:px-12 sm:py-16">
              {/* Subtle glass highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white"
              />

              {/* Brand mark */}
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                <span className="text-lg font-bold">M</span>
              </div>

              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-600">
                Your MediVerse
              </p>

              <h1 className="mx-auto mt-3 max-w-xl text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Learn medicine with a clearer path.
              </h1>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                Sign in to continue your lessons, track your progress,
                practice MCQs, and build your learning journey.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/sign-in"
                  className="inline-flex h-11 min-w-32 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
                >
                  Sign in
                  <span className="ml-2">→</span>
                </a>

                <a
                  href="/sign-up"
                  className="inline-flex h-11 min-w-32 items-center justify-center rounded-xl border border-slate-200/90 bg-white/70 px-5 text-sm font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Create account
                </a>
              </div>

              {/* Product benefits */}
              <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-slate-200/70 pt-7 text-xs font-medium text-slate-500">
                <span>Track progress</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>Practice MCQs</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>Earn achievements</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>Build streaks</span>
              </div>
            </section>
          </div>
        </main>
      </LearnLayout>
    );
  }

  const [
    profile,
    summary,
    continueLearning,
    mcqStats,
    activityStats,
    gamificationStats,
  ] = await Promise.all([
    getProfileAction(),
    getProgressSummaryAction(),
    getContinueLearningAction(),
    getMcqStatsAction(),
    getActivityStatsAction(),
    getGamificationStatsAction(),
  ]);

  const name =
    [user.firstName, user.lastName]
      .filter(Boolean)
      .join(" ") ||
    user.username ||
    "MediVerse Student";

  return (
    <LearnLayout>
      <main className="space-y-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Your learning, practice, activity, and
            achievements — all in one place.
          </p>
        </div>

        <ProfileDashboard
          user={{
            name,
            imageUrl: user.imageUrl,
          }}
          profile={profile}
          summary={summary}
          continueLearning={continueLearning}
          mcqStats={mcqStats}
          activityStats={activityStats}
          gamificationStats={gamificationStats}
        />
      </main>
    </LearnLayout>
  );
}