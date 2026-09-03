





import {
  PageTemplate,
  Section,
} from "@/src/components/learn";

import {
  getContinueLearningAction,
  getProgressSummaryAction,
  getSubjectProgressAction,
  getUnitProgressAction,
  getRecentLearningActivityAction,
} from "@/src/features/progress";

export default async function ProgressPage() {
  const [
    summary,
    subjectProgress,
    unitProgress,
    recentActivity,
    continueLearning,
  ] = await Promise.all([
    getProgressSummaryAction(),
    getSubjectProgressAction(),
    getUnitProgressAction(),
    getRecentLearningActivityAction(),
    getContinueLearningAction(),
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
          label: "Continue Learning",
          href: "#continue-learning",
        },
        {
          label: "Progress",
          href: "#progress",
        },
        {
          label: "Subjects",
          href: "#subjects",
        },
        {
          label: "Recent Activity",
          href: "#recent-activity",
        },
      ]}
    >
      <div className="space-y-10">

        {/* ─────────────────────────────────────────────
            HERO
        ───────────────────────────────────────────── */}

        <section
          className="
            relative overflow-hidden rounded-3xl
            border border-slate-200/80
            bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/20
            p-8 shadow-sm backdrop-blur-xl
            md:p-12
          "
        >
          <div className="relative z-10 max-w-2xl">
            <div
              className="
                mb-6 inline-flex items-center gap-2
                rounded-full border border-slate-200/80
                bg-white/80 px-3.5 py-1.5
                text-xs font-semibold text-slate-700
                shadow-xs backdrop-blur-md
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Learning Progress
            </div>

            <h2
              className="
                text-3xl font-bold tracking-tight text-slate-900
                md:text-5xl md:leading-[1.15]
              "
            >
              Keep going.
              <br />
              <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-700 bg-clip-text text-transparent">
                You&apos;re making progress.
              </span>
            </h2>

            <p
              className="
                mt-4 max-w-xl
                text-sm leading-relaxed text-slate-600
                md:text-base
              "
            >
              Every completed lesson brings you one step closer
              to mastering your subjects.
            </p>
          </div>

          {/* Decorative Background Elements */}
          <div
            className="
              absolute -right-12 -top-12
              h-64 w-64 rounded-full
              bg-indigo-100/40 blur-3xl
            "
          />

          <div
            className="
              absolute -bottom-20 right-16
              h-56 w-56 rounded-full
              bg-emerald-100/30 blur-2xl
            "
          />
        </section>

        {/* ─────────────────────────────────────────────
    CONTINUE LEARNING
───────────────────────────────────────────── */}

        <Section
          title="Continue Learning"
          id="continue-learning"
        >
          {continueLearning ? (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-7 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Next lesson
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                      {continueLearning.contentTitle}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {continueLearning.subjectName}
                      {" • "}
                      {continueLearning.unitTitle}
                      {" • "}
                      {continueLearning.topicTitle}
                    </p>

                    {continueLearning.contentSummary && (
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
                        {continueLearning.contentSummary}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>
                        Subtopic {continueLearning.subtopicNumber}
                      </span>

                      <span>•</span>

                      <span>
                        {continueLearning.readingTime} min read
                      </span>
                    </div>
                  </div>

                  <a
                    href={`/learn/subtopics/${continueLearning.subtopicId}`}
                    className="
              inline-flex shrink-0 items-center justify-center
              rounded-xl bg-slate-900
              px-5 py-3
              text-sm font-semibold text-white
              transition-colors
              hover:bg-slate-700
            "
                  >
                    Continue Learning →
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="text-3xl">🎉</div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                You&apos;re all caught up!
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                You&apos;ve completed all available lessons in your learning path.
              </p>
            </div>
          )}
        </Section>

        {/* ─────────────────────────────────────────────
            OVERVIEW
        ───────────────────────────────────────────── */}

        <Section title="Overview" id="overview">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total */}
            <div
              className="
                group rounded-2xl
                border border-slate-200/80
                bg-white p-6
                shadow-xs transition-all duration-300
                hover:-translate-y-1 hover:border-slate-300 hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Lessons
                  </p>

                  <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                    {summary.total}
                  </p>
                </div>

                <div
                  className="
                    flex h-12 w-12 items-center justify-center
                    rounded-2xl bg-slate-100/80 text-xl
                    transition-transform duration-300 group-hover:scale-110
                  "
                >
                  📚
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-slate-400">
                Available in your learning path
              </p>
            </div>

            {/* Completed */}
            <div
              className="
                group rounded-2xl
                border border-emerald-100/80
                bg-white p-6
                shadow-xs transition-all duration-300
                hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Completed
                  </p>

                  <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                    {summary.completed}
                  </p>
                </div>

                <div
                  className="
                    flex h-12 w-12 items-center justify-center
                    rounded-2xl bg-emerald-50 text-xl font-bold text-emerald-600
                    transition-transform duration-300 group-hover:scale-110
                  "
                >
                  ✓
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-emerald-600/70">
                Lessons you&apos;ve completed
              </p>
            </div>

            {/* Remaining */}
            <div
              className="
                group rounded-2xl
                border border-sky-100/80
                bg-white p-6
                shadow-xs transition-all duration-300
                hover:-translate-y-1 hover:border-sky-200 hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                    Remaining
                  </p>

                  <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                    {remaining}
                  </p>
                </div>

                <div
                  className="
                    flex h-12 w-12 items-center justify-center
                    rounded-2xl bg-sky-50 text-xl
                    transition-transform duration-300 group-hover:scale-110
                  "
                >
                  🌱
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-sky-600/70">
                Your next steps to explore
              </p>
            </div>
          </div>
        </Section>

        {/* ─────────────────────────────────────────────
            OVERALL PROGRESS
        ───────────────────────────────────────────── */}

        <Section title="Your Progress" id="progress">
          <div
            className="
              overflow-hidden rounded-3xl
              border border-slate-200/80
              bg-white shadow-xs
            "
          >
            <div className="p-8 md:p-10">

              <div
                className="
                  flex flex-col gap-6
                  md:flex-row md:items-end
                  md:justify-between
                "
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Overall completion
                  </p>

                  <div className="mt-2 flex items-baseline gap-1">
                    <span
                      className="
                        text-6xl font-bold
                        tracking-tight text-slate-900
                      "
                    >
                      {summary.percentage}
                    </span>

                    <span className="text-2xl font-semibold text-slate-400">
                      %
                    </span>
                  </div>
                </div>

                <div
                  className="
                    rounded-full bg-slate-100/80
                    px-4 py-2 text-xs
                    font-semibold text-slate-700
                    border border-slate-200/60
                  "
                >
                  {summary.completed} of {summary.total} completed
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-8">
                <div className="h-4 overflow-hidden rounded-full bg-slate-100 p-0.5">
                  <div
                    className="
                      h-full rounded-full
                      bg-gradient-to-r
                      from-indigo-600
                      via-violet-600
                      to-emerald-500
                      shadow-xs
                      transition-all duration-700 ease-out
                    "
                    style={{
                      width: `${summary.percentage}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="
                  mt-3 flex justify-between
                  text-xs font-medium text-slate-400
                "
              >
                <span>Start</span>
                <span>Keep learning</span>
                <span>100%</span>
              </div>
            </div>

            {/* Insight */}
            <div
              className="
                border-t border-slate-100
                bg-slate-50/50
                px-8 py-5 md:px-10
              "
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-full bg-white
                    shadow-xs border border-slate-200/60
                  "
                >
                  ✨
                </div>

                <p className="text-sm font-medium text-slate-600">
                  {summary.percentage === 100
                    ? "Amazing. You&apos;ve completed your entire learning path."
                    : summary.percentage >= 75
                      ? "You&apos;re almost there. Keep the momentum going."
                      : summary.percentage >= 50
                        ? "You&apos;re halfway there. Keep building your streak."
                        : summary.percentage > 0
                          ? "A great start. Keep learning one lesson at a time."
                          : "Your journey starts here. Complete your first lesson."}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ─────────────────────────────────────────────
            SUBJECT-WISE PROGRESS
        ───────────────────────────────────────────── */}

        <Section
          title="Subject Progress"
          id="subjects"
        >
          <div
            className="
              overflow-hidden rounded-3xl
              border border-slate-200/80
              bg-white shadow-xs
            "
          >
            {/* Header */}
            <div
              className="
                border-b border-slate-100
                px-8 py-6
                md:px-10
              "
            >
              <div
                className="
                  flex flex-col gap-2
                  md:flex-row md:items-end
                  md:justify-between
                "
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    Your subjects
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    See how you&apos;re progressing through each subject.
                  </p>
                </div>

                <div
                  className="
                    inline-flex w-fit items-center
                    rounded-full bg-slate-100
                    px-3.5 py-1.5
                    text-xs font-semibold text-slate-600
                  "
                >
                  {subjectProgress.length} subjects
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="divide-y divide-slate-100">
              {subjectProgress.length === 0 ? (
                <div className="px-8 py-14 text-center md:px-10">
                  <div
                    className="
                      mx-auto flex h-14 w-14
                      items-center justify-center
                      rounded-2xl bg-slate-100
                      text-xl
                    "
                  >
                    📖
                  </div>

                  <h4 className="mt-4 text-base font-semibold text-slate-800">
                    No subjects available yet
                  </h4>

                  <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                    Subjects will appear here once learning content
                    is available.
                  </p>
                </div>
              ) : (
                subjectProgress.map((subject) => {
                  const units = unitProgress.filter(
                    (unit) => unit.subjectId === subject.subjectId,
                  );

                  return (
                    <div
                      key={subject.subjectId}
                      className="
                        px-8 py-7
                        transition-colors duration-200
                        hover:bg-slate-50/50
                        md:px-10
                      "
                    >
                      {/* Subject */}
                      <div
                        className="
                          flex flex-col gap-6
                          md:flex-row md:items-center
                          md:justify-between
                        "
                      >
                        {/* Subject info */}
                        <div className="min-w-0 md:max-w-[45%]">
                          <div className="flex items-center gap-4">
                            <div
                              className="
                                flex h-12 w-12 shrink-0
                                items-center justify-center
                                rounded-2xl
                                bg-gradient-to-br from-indigo-50 to-slate-100
                                border border-indigo-100/50
                                text-base font-bold
                                text-indigo-900
                              "
                            >
                              {subject.subjectName
                                .trim()
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <h4
                                className="
                                  truncate text-base
                                  font-bold text-slate-900
                                "
                              >
                                {subject.subjectName}
                              </h4>

                              <p className="mt-1 text-xs font-medium text-slate-500">
                                {subject.completed} of {subject.total} lessons completed
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Subject Progress */}
                        <div className="w-full md:max-w-xl md:flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Progress
                            </span>

                            <span className="text-sm font-bold text-slate-900">
                              {subject.percentage}%
                            </span>
                          </div>

                          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100 p-0.5">
                            <div
                              className="
                                h-full rounded-full
                                bg-gradient-to-r
                                from-indigo-600
                                via-indigo-500
                                to-emerald-500
                                transition-all duration-700 ease-out
                              "
                              style={{
                                width: `${subject.percentage}%`,
                              }}
                            />
                          </div>

                          <div className="mt-2 flex justify-between">
                            <span className="text-xs font-medium text-slate-400">
                              {subject.completed} completed
                            </span>

                            <span className="text-xs font-medium text-slate-400">
                              {Math.max(
                                subject.total - subject.completed,
                                0,
                              )}{" "}
                              remaining
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Units */}
                      {units.length > 0 && (
                        <div className="mt-6 border-t border-slate-100/80 pt-6">
                          <div className="mb-4 flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Units
                            </p>

                            <p className="text-xs font-semibold text-slate-400">
                              {units.length}{" "}
                              {units.length === 1 ? "unit" : "units"}
                            </p>
                          </div>

                          <div className="space-y-3">
                            {units.map((unit) => (
                              <div
                                key={unit.unitId}
                                className="
                                  rounded-2xl
                                  border border-slate-200/60
                                  bg-slate-50/40
                                  p-4 backdrop-blur-xs
                                  transition-all duration-200
                                  hover:bg-slate-50/80 hover:border-slate-300/80
                                "
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2.5">
                                      <span
                                        className="
                                          shrink-0 rounded-lg
                                          border border-slate-200/80
                                          bg-white px-2.5 py-1
                                          text-[11px] font-bold
                                          text-slate-600
                                          shadow-2xs
                                        "
                                      >
                                        Unit {unit.unitNumber}
                                      </span>

                                      <h5 className="truncate text-sm font-bold text-slate-800">
                                        {unit.unitTitle}
                                      </h5>
                                    </div>

                                    <p className="mt-2 text-xs font-medium text-slate-400">
                                      {unit.completed} of {unit.total} lessons completed
                                    </p>
                                  </div>

                                  <div className="w-full sm:max-w-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[11px] font-semibold text-slate-400">
                                        Progress
                                      </span>

                                      <span className="text-xs font-bold text-slate-800">
                                        {unit.percentage}%
                                      </span>
                                    </div>

                                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200/60">
                                      <div
                                        className="
                                          h-full rounded-full
                                          bg-slate-800
                                          transition-all duration-700 ease-out
                                        "
                                        style={{
                                          width: `${unit.percentage}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {subjectProgress.length > 0 && (
              <div
                className="
                  border-t border-slate-100
                  bg-slate-50/50
                  px-8 py-5 md:px-10
                "
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-full bg-white
                      shadow-xs border border-slate-200/60
                    "
                  >
                    🌿
                  </div>

                  <p className="text-sm font-medium text-slate-600">
                    Progress looks different across every subject.
                    Keep moving forward at your own pace.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* ─────────────────────────────────────────────
            RECENT ACTIVITY
        ───────────────────────────────────────────── */}

        <Section
          title="Recent Activity"
          id="recent-activity"
        >
          <div
            className="
              overflow-hidden rounded-3xl
              border border-slate-200/80
              bg-white shadow-xs
            "
          >
            {/* Header */}
            <div
              className="
                border-b border-slate-100
                px-8 py-6
                md:px-10
              "
            >
              <div
                className="
                  flex flex-col gap-2
                  md:flex-row md:items-end
                  md:justify-between
                "
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    Your recent learning
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    A quick look at what you&apos;ve worked on recently.
                  </p>
                </div>

                <div
                  className="
                    inline-flex w-fit items-center
                    rounded-full bg-slate-100
                    px-3.5 py-1.5
                    text-xs font-semibold text-slate-600
                  "
                >
                  {recentActivity.length} recent
                </div>
              </div>
            </div>

            {/* Activity list */}
            <div className="divide-y divide-slate-100">
              {recentActivity.length === 0 ? (
                <div className="px-8 py-14 text-center md:px-10">
                  <div
                    className="
                      mx-auto flex h-14 w-14
                      items-center justify-center
                      rounded-2xl bg-slate-100
                      text-xl
                    "
                  >
                    🌱
                  </div>

                  <h4 className="mt-4 text-base font-semibold text-slate-800">
                    No learning activity yet
                  </h4>

                  <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                    Complete a lesson and your recent activity will appear here.
                  </p>
                </div>
              ) : (
                recentActivity.map((activity) => (
                  <div
                    key={activity.progressId}
                    className="
                      px-8 py-5.5
                      transition-colors duration-200
                      hover:bg-slate-50/60
                      md:px-10
                    "
                  >
                    <div className="flex items-start gap-4">
                      {/* Status icon */}
                      <div
                        className={`
                          flex h-11 w-11 shrink-0
                          items-center justify-center
                          rounded-2xl border text-sm font-bold
                          ${activity.completed
                            ? "bg-emerald-50/80 border-emerald-200/60 text-emerald-600"
                            : "bg-slate-100/80 border-slate-200/60 text-slate-500"
                          }
                        `}
                      >
                        {activity.completed ? "✓" : "•"}
                      </div>

                      {/* Activity details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="min-w-0">
                            <h4 className="truncate text-base font-semibold text-slate-900">
                              {activity.contentTitle}
                            </h4>

                            <p className="mt-1 text-xs font-medium text-slate-500">
                              {activity.subjectName}
                              {" • "}
                              {activity.subtopicTitle}
                            </p>
                          </div>

                          <span
                            className={`
                              shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold
                              ${activity.completed
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                : "bg-slate-100 text-slate-600 border border-slate-200/50"
                              }
                            `}
                          >
                            {activity.completed
                              ? "Completed"
                              : "In progress"}
                          </span>
                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                          {activity.unitTitle}
                          {" • "}
                          {activity.topicTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {recentActivity.length > 0 && (
              <div
                className="
                  border-t border-slate-100
                  bg-slate-50/50
                  px-8 py-5
                  md:px-10
                "
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-full bg-white
                      shadow-xs border border-slate-200/60
                    "
                  >
                    ✨
                  </div>

                  <p className="text-sm font-medium text-slate-600">
                    Keep learning consistently. Every completed lesson
                    moves your journey forward.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* ─────────────────────────────────────────────
            JOURNEY FOOTER
        ───────────────────────────────────────────── */}

        <section
          className="
            rounded-3xl
            border border-slate-200/80
            bg-gradient-to-r from-slate-50 via-indigo-50/20 to-slate-50
            p-8 shadow-2xs
          "
        >
          <div
            className="
              flex flex-col gap-3
              md:flex-row md:items-center
              md:justify-between
            "
          >
            <div>
              <p className="text-base font-bold text-slate-900">
                One lesson at a time.
              </p>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Your progress grows with every small step.
              </p>
            </div>

            <div className="text-3xl">
              🌿
            </div>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}