import {
  PageTemplate,
  Section,
} from "@/src/components/learn";

import {
  getProgressSummaryAction,
  getSubjectProgressAction,
  getUnitProgressAction,
} from "@/src/features/progress";

export default async function ProgressPage() {
  const [summary, subjectProgress, unitProgress] = await Promise.all([
    getProgressSummaryAction(),
    getSubjectProgressAction(),
    getUnitProgressAction(),
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

        {/* ─────────────────────────────────────────────
            HERO
        ───────────────────────────────────────────── */}

        <section
          className="
            relative overflow-hidden rounded-3xl
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
                bg-white/80 px-3 py-1.5
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
                md:text-4xl
              "
            >
              Keep going.
              <br />
              You're making progress.
            </h2>

            <p
              className="
                mt-4 max-w-xl
                text-sm leading-6 text-slate-500
                md:text-base
              "
            >
              Every completed lesson brings you one step closer
              to mastering your subjects.
            </p>
          </div>

          {/* Decorative shapes */}
          <div
            className="
              absolute -right-16 -top-16
              h-56 w-56 rounded-full
              bg-slate-200/50
            "
          />

          <div
            className="
              absolute -bottom-24 right-20
              h-48 w-48 rounded-full
              bg-white/70
            "
          />
        </section>

        {/* ─────────────────────────────────────────────
            OVERVIEW
        ───────────────────────────────────────────── */}

        <Section title="Overview" id="overview">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total */}
            <div
              className="
                group rounded-2xl
                border border-slate-200
                bg-white p-6
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-md
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
                    flex h-10 w-10 items-center justify-center
                    rounded-xl bg-slate-100
                    text-lg
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
                group rounded-2xl
                border border-slate-200
                bg-white p-6
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-md
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
                    flex h-10 w-10 items-center justify-center
                    rounded-xl bg-emerald-50
                    text-lg text-emerald-600
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
                group rounded-2xl
                border border-slate-200
                bg-white p-6
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-md
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
                    flex h-10 w-10 items-center justify-center
                    rounded-xl bg-sky-50
                    text-lg
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

        {/* ─────────────────────────────────────────────
            OVERALL PROGRESS
        ───────────────────────────────────────────── */}

        <Section title="Your Progress" id="progress">
          <div
            className="
              overflow-hidden rounded-3xl
              border border-slate-200
              bg-white shadow-sm
            "
          >
            <div className="p-7 md:p-8">

              <div
                className="
                  flex flex-col gap-6
                  md:flex-row md:items-end
                  md:justify-between
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
                    px-4 py-2
                    text-sm font-medium text-slate-600
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

              <div
                className="
                  mt-3 flex justify-between
                  text-xs text-slate-400
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
                bg-slate-50/70
                px-7 py-5 md:px-8
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full bg-white
                    shadow-sm
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
              border border-slate-200
              bg-white shadow-sm
            "
          >
            {/* Header */}
            <div
              className="
                border-b border-slate-100
                px-7 py-6
                md:px-8
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
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">
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
            </div>

            {/* Subjects */}
            <div className="divide-y divide-slate-100">
              {subjectProgress.length === 0 ? (
                <div className="px-7 py-12 text-center md:px-8">
                  <div
                    className="
                      mx-auto flex h-12 w-12
                      items-center justify-center
                      rounded-2xl bg-slate-100
                      text-lg
                    "
                  >
                    📖
                  </div>

                  <h4 className="mt-4 text-sm font-semibold text-slate-800">
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
        px-7 py-6
        transition-colors duration-200
        hover:bg-slate-50/60
        md:px-8
      "
                    >
                      {/* Subject */}
                      <div
                        className="
          flex flex-col gap-5
          md:flex-row md:items-center
          md:justify-between
        "
                      >
                        {/* Subject info */}
                        <div className="min-w-0 md:max-w-[45%]">
                          <div className="flex items-center gap-3">
                            <div
                              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-slate-100
                text-sm font-semibold
                text-slate-700
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
                  truncate text-sm
                  font-semibold text-slate-900
                "
                              >
                                {subject.subjectName}
                              </h4>

                              <p className="mt-1 text-xs text-slate-400">
                                {subject.completed} of {subject.total} lessons completed
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Subject Progress */}
                        <div className="w-full md:max-w-xl md:flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500">
                              Progress
                            </span>

                            <span className="text-sm font-semibold text-slate-800">
                              {subject.percentage}%
                            </span>
                          </div>

                          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
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

                          <div className="mt-2 flex justify-between">
                            <span className="text-[11px] text-slate-400">
                              {subject.completed} completed
                            </span>

                            <span className="text-[11px] text-slate-400">
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
                        <div className="mt-6 border-t border-slate-100 pt-5">
                          <div className="mb-3 flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Units
                            </p>

                            <p className="text-xs text-slate-400">
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
                  border border-slate-100
                  bg-slate-50/70
                  p-4
                "
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="
                          shrink-0 rounded-lg
                          bg-white px-2 py-1
                          text-[11px] font-semibold
                          text-slate-500
                          shadow-sm
                        "
                                      >
                                        Unit {unit.unitNumber}
                                      </span>

                                      <h5 className="truncate text-sm font-semibold text-slate-800">
                                        {unit.unitTitle}
                                      </h5>
                                    </div>

                                    <p className="mt-2 text-xs text-slate-400">
                                      {unit.completed} of {unit.total} lessons completed
                                    </p>
                                  </div>

                                  <div className="w-full sm:max-w-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[11px] font-medium text-slate-500">
                                        Progress
                                      </span>

                                      <span className="text-xs font-semibold text-slate-700">
                                        {unit.percentage}%
                                      </span>
                                    </div>

                                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white">
                                      <div
                                        className="
                          h-full rounded-full
                          bg-slate-800
                          transition-all duration-700
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
                  bg-slate-50/70
                  px-7 py-5 md:px-8
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-full bg-white
                      shadow-sm
                    "
                  >
                    🌿
                  </div>

                  <p className="text-sm text-slate-600">
                    Progress looks different across every subject.
                    Keep moving forward at your own pace.
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
            border border-slate-200
            bg-slate-50/70
            p-7
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
              <p className="text-sm font-semibold text-slate-800">
                One lesson at a time.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Your progress grows with every small step.
              </p>
            </div>

            <div className="text-2xl">
              🌿
            </div>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
}