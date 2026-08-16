import { notFound } from "next/navigation";

import {
    ExplorerGrid,
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";

import {
    getSubjectDetailsAction,
} from "@/src/features/learn/subjects";

import {
    getUnitsBySubjectAction,
    UnitCard,
} from "@/src/features/learn/units";

import {
    getSingleSubjectProgressAction,
} from "@/src/features/progress";

type Props = {
    params: Promise<{
        subjectId: string;
    }>;
};

export default async function SubjectDetailsPage({
    params,
}: Props) {
    const { subjectId } = await params;

    const details =
        await getSubjectDetailsAction(
            subjectId
        );

    if (!details) {
        notFound();
    }

    const units =
        await getUnitsBySubjectAction(
            subjectId
        );

    const subjectProgress =
        await getSingleSubjectProgressAction(
            subjectId,
        );

    const {
        subject,
        semester,
        program,
    } = details;

    return (
        <PageTemplate
            title={subject.name}
            description={`${program.name} • ${subject.code}`}
            sidebarTitle="Subject"
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
                    label: "Units",
                    href: "#units",
                },
            ]}
        >
            {/* Subject Stats */}
            <section className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Units"
                    value={units.length}
                />

                <StatCard
                    label="Subject Code"
                    value={subject.code}
                />

                <StatCard
                    label="Progress"
                    value={`${subjectProgress.percentage}%`}
                />
            </section>

            {/* Overview */}
            <Section
                title="Overview"
                id="overview"
            >
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        {subject.description ??
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
                                    Subject completion
                                </p>

                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl font-semibold tracking-tight text-slate-900">
                                        {subjectProgress.percentage}
                                    </span>

                                    <span className="text-lg font-medium text-slate-400">
                                        %
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                                {subjectProgress.completed} of{" "}
                                {subjectProgress.total} lessons completed
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
                                        width: `${subjectProgress.percentage}%`,
                                    }}
                                />
                            </div>

                            <div className="mt-2 flex justify-between text-xs text-slate-400">
                                <span>Start</span>

                                <span>
                                    {subjectProgress.percentage}% complete
                                </span>

                                <span>100%</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Insight */}
                    <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4">
                        <p className="text-sm text-slate-600">
                            {subjectProgress.percentage === 100
                                ? "Amazing. You've completed this entire subject."
                                : subjectProgress.percentage >= 75
                                    ? "You're almost done with this subject. Keep going."
                                    : subjectProgress.percentage >= 50
                                        ? "You're more than halfway through. Keep the momentum going."
                                        : subjectProgress.percentage > 0
                                            ? "Good progress. Keep learning one lesson at a time."
                                            : "Your subject journey starts here. Complete your first lesson."}
                        </p>
                    </div>
                </div>
            </Section>

            {/* Units */}
            <Section
                title="Units"
                id="units"
            >
                {units.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                        No units available.
                    </div>
                ) : (
                    <ExplorerGrid>
                        {units.map((unit) => (
                            <UnitCard
                                key={unit.id}
                                unit={unit}
                            />
                        ))}
                    </ExplorerGrid>
                )}
            </Section>
        </PageTemplate>
    );
}