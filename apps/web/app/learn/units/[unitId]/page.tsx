import { notFound } from "next/navigation";

import {
    Breadcrumb,
    LearnLayout,
    ExplorerGrid,
    Section,
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
        await getSingleUnitProgressAction(unitId);

    const {
        unit,
        subject,
        semester,
        program,
    } = details;

    const progressMessage =
        unitProgress.percentage === 100
            ? "You've completed this entire unit."
            : unitProgress.percentage >= 75
                ? "You're almost done. Keep going."
                : unitProgress.percentage >= 50
                    ? "You're more than halfway through. Keep the momentum going."
                    : unitProgress.percentage > 0
                        ? "Good progress. Keep learning one topic at a time."
                        : "Start your journey by exploring the first topic.";

    return (
        <LearnLayout>
            {/* =====================================================
                BREADCRUMBS
            ===================================================== */}
            <Breadcrumb
                items={[
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
            />

            {/* =====================================================
                HERO
            ===================================================== */}
            <section className="relative mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-indigo-50/70 to-violet-100/70 px-6 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />

                <div className="pointer-events-none absolute bottom-[-100px] left-1/2 h-64 w-64 rounded-full bg-violet-300/15 blur-3xl" />

                <div className="relative">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {program.name}
                        </span>

                        <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600">
                            {semester.name}
                        </span>

                        <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                            Unit {unit.unitNumber}
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                        {unit.title}
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                        Explore the topics inside this unit and build
                        your understanding step by step.
                    </p>

                    {/* Hero meta */}
                    <div className="mt-7 flex flex-wrap gap-2">
                        <span className="rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700">
                            🧠 {subject.name}
                        </span>

                        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            📚 {topics.length}{" "}
                            {topics.length === 1
                                ? "Topic"
                                : "Topics"}
                        </span>

                        <span className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                            🎯 {unitProgress.percentage}% complete
                        </span>
                    </div>
                </div>
            </section>

            {/* =====================================================
                UNIT OVERVIEW
            ===================================================== */}
            <section className="mt-10">
                <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                        Unit Overview
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                        Understand what you'll learn.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Get familiar with this unit before moving into
                        its topics and focused learning material.
                    </p>
                </div>

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="p-6 sm:p-8">
                        <div className="flex gap-4">
                            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl ring-1 ring-indigo-100 sm:flex">
                                🧠
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                                    About this unit
                                </p>

                                <h3 className="mt-1 text-lg font-black text-slate-950">
                                    {unit.title}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                            <p className="text-sm leading-7 text-slate-600 sm:text-base">
                                {unit.description ??
                                    "No description available."}
                            </p>
                        </div>
                    </div>
                </section>
            </section>

            {/* =====================================================
                PROGRESS
            ===================================================== */}
            <section className="mt-10">
                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                            Your Progress
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                            Keep moving forward.
                        </h2>
                    </div>

                    <p className="text-xs font-semibold text-slate-400">
                        {unitProgress.completed} of{" "}
                        {unitProgress.total} lessons completed
                    </p>
                </div>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        {/* Percentage */}
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-50 ring-8 ring-indigo-50/50">
                                <span className="text-lg font-black text-indigo-700">
                                    {unitProgress.percentage}%
                                </span>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Unit completion
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    {progressMessage}
                                </p>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="w-full md:max-w-xl">
                            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 transition-all duration-700"
                                    style={{
                                        width: `${unitProgress.percentage}%`,
                                    }}
                                />
                            </div>

                            <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
                                <span>Start</span>

                                <span>
                                    {unitProgress.percentage}% complete
                                </span>

                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            {/* =====================================================
                TOPICS
            ===================================================== */}
            <section className="mt-10" id="topics">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                            Curriculum
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                            Explore the topics.
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            Choose a topic to continue deeper into this
                            unit.
                        </p>
                    </div>

                    <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
                        {topics.length}{" "}
                        {topics.length === 1
                            ? "topic"
                            : "topics"}
                    </span>
                </div>

                <div className="mt-6">
                    {topics.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                                📚
                            </div>

                            <h3 className="mt-4 text-lg font-black text-slate-950">
                                No topics available yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Topics for this unit will appear here
                                once they are added.
                            </p>
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
                </div>
            </section>

            {/* =====================================================
                BOTTOM CTA
            ===================================================== */}
            {topics.length > 0 && (
                <section className="mt-10 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-9">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
                                Continue learning
                            </p>

                            <h2 className="mt-2 text-2xl font-black tracking-tight">
                                Ready to explore the topics?
                            </h2>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                                Pick a topic above and continue your
                                learning journey.
                            </p>
                        </div>

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                            🚀
                        </div>
                    </div>
                </section>
            )}
        </LearnLayout>
    );
}