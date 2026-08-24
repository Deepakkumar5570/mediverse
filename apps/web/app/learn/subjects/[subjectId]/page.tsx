import Link from "next/link";
import { notFound } from "next/navigation";

import {
    ExplorerGrid,
    LearnLayout,
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

    const details = await getSubjectDetailsAction(
        subjectId,
    );

    if (!details) {
        notFound();
    }

    const units = await getUnitsBySubjectAction(
        subjectId,
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

    const progress = Math.min(
        100,
        Math.max(0, subjectProgress.percentage),
    );

    return (
        <LearnLayout>
            {/* =====================================================
                BREADCRUMB
            ===================================================== */}
            <nav className="flex flex-wrap items-center gap-2 text-sm">
                <Link
                    href="/learn/programs"
                    className="font-medium text-slate-400 transition hover:text-indigo-600"
                >
                    Programs
                </Link>

                <span className="text-slate-300">
                    /
                </span>

                <Link
                    href={`/learn/programs/${program.slug}`}
                    className="font-medium text-slate-400 transition hover:text-indigo-600"
                >
                    {program.name}
                </Link>

                <span className="text-slate-300">
                    /
                </span>

                <Link
                    href={`/learn/semesters/${semester.id}`}
                    className="font-medium text-slate-400 transition hover:text-indigo-600"
                >
                    {semester.name}
                </Link>

                <span className="text-slate-300">
                    /
                </span>

                <span className="font-semibold text-slate-700">
                    {subject.name}
                </span>
            </nav>

            {/* =====================================================
                SUBJECT HERO
            ===================================================== */}
            <section className="relative mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                {/* Decorative background */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />

                <div className="relative px-6 py-9 sm:px-10 sm:py-11 lg:px-12">
                    {/* Context badge */}
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                            {program.name}
                        </span>

                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
                            {semester.name}
                        </span>
                    </div>

                    {/* Subject title */}
                    <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                        {subject.name}
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        Explore the units, topics and learning material
                        inside this subject.
                    </p>

                    {/* Quick information */}
                    <div className="mt-7 flex flex-wrap gap-2.5">
                        <span className="rounded-full border border-violet-100 bg-violet-50 px-3.5 py-2 text-xs font-bold text-violet-700">
                            📘 {subject.code ?? "Subject"}
                        </span>

                        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700">
                            📚 {units.length}{" "}
                            {units.length === 1
                                ? "Unit"
                                : "Units"}
                        </span>

                        <span className="rounded-full border border-amber-100 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-700">
                            🎯 {progress}% complete
                        </span>
                    </div>
                </div>
            </section>

            {/* =====================================================
                SUBJECT OVERVIEW
            ===================================================== */}
            <section className="mt-10">
                <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                        Subject overview
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                        Understand what you&apos;ll learn.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                        Get familiar with the subject before moving
                        into its units and focused topics.
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                            💡
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                                About this subject
                            </p>

                            <h3 className="mt-2 text-xl font-black text-slate-950">
                                {subject.name}
                            </h3>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                        <p className="text-sm leading-7 text-slate-600 sm:text-base">
                            {subject.description ??
                                "No description available for this subject yet."}
                        </p>
                    </div>
                </div>
            </section>

            {/* =====================================================
                PROGRESS
            ===================================================== */}
            <section className="mt-10">
                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                            Your progress
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                            Keep moving forward.
                        </h2>
                    </div>

                    <span className="text-sm font-semibold text-slate-400">
                        {subjectProgress.completed} of{" "}
                        {subjectProgress.total} lessons completed
                    </span>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="p-5 sm:p-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                {/* Progress circle */}
                                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-50">
                                    <div className="absolute inset-1 rounded-full border-4 border-indigo-100" />

                                    <span className="relative text-lg font-black text-indigo-700">
                                        {progress}%
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-slate-950">
                                        Subject completion
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        {progress === 100
                                            ? "You completed this subject."
                                            : progress > 0
                                                ? "Keep learning one lesson at a time."
                                                : "Start your first lesson to begin."}
                                    </p>
                                </div>
                            </div>

                            <div className="min-w-0 flex-1 sm:max-w-md">
                                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 transition-all duration-700"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />
                                </div>

                                <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
                                    <span>Start</span>

                                    <span>
                                        {progress}% complete
                                    </span>

                                    <span>100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                UNITS
            ===================================================== */}
            <section className="mt-12">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                            Curriculum
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                            Explore the units.
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                            Choose a unit to discover its topics and
                            continue deeper into the subject.
                        </p>
                    </div>

                    <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        {units.length}{" "}
                        {units.length === 1
                            ? "unit"
                            : "units"}
                    </div>
                </div>

                <div className="mt-7">
                    {units.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-2xl">
                                📚
                            </div>

                            <h3 className="mt-5 text-xl font-black text-slate-950">
                                Units coming soon
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Units for this subject have not been
                                added yet. Check back soon.
                            </p>
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
                </div>
            </section>

            {/* =====================================================
                NEXT STEP
            ===================================================== */}
            <section className="mt-12 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-9 text-white shadow-xl sm:px-10 sm:py-10">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
                            Continue learning
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                            Ready to explore the next unit?
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                            Pick a unit above and continue into topics,
                            subtopics and lessons.
                        </p>
                    </div>

                    <div className="text-5xl">
                        🚀
                    </div>
                </div>
            </section>
        </LearnLayout>
    );
}