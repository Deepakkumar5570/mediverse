import Link from "next/link";

import { ActivityCalendar } from "./activity-calendar";
import { ProfileHeader } from "./profile-header";
import { ProfileStats } from "./profile-stats";

type ActivityDay = {
  date: string;
  count: number;
  lessonCount: number;
  mcqCount: number;
};

type ProfileDashboardProps = {
  user: {
    name: string;
    imageUrl?: string | null;
  };

  profile: {
    username?: string | null;
    bio?: string | null;
    programName?: string | null;
    semesterName?: string | null;
  } | null;

  summary: {
    total: number;
    completed: number;
    percentage: number;
  };

  continueLearning: {
    contentTitle: string;
    subjectName: string;
    unitTitle: string;
    topicTitle: string;
    subtopicId: string;
  } | null;

  mcqStats: {
    attempted: number;
    correct: number;
    wrong: number;
    accuracy: number;
  };

  activityStats: {
    currentStreak: number;
    longestStreak: number;
    totalActiveDays: number;
    activityDays: ActivityDay[];
  };
};

export function ProfileDashboard({
  user,
  profile,
  summary,
  continueLearning,
  mcqStats,
  activityStats,
}: ProfileDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <ProfileHeader
        name={user.name}
        imageUrl={user.imageUrl}
        username={profile?.username}
        bio={profile?.bio}
        programName={profile?.programName}
        semesterName={profile?.semesterName}
      />

      {/* Learning Stats */}
      <ProfileStats
        totalLessons={summary.total}
        completedLessons={summary.completed}
        percentage={summary.percentage}
      />

      {/* Learning Progress */}
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Learning
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Your learning progress
            </h2>
          </div>

          <Link
            href="/learn/progress"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            View details →
          </Link>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600">
              Overall progress
            </span>

            <span className="text-sm font-black text-slate-950">
              {summary.percentage}%
            </span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500"
              style={{
                width: `${summary.percentage}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Continue
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Keep learning
            </h2>
          </div>

          <Link
            href="/learn"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            Learning dashboard →
          </Link>
        </div>

        {continueLearning ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Next lesson
            </p>

            <h3 className="mt-2 text-xl font-black text-slate-950">
              {continueLearning.contentTitle}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {continueLearning.subjectName} •{" "}
              {continueLearning.unitTitle} •{" "}
              {continueLearning.topicTitle}
            </p>

            <Link
              href={`/learn/subtopics/${continueLearning.subtopicId}`}
              className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-600"
            >
              Continue Learning →
            </Link>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-center">
            <div className="text-3xl">🎉</div>

            <p className="mt-3 text-sm font-semibold text-slate-700">
              You&apos;re all caught up!
            </p>
          </div>
        )}
      </section>

      {/* Practice + Streak */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Practice */}
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
            Practice
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Your MCQ performance
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-2xl font-black text-slate-950">
                {mcqStats.attempted}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Attempted
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-2xl font-black text-emerald-700">
                {mcqStats.correct}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Correct
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-4">
              <p className="text-2xl font-black text-red-700">
                {mcqStats.wrong}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Wrong
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-4">
              <p className="text-2xl font-black text-violet-700">
                {mcqStats.accuracy}%
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Accuracy
              </p>
            </div>
          </div>

          <Link
            href="/learn/practice"
            className="mt-5 inline-flex text-sm font-bold text-indigo-600"
          >
            Start practicing →
          </Link>
        </section>

        {/* Streak */}
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Activity
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Streak & consistency
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-orange-50 p-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  🔥
                </span>

                <p className="text-2xl font-black text-slate-950">
                  {activityStats.currentStreak}
                </p>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Current streak
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-4">
              <p className="text-2xl font-black text-slate-950">
                {activityStats.longestStreak}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Longest streak
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            You have been active on{" "}
            <span className="font-bold text-slate-700">
              {activityStats.totalActiveDays}
            </span>{" "}
            different days.
          </p>
        </section>
      </div>

      {/* Activity Calendar */}
      <ActivityCalendar
        activityDays={
          activityStats.activityDays
        }
      />

      {/* Activity Summary */}
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Keep going
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Build your learning habit
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Complete lessons and practice MCQs regularly to keep your
            activity streak alive.
          </p>
        </div>
      </section>
    </div>
  );
}