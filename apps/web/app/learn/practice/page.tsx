import Link from "next/link";

import {
  ExplorerGrid,
  LearnLayout,
} from "@/src/components/learn";

import {
  getProgramsAction,
  ProgramCard,
} from "@/src/features/learn/programs";

const practiceModes = [
  {
    title: "Quick Practice",
    description:
      "Know what you want to practice? Search a topic or subtopic and jump straight into 10 MCQs.",
    icon: "⚡",
    badge: "Search & Practice",
    href: "/learn/practice/quick",
    tone: "bg-amber-50 border-amber-100",
    iconTone: "bg-amber-100 text-amber-700",
  },
  {
    title: "Topic Practice",
    description:
      "Follow your curriculum from program to topic and practice questions focused on one area.",
    icon: "🎯",
    badge: "Topic Based",
    href: "/learn/programs?mode=practice",
    tone: "bg-sky-50 border-sky-100",
    iconTone: "bg-sky-100 text-sky-700",
  },
  {
    title: "Random Practice",
    description:
      "Choose a program and semester and get a mixed set of questions from that entire semester.",
    icon: "🔀",
    badge: "Semester Based",
    href: "/learn/practice/random",
    tone: "bg-violet-50 border-violet-100",
    iconTone: "bg-violet-100 text-violet-700",
  },
];

export default async function PracticePage() {
  const programs = await getProgramsAction();

  const activePrograms = programs.filter(
    (program) => program.status === "active",
  );

  return (
    <LearnLayout>
      <main className="space-y-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />

          <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                MediVerse Practice
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                Learn it.
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  Practice it.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Practice medical concepts without getting lost.
                Choose exactly how you want to practice and
                MediVerse will keep the questions inside the
                curriculum you selected.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/learn/practice/quick"
                  className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-600"
                >
                  Quick Practice →
                </Link>

                <Link
                  href="/learn/practice/random"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  Random Practice
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-xl">🧭</div>

                <p className="mt-3 text-sm font-black text-slate-950">
                  Stay in context
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Questions stay connected to your selected
                  program and curriculum.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-xl">🧠</div>

                <p className="mt-3 text-sm font-black text-slate-950">
                  Active Recall
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Test what you know instead of only reading.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-xl">⚡</div>

                <p className="mt-3 text-sm font-black text-slate-950">
                  Simple to start
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Pick a mode, make one choice and start
                  practicing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRACTICE MODES */}
        <section
          id="practice-modes"
          className="scroll-mt-24"
        >
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Practice modes
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Choose how you want to practice.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Every mode has a clear purpose. You will always
              know where your questions are coming from.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {practiceModes.map((mode) => (
              <Link
                key={mode.title}
                href={mode.href}
                className="group block"
              >
                <div
                  className={`h-full rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-md ${mode.tone}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${mode.iconTone}`}
                    >
                      {mode.icon}
                    </div>

                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      {mode.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-black text-slate-950">
                    {mode.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {mode.description}
                  </p>

                  <div className="mt-5 text-sm font-bold text-slate-700 transition group-hover:text-indigo-700">
                    Start practicing →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CURRICULUM */}
        <section id="curriculum">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                Topic practice
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Practice through your curriculum.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Prefer a guided path? Choose a program and
                move through semester, subject, unit and topic
                until you reach the questions you want.
              </p>
            </div>

            {activePrograms.length > 0 && (
              <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                {activePrograms.length}{" "}
                {activePrograms.length === 1
                  ? "program"
                  : "programs"}
              </div>
            )}
          </div>

          {activePrograms.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                🎓
              </div>

              <h2 className="mt-5 text-xl font-black text-slate-950">
                No programs available yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Practice will become available here as
                programs and their curriculum are published.
              </p>

              <Link
                href="/learn/programs"
                className="mt-6 inline-flex rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600"
              >
                Browse Programs
              </Link>
            </div>
          ) : (
            <ExplorerGrid>
              {activePrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  hrefSuffix="?mode=practice"
                />
              ))}
            </ExplorerGrid>
          )}
        </section>

        {/* FLOW */}
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
                The MediVerse approach
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Learn → Practice → Improve
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Practice is connected to the same curriculum
                you use for learning. Later, your performance
                will power revision and personalized
                recommendations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
              <span className="rounded-xl bg-white/10 px-4 py-3">
                📚 Learn
              </span>

              <span className="text-slate-500">→</span>

              <span className="rounded-xl bg-white/10 px-4 py-3">
                🧠 Practice
              </span>

              <span className="text-slate-500">→</span>

              <span className="rounded-xl bg-white/10 px-4 py-3">
                📈 Improve
              </span>
            </div>
          </div>
        </section>
      </main>
    </LearnLayout>
  );
}