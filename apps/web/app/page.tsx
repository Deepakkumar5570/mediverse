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
import {
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

import { getProgramsService } from "@/src/features/program/services/program.service";

const quickPaths = [
  {
    icon: "📚",
    title: "Browse Programs",
    description:
      "Choose your medical program and follow its structured curriculum.",
    href: "/learn/programs",
    label: "Explore programs",
    card:
      "border-sky-100 bg-sky-50/70 hover:border-sky-200",
    iconBg: "bg-sky-100/80",
    labelColor: "text-sky-600",
  },
  {
    icon: "🔎",
    title: "Search Anything",
    description:
      "Find subjects, units, topics, lessons and educational content quickly.",
    href: "/learn/search",
    label: "Search MediVerse",
    card:
      "border-amber-100 bg-amber-50/70 hover:border-amber-200",
    iconBg: "bg-amber-100/80",
    labelColor: "text-amber-600",
  },
  {
    icon: "👥",
    title: "Join Community",
    description:
      "Discover discussions and connect with other learners.",
    href: "/learn/community",
    label: "Explore community",
    card:
      "border-rose-100 bg-rose-50/70 hover:border-rose-200",
    iconBg: "bg-rose-100/80",
    labelColor: "text-rose-600",
  },
  {
    icon: "📈",
    title: "Track Progress",
    description:
      "Keep your learning journey organized and see how far you've come.",
    href: "/learn/progress",
    label: "View progress",
    card:
      "border-emerald-100 bg-emerald-50/70 hover:border-emerald-200",
    iconBg: "bg-emerald-100/80",
    labelColor: "text-emerald-600",
  },
];

const features = [
  {
    icon: "🗂️",
    title: "Structured curriculum",
    description:
      "Move from program to semester, subject, unit, topic and lesson without getting lost.",
  },
  {
    icon: "⚡",
    title: "Find things faster",
    description:
      "Search directly for the educational material you need instead of jumping between resources.",
  },
  {
    icon: "📖",
    title: "Student-friendly content",
    description:
      "Focused medical learning content designed around how students actually study.",
  },
  {
    icon: "🎯",
    title: "Learn at your pace",
    description:
      "Build your own learning journey and continue from where you left off.",
  },
];

const programStyles = [
  {
    card:
      "border-sky-100 bg-sky-50/80 hover:border-sky-200",
    icon:
      "bg-sky-100/80",
    badge:
      "border-sky-100 bg-sky-50 text-sky-600",
    code:
      "text-sky-600",
    arrow:
      "bg-sky-500 hover:bg-sky-600",
  },
  {
    card:
      "border-emerald-100 bg-emerald-50/80 hover:border-emerald-200",
    icon:
      "bg-emerald-100/80",
    badge:
      "border-emerald-100 bg-emerald-50 text-emerald-600",
    code:
      "text-emerald-600",
    arrow:
      "bg-emerald-500 hover:bg-emerald-600",
  },
  {
    card:
      "border-amber-100 bg-amber-50/80 hover:border-amber-200",
    icon:
      "bg-amber-100/80",
    badge:
      "border-amber-100 bg-amber-50 text-amber-600",
    code:
      "text-amber-600",
    arrow:
      "bg-amber-500 hover:bg-amber-600",
  },
  {
    card:
      "border-rose-100 bg-rose-50/80 hover:border-rose-200",
    icon:
      "bg-rose-100/80",
    badge:
      "border-rose-100 bg-rose-50 text-rose-600",
    code:
      "text-rose-600",
    arrow:
      "bg-rose-500 hover:bg-rose-600",
  },
  {
    card:
      "border-indigo-100 bg-indigo-50/80 hover:border-indigo-200",
    icon:
      "bg-indigo-100/80",
    badge:
      "border-indigo-100 bg-indigo-50 text-indigo-600",
    code:
      "text-indigo-600",
    arrow:
      "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    card:
      "border-teal-100 bg-teal-50/80 hover:border-teal-200",
    icon:
      "bg-teal-100/80",
    badge:
      "border-teal-100 bg-teal-50 text-teal-600",
    code:
      "text-teal-600",
    arrow:
      "bg-teal-600 hover:bg-teal-700",
  },
];

export default async function HomePage() {
  const { userId } = await auth();

  const programs = await getProgramsService();

  const activePrograms = programs
    .filter((program) => program.status === "active")
    .slice(0, 6);

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50 to-indigo-50/40">

        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">

          {/* LEFT */}
          <div className="relative">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Your medical learning space
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
              Learn medicine.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                Understand better.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              MediVerse brings medical education into one structured,
              searchable and student-friendly learning space.
            </p>

            {/* SEARCH */}
            <form
              action="/learn/search"
              method="get"
              className="mt-7 flex max-w-2xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-indigo-100/30 sm:flex-row"
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

            {/* ACTIONS */}
            <div className="mt-5 flex flex-wrap gap-3">

              <Link
                href="/learn/programs"
                className="inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-600"
              >
                Explore Programs →
              </Link>

              <Link
                href="/learn/community"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                Community
              </Link>

            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
              <span>✓ Structured curriculum</span>
              <span>✓ Searchable content</span>
              <span>✓ Built for learners</span>
            </div>
          </div>

          {/* RIGHT — LEARNING PATH */}
          <div className="relative mx-auto w-full max-w-md">

            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-indigo-200/50 via-violet-100/30 to-emerald-100/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-indigo-100/50 sm:p-6">

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600">
                    MediVerse
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-900">
                    Your learning path
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  📚
                </div>
              </div>

              <div className="mt-5 space-y-2">

                {/* STEP 1 */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                      🎓
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                        Step 1
                      </p>

                      <p className="mt-0.5 text-sm font-black text-slate-900">
                        Choose your program
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Start your medical learning journey
                      </p>
                    </div>

                  </div>
                </div>

                <div className="ml-5 h-3 border-l-2 border-indigo-100" />

                {/* STEP 2 */}
                <div className="ml-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                    🗂️
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Step 2
                    </p>

                    <p className="text-sm font-bold text-slate-800">
                      Explore semesters
                    </p>
                  </div>

                </div>

                <div className="ml-9 h-3 border-l-2 border-slate-200" />

                {/* STEP 3 */}
                <div className="ml-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                    📖
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Step 3
                    </p>

                    <p className="text-sm font-bold text-slate-800">
                      Discover subjects
                    </p>
                  </div>

                </div>

                <div className="ml-9 h-3 border-l-2 border-slate-200" />

                {/* STEP 4 + 5 */}
                <div className="ml-4 grid grid-cols-2 gap-2">

                  <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-3">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                      Step 4
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800">
                      Units
                    </p>

                  </div>

                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Step 5
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800">
                      Topics & Lessons
                    </p>

                  </div>

                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3 text-white">

                <div>
                  <p className="text-[10px] font-medium text-slate-400">
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
          PROGRAMS
      ===================================================== */}
      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                Explore MediVerse
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Start with your program.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Choose your academic program and explore its complete
                learning structure.
              </p>

            </div>

            <Link
              href="/learn/programs"
              className="shrink-0 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
            >
              View all programs →
            </Link>

          </div>

          {activePrograms.length > 0 ? (

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {activePrograms.map((program, index) => {

                const style =
                  programStyles[index % programStyles.length];

                return (
                  <Link
                    key={program.id}
                    href={`/learn/programs/${program.slug}`}
                    className={`group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl ${style.card}`}
                  >

                    {/* Decorative circle */}
                    <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/40 transition duration-300 group-hover:scale-110" />

                    <div className="relative">

                      {/* TOP */}
                      <div className="flex items-start justify-between gap-4">

                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl shadow-sm ${style.icon}`}
                        >
                          🎓
                        </div>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${style.badge}`}
                        >
                          Program
                        </span>

                      </div>

                      {/* CODE */}
                      <p
                        className={`mt-5 text-[10px] font-bold uppercase tracking-[0.16em] ${style.code}`}
                      >
                        {program.code}
                      </p>

                      {/* NAME */}
                      <h3 className="mt-1 text-xl font-black tracking-tight text-slate-950">
                        {program.name}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">
                        {program.description ??
                          "Explore the structured curriculum and learning content for this program."}
                      </p>

                      {/* FOOTER */}
                      <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">

                        <span className="text-xs font-medium text-slate-500">
                          {program.duration}{" "}
                          {program.duration === 1
                            ? "year"
                            : "years"}
                        </span>

                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm transition duration-200 group-hover:translate-x-1 ${style.arrow}`}
                        >
                          →
                        </span>

                      </div>

                    </div>
                  </Link>
                );
              })}

            </div>

          ) : (

            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">

              <div className="text-3xl">
                📚
              </div>

              <h3 className="mt-3 text-lg font-bold text-slate-900">
                Programs are coming soon
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                We are preparing structured medical learning programs
                for MediVerse.
              </p>

            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          QUICK LEARNING PATHS
      ===================================================== */}
      <section className="border-y border-slate-200/70 bg-slate-50">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
              Keep exploring
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Everything you need, in one place.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Whether you want to follow your curriculum, find something
              specific or connect with learners, start from here.
            </p>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {quickPaths.map((path) => (

              <Link
                key={path.title}
                href={path.href}
                className={`group rounded-2xl border p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${path.card}`}
              >

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${path.iconBg}`}
                >
                  {path.icon}
                </div>

                <h3 className="mt-5 text-base font-black text-slate-950">
                  {path.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {path.description}
                </p>

                <span
                  className={`mt-5 inline-flex text-sm font-bold transition group-hover:translate-x-1 ${path.labelColor}`}
                >
                  {path.label} →
                </span>

              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          CURRICULUM
      ===================================================== */}
      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

            {/* LEFT */}
            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                Structured learning
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Everything connected.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                MediVerse organizes your education into a clear hierarchy
                so you always know where you are and what comes next.
              </p>

              <Link
                href="/learn/programs"
                className="mt-6 inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
              >
                Browse Programs →
              </Link>

            </div>

            {/* RIGHT */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-7">

              <div className="grid gap-3">

                {/* PROGRAM */}
                <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                    🎓
                  </span>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      Level 1
                    </p>

                    <p className="font-bold text-slate-900">
                      Program
                    </p>

                  </div>
                </div>

                <div className="ml-5 h-2 border-l-2 border-slate-200" />

                {/* SEMESTER */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    🗂️
                  </span>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Level 2
                    </p>

                    <p className="font-bold text-slate-900">
                      Semester
                    </p>

                  </div>
                </div>

                <div className="ml-5 h-2 border-l-2 border-slate-200" />

                {/* SUBJECT */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    📖
                  </span>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Level 3
                    </p>

                    <p className="font-bold text-slate-900">
                      Subject
                    </p>

                  </div>
                </div>

                <div className="ml-5 h-2 border-l-2 border-slate-200" />

                {/* FINAL LEVELS */}
                <div className="grid gap-3 sm:grid-cols-3">

                  <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                      Level 4
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Unit
                    </p>

                  </div>

                  <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      Level 5
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Topic
                    </p>

                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Level 6
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Lesson
                    </p>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY MEDIVERSE
      ===================================================== */}
      <section className="bg-slate-50">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Why MediVerse
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Built around how students actually learn.
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
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

                <h3 className="mt-4 text-base font-black text-slate-950">
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

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          {userId ? (

            <div className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-9 text-white shadow-xl sm:px-10">

              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">

                <div>

                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-indigo-200">
                    Welcome back 👋
                  </span>

                  <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                    Continue your learning journey.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                    Pick up where you left off and keep building your
                    medical knowledge.
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

            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-6 py-10 text-white shadow-xl sm:px-10">

              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                    Start learning
                  </p>

                  <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                    Your medical learning journey starts here.
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
                    Explore programs, discover structured content and
                    build your learning journey with MediVerse.
                  </p>

                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                  <SignUpButton mode="modal">

                    <button
                      type="button"
                      className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
                    >
                      Create Free Account
                    </button>

                  </SignUpButton>

                  <Link
                    href="/learn/programs"
                    className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white/20"
                  >
                    Explore Programs
                  </Link>

                  <SignInButton mode="modal">

                    <button
                      type="button"
                      className="text-sm font-semibold text-indigo-100 transition hover:text-white"
                    >
                      Already have an account? Sign in
                    </button>

                  </SignInButton>

                </div>
              </div>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}