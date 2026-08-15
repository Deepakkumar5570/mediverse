import {
  PageTemplate,
  Section,
} from "@/src/components/learn";

import {
  getProgressSummaryAction,
} from "@/src/features/progress";

export default async function ProgressPage() {
  const summary = await getProgressSummaryAction();

  return (
    <PageTemplate
      title="My Progress"
      description="Track your learning progress across MediVerse."
      breadcrumbs={[
        {
          label: "Learn",
          href: "/learn",
        },
        {
          label: "Progress",
        },
      ]}
      sidebarTitle="Progress"
      sidebar={[
        {
          label: "Overview",
          href: "#overview",
        },
      ]}
    >
      <Section title="Overview" id="overview">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-gray-500">
              Total Lessons
            </p>

            <p className="mt-2 text-3xl font-bold">
              {summary.total}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold">
              {summary.completed}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-gray-500">
              Overall Progress
            </p>

            <p className="mt-2 text-3xl font-bold">
              {summary.percentage}%
            </p>
          </div>
        </div>
      </Section>

      <Section title="Progress">
        <div className="rounded-xl border bg-white p-6">
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium">
              Overall completion
            </span>

            <span className="text-sm font-medium">
              {summary.percentage}%
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-black transition-all"
              style={{
                width: `${summary.percentage}%`,
              }}
            />
          </div>
        </div>
      </Section>
    </PageTemplate>
  );
}