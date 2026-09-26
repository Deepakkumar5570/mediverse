// import Link from "next/link";
// import { auth } from "@clerk/nextjs/server";


// /* =========================================================
//    EXPLORE CARDS
//    ========================================================= */

// const exploreCards = [
//   {
//     icon: "🎓",
//     title: "Programs",
//     description:
//       "Choose your medical or healthcare program and explore its complete curriculum.",
//     href: "/learn/programs",
//     accent: "from-indigo-500/10 to-indigo-500/5",
//     iconBg: "bg-indigo-100 text-indigo-700",
//     action: "Browse Programs →",
//   },
//   {
//     icon: "🔎",
//     title: "Search",
//     description:
//       "Already know what you want to learn? Search subjects, topics, lessons and more.",
//     href: "/learn/search",
//     accent: "from-amber-500/10 to-amber-500/5",
//     iconBg: "bg-amber-100 text-amber-700",
//     action: "Search MediVerse →",
//   },
// ];

// /* =========================================================
//    FEATURES
//    ========================================================= */

// const features = [
//   {
//     icon: "🗂️",
//     title: "Structured learning",
//     description:
//       "Move naturally from your program to semesters, subjects, units, topics and lessons.",
//   },
//   {
//     icon: "⚡",
//     title: "Find things faster",
//     description:
//       "Search for the exact educational material you need without getting lost.",
//   },
//   {
//     icon: "📘",
//     title: "Student-friendly content",
//     description:
//       "Learn through focused educational material designed for medical students.",
//   },
//   {
//     icon: "🎯",
//     title: "Learn at your pace",
//     description:
//       "Continue your learning journey and build your progress over time.",
//   },
// ];

// /* =========================================================
//    HOME PAGE
//    ========================================================= */

// export default async function HomePage() {
//   const { userId } = await auth();

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950">

//       {/* =====================================================
//           HERO
//       ===================================================== */}

//       <section className="relative isolate overflow-hidden">

//         {/* Background decoration */}
//         <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

//         <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />

//         <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">

//           {/* =================================================
//               HERO LEFT
//           ================================================= */}

//           <div>

//             {/* Badge */}
//             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">

//               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

//               Your medical learning space

//             </div>

//             {/* Heading */}
//             <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl">

//               Learn medicine.

//               <br />

//               <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
//                 Understand better.
//               </span>

//             </h1>

//             {/* Description */}
//             <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">

//               MediVerse brings your medical learning material into one
//               structured, searchable and student-friendly space.
//               Choose your program, explore your curriculum and learn
//               at your own pace.

//             </p>

//             {/* =================================================
//                 SEARCH
//             ================================================= */}

//             <form
//               action="/learn/search"
//               method="get"
//               className="mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/40 sm:flex-row"
//             >

//               <div className="flex min-w-0 flex-1 items-center gap-3 px-3">

//                 <span className="text-lg text-slate-400">
//                   🔎
//                 </span>

//                 <input
//                   type="text"
//                   name="q"
//                   placeholder="Search anatomy, pharmacology, topics..."
//                   className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
//                 />

//               </div>

//               <button
//                 type="submit"
//                 className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
//               >
//                 Search
//               </button>

//             </form>

//             {/* Quick links */}
//             <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">

//               <span className="font-medium">
//                 Start with:
//               </span>

//               <Link
//                 href="/learn/programs"
//                 className="rounded-full border border-slate-200 bg-white px-3 py-1.5 transition hover:border-indigo-200 hover:text-indigo-600"
//               >
//                 Programs
//               </Link>

//               <Link
//                 href="/learn/search"
//                 className="rounded-full border border-slate-200 bg-white px-3 py-1.5 transition hover:border-indigo-200 hover:text-indigo-600"
//               >
//                 Search
//               </Link>

//             </div>

//           </div>

//           {/* =================================================
//               HERO RIGHT — LEARNING PATH VISUAL
//           ================================================= */}

//           <div className="relative mx-auto w-full max-w-md lg:max-w-none">

//             <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-indigo-200/40 via-violet-100/30 to-emerald-100/30 blur-2xl" />

//             <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-indigo-100/60 sm:p-6">

//               {/* Card header */}
//               <div className="flex items-center justify-between border-b border-slate-100 pb-4">

//                 <div>

//                   <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
//                     MediVerse
//                   </p>

//                   <p className="mt-1 text-sm font-bold text-slate-900">
//                     Your learning path
//                   </p>

//                 </div>

//                 <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
//                   📚
//                 </div>

//               </div>

//               {/* Learning path */}
//               <div className="mt-5 space-y-2">

//                 {/* PROGRAM */}
//                 <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">

//                   <div className="flex items-center gap-3">

//                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
//                       🎓
//                     </div>

//                     <div>

//                       <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
//                         Start here
//                       </p>

//                       <p className="mt-0.5 text-sm font-black text-slate-900">
//                         Choose your program
//                       </p>

//                       <p className="mt-0.5 text-xs text-slate-500">
//                         B.Pharm • B.Sc Nursing • ANM • GNM
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//                 {/* Connector */}
//                 <div className="ml-5 h-3 border-l-2 border-indigo-100" />

//                 {/* SEMESTER */}
//                 <div className="ml-4 rounded-xl border border-slate-100 bg-slate-50 p-3">

//                   <div className="flex items-center gap-3">

//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
//                       🗂️
//                     </div>

//                     <div>

//                       <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                         Step 2
//                       </p>

//                       <p className="mt-0.5 text-sm font-bold text-slate-800">
//                         Choose semester
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//                 {/* Connector */}
//                 <div className="ml-9 h-3 border-l-2 border-slate-200" />

//                 {/* SUBJECT */}
//                 <div className="ml-4 rounded-xl border border-slate-100 bg-slate-50 p-3">

//                   <div className="flex items-center gap-3">

//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
//                       📖
//                     </div>

//                     <div>

//                       <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                         Step 3
//                       </p>

//                       <p className="mt-0.5 text-sm font-bold text-slate-800">
//                         Explore subjects
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//                 {/* Connector */}
//                 <div className="ml-9 h-3 border-l-2 border-slate-200" />

//                 {/* UNIT + TOPIC */}
//                 <div className="ml-4 grid grid-cols-2 gap-2">

//                   <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3">

//                     <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
//                       Unit
//                     </p>

//                     <p className="mt-1 text-xs font-bold text-slate-800">
//                       Unit 1
//                     </p>

//                   </div>

//                   <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">

//                     <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
//                       Topic
//                     </p>

//                     <p className="mt-1 text-xs font-bold text-slate-800">
//                       Anatomy
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               {/* Bottom status */}
//               <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3 text-white">

//                 <div>

//                   <p className="text-xs font-medium text-slate-400">
//                     Learning made simple
//                   </p>

//                   <p className="mt-0.5 text-sm font-bold">
//                     Explore → Learn → Grow
//                   </p>

//                 </div>

//                 <span className="text-lg">
//                   ✨
//                 </span>

//               </div>

//             </div>
//           </div>

//         </div>
//       </section>

//       {/* =====================================================
//           EXPLORE MEDIVERSE
//       ===================================================== */}

//       <section className="border-y border-slate-200/70 bg-white">

//         <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

//           <div className="mb-7">

//             <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
//               Explore MediVerse
//             </p>

//             <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
//               How do you want to learn?
//             </h2>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
//               Start from your academic program or search directly for
//               something you already have in mind.
//             </p>

//           </div>

//           {/* Two primary paths */}
//           <div className="grid gap-5 md:grid-cols-2">

//             {exploreCards.map((card) => (
//               <Link
//                 key={card.title}
//                 href={card.href}
//                 className={`group rounded-3xl border border-slate-200 bg-gradient-to-br ${card.accent} p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 sm:p-7`}
//               >

//                 <div
//                   className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${card.iconBg}`}
//                 >
//                   {card.icon}
//                 </div>

//                 <h3 className="mt-5 text-xl font-black text-slate-950">
//                   {card.title}
//                 </h3>

//                 <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
//                   {card.description}
//                 </p>

//                 <span className="mt-5 inline-flex text-sm font-bold text-indigo-600 transition group-hover:translate-x-1">
//                   {card.action}
//                 </span>

//               </Link>
//             ))}

//           </div>

//         </div>
//       </section>

//       {/* =====================================================
//           CURRICULUM
//       ===================================================== */}

//       <section className="bg-slate-50">

//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

//           {/* Heading */}
//           <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

//             <div>

//               <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
//                 Curriculum
//               </p>

//               <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
//                 Everything connected.
//               </h2>

//               <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
//                 MediVerse organizes your education into a simple path,
//                 so you always know where you are and what comes next.
//               </p>

//             </div>

//             <Link
//               href="/learn/programs"
//               className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
//             >
//               View all programs →
//             </Link>

//           </div>

//           {/* Curriculum visualization */}
//           <div className="mt-8">

//             <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

//               <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-100/60 blur-3xl" />

//               <div className="relative">

//                 <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">

//                   {/* LEFT */}
//                   <div className="max-w-xl">

//                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
//                       🎓
//                     </div>

//                     <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
//                       Start with your program.
//                     </h3>

//                     <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
//                       Select your academic program and MediVerse takes
//                       you through the curriculum step by step. You don&apos;t
//                       need to figure out where every subject or topic
//                       belongs.
//                     </p>

//                     <Link
//                       href="/learn/programs"
//                       className="mt-6 inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
//                     >
//                       Browse Programs →
//                     </Link>

//                   </div>

//                   {/* RIGHT */}
//                   <div className="w-full">

//                     <div className="space-y-2">

//                       {/* STEP 1 */}
//                       <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3">

//                         <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
//                           🎓
//                         </span>

//                         <div>

//                           <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
//                             Step 1
//                           </p>

//                           <p className="text-sm font-bold text-slate-900">
//                             Choose your Program
//                           </p>

//                         </div>

//                       </div>

//                       {/* Connector */}
//                       <div className="ml-5 h-3 border-l-2 border-slate-200" />

//                       {/* STEP 2 */}
//                       <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">

//                         <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
//                           🗂️
//                         </span>

//                         <div>

//                           <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                             Step 2
//                           </p>

//                           <p className="text-sm font-bold text-slate-900">
//                             Explore Semesters
//                           </p>

//                         </div>

//                       </div>

//                       {/* Connector */}
//                       <div className="ml-5 h-3 border-l-2 border-slate-200" />

//                       {/* STEP 3 */}
//                       <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">

//                         <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
//                           📖
//                         </span>

//                         <div>

//                           <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                             Step 3
//                           </p>

//                           <p className="text-sm font-bold text-slate-900">
//                             Discover Subjects
//                           </p>

//                         </div>

//                       </div>

//                       {/* Connector */}
//                       <div className="ml-5 h-3 border-l-2 border-slate-200" />

//                       {/* STEP 4 */}
//                       <div className="flex items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-3">

//                         <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100">
//                           🧱
//                         </span>

//                         <div>

//                           <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
//                             Step 4
//                           </p>

//                           <p className="text-sm font-bold text-slate-900">
//                             Explore Units
//                           </p>

//                         </div>

//                       </div>

//                       {/* Connector */}
//                       <div className="ml-5 h-3 border-l-2 border-slate-200" />

//                       {/* STEP 5 */}
//                       <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">

//                         <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
//                           🧩
//                         </span>

//                         <div>

//                           <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
//                             Step 5
//                           </p>

//                           <p className="text-sm font-bold text-slate-900">
//                             Learn Topics & Lessons
//                           </p>

//                         </div>

//                       </div>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>
//       </section>

//       {/* =====================================================
//           PERSONAL LEARNING CTA
//       ===================================================== */}

//       <section className="bg-white">

//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

//           {userId ? (

//             /* ================= LOGGED IN ================= */

//             <div className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">

//               <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

//                 <div>

//                   <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-indigo-200">
//                     Welcome back 👋
//                   </div>

//                   <h2 className="text-2xl font-black sm:text-3xl">
//                     Ready to continue learning?
//                   </h2>

//                   <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
//                     Continue exploring MediVerse and pick up your
//                     learning journey where you left off.
//                   </p>

//                 </div>

//                 <Link
//                   href="/learn"
//                   className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-indigo-50"
//                 >
//                   Continue Learning →
//                 </Link>

//               </div>

//             </div>

//           ) : (

//             /* ================= LOGGED OUT ================= */

//             <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-6 py-10 text-white shadow-xl sm:px-10">

//               <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

//                 <div>

//                   <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
//                     Personal learning
//                   </p>

//                   <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
//                     Want MediVerse to remember your learning journey?
//                   </h2>

//                   <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
//                     Create an account when you are ready to track
//                     progress, continue learning and use personalized
//                     learning features.
//                   </p>

//                 </div>

//                 <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

//                   <Link
//                     href="/sign-up"
//                     className="rounded-xl bg-white px-6 py-3 text-center text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
//                   >
//                     Create Free Account
//                   </Link>

//                   <Link
//                     href="/sign-in"
//                     className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white/20"
//                   >
//                     Sign In
//                   </Link>

//                 </div>

//               </div>

//             </div>

//           )}

//         </div>
//       </section>

//       {/* =====================================================
//           WHY MEDIVERSE
//       ===================================================== */}

//       <section className="border-t border-slate-200 bg-slate-50">

//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

//           <div className="max-w-2xl">

//             <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
//               Why MediVerse
//             </p>

//             <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
//               Built around how students actually learn.
//             </h2>

//             <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
//               A simpler way to discover, organize and learn medical
//               education without jumping between disconnected resources.
//             </p>

//           </div>

//           <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

//             {features.map((feature) => (

//               <div
//                 key={feature.title}
//                 className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//               >

//                 <div className="text-2xl">
//                   {feature.icon}
//                 </div>

//                 <h3 className="mt-4 text-base font-bold text-slate-950">
//                   {feature.title}
//                 </h3>

//                 <p className="mt-2 text-sm leading-6 text-slate-500">
//                   {feature.description}
//                 </p>

//               </div>

//             ))}

//           </div>

//         </div>
//       </section>

//     </main>
//   );
// }



















import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

import { getProgramsService } from "@/src/features/program/services/program.service";

const learningSteps = [
  { label: "Program", detail: "Choose your program", tone: "indigo" },
  { label: "Semester", detail: "Pick your semester", tone: "blue" },
  { label: "Subject", detail: "Explore subjects", tone: "green" },
  { label: "Unit", detail: "Browse units", tone: "amber" },
  { label: "Topic", detail: "Dive into topics", tone: "rose" },
  { label: "Lesson", detail: "Start learning", tone: "violet" },
] as const;

const programStyles = [
  {
    card: "border-indigo-100 bg-indigo-50/70 hover:border-indigo-200",
    code: "text-indigo-600",
    icon: "bg-indigo-100 text-indigo-700",
  },
  {
    card: "border-emerald-100 bg-emerald-50/70 hover:border-emerald-200",
    code: "text-emerald-600",
    icon: "bg-emerald-100 text-emerald-700",
  },
  {
    card: "border-amber-100 bg-amber-50/70 hover:border-amber-200",
    code: "text-amber-600",
    icon: "bg-amber-100 text-amber-700",
  },
  {
    card: "border-rose-100 bg-rose-50/70 hover:border-rose-200",
    code: "text-rose-600",
    icon: "bg-rose-100 text-rose-700",
  },
  {
    card: "border-violet-100 bg-violet-50/70 hover:border-violet-200",
    code: "text-violet-600",
    icon: "bg-violet-100 text-violet-700",
  },
  {
    card: "border-teal-100 bg-teal-50/70 hover:border-teal-200",
    code: "text-teal-600",
    icon: "bg-teal-100 text-teal-700",
  },
];

function StepIcon({ tone }: { tone: (typeof learningSteps)[number]["tone"] }) {
  const iconClass =
    tone === "indigo"
      ? "bg-indigo-100 text-indigo-600"
      : tone === "blue"
        ? "bg-blue-100 text-blue-600"
        : tone === "green"
          ? "bg-emerald-100 text-emerald-600"
          : tone === "amber"
            ? "bg-amber-100 text-amber-600"
            : tone === "rose"
              ? "bg-rose-100 text-rose-600"
              : "bg-violet-100 text-violet-600";

  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClass}`}
      aria-hidden="true"
    >
      {tone === "indigo" && "▣"}
      {tone === "blue" && "▤"}
      {tone === "green" && "▱"}
      {tone === "amber" && "▦"}
      {tone === "rose" && "◎"}
      {tone === "violet" && "▷"}
    </span>
  );
}

function JourneyPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      {/* The entire illustration is one responsive SVG.
          This keeps the desktop/tablet/mobile composition identical. */}
      <svg
        viewBox="0 0 900 620"
        className="block h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="MediVerse learning journey from program to lesson"
      >
        <defs>
          <filter
            id="hero-shadow"
            x="-30%"
            y="-30%"
            width="160%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="18"
              floodColor="#0f172a"
              floodOpacity="0.07"
            />
          </filter>

          <filter
            id="hero-soft-shadow"
            x="-30%"
            y="-30%"
            width="160%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="12"
              floodColor="#0f172a"
              floodOpacity="0.06"
            />
          </filter>

          <linearGradient
            id="hero-glow"
            x1="160"
            y1="120"
            x2="700"
            y2="540"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EEF0FF" />
            <stop offset="1" stopColor="#F8F9FF" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="dashboard-top"
            x1="140"
            y1="150"
            x2="650"
            y2="150"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F8F9FF" />
            <stop offset="1" stopColor="#EEF1FF" />
          </linearGradient>

          <marker
            id="journey-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path
              d="M1 1L9 5L1 9"
              stroke="#8B87F8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* Background glow */}
        <circle cx="390" cy="315" r="235" fill="url(#hero-glow)" />
        <circle cx="185" cy="255" r="105" fill="#F1F0FF" opacity="0.65" />
        <circle cx="720" cy="175" r="75" fill="#F8F8FF" />

        {/* =========================
            PRODUCT / DASHBOARD
           ========================= */}
        <g filter="url(#hero-shadow)">
          <rect
            x="82"
            y="168"
            width="505"
            height="326"
            rx="18"
            fill="white"
            stroke="#E2E8F0"
          />

          <rect
            x="82"
            y="168"
            width="505"
            height="45"
            rx="18"
            fill="url(#dashboard-top)"
          />
          <path d="M82 213H587" stroke="#E8ECF4" />

          {/* browser dots */}
          <circle cx="104" cy="190" r="5" fill="#DDE3EE" />
          <circle cx="121" cy="190" r="5" fill="#DDE3EE" />
          <circle cx="138" cy="190" r="5" fill="#DDE3EE" />
          <rect x="159" y="183" width="92" height="14" rx="7" fill="#F1F4F8" />

          {/* sidebar */}
          <rect x="82" y="213" width="116" height="281" fill="#F8FAFC" />
          <path d="M198 213V494" stroke="#E7EBF2" />

          <rect x="99" y="231" width="23" height="23" rx="6" fill="#5B4BEE" />
          <text
            x="110.5"
            y="247"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="white"
          >
            M
          </text>

          <text
            x="132"
            y="247"
            fontSize="10"
            fontWeight="700"
            fill="#172033"
          >
            MediVerse
          </text>

          <g fontSize="8.5" fill="#94A3B8">
            <text x="100" y="291">Human Anatomy</text>
            <text x="100" y="326">Unit 1</text>
            <text x="100" y="359">Introduction</text>
            <text x="100" y="392">Cell &amp; Tissue</text>
            <text x="100" y="425">Integumentary</text>
            <text x="100" y="458" fill="#5B4BEE" fontWeight="700">
              Muscular System
            </text>
            <text x="100" y="483">Unit 2</text>
          </g>

          <rect
            x="94"
            y="440"
            width="92"
            height="27"
            rx="7"
            fill="#EEF0FF"
          />

          {/* main content */}
          <text
            x="222"
            y="255"
            fontSize="10"
            fontWeight="600"
            fill="#5B4BEE"
          >
            Human Anatomy
          </text>

          <text
            x="222"
            y="283"
            fontSize="19"
            fontWeight="800"
            fill="#0F172A"
          >
            Muscular System
          </text>

          {/* anatomy panel */}
          <rect
            x="222"
            y="306"
            width="188"
            height="151"
            rx="12"
            fill="#F8FAFC"
            stroke="#EEF2F7"
          />
          <rect
            x="240"
            y="321"
            width="76"
            height="7"
            rx="3.5"
            fill="#DCE3ED"
          />
          <rect
            x="240"
            y="337"
            width="112"
            height="7"
            rx="3.5"
            fill="#E7ECF2"
          />

          {/* simple anatomy illustration */}
          <rect
            x="258"
            y="360"
            width="112"
            height="80"
            rx="10"
            fill="white"
            stroke="#DDE4FF"
          />
          <circle cx="314" cy="382" r="14" fill="#FBCFD8" />
          <path
            d="M296 407C298 393 330 393 332 407L326 425H302L296 407Z"
            fill="#FBCFD8"
          />
          <path
            d="M301 404L286 424M327 404L342 424M307 423L303 440M321 423L325 440"
            stroke="#FBCFD8"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* content lines */}
          <rect x="430" y="321" width="72" height="7" rx="3.5" fill="#DCE3ED" />
          <rect x="430" y="338" width="95" height="7" rx="3.5" fill="#E7ECF2" />
          <rect x="430" y="355" width="82" height="7" rx="3.5" fill="#E7ECF2" />
          <rect x="430" y="372" width="98" height="7" rx="3.5" fill="#E7ECF2" />

          <rect
            x="430"
            y="398"
            width="132"
            height="59"
            rx="10"
            fill="#FAFAFF"
            stroke="#EEF0FF"
          />
          <rect x="444" y="414" width="70" height="7" rx="3.5" fill="#DCE3ED" />
          <rect x="444" y="431" width="96" height="7" rx="3.5" fill="#E7ECF2" />
        </g>

        {/* =========================
            JOURNEY CARDS
           ========================= */}

        {/* Program */}
        <g filter="url(#hero-soft-shadow)">
          <rect
            x="65"
            y="37"
            width="215"
            height="78"
            rx="20"
            fill="white"
            stroke="#E2E8F0"
          />
        </g>
        <circle cx="101" cy="76" r="24" fill="#EEE9FF" />
        <path
          d="M88 72L101 65L114 72L101 79L88 72Z"
          fill="#6947E8"
        />
        <path
          d="M93 76V83C97 87 105 87 109 83V76"
          stroke="#6947E8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="136" y="68" fontSize="15" fontWeight="800" fill="#0F172A">
          Program
        </text>
        <text x="136" y="89" fontSize="11" fill="#94A3B8">
          Choose your program
        </text>

        {/* Semester */}
        <g filter="url(#hero-soft-shadow)">
          <rect
            x="346"
            y="62"
            width="215"
            height="78"
            rx="20"
            fill="white"
            stroke="#E2E8F0"
          />
        </g>
        <circle cx="382" cy="101" r="24" fill="#E8F2FF" />
        <rect
          x="373"
          y="88"
          width="18"
          height="24"
          rx="2"
          stroke="#2D80E8"
          strokeWidth="2.5"
        />
        <path d="M377 95H387M377 100H387M377 105H385" stroke="#2D80E8" strokeWidth="2" />
        <text x="417" y="93" fontSize="15" fontWeight="800" fill="#0F172A">
          Semester
        </text>
        <text x="417" y="114" fontSize="11" fill="#94A3B8">
          Pick your semester
        </text>

        {/* Subject */}
        <g filter="url(#hero-soft-shadow)">
          <rect
            x="620"
            y="157"
            width="215"
            height="78"
            rx="20"
            fill="white"
            stroke="#E2E8F0"
          />
        </g>
        <circle cx="656" cy="196" r="24" fill="#E1FAED" />
        <path
          d="M646 184H656C661 184 664 187 664 192V208H655C650 208 646 205 646 200V184Z"
          stroke="#21A865"
          strokeWidth="2.5"
        />
        <path
          d="M664 184H654C650 184 647 187 647 192"
          stroke="#21A865"
          strokeWidth="2.5"
        />
        <text x="691" y="188" fontSize="15" fontWeight="800" fill="#0F172A">
          Subject
        </text>
        <text x="691" y="209" fontSize="11" fill="#94A3B8">
          Explore subjects
        </text>

        {/* Unit */}
        <g filter="url(#hero-soft-shadow)">
          <rect
            x="650"
            y="276"
            width="215"
            height="78"
            rx="20"
            fill="white"
            stroke="#E2E8F0"
          />
        </g>
        <circle cx="686" cy="315" r="24" fill="#FFF5D8" />
        <path
          d="M673 307L686 300L699 307L686 314L673 307Z"
          stroke="#D89A00"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M673 314L686 321L699 314M673 321L686 328L699 321"
          stroke="#D89A00"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="721" y="307" fontSize="15" fontWeight="800" fill="#0F172A">
          Unit
        </text>
        <text x="721" y="328" fontSize="11" fill="#94A3B8">
          Browse units
        </text>

        {/* Topic */}
        <g filter="url(#hero-soft-shadow)">
          <rect
            x="620"
            y="395"
            width="215"
            height="78"
            rx="20"
            fill="white"
            stroke="#E2E8F0"
          />
        </g>
        <circle cx="656" cy="434" r="24" fill="#FFE7EC" />
        <circle cx="656" cy="434" r="8" stroke="#EF5572" strokeWidth="2.5" />
        <circle cx="656" cy="434" r="14" stroke="#EF5572" strokeWidth="2" />
        <circle cx="656" cy="434" r="3" fill="#EF5572" />
        <text x="691" y="426" fontSize="15" fontWeight="800" fill="#0F172A">
          Topic
        </text>
        <text x="691" y="447" fontSize="11" fill="#94A3B8">
          Dive into topics
        </text>

        {/* Lesson */}
        <g filter="url(#hero-soft-shadow)">
          <rect
            x="505"
            y="516"
            width="215"
            height="78"
            rx="20"
            fill="white"
            stroke="#E2E8F0"
          />
        </g>
        <circle cx="541" cy="555" r="24" fill="#EEE9FF" />
        <circle cx="541" cy="555" r="11" fill="#6947E8" />
        <path d="M538 548L548 555L538 562V548Z" fill="white" />
        <text x="576" y="547" fontSize="15" fontWeight="800" fill="#0F172A">
          Lesson
        </text>
        <text x="576" y="568" fontSize="11" fill="#94A3B8">
          Start learning
        </text>

        {/* =========================
            CONNECTORS
           ========================= */}
        <path
          d="M280 77 C307 77 324 82 346 98"
          stroke="#8B87F8"
          strokeWidth="2"
          strokeDasharray="6 7"
          markerEnd="url(#journey-arrow)"
        />

        <path
          d="M561 102 C593 111 605 129 620 157"
          stroke="#8B87F8"
          strokeWidth="2"
          strokeDasharray="6 7"
          markerEnd="url(#journey-arrow)"
        />

        {/* Subject → Unit: leave Subject from its bottom-center
            and enter Unit at its top-center. */}
        <path
          d="M727 235 C755 248 758 260 758 276"
          stroke="#8B87F8"
          strokeWidth="2"
          strokeDasharray="6 7"
          strokeLinecap="round"
          markerEnd="url(#journey-arrow)"
        />

        <path
          d="M758 354 C758 369 746 382 728 395"
          stroke="#8B87F8"
          strokeWidth="2"
          strokeDasharray="6 7"
          markerEnd="url(#journey-arrow)"
        />

        <path
          d="M675 473 C660 493 642 506 620 516"
          stroke="#8B87F8"
          strokeWidth="2"
          strokeDasharray="6 7"
          markerEnd="url(#journey-arrow)"
        />
      </svg>
    </div>
  );
}

export default async function HomePage() {
  const { userId } = await auth();

  let activePrograms: Awaited<
    ReturnType<typeof getProgramsService>
  > = [];

  try {
    const programs = await Promise.race([
      getProgramsService(),
      new Promise<Awaited<ReturnType<typeof getProgramsService>>>(
        (_, reject) =>
          setTimeout(
            () => reject(new Error("Database request timed out")),
            5000,
          ),
      ),
    ]);

    activePrograms = programs
      .filter((program) => program.status === "active")
      .slice(0, 6);
  } catch (error) {
    console.error("Homepage programs loading failed:", error);
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_65%_42%,rgba(99,102,241,0.08),transparent_32%),radial-gradient(circle_at_22%_35%,rgba(129,140,248,0.06),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pb-10 lg:pt-20">
          <div className="grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-3">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 sm:text-sm">
                Your medical learning space
              </p>

              <h1 className="mt-5 max-w-2xl text-[3.25rem] font-black leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-[4.4rem]">
                Learn medicine.
                <br />
                <span className="bg-gradient-to-r from-indigo-500 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  Understand better.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
                One structured, searchable space that organizes medical
                education from program to lesson — built for how students
                actually study.
              </p>

              <form
                action="/learn/search"
                method="get"
                className="mt-8 flex max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] focus-within:border-indigo-300"
              >
                <div className="flex min-w-0 flex-1 items-center px-4">
                  <span className="mr-3 text-xl text-slate-400" aria-hidden="true">
                    ⌕
                  </span>
                  <input
                    type="text"
                    name="q"
                    placeholder="Search anatomy, pharmacology, nursing, pathology..."
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-slate-400 sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 px-6 text-sm font-bold text-white transition hover:bg-indigo-700 sm:px-8"
                >
                  Search
                </button>
              </form>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/learn/programs"
                  className="group inline-flex items-center gap-3 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
                >
                  Explore programs
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>

                {userId ? (
                  <Link
                    href="/learn"
                    className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Continue learning
                  </Link>
                ) : (
                  <SignUpButton mode="modal">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Create free account
                    </button>
                  </SignUpButton>
                )}
              </div>

              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-xs font-medium text-slate-500 sm:text-sm">
                <span className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span>
                  Free to start
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span>
                  No card required
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span>
                  Structured content
                </span>
              </div>
            </div>

            <JourneyPreview />
          </div>

        </div>
      </section>

      {/* PROGRAMS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 sm:text-sm">
                Start learning
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Choose your program.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Pick your academic program and explore its curriculum from
                semester to lesson.
              </p>
            </div>

            <Link
              href="/learn/programs"
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              View all →
            </Link>
          </div>

          {activePrograms.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activePrograms.map((program, index) => {
                const style = programStyles[index % programStyles.length];

                return (
                  <Link
                    key={program.id}
                    href={`/learn/programs/${program.slug}`}
                    className={`group rounded-2xl border p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${style.card}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${style.icon}`}
                      >
                        ▣
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.16em] ${style.code}`}
                      >
                        {program.code}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-black tracking-tight">
                      {program.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">
                      {program.description ??
                        "Explore the structured curriculum and learning content for this program."}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                      <span className="text-xs text-slate-500">
                        {program.duration}{" "}
                        {program.duration === 1 ? "year" : "years"}
                      </span>

                      <span className="text-sm font-bold transition group-hover:translate-x-1">
                        Explore →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 border-y border-dashed border-slate-300 py-12 text-center">
              <p className="text-lg font-bold">Programs are coming soon</p>
              <p className="mt-2 text-sm text-slate-500">
                We are preparing structured medical learning programs for
                MediVerse.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-7 border-y border-slate-200 py-10 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                Start learning
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                Your medical learning journey starts here.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Explore programs, discover structured content and build your
                learning journey with MediVerse.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              {userId ? (
                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
                >
                  Continue learning →
                </Link>
              ) : (
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
                  >
                    Create free account
                  </button>
                </SignUpButton>
              )}

              <Link
                href="/learn/programs"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:border-slate-300"
              >
                Explore programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
