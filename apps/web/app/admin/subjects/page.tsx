import Link from "next/link";

import { getSubjectsAction } from "@/src/features/subject/actions";

export default async function SubjectsPage() {
  const subjects = await getSubjectsAction();

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Subjects
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage all subjects across your MediVerse academic programs.
          </p>
        </div>

        <Link
          href="/admin/subjects/new"
          className="inline-flex w-fit items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          + Add Subject
        </Link>
      </section>

      {/* Subject List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-semibold text-slate-900">
            All Subjects
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {subjects.length}{" "}
            {subjects.length === 1
              ? "subject"
              : "subjects"}{" "}
            available
          </p>
        </div>

        {subjects.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
              📚
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No subjects found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create a subject to start organizing your academic content.
            </p>

            <Link
              href="/admin/subjects/new"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + Create Subject
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Code
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Semester
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
                {subjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    {/* Subject */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                          📖
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {subject.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {subject.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Code */}
                    <td className="px-6 py-5">
                      <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                        {subject.code}
                      </span>
                    </td>

                    {/* Semester */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-slate-700">
                        Semester {subject.semester}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={
                          subject.status === "active"
                            ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                            : "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                        }
                      >
                        {subject.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/subjects/${subject.id}/edit`}
                        className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
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