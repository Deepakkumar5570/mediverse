import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl">
          🔒
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-red-500">
          403
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-950">
          Access Restricted
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          You do not have permission to access the MediVerse
          administration panel.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/learn"
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
          >
            Go to Learning
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}