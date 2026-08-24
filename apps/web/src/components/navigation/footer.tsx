import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="sm:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg">
                🩺
              </div>

              <span className="text-lg font-black tracking-tight text-slate-950">
                Medi
                <span className="text-indigo-600">
                  Verse
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              A structured learning space for students to discover,
              understand and organize their medical education.
            </p>

            <p className="mt-5 text-xs font-medium text-slate-400">
              Learn • Explore • Grow
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <p className="text-sm font-bold text-slate-950">
              Explore
            </p>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <Link
                href="/learn/programs"
                className="block transition hover:text-indigo-600"
              >
                Programs
              </Link>

              <Link
                href="/learn/search"
                className="block transition hover:text-indigo-600"
              >
                Search
              </Link>
            </div>
          </div>

          {/* LEARNING */}
          <div>
            <p className="text-sm font-bold text-slate-950">
              Learning
            </p>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <Link
                href="/learn"
                className="block transition hover:text-indigo-600"
              >
                Learn
              </Link>

              <Link
                href="/learn/progress"
                className="block transition hover:text-indigo-600"
              >
                Progress
              </Link>

              <Link
                href="/"
                className="block transition hover:text-indigo-600"
              >
                About MediVerse
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MediVerse. Built for learners.
          </p>

          <p>
            Medical education, organized.
          </p>
        </div>
      </div>
    </footer>
  );
}