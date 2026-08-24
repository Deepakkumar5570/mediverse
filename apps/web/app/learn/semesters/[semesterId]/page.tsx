import Link from "next/link";
import { notFound } from "next/navigation";

import {
    ExplorerGrid,
    LearnLayout,
} from "@/src/components/learn";

import {
    getSemesterDetailsAction,
} from "@/src/features/learn/semesters";

import {
    getSubjectsBySemesterAction,
    SubjectCard,
} from "@/src/features/learn/subjects";

type Props = {
    params: Promise<{
        semesterId: string;
    }>;
};

export default async function SemesterDetailsPage({
    params,
}: Props) {
    const { semesterId } = await params;

    const details = await getSemesterDetailsAction(
        semesterId,
    );

    if (!details) {
        notFound();
    }

    const subjects = await getSubjectsBySemesterAction(
        semesterId,
    );

    const {
        semester,
        program,
    } = details;

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

                <span className="font-semibold text-slate-700">
                    {semester.name}
                </span>
            </nav>

            {/* =====================================================
                HERO
            ===================================================== */}
            <section className="relative mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

                <div className="relative px-6 py-9 sm:px-10 sm:py-11 lg:px-12">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                        {program.name}
                    </div>

                    {/* Title */}
                    <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                        {semester.name}
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        Semester {semester.number} of{" "}
                        {program.name}. Explore the subjects
                        included in this part of your curriculum.
                    </p>

                    {/* Quick info */}
                    <div className="mt-7 flex flex-wrap gap-2.5">
                        <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm">
                            📚 {subjects.length}{" "}
                            {subjects.length === 1
                                ? "Subject"
                                : "Subjects"}
                        </span>

                        <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-700 shadow-sm">
                            🎓 Semester {semester.number}
                        </span>

                        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-bold capitalize text-emerald-700 shadow-sm">
                            ● {semester.status}
                        </span>
                    </div>
                </div>
            </section>

            {/* =====================================================
                SEMESTER OVERVIEW
            ===================================================== */}
            <section className="mt-10">
                <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                        Semester overview
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                        Your semester at a glance.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                        Explore the subjects that make up this semester
                        and continue deeper into your curriculum.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {/* Subjects */}
                    <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-100/50">
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-200/40 blur-2xl" />

                        <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                                📚
                            </div>

                            <p className="mt-5 text-3xl font-black text-slate-950">
                                {subjects.length}
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-500">
                                {subjects.length === 1
                                    ? "Subject in this semester"
                                    : "Subjects in this semester"}
                            </p>
                        </div>
                    </div>

                    {/* Semester number */}
                    <div className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-100/50">
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-200/40 blur-2xl" />

                        <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-lg">
                                🧭
                            </div>

                            <p className="mt-5 text-3xl font-black text-slate-950">
                                {semester.number}
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-500">
                                Semester number
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
                                {semester.status}
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-500">
                                Semester status
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
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-xl">
                        🗂️
                    </div>

                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                            About this semester
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                            What you will study
                        </h2>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                    <p className="text-sm leading-7 text-slate-600 sm:text-base">
                        Semester {semester.number} of{" "}
                        {program.name} contains the subjects that
                        form this stage of your academic curriculum.
                        Select a subject below to explore its units,
                        topics and learning material.
                    </p>
                </div>
            </section>

            {/* =====================================================
                SUBJECTS
            ===================================================== */}
            <section className="mt-12">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                            Subjects
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                            Explore your subjects.
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                            Choose a subject to move deeper into units,
                            topics and learning content.
                        </p>
                    </div>

                    <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        {subjects.length}{" "}
                        {subjects.length === 1
                            ? "subject"
                            : "subjects"}
                    </div>
                </div>

                <div className="mt-7">
                    {subjects.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                                📚
                            </div>

                            <h3 className="mt-5 text-xl font-black text-slate-950">
                                Subjects coming soon
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Subjects for this semester have not
                                been added yet. Check back soon.
                            </p>
                        </div>
                    ) : (
                        <ExplorerGrid>
                            {subjects.map((subject) => (
                                <SubjectCard
                                    key={subject.id}
                                    subject={subject}
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
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                            Keep going
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                            Explore a subject and start learning.
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                            Choose any subject above to discover its
                            units, topics and learning material.
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