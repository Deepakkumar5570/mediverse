import Link from "next/link";

import { LearnLayout } from "@/src/components/learn";

import {
  getPracticeProgramsAction,
} from "@/src/features/learn/practice/practice.actions";

import {
  PracticeWorkspace,
} from "@/src/features/learn/practice/practice-workspace";

export default async function RandomPracticePage() {
  const programs =
    await getPracticeProgramsAction();

  return (
    <LearnLayout>
      <main className="space-y-8">
        <div>
          <Link
            href="/learn/practice"
            className="text-sm font-bold text-slate-500 transition hover:text-indigo-600"
          >
            ← Back to Practice
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6 shadow-sm sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-xl">
              🔀
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Random Practice
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Choose your program and semester. MediVerse
              will mix questions across the entire selected
              semester.
            </p>
          </div>
        </section>

        {programs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <div className="text-3xl">🎓</div>

            <h2 className="mt-4 text-xl font-black text-slate-950">
              No active programs available
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Random practice will appear once curriculum
              programs are published.
            </p>
          </div>
        ) : (
          <PracticeWorkspace
            mode="random"
            programs={programs}
          />
        )}
      </main>
    </LearnLayout>
  );
}