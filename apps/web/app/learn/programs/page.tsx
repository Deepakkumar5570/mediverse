import { LearnLayout, ExplorerGrid } from "@/src/components/learn";

import {
    getProgramsAction,
    ProgramCard,
} from "@/src/features/learn/programs";

export default async function ProgramsPage() {
    const programs = await getProgramsAction();

    return (
        <LearnLayout>
            {/* =====================================================
                HERO
            ===================================================== */}
            <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                {/* Decorative background */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />

                <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
                    <div className="max-w-3xl">
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            MediVerse Learning Paths
                        </div>

                        {/* Heading */}
                        <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                            Choose your
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                                learning path.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Explore academic programs, follow your curriculum,
                            discover subjects and learn step by step with
                            MediVerse.
                        </p>
                    </div>

                    {/* Bottom stats */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                            <span className="text-lg">🎓</span>

                            <div>
                                <p className="text-sm font-black text-slate-950">
                                    {programs.length}
                                </p>

                                <p className="text-[11px] font-medium text-slate-500">
                                    Programs available
                                </p>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                            <span className="text-lg">📚</span>

                            <div>
                                <p className="text-sm font-black text-slate-950">
                                    Structured
                                </p>

                                <p className="text-[11px] font-medium text-slate-500">
                                    Curriculum-based learning
                                </p>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                            <span className="text-lg">⚡</span>

                            <div>
                                <p className="text-sm font-black text-slate-950">
                                    Student-first
                                </p>

                                <p className="text-[11px] font-medium text-slate-500">
                                    Simple and focused
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                PROGRAMS
            ===================================================== */}
            <section className="mt-12">
                <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                            Explore programs
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                            Find where you want to begin.
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            Select a program to explore its semesters,
                            subjects and learning content.
                        </p>
                    </div>

                    {programs.length > 0 && (
                        <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                            {programs.length}{" "}
                            {programs.length === 1 ? "program" : "programs"}
                        </div>
                    )}
                </div>

                {programs.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                            🎓
                        </div>

                        <h2 className="mt-5 text-xl font-black text-slate-950">
                            No programs available yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            Programs will appear here once they are created
                            in the MediVerse Admin CMS.
                        </p>
                    </div>
                ) : (
                    <ExplorerGrid>
                        {programs.map((program) => (
                            <ProgramCard
                                key={program.id}
                                program={program}
                            />
                        ))}
                    </ExplorerGrid>
                )}
            </section>

            {/* =====================================================
                BOTTOM CTA
            ===================================================== */}
            <section className="mt-14 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
                            Your journey starts here
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                            Explore. Learn. Grow.
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                            Choose a program and move through your curriculum
                            one step at a time.
                        </p>
                    </div>

                    <div className="hidden shrink-0 text-5xl sm:block">
                        🧠
                    </div>
                </div>
            </section>
        </LearnLayout>
    );
}