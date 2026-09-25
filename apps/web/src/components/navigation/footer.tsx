import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_0.7fr_0.7fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-black text-white">
                M
              </span>
              <span className="text-lg font-black tracking-tight text-slate-950">
                MediVerse
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-500">
              A structured learning space for students to discover,
              understand and organize their medical education.
            </p>

            <p className="mt-5 text-xs font-medium text-slate-400">
              Learn • Explore • Grow
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-950">
              Explore
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-500">
              <Link href="/learn/programs" className="block hover:text-violet-600">Programs</Link>
              <Link href="/learn/search" className="block hover:text-violet-600">Search</Link>
              <Link href="/learn/community" className="block hover:text-violet-600">Community</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-950">
              Learning
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-500">
              <Link href="/learn" className="block hover:text-violet-600">Learn</Link>
              <Link href="/learn/progress" className="block hover:text-violet-600">Progress</Link>
              <Link href="/" className="block hover:text-violet-600">About MediVerse</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MediVerse. Built for learners.</p>
          <p>Medical education, organized.</p>
        </div>
      </div>
    </footer>
  );
}