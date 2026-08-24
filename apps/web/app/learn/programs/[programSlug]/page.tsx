import Link from "next/link";
import { notFound } from "next/navigation";

import {
    ExplorerGrid,
    LearnLayout,
} from "@/src/components/learn";

import {
    getProgramBySlugAction,
} from "@/src/features/learn/programs";

import {
    getSemestersByProgramAction,
    SemesterCard,
} from "@/src/features/learn/semesters";

type Props = {
    params: Promise<{
        programSlug: string;
    }>;
};

export default async function ProgramDetailsPage({
    params,
}: Props) {
    const { programSlug } = await params;

    const program = await getProgramBySlugAction(programSlug);

    if (!program) {
        notFound();
    }

    const semesters = await getSemestersByProgramAction(
        program.id,
    );

    return (
        <LearnLayout>
            {/* =====================================================
                BACK NAVIGATION
            ===================================================== */}
            <Link
                href="/learn/programs"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
            >
                <span className="transition-transform duration-200 group-hover:-translate-x-1">
                    ←
                </span>

                Back to Programs
            </Link>

            {/* =====================================================
                PROGRAM HERO
            ===================================================== */}
            <section className="relative mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                {/* Decorative background */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />

                <div className="relative px-6 py-9 sm:px-10 sm:py-11 lg:px-12">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Academic Program
                    </div>

                    {/* Title */}
                    <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                        {program.name}
                    </h1>

                    {/* Description */}
                    <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                        {program.description ||
                            "Explore this program and follow its structured learning path on MediVerse."}
                    </p>

                    {/* Quick information */}
                    <div className="mt-7 flex flex-wrap gap-2.5">
                        <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm">
                            🎓 {semesters.length}{" "}
                            {semesters.length === 1
                                ? "Semester"
                                : "Semesters"}
                        </span>

                        <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold capitalize text-slate-600 shadow-sm">
                            📚 Structured learning
                        </span>

                        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-bold capitalize text-emerald-700 shadow-sm">
                            ● {program.status}
                        </span>
                    </div>
                </div>
            </section>

            {/* =====================================================
                PROGRAM OVERVIEW
            ===================================================== */}
            <section className="mt-10">
                <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                        Program overview
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                        Everything starts here.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                        Get familiar with your program before moving into
                        semesters, subjects and focused learning content.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {/* Semesters */}
                    <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-100/50">
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-200/40 blur-2xl" />

                        <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                                📚
                            </div>

                            <p className="mt-5 text-3xl font-black text-slate-950">
                                {semesters.length}
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-500">
                                {semesters.length === 1
                                    ? "Semester available"
                                    : "Semesters available"}
                            </p>
                        </div>
                    </div>

                    {/* Learning path */}
                    <div className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-100/50">
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-200/40 blur-2xl" />

                        <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-lg">
                                🧭
                            </div>

                            <p className="mt-5 text-xl font-black text-slate-950">
                                Structured
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-500">
                                Curriculum-based learning
                            </p>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-100/50">
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-200/40 blur-2xl" />

                        <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
                                ✓
                            </div>

                            <p className="mt-5 text-xl font-black capitalize text-slate-950">
                                {program.status}
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-500">
                                Program status
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                ABOUT
            ===================================================== */}
            <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                        💡
                    </div>

                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                            About the program
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                            What you will find here
                        </h2>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                    <p className="text-sm leading-7 text-slate-600 sm:text-base">
                        {program.description ||
                            "Program information will be added soon."}
                    </p>
                </div>
            </section>

            {/* =====================================================
                CURRICULUM
            ===================================================== */}
            <section className="mt-12">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                            Your curriculum
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                            Follow your program step by step.
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                            Start with a semester and explore the subjects
                            inside it.
                        </p>
                    </div>

                    <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        {semesters.length}{" "}
                        {semesters.length === 1
                            ? "semester"
                            : "semesters"}
                    </div>
                </div>

                <div className="mt-7">
                    {semesters.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                                📚
                            </div>

                            <h3 className="mt-5 text-xl font-black text-slate-950">
                                Curriculum coming soon
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Semesters for this program have not been
                                added yet. Check back soon.
                            </p>
                        </div>
                    ) : (
                        <ExplorerGrid>
                            {semesters.map((semester) => (
                                <SemesterCard
                                    key={semester.id}
                                    semester={semester}
                                />
                            ))}
                        </ExplorerGrid>
                    )}
                </div>
            </section>

            {/* =====================================================
                START LEARNING CTA
            ===================================================== */}
            <section className="mt-12 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-9 text-white shadow-xl sm:px-10 sm:py-10">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
                            Start your journey
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                            Ready to explore {program.name}?
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                            Choose a semester above and continue deeper into
                            your curriculum.
                        </p>
                    </div>

                    <div className="text-5xl">
                        🎓
                    </div>
                </div>
            </section>
        </LearnLayout>
    );
}