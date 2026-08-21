import Link from "next/link";

import { getProgramsAction } from "@/src/features/program/actions";

export default async function ProgramsPage() {
  const programs = await getProgramsAction();

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Programs
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage all medical education programs in MediVerse.
          </p>
        </div>

        <Link
          href="/admin/programs/new"
          className="inline-flex w-fit items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          + Add Program
        </Link>
      </section>

      {/* Programs Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                All Programs
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {programs.length}{" "}
                {programs.length === 1 ? "program" : "programs"} available
              </p>
            </div>
          </div>
        </div>

        {programs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
              📚
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No programs found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create your first academic program to get started.
            </p>

            <Link
              href="/admin/programs/new"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + Create Program
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Program
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Code
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Duration
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
                {programs.map((program) => (
                  <tr
                    key={program.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    {/* Program */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                          📚
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {program.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {program.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Code */}
                    <td className="px-6 py-5">
                      <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                        {program.code}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {program.duration}{" "}
                      {program.duration === 1 ? "Year" : "Years"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={
                          program.status === "active"
                            ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                            : "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                        }
                      >
                        {program.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/programs/${program.id}/edit`}
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
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