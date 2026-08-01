import Link from "next/link";

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 p-8">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white">
        <h1 className="text-5xl font-bold">
          Welcome to MediVerse
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-blue-100">
          Learn smarter with structured medical education.
          Explore programs, semesters, subjects and
          interactive learning resources.
        </p>

        <div className="mt-8">
          <Link
            href="/learn/programs"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Start Learning
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">
            📘 Programs
          </h2>

          <p className="mt-2 text-gray-600">
            Browse all available academic programs.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">
            📚 Subjects
          </h2>

          <p className="mt-2 text-gray-600">
            Study organized subjects with detailed
            content.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">
            🤖 AI Tutor
          </h2>

          <p className="mt-2 text-gray-600">
            Ask questions and get AI-powered guidance.
          </p>
        </div>
      </section>
    </main>
  );
}