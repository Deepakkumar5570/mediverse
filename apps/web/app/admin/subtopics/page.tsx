import Link from "next/link";

import { getSubtopicsAction } from "@/src/features/subtopic/actions/get-subtopics";

export default async function SubtopicsPage() {
  const subtopics = await getSubtopicsAction();

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Subtopics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage subtopics across your MediVerse academic content.
          </p>
        </div>

        <Link
          href="/admin/subtopics/new"
          className="inline-flex w-fit items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          + Add Subtopic
        </Link>
      </section>

      {/* Subtopic List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-semibold text-slate-900">
            All Subtopics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {subtopics.length}{" "}
            {subtopics.length === 1
              ? "subtopic"
              : "subtopics"}{" "}
            available
          </p>
        </div>

        {subtopics.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
              📖
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No subtopics found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create a subtopic to start organizing detailed
              learning content.
            </p>

            <Link
              href="/admin/subtopics/new"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + Create Subtopic
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    No.
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Subtopic
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Slug
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {subtopics.map((subtopic) => (
                  <tr
                    key={subtopic.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                        {subtopic.subtopicNumber}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                          📖
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {subtopic.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Academic subtopic
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <code className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
                        {subtopic.slug}
                      </code>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          subtopic.status === "active"
                            ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                            : "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                        }
                      >
                        {subtopic.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/subtopics/${subtopic.id}/edit`}
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}