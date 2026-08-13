import {
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";

import {
    getProgressSummaryAction,
} from "@/src/features/progress";

export default async function ProgressPage() {
    const progress = await getProgressSummaryAction();

    return (
        <PageTemplate
            title="My Progress"
            description="Track your learning progress across MediVerse."
            sidebarTitle="Progress"
            breadcrumbs={[
                {
                    label: "Learn",
                    href: "/learn/programs",
                },
                {
                    label: "My Progress",
                },
            ]}
            sidebar={[
                {
                    label: "Overview",
                    href: "#overview",
                },
            ]}
        >
            <section className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Overall Progress"
                    value={`${progress.percentage}%`}
                />

                <StatCard
                    label="Completed Lessons"
                    value={progress.completed}
                />

                <StatCard
                    label="Total Lessons"
                    value={progress.total}
                />
            </section>

            <Section
                title="Overview"
                description="Your overall learning progress on MediVerse."
            >
                <div className="rounded-xl border bg-white p-6">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="font-medium">
                            Learning Progress
                        </span>

                        <span className="text-sm text-gray-500">
                            {progress.completed} / {progress.total}
                        </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{
                                width: `${progress.percentage}%`,
                            }}
                        />
                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                        You have completed {progress.percentage}% of
                        your available lessons.
                    </p>
                </div>
            </Section>
        </PageTemplate>
    );
}