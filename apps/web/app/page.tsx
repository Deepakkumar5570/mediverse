import Link from "next/link";
import { auth } from "@clerk/nextjs/server";


/* =========================================================
   EXPLORE CARDS
   ========================================================= */

const exploreCards = [
  {
    icon: "🎓",
    title: "Programs",
    description:
      "Choose your medical or healthcare program and explore its complete curriculum.",
    href: "/learn/programs",
    accent: "from-indigo-500/10 to-indigo-500/5",
    iconBg: "bg-indigo-100 text-indigo-700",
    action: "Browse Programs →",
  },
  {
    icon: "🔎",
    title: "Search",
    description:
      "Already know what you want to learn? Search subjects, topics, lessons and more.",
    href: "/learn/search",
    accent: "from-amber-500/10 to-amber-500/5",
    iconBg: "bg-amber-100 text-amber-700",
    action: "Search MediVerse →",
  },
];

/* =========================================================
   FEATURES
   ========================================================= */

const features = [
  {
    icon: "🗂️",
    title: "Structured learning",
    description:
      "Move naturally from your program to semesters, subjects, units, topics and lessons.",
  },
  {
    icon: "⚡",
    title: "Find things faster",
    description:
      "Search for the exact educational material you need without getting lost.",
  },
  {
    icon: "📘",
    title: "Student-friendly content",
    description:
      "Learn through focused educational material designed for medical students.",
  },
  {
    icon: "🎯",
    title: "Learn at your pace",
    description:
      "Continue your learning journey and build your progress over time.",
  },
];

/* =========================================================
   HOME PAGE
   ========================================================= */

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate overflow-hidden">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">

          {/* =================================================
              HERO LEFT
          ================================================= */}

          <div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              Your medical learning space

            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl">

              Learn medicine.

              <br />

              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                Understand better.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">

              MediVerse brings your medical learning material into one
              structured, searchable and student-friendly space.
              Choose your program, explore your curriculum and learn
              at your own pace.

            </p>

            {/* =================================================
                SEARCH
            ================================================= */}

            <form
              action="/learn/search"
              method="get"
              className="mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/40 sm:flex-row"
            >

              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">

                <span className="text-lg text-slate-400">
                  🔎
                </span>

                <input
                  type="text"
                  name="q"
                  placeholder="Search anatomy, pharmacology, topics..."
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />

              </div>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                Search
              </button>

            </form>

            {/* Quick links */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">

              <span className="font-medium">
                Start with:
              </span>

              <Link
                href="/learn/programs"
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                Programs
              </Link>

              <Link
                href="/learn/search"
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                Search
              </Link>

            </div>

          </div>

          {/* =================================================
              HERO RIGHT — LEARNING PATH VISUAL
          ================================================= */}

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">

            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-indigo-200/40 via-violet-100/30 to-emerald-100/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-indigo-100/60 sm:p-6">

              {/* Card header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    MediVerse
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    Your learning path
                  </p>

                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                  📚
                </div>

              </div>

              {/* Learning path */}
              <div className="mt-5 space-y-2">

                {/* PROGRAM */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                      🎓
                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                        Start here
                      </p>

                      <p className="mt-0.5 text-sm font-black text-slate-900">
                        Choose your program
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        B.Pharm • B.Sc Nursing • ANM • GNM
                      </p>

                    </div>

                  </div>

                </div>

                {/* Connector */}
                <div className="ml-5 h-3 border-l-2 border-indigo-100" />

                {/* SEMESTER */}
                <div className="ml-4 rounded-xl border border-slate-100 bg-slate-50 p-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                      🗂️
                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Step 2
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-slate-800">
                        Choose semester
                      </p>

                    </div>

                  </div>

                </div>

                {/* Connector */}
                <div className="ml-9 h-3 border-l-2 border-slate-200" />

                {/* SUBJECT */}
                <div className="ml-4 rounded-xl border border-slate-100 bg-slate-50 p-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                      📖
                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Step 3
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-slate-800">
                        Explore subjects
                      </p>

                    </div>

                  </div>

                </div>

                {/* Connector */}
                <div className="ml-9 h-3 border-l-2 border-slate-200" />

                {/* UNIT + TOPIC */}
                <div className="ml-4 grid grid-cols-2 gap-2">

                  <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                      Unit
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800">
                      Unit 1
                    </p>

                  </div>

                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Topic
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800">
                      Anatomy
                    </p>

                  </div>

                </div>

              </div>

              {/* Bottom status */}
              <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3 text-white">

                <div>

                  <p className="text-xs font-medium text-slate-400">
                    Learning made simple
                  </p>

                  <p className="mt-0.5 text-sm font-bold">
                    Explore → Learn → Grow
                  </p>

                </div>

                <span className="text-lg">
                  ✨
                </span>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          EXPLORE MEDIVERSE
      ===================================================== */}

      <section className="border-y border-slate-200/70 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="mb-7">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Explore MediVerse
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              How do you want to learn?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Start from your academic program or search directly for
              something you already have in mind.
            </p>

          </div>

          {/* Two primary paths */}
          <div className="grid gap-5 md:grid-cols-2">

            {exploreCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`group rounded-3xl border border-slate-200 bg-gradient-to-br ${card.accent} p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 sm:p-7`}
              >

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${card.iconBg}`}
                >
                  {card.icon}
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {card.title}
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  {card.description}
                </p>

                <span className="mt-5 inline-flex text-sm font-bold text-indigo-600 transition group-hover:translate-x-1">
                  {card.action}
                </span>

              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          CURRICULUM
      ===================================================== */}

      <section className="bg-slate-50">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                Curriculum
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Everything connected.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                MediVerse organizes your education into a simple path,
                so you always know where you are and what comes next.
              </p>

            </div>

            <Link
              href="/learn/programs"
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              View all programs →
            </Link>

          </div>

          {/* Curriculum visualization */}
          <div className="mt-8">

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-100/60 blur-3xl" />

              <div className="relative">

                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">

                  {/* LEFT */}
                  <div className="max-w-xl">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                      🎓
                    </div>

                    <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
                      Start with your program.
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                      Select your academic program and MediVerse takes
                      you through the curriculum step by step. You don&apos;t
                      need to figure out where every subject or topic
                      belongs.
                    </p>

                    <Link
                      href="/learn/programs"
                      className="mt-6 inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
                    >
                      Browse Programs →
                    </Link>

                  </div>

                  {/* RIGHT */}
                  <div className="w-full">

                    <div className="space-y-2">

                      {/* STEP 1 */}
                      <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3">

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                          🎓
                        </span>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                            Step 1
                          </p>

                          <p className="text-sm font-bold text-slate-900">
                            Choose your Program
                          </p>

                        </div>

                      </div>

                      {/* Connector */}
                      <div className="ml-5 h-3 border-l-2 border-slate-200" />

                      {/* STEP 2 */}
                      <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                          🗂️
                        </span>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Step 2
                          </p>

                          <p className="text-sm font-bold text-slate-900">
                            Explore Semesters
                          </p>

                        </div>

                      </div>

                      {/* Connector */}
                      <div className="ml-5 h-3 border-l-2 border-slate-200" />

                      {/* STEP 3 */}
                      <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                          📖
                        </span>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Step 3
                          </p>

                          <p className="text-sm font-bold text-slate-900">
                            Discover Subjects
                          </p>

                        </div>

                      </div>

                      {/* Connector */}
                      <div className="ml-5 h-3 border-l-2 border-slate-200" />

                      {/* STEP 4 */}
                      <div className="flex items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-3">

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100">
                          🧱
                        </span>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                            Step 4
                          </p>

                          <p className="text-sm font-bold text-slate-900">
                            Explore Units
                          </p>

                        </div>

                      </div>

                      {/* Connector */}
                      <div className="ml-5 h-3 border-l-2 border-slate-200" />

                      {/* STEP 5 */}
                      <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                          🧩
                        </span>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                            Step 5
                          </p>

                          <p className="text-sm font-bold text-slate-900">
                            Learn Topics & Lessons
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          PERSONAL LEARNING CTA
      ===================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          {userId ? (

            /* ================= LOGGED IN ================= */

            <div className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">

              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

                <div>

                  <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-indigo-200">
                    Welcome back 👋
                  </div>

                  <h2 className="text-2xl font-black sm:text-3xl">
                    Ready to continue learning?
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                    Continue exploring MediVerse and pick up your
                    learning journey where you left off.
                  </p>

                </div>

                <Link
                  href="/learn"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-indigo-50"
                >
                  Continue Learning →
                </Link>

              </div>

            </div>

          ) : (

            /* ================= LOGGED OUT ================= */

            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-6 py-10 text-white shadow-xl sm:px-10">

              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                    Personal learning
                  </p>

                  <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                    Want MediVerse to remember your learning journey?
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
                    Create an account when you are ready to track
                    progress, continue learning and use personalized
                    learning features.
                  </p>

                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                  <Link
                    href="/sign-up"
                    className="rounded-xl bg-white px-6 py-3 text-center text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
                  >
                    Create Free Account
                  </Link>

                  <Link
                    href="/sign-in"
                    className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white/20"
                  >
                    Sign In
                  </Link>

                </div>

              </div>

            </div>

          )}

        </div>
      </section>

      {/* =====================================================
          WHY MEDIVERSE
      ===================================================== */}

      <section className="border-t border-slate-200 bg-slate-50">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Why MediVerse
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Built around how students actually learn.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              A simpler way to discover, organize and learn medical
              education without jumping between disconnected resources.
            </p>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="text-2xl">
                  {feature.icon}
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

    </main>
  );
}