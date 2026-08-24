import Link from "next/link";

import {
  db,
  mcqs,
  subtopics,
} from "@mediverse/database";

import {
  asc,
  eq,
} from "drizzle-orm";

export default async function MCQsAdminPage() {
  const rows = await db
    .select({
      id: mcqs.id,
      question: mcqs.question,
      difficulty: mcqs.difficulty,
      status: mcqs.status,
      questionNumber: mcqs.questionNumber,
      subtopicId: mcqs.subtopicId,
      subtopicTitle: subtopics.title,
    })
    .from(mcqs)
    .leftJoin(
      subtopics,
      eq(mcqs.subtopicId, subtopics.id),
    )
    .orderBy(
      asc(mcqs.questionNumber),
    );

  const total = rows.length;
  const active = rows.filter(
    (item) => item.status === "active",
  ).length;
  const draft = rows.filter(
    (item) => item.status === "draft",
  ).length;
  const inactive = rows.filter(
    (item) => item.status === "inactive",
  ).length;

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
        {/* Header */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-600">
              MediVerse CMS
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              MCQ Library
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create and manage multiple-choice
              questions for student practice.
            </p>
          </div>

          <Link
            href="/admin/mcqs/new"
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
          >
            + New MCQ
          </Link>
        </header>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Total MCQs"
            value={total}
          />

          <Stat
            label="Active"
            value={active}
          />

          <Stat
            label="Draft"
            value={draft}
          />

          <Stat
            label="Inactive"
            value={inactive}
          />
        </section>

        {/* Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="font-bold text-slate-900">
              All Questions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {total} question
              {total === 1 ? "" : "s"} in the library.
            </p>
          </div>

          {rows.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-2xl">
                ?
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                No MCQs yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Create your first question to start
                building the practice library.
              </p>

              <Link
                href="/admin/mcqs/new"
                className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-600"
              >
                Create first MCQ
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-100">
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                      #
                    </th>

                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Question
                    </th>

                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Subtopic
                    </th>

                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Difficulty
                    </th>

                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {rows.map((mcq) => (
                    <tr
                      key={mcq.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-slate-400">
                        {mcq.questionNumber}
                      </td>

                      <td className="max-w-md px-6 py-4">
                        <p className="line-clamp-2 text-sm font-semibold leading-6 text-slate-900">
                          {mcq.question}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {mcq.subtopicTitle ??
                          "Unknown subtopic"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                            mcq.difficulty === "easy"
                              ? "bg-emerald-50 text-emerald-700"
                              : mcq.difficulty ===
                                  "hard"
                                ? "bg-red-50 text-red-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {mcq.difficulty}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                            mcq.status === "active"
                              ? "bg-emerald-50 text-emerald-700"
                              : mcq.status ===
                                  "inactive"
                                ? "bg-slate-100 text-slate-600"
                                : "bg-violet-50 text-violet-700"
                          }`}
                        >
                          {mcq.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/mcqs/${mcq.id}`}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                          >
                            View
                          </Link>

                          <Link
                            href={`/admin/mcqs/${mcq.id}/edit`}
                            className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white hover:bg-violet-600"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}