import { notFound } from "next/navigation";

import {
    ExplorerGrid,
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";

import {
    getUnitDetailsAction,
} from "@/src/features/learn/units";

import {
    getTopicsByUnitAction,
    TopicCard,
} from "@/src/features/learn/topics";

import {
    getSingleUnitProgressAction,
} from "@/src/features/progress";

type Props = {
    params: Promise<{
        unitId: string;
    }>;
};

export default async function UnitDetailsPage({
    params,
}: Props) {
    const { unitId } = await params;

    const details = await getUnitDetailsAction(unitId);

    if (!details) {
        notFound();
    }

    const topics = await getTopicsByUnitAction(unitId);

    const unitProgress =
        await getSingleUnitProgressAction(
            unitId,
        );

    const {
        unit,
        subject,
        semester,
        program,
    } = details;

    return (
        <PageTemplate
            title={unit.title}
            description={`${subject.name} • Unit ${unit.unitNumber}`}
            sidebarTitle="Unit"
            breadcrumbs={[
                {
                    label: "Programs",
                    href: "/learn/programs",
                },
                {
                    label: program.name,
                    href: `/learn/programs/${program.slug}`,
                },
                {
                    label: semester.name,
                    href: `/learn/semesters/${semester.id}`,
                },
                {
                    label: subject.name,
                    href: `/learn/subjects/${subject.id}`,
                },
                {
                    label: unit.title,
                },
            ]}
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
                    label: "Topics",
                    href: "#topics",
                },
            ]}
        >
            {/* Unit Stats */}
            <section className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Topics"
                    value={topics.length}
                />

                <StatCard
                    label="Unit Number"
                    value={unit.unitNumber}
                />

                <StatCard
                    label="Progress"
                    value={`${unitProgress.percentage}%`}
                />
            </section>

            {/* Overview */}
            <Section
                title="Overview"
                id="overview"
            >
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        {unit.description ??
                            "No description available."}
                    </p>
                </div>
            </Section>

            {/* Progress */}
            <Section
                title="Your Progress"
                id="progress"
            >
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Unit completion
                                </p>

                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl font-semibold tracking-tight text-slate-900">
                                        {unitProgress.percentage}
                                    </span>

                                    <span className="text-lg font-medium text-slate-400">
                                        %
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                                {unitProgress.completed} of{" "}
                                {unitProgress.total} lessons completed
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
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
                                        width: `${unitProgress.percentage}%`,
                                    }}
                                />
                            </div>

                            <div className="mt-2 flex justify-between text-xs text-slate-400">
                                <span>Start</span>

                                <span>
                                    {unitProgress.percentage}% complete
                                </span>

                                <span>100%</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Insight */}
                    <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4">
                        <p className="text-sm text-slate-600">
                            {unitProgress.percentage === 100
                                ? "Amazing. You've completed this entire unit."
                                : unitProgress.percentage >= 75
                                    ? "You're almost done with this unit. Keep going."
                                    : unitProgress.percentage >= 50
                                        ? "You're more than halfway through. Keep the momentum going."
                                        : unitProgress.percentage > 0
                                            ? "Good progress. Keep learning one lesson at a time."
                                            : "Your unit journey starts here. Complete your first lesson."}
                        </p>
                    </div>
                </div>
            </Section>

            {/* Topics */}
            <Section
                title="Topics"
                id="topics"
            >
                {topics.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                        No topics available.
                    </div>
                ) : (
                    <ExplorerGrid>
                        {topics.map((topic) => (
                            <TopicCard
                                key={topic.id}
                                topic={topic}
                            />
                        ))}
                    </ExplorerGrid>
                )}
            </Section>
        </PageTemplate>
    );
}