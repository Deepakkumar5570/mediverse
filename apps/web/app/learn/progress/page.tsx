import {
  PageTemplate,
  Section,
} from "@/src/components/learn";

import {
  getProgressSummaryAction,
  getSubjectProgressAction,
} from "@/src/features/progress";

export default async function ProgressPage() {
  const [summary, subjectProgress] = await Promise.all([
    getProgressSummaryAction(),
    getSubjectProgressAction(),
  ]);

  const remaining = Math.max(
    summary.total - summary.completed,
    0,
  );

  return (
    <PageTemplate
      title="My Learning Journey"
      description="A calm space to see how far you've come."
      breadcrumbs={[
        {
          label: "Learn",
          href: "/learn",
        },
        {
          label: "Progress",
        },
      ]}
      sidebarTitle="Your Journey"
      sidebar={[
        {
          label: "Overview",
          href: "#overview",
        },
        {
          label: "Progress",
          href: "#progress",
        },
        {
          label: "Subjects",
          href: "#subjects",
        },
      ]}
    >
      <div className="space-y-8">

        {/* ─────────────────────────────
            HERO
        ───────────────────────────── */}
        <section
          className="
            relative overflow-hidden rounded-[2rem]
            border border-slate-200
            bg-gradient-to-br from-white via-slate-50 to-slate-100
            p-8 shadow-sm
            md:p-10
          "
        >
          <div className="relative z-10 max-w-2xl">
            <div
              className="
                mb-5 inline-flex items-center gap-2
                rounded-full border border-slate-200
                bg-white/80 px-3.5 py-2
                text-xs font-medium text-slate-600
                backdrop-blur
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Learning Progress
            </div>

            <h2
              className="
                text-3xl font-semibold tracking-tight
                text-slate-900
                md:text-5xl
              "
            >
              Keep going.
              <br />
              You're making progress.
            </h2>

            <p
              className="
                mt-5 max-w-xl
                text-sm leading-6 text-slate-500
                md:text-base
              "
            >
              Every completed lesson brings you one step closer
              to mastering your subjects.
            </p>
          </div>

          {/* Decorative elements */}
          <div
            className="
              absolute -right-20 -top-20
              h-64 w-64 rounded-full
              bg-slate-200/50
            "
          />

          <div
            className="
              absolute -bottom-28 right-24
              h-52 w-52 rounded-full
              bg-white/70
            "
          />
        </section>

        {/* ─────────────────────────────
            OVERVIEW
        ───────────────────────────── */}
        <Section title="Overview" id="overview">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total */}
            <div
              className="
                rounded-2xl border border-slate-200
                bg-white p-6 shadow-sm
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Lessons
                  </p>

                  <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
                    {summary.total}
                  </p>
                </div>

                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-xl bg-slate-100 text-lg
                  "
                >
                  📚
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Available in your learning path
              </p>
            </div>

            {/* Completed */}
            <div
              className="
                rounded-2xl border border-slate-200
                bg-white p-6 shadow-sm
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Completed
                  </p>

                  <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
                    {summary.completed}
                  </p>
                </div>

                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-xl bg-emerald-50 text-lg
                  "
                >
                  ✓
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Lessons you've completed
              </p>
            </div>

            {/* Remaining */}
            <div
              className="
                rounded-2xl border border-slate-200
                bg-white p-6 shadow-sm
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Remaining
                  </p>

                  <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
                    {remaining}
                  </p>
                </div>

                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-xl bg-sky-50 text-lg
                  "
                >
                  🌱
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Your next steps to explore
              </p>
            </div>
          </div>
        </Section>

        {/* ─────────────────────────────
            OVERALL PROGRESS
        ───────────────────────────── */}
        <Section title="Your Progress" id="progress">
          <div
            className="
              overflow-hidden rounded-[2rem]
              border border-slate-200
              bg-white shadow-sm
            "
          >
            <div className="p-7 md:p-8">

              <div
                className="
                  flex flex-col gap-6
                  md:flex-row md:items-end md:justify-between
                "
              >
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Overall completion
                  </p>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span
                      className="
                        text-5xl font-semibold
                        tracking-tight text-slate-900
                      "
                    >
                      {summary.percentage}
                    </span>

                    <span className="text-xl font-medium text-slate-400">
                      %
                    </span>
                  </div>
                </div>

                <div
                  className="
                    rounded-full bg-slate-100
                    px-4 py-2 text-sm
                    font-medium text-slate-600
                  "
                >
                  {summary.completed} of {summary.total} completed
                </div>
              </div>

              {/* Progress bar */}
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
                <span>Keep learning</span>
                <span>100%</span>
              </div>
            </div>

            {/* Insight */}
            <div
              className="
                border-t border-slate-100
                bg-slate-50/70
                px-7 py-5 md:px-8
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full bg-white shadow-sm
                  "
                >
                  ✨
                </div>

                <p className="text-sm text-slate-600">
                  {summary.percentage === 100
                    ? "Amazing. You've completed your entire learning path."
                    : summary.percentage >= 75
                      ? "You're almost there. Keep the momentum going."
                      : summary.percentage >= 50
                        ? "You're halfway there. Keep building your streak."
                        : summary.percentage > 0
                          ? "A great start. Keep learning one lesson at a time."
                          : "Your journey starts here. Complete your first lesson."}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ─────────────────────────────
            SUBJECT PROGRESS
        ───────────────────────────── */}
        <Section title="Subject Progress" id="subjects">
          <div
            className="
              overflow-hidden rounded-[2rem]
              border border-slate-200
              bg-white shadow-sm
            "
          >
            {/* Header */}
            <div
              className="
                flex flex-col gap-2
                border-b border-slate-100
                px-7 py-6
                md:flex-row md:items-center md:justify-between
                md:px-8
              "
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Your subjects
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  See how you're progressing through each subject.
                </p>
              </div>

              <div
                className="
                  inline-flex w-fit items-center
                  rounded-full bg-slate-100
                  px-3 py-1.5
                  text-xs font-medium text-slate-500
                "
              >
                {subjectProgress.length} subjects
              </div>
            </div>

            {/* Subject list */}
            <div className="divide-y divide-slate-100">
              {subjectProgress.length === 0 ? (
                <div className="px-7 py-12 text-center md:px-8">
                  <div
                    className="
                      mx-auto flex h-12 w-12
                      items-center justify-center
                      rounded-2xl bg-slate-100
                    "
                  >
                    📖
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-700">
                    No subject progress yet
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Start completing lessons to see your progress here.
                  </p>
                </div>
              ) : (
                subjectProgress.map((subject) => (
                  <div
                    key={subject.subjectName}
                    className="
                      group px-7 py-6
                      transition-colors duration-200
                      hover:bg-slate-50/70
                      md:px-8
                    "
                  >
                    <div className="flex flex-col gap-5">

                      {/* Subject heading */}
                      <div
                        className="
                          flex flex-col gap-3
                          sm:flex-row sm:items-center
                          sm:justify-between
                        "
                      >
                        <div className="min-w-0">
                          <h4
                            className="
                              truncate text-base
                              font-semibold text-slate-900
                            "
                          >
                            {subject.subjectName}
                          </h4>

                          <p className="mt-1 text-xs text-slate-400">
                            {subject.completed} of {subject.total} lessons completed
                          </p>
                        </div>

                        {/* Percentage */}
                        <div
                          className="
                            flex items-center gap-3
                            sm:shrink-0
                          "
                        >
                          <span
                            className="
                              text-sm font-semibold
                              text-slate-700
                            "
                          >
                            {subject.percentage}%
                          </span>

                          <span
                            className="
                              rounded-full
                              bg-slate-100 px-2.5 py-1
                              text-[11px] font-medium
                              text-slate-500
                            "
                          >
                            {subject.percentage === 100
                              ? "Completed"
                              : subject.percentage > 0
                                ? "In progress"
                                : "Not started"}
                          </span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div>
                        <div
                          className="
                            h-2.5 overflow-hidden
                            rounded-full bg-slate-100
                          "
                        >
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
                              width: `${subject.percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Section>

        {/* ─────────────────────────────
            JOURNEY
        ───────────────────────────── */}
        <section
          className="
            rounded-[2rem]
            border border-slate-200
            bg-gradient-to-br
            from-slate-50 to-white
            p-7 shadow-sm
            md:p-8
          "
        >
          <div
            className="
              flex flex-col gap-4
              md:flex-row md:items-center
              md:justify-between
            "
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">
                One lesson at a time.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Your progress grows with every small step.
              </p>
            </div>

            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl bg-white
                text-xl shadow-sm
              "
            >
              🌿
            </div>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}