import Link from "next/link";

import {
  getContinueLearningAction,
  getProgressSummaryAction,
  getRecentLearningActivityAction,
} from "@/src/features/progress";

export default async function LearnPage() {
  const [summary, continueLearning, recentActivity] =
    await Promise.all([
      getProgressSummaryAction(),
      getContinueLearningAction(),
      getRecentLearningActivityAction(),
    ]);

  const remaining = Math.max(
    summary.total - summary.completed,
    0,
  );

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">

      {/* HERO */}
      <section
        className="
          relative overflow-hidden rounded-3xl
          border border-slate-200
          bg-gradient-to-br from-white via-slate-50 to-slate-100
          p-8 shadow-sm md:p-10
        "
      >
        <div className="relative z-10 max-w-3xl">
          <div
            className="
              mb-5 inline-flex items-center gap-2
              rounded-full border border-slate-200
              bg-white/80 px-3 py-1.5
              text-xs font-medium text-slate-600
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            MediVerse Learning
          </div>

          <h1
            className="
              text-3xl font-semibold tracking-tight
              text-slate-900 md:text-5xl
            "
          >
            Welcome back.
            <br />
            Keep learning, one lesson at a time.
          </h1>

          <p
            className="
              mt-4 max-w-2xl
              text-sm leading-6 text-slate-500
              md:text-base
            "
          >
            Continue your medical learning journey through
            structured programs, subjects, topics and lessons.
          </p>

          <div className="mt-7">
            <Link
              href="/learn/programs"
              className="
                inline-flex items-center
                rounded-xl bg-slate-900
                px-5 py-3
                text-sm font-semibold text-white
                transition hover:bg-slate-800
              "
            >
              Explore Programs →
            </Link>
          </div>
        </div>

        <div
          className="
            absolute -right-20 -top-20
            h-64 w-64 rounded-full
            bg-slate-200/60
          "
        />

        <div
          className="
            absolute -bottom-24 right-24
            h-48 w-48 rounded-full
            bg-white/80
          "
        />
      </section>

      {/* OVERVIEW */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-6 shadow-sm
          "
        >
          <p className="text-sm font-medium text-slate-500">
            Total Lessons
          </p>

          <p className="mt-3 text-4xl font-semibold text-slate-900">
            {summary.total}
          </p>

          <p className="mt-3 text-xs text-slate-400">
            Available in your learning path
          </p>
        </div>

        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-6 shadow-sm
          "
        >
          <p className="text-sm font-medium text-slate-500">
            Completed
          </p>

          <p className="mt-3 text-4xl font-semibold text-slate-900">
            {summary.completed}
          </p>

          <p className="mt-3 text-xs text-slate-400">
            Lessons you've completed
          </p>
        </div>

        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-6 shadow-sm
          "
        >
          <p className="text-sm font-medium text-slate-500">
            Remaining
          </p>

          <p className="mt-3 text-4xl font-semibold text-slate-900">
            {remaining}
          </p>

          <p className="mt-3 text-xs text-slate-400">
            Lessons waiting to be explored
          </p>
        </div>
      </section>

      {/* OVERALL PROGRESS */}
      <section
        className="
          overflow-hidden rounded-3xl
          border border-slate-200
          bg-white shadow-sm
        "
      >
        <div className="p-7 md:p-8">

          <div
            className="
              flex flex-col gap-5
              md:flex-row md:items-end
              md:justify-between
            "
          >
            <div>
              <p className="text-sm font-medium text-slate-500">
                Overall completion
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight text-slate-900">
                  {summary.percentage}
                </span>

                <span className="text-xl font-medium text-slate-400">
                  %
                </span>
              </div>
            </div>

            <div
              className="
                w-fit rounded-full
                bg-slate-100 px-4 py-2
                text-sm font-medium text-slate-600
              "
            >
              {summary.completed} of {summary.total} completed
            </div>
          </div>

          <div className="mt-8">
            <div className="h-4 overflow-hidden rounded-full bg-slate-100">
              <div
                className="
                  h-full rounded-full
                  bg-gradient-to-r
                  from-slate-900
                  via-slate-700
                  to-slate-500
                  transition-all duration-700
                "
                style={{
                  width: `${summary.percentage}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">
            <span>Start</span>
            <span>{summary.percentage}% complete</span>
            <span>100%</span>
          </div>
        </div>

        <div
          className="
            border-t border-slate-100
            bg-slate-50/70
            px-7 py-5 md:px-8
          "
        >
          <p className="text-sm text-slate-600">
            {summary.percentage === 100
              ? "Amazing. You've completed your entire learning path."
              : summary.percentage >= 75
                ? "You're almost there. Keep the momentum going."
                : summary.percentage >= 50
                  ? "You're halfway there. Keep building your progress."
                  : summary.percentage > 0
                    ? "A great start. Keep learning one lesson at a time."
                    : "Your journey starts here. Complete your first lesson."}
          </p>
        </div>
      </section>

      {/* CONTINUE LEARNING */}
      <section
        className="
          overflow-hidden rounded-3xl
          border border-slate-200
          bg-white shadow-sm
        "
      >
        <div className="border-b border-slate-100 px-7 py-6 md:px-8">
          <p className="text-sm font-medium text-slate-500">
            Continue Learning
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Pick up where you left off
          </h2>
        </div>

        {continueLearning ? (
          <div className="p-7 md:p-8">
            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-slate-50/70
                p-6
              "
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {continueLearning.subjectName}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    {continueLearning.contentTitle}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {continueLearning.unitTitle}
                    {" • "}
                    {continueLearning.topicTitle}
                    {" • "}
                    {continueLearning.subtopicTitle}
                  </p>

                  {continueLearning.readingTime ? (
                    <p className="mt-2 text-xs text-slate-400">
                      {continueLearning.readingTime} min read
                    </p>
                  ) : null}
                </div>

                <Link
                  href={`/learn/subtopics/${continueLearning.subtopicId}`}
                  className="
                    inline-flex w-fit shrink-0
                    items-center
                    rounded-xl bg-slate-900
                    px-5 py-3
                    text-sm font-semibold text-white
                    transition hover:bg-slate-800
                  "
                >
                  Continue →
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-slate-700">
              You're all caught up.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Complete learning content is up to date.
            </p>

            <Link
              href="/learn/programs"
              className="
                mt-5 inline-flex
                rounded-xl bg-slate-900
                px-5 py-3
                text-sm font-semibold text-white
              "
            >
              Explore More →
            </Link>
          </div>
        )}
      </section>

      {/* RECENT ACTIVITY */}
      <section
        className="
          overflow-hidden rounded-3xl
          border border-slate-200
          bg-white shadow-sm
        "
      >
        <div className="border-b border-slate-100 px-7 py-6 md:px-8">
          <p className="text-sm font-medium text-slate-500">
            Recent Activity
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Your recent learning
          </h2>
        </div>

        {recentActivity.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-slate-700">
              No learning activity yet.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Complete your first lesson and your activity will
              appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentActivity.map((activity) => (
              <Link
                key={activity.progressId}
                href={`/learn/subtopics/${activity.subtopicId}`}
                className="
                  block px-7 py-5
                  transition hover:bg-slate-50
                  md:px-8
                "
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900">
                      {activity.contentTitle}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {activity.subjectName}
                      {" • "}
                      {activity.unitTitle}
                      {" • "}
                      {activity.topicTitle}
                    </p>
                  </div>

                  <span
                    className={`
                      w-fit shrink-0 rounded-full
                      px-3 py-1.5
                      text-xs font-medium
                      ${
                        activity.completed
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }
                    `}
                  >
                    {activity.completed
                      ? "Completed"
                      : "In progress"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* EXPLORE */}
      <section>
        <div className="mb-5">
          <p className="text-sm font-medium text-slate-500">
            Explore MediVerse
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Continue exploring
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/learn/programs"
            className="
              group rounded-2xl
              border border-slate-200
              bg-white p-6 shadow-sm
              transition hover:-translate-y-0.5 hover:shadow-md
            "
          >
            <p className="text-xl">📘</p>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Programs
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Browse programs, semesters, subjects and structured
              learning content.
            </p>

            <p className="mt-5 text-sm font-semibold text-slate-700">
              Explore Programs →
            </p>
          </Link>

          <Link
            href="/learn/search"
            className="
              group rounded-2xl
              border border-slate-200
              bg-white p-6 shadow-sm
              transition hover:-translate-y-0.5 hover:shadow-md
            "
          >
            <p className="text-xl">🔎</p>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Search
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Find learning content across your MediVerse
              knowledge base.
            </p>

            <p className="mt-5 text-sm font-semibold text-slate-700">
              Search MediVerse →
            </p>
          </Link>
        </div>
      </section>

    </main>
  );
}