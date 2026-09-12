import Link from "next/link";

interface AdminSection {
  title: string;
  description: string;
  href: string;
  code: string;
  category: "Structure" | "Content" | "Practice";
  accent: "indigo" | "emerald" | "amber" | "violet" | "rose" | "sky";
}

const adminSections: AdminSection[] = [
  {
    title: "Programs",
    description: "Manage degree paths, academic regulations, and core courses.",
    href: "/admin/programs",
    code: "ADM-01",
    category: "Structure",
    accent: "indigo",
  },
  {
    title: "Semesters",
    description: "Organize academic timelines and term-wise curriculum structures.",
    href: "/admin/semesters",
    code: "ADM-02",
    category: "Structure",
    accent: "sky",
  },
  {
    title: "Subjects",
    description: "Configure core subject nodes and mapping within programs.",
    href: "/admin/subjects",
    code: "ADM-03",
    category: "Structure",
    accent: "violet",
  },
  {
    title: "Units",
    description: "Divide subjects into structured modular learning units.",
    href: "/admin/units",
    code: "ADM-04",
    category: "Structure",
    accent: "indigo",
  },
  {
    title: "Topics",
    description: "Define core topic modules and key learning objectives inside units.",
    href: "/admin/topics",
    code: "ADM-05",
    category: "Structure",
    accent: "sky",
  },
  {
    title: "Subtopics",
    description: "Manage granular lesson nodes and granular subtopic flows.",
    href: "/admin/subtopics",
    code: "ADM-06",
    category: "Structure",
    accent: "violet",
  },
  {
    title: "Content & Lessons",
    description: "Author, edit, and publish rich markdown lessons and media.",
    href: "/admin/contents",
    code: "CNT-01",
    category: "Content",
    accent: "emerald",
  },
  {
    title: "MCQs & Practice",
    description: "Curate question banks, quizzes, and assessment practice sets.",
    href: "/admin/mcqs",
    code: "PRC-01",
    category: "Practice",
    accent: "amber",
  },
];

const accentStyles = {
  indigo: {
    bg: "bg-indigo-50/80",
    border: "border-indigo-100",
    text: "text-indigo-600",
    hoverBorder: "hover:border-indigo-300",
    glow: "group-hover:shadow-indigo-500/10",
  },
  sky: {
    bg: "bg-sky-50/80",
    border: "border-sky-100",
    text: "text-sky-600",
    hoverBorder: "hover:border-sky-300",
    glow: "group-hover:shadow-sky-500/10",
  },
  violet: {
    bg: "bg-violet-50/80",
    border: "border-violet-100",
    text: "text-violet-600",
    hoverBorder: "hover:border-violet-300",
    glow: "group-hover:shadow-violet-500/10",
  },
  emerald: {
    bg: "bg-emerald-50/80",
    border: "border-emerald-100",
    text: "text-emerald-600",
    hoverBorder: "hover:border-emerald-300",
    glow: "group-hover:shadow-emerald-500/10",
  },
  amber: {
    bg: "bg-amber-50/80",
    border: "border-amber-100",
    text: "text-amber-600",
    hoverBorder: "hover:border-amber-300",
    glow: "group-hover:shadow-amber-500/10",
  },
  rose: {
    bg: "bg-rose-50/80",
    border: "border-rose-100",
    text: "text-rose-600",
    hoverBorder: "hover:border-rose-300",
    glow: "group-hover:shadow-rose-500/10",
  },
};

export default function AdminPage() {
  const structureSections = adminSections.filter((s) => s.category === "Structure");
  const contentSections = adminSections.filter((s) => s.category === "Content");
  const practiceSections = adminSections.filter((s) => s.category === "Practice");

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-indigo-50/30 to-slate-100/60 font-sans text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Dynamic Glass Top Bar */}
      <div className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/learn" className="hover:text-indigo-600 transition-colors">
              MediVerse
            </Link>
            <span className="text-slate-300">/</span>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 font-semibold text-indigo-700">
              Admin Hub
            </span>
          </nav>

          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-950 hover:border-slate-300"
          >
            ← Back to Learning
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HERO BANNER WITH SOFT COLOR GLOW */}
        <section className="relative overflow-hidden rounded-3xl border border-indigo-100/80 bg-gradient-to-b from-white via-indigo-50/20 to-white p-8 shadow-xs backdrop-blur-sm md:p-10 mb-10">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-60 w-60 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -mb-10 h-48 w-48 rounded-full bg-violet-200/30 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/90 px-3 py-1 text-xs font-semibold text-indigo-700 mb-4">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              Platform Control Center
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              MediVerse Administration
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Manage curriculum hierarchy nodes, author rich Markdown educational content, and curate question banks from one structured workspace.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
              <span className="rounded-lg bg-white/90 border border-slate-200/80 px-3 py-1.5 shadow-2xs">
                📚 <strong className="text-slate-900">{adminSections.length}</strong> Modules Total
              </span>
              <span className="rounded-lg bg-white/90 border border-slate-200/80 px-3 py-1.5 shadow-2xs">
                ⚡ Active Schema: <strong className="text-emerald-600">v2.4</strong>
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 1: CURRICULUM ARCHITECTURE */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                Curriculum Architecture
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage academic structure from programs down to granular subtopic nodes.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              STRUCTURE
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {structureSections.map((section) => (
              <AdminCard key={section.href} section={section} />
            ))}
          </div>
        </section>

        {/* SECTION 2: CONTENT & EVALUATION */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Content & Evaluation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Author lesson readings and curate MCQ practice banks.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              MATERIALS
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[...contentSections, ...practiceSections].map((section) => (
              <AdminCard key={section.href} section={section} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function AdminCard({ section }: { section: AdminSection }) {
  const accent = accentStyles[section.accent];

  return (
    <Link
      href={section.href}
      className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${accent.hoverBorder} ${accent.glow}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-md px-2.5 py-0.5 text-[10px] font-mono font-bold border ${accent.bg} ${accent.border} ${accent.text}`}
          >
            {section.code}
          </span>
          <span className="text-xs font-semibold text-slate-400 transition-colors group-hover:text-slate-900">
            Manage →
          </span>
        </div>

        <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
          {section.title}
        </h3>

        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
          {section.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] font-semibold text-slate-400">
        <span className="uppercase tracking-wider text-[9px]">{section.category}</span>
        <span className={`opacity-0 transition-opacity group-hover:opacity-100 font-bold ${accent.text}`}>
          Open {section.title}
        </span>
      </div>
    </Link>
  );
}