"use server";

import Link from "next/link";

import { getProgramsService } from "@/src/features/program/services/program.service";

const explorerCards = [
  ["📚", "Browse Programs", "Choose your medical program and follow its structured curriculum.", "/learn/programs", "sky"],
  ["🔎", "Search Anything", "Find subjects, units, topics, lessons and educational content quickly.", "/learn/search", "amber"],
  ["👥", "Join Community", "Discover discussions and connect with other learners.", "/learn/community", "rose"],
  ["📈", "Track Progress", "Keep your learning journey organized and see how far you've come.", "/learn/progress", "emerald"],
] as const;

const featureCards = [
  ["📁", "Structured curriculum", "Move from program to semester, subject, unit, topic and lesson without getting lost."],
  ["⚡", "Find things faster", "Search directly for the educational material you need instead of jumping between resources."],
  ["📖", "Student-friendly content", "Focused medical learning content designed around how students actually study."],
  ["🎯", "Learn at your pace", "Build your own learning journey and continue from where you left off."],
] as const;

const tones = [
  ["border-sky-100 bg-sky-50/70", "bg-sky-100", "text-sky-600"],
  ["border-emerald-100 bg-emerald-50/70", "bg-emerald-100", "text-emerald-600"],
  ["border-amber-100 bg-amber-50/70", "bg-amber-100", "text-amber-600"],
  ["border-rose-100 bg-rose-50/70", "bg-rose-100", "text-rose-600"],
  ["border-violet-100 bg-violet-50/70", "bg-violet-100", "text-violet-600"],
  ["border-teal-100 bg-teal-50/70", "bg-teal-100", "text-teal-600"],
] as const;

function iconForProgram(name: string) {
  const value = name.toLowerCase();
  if (value.includes("pharma")) return "💊";
  if (value.includes("nursing")) return "🩺";
  if (value.includes("ayur")) return "🌿";
  if (value.includes("medical")) return "⚕️";
  return "🎓";
}

export default async function LearnPage() {
  const programs = (await getProgramsService()).filter(
    (program) => program.status === "active",
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-16 lg:pt-24">
          <div className="flex flex-col justify-center">
            <div className="w-fit rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-semibold text-violet-600 shadow-sm">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Your medical learning space
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[4.35rem] lg:leading-[0.98]">
              Learn medicine.
              <br />
              <span className="text-violet-600">Understand better.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              One structured, searchable space that organizes medical education
              from program to lesson — built for how students actually study.
            </p>

            <form action="/learn/search" method="get" className="mt-8 flex max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <input
                name="q"
                placeholder="Search anatomy, pharmacology, topics..."
                className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-slate-400"
              />
              <button type="submit" className="bg-violet-600 px-6 text-sm font-semibold text-white hover:bg-violet-700">
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/learn/programs" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-600">
                Explore programs
              </Link>
              <Link href="/learn/community" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-violet-200 hover:text-violet-600">
                Join community
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
              <span>✓ Structured curriculum</span>
              <span>✓ Searchable content</span>
              <span>✓ Built for learners</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-[3rem] bg-violet-100/60 blur-3xl" />
            <div className="relative w-full max-w-[430px] rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">MediVerse</p>
                  <p className="mt-1 text-sm font-bold">Your learning path</p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">📚</span>
              </div>

              <div className="mt-4 space-y-2">
                {[
                  ["STEP 1", "Choose your program", "Start your medical learning journey", "🎓", "border-violet-100 bg-violet-50/70"],
                  ["STEP 2", "Explore semesters", "", "📁", "border-slate-100 bg-slate-50"],
                  ["STEP 3", "Discover subjects", "", "📖", "border-slate-100 bg-slate-50"],
                ].map(([step, title, description, icon, tone], index) => (
                  <div key={step}>
                    <div className={`rounded-2xl border p-3.5 ${tone}`}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">{icon}</span>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-violet-600">{step}</p>
                          <p className="mt-0.5 text-sm font-bold">{title}</p>
                          {description ? <p className="mt-0.5 text-[11px] text-slate-500">{description}</p> : null}
                        </div>
                      </div>
                    </div>
                    {index < 2 ? <div className="ml-5 h-2 border-l border-slate-200" /> : null}
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-3">
                    <p className="text-[9px] font-bold uppercase text-violet-600">STEP 4</p>
                    <p className="mt-1 text-xs font-bold">Units</p>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
                    <p className="text-[9px] font-bold uppercase text-emerald-600">STEP 5</p>
                    <p className="mt-1 text-xs font-bold">Topics & Lessons</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-950 px-4 py-3 text-white">
                <p className="text-[10px] text-slate-400">Learning made simple</p>
                <div className="mt-0.5 flex items-center justify-between">
                  <p className="text-sm font-bold">Explore → Learn → Grow</p>
                  <span>✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [String(programs.length || 6), "Programs", "🎓"],
            ["120+", "Subjects covered", "📖"],
            ["1,800+", "Lessons", "✓"],
            ["Free", "To get started", "▱"],
          ].map(([value, label, icon]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-lg text-violet-600">{icon}</div>
              <p className="mt-5 text-2xl font-black">{value}</p>
              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Explore MediVerse</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Start with your program.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">Choose your academic program and explore its complete learning structure.</p>
            </div>
            <Link href="/learn/programs" className="text-sm font-bold text-violet-600">View all programs →</Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 6).map((program, index) => {
              const [cardTone, iconTone, textTone] = tones[index % tones.length];
              return (
                <Link key={program.id} href={`/learn/programs/${program.slug}`} className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${cardTone}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconTone}`}>{iconForProgram(program.name)}</div>
                    <span className={`rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${textTone}`}>Program</span>
                  </div>
                  <p className={`mt-5 text-[10px] font-bold uppercase tracking-[0.18em] ${textTone}`}>{program.code}</p>
                  <h3 className="mt-1 text-xl font-black tracking-tight">{program.name}</h3>
                  <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">{program.description ?? "Explore the structured curriculum for this program."}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-xs text-slate-500">{program.duration} {program.duration === 1 ? "year" : "years"}</span>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold ${textTone} transition group-hover:translate-x-1`}>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Keep exploring</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Everything you need, in one place.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">Whether you want to follow your curriculum, find something specific or connect with learners, start from here.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {explorerCards.map(([icon, title, description, href, color]) => (
              <Link key={title} href={href} className={`group rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md border-${color}-100 bg-${color}-50/70`}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-${color}-100`}>{icon}</div>
                <h3 className="mt-5 text-base font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                <span className={`mt-5 inline-flex text-sm font-bold text-${color}-600 transition group-hover:translate-x-1`}>Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Structured learning</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Everything connected.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">MediVerse organizes your education into a clear hierarchy so you always know where you are and what comes next.</p>
            <Link href="/learn/programs" className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-violet-600">Browse Programs →</Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-7">
            <div className="space-y-2">
              {[
                ["LEVEL 1", "Program", "🎓", "border-violet-100 bg-violet-50/70"],
                ["LEVEL 2", "Semester", "📁", "border-slate-200 bg-white"],
                ["LEVEL 3", "Subject", "📖", "border-slate-200 bg-white"],
              ].map(([level, title, icon, tone], index) => (
                <div key={level}>
                  <div className={`flex items-center gap-4 rounded-2xl border p-4 ${tone}`}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">{icon}</span>
                    <div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">{level}</p><p className="text-sm font-bold">{title}</p></div>
                  </div>
                  {index < 2 ? <div className="ml-5 h-2 border-l border-slate-200" /> : null}
                </div>
              ))}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4"><p className="text-[9px] font-bold uppercase text-violet-600">LEVEL 4</p><p className="mt-1 text-sm font-bold">Unit</p></div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4"><p className="text-[9px] font-bold uppercase text-amber-600">LEVEL 5</p><p className="mt-1 text-sm font-bold">Topic</p></div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4"><p className="text-[9px] font-bold uppercase text-emerald-600">LEVEL 6</p><p className="mt-1 text-sm font-bold">Lesson</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Why MediVerse</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Built around how students actually learn.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">A simpler way to discover, organize and learn medical education without jumping between disconnected resources.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map(([icon, title, description]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xl">{icon}</div>
                <h3 className="mt-4 text-base font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl sm:flex-row sm:items-center sm:px-10">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-violet-200">Welcome back 👋</span>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">Continue your learning journey.</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Pick up where you left off and keep building your medical knowledge.</p>
            </div>
            <Link href="/learn" className="inline-flex shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 hover:bg-violet-50">Continue Learning →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}