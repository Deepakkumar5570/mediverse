import Link from "next/link";

import { getUnitsAction } from "@/src/features/unit/actions";

export default async function UnitsPage() {
  const units = await getUnitsAction();

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Units
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage academic units across your MediVerse subjects.
          </p>
        </div>

        <Link
          href="/admin/units/new"
          className="inline-flex w-fit items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          + Add Unit
        </Link>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-semibold text-slate-900">
            All Units
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {units.length}{" "}
            {units.length === 1 ? "unit" : "units"}{" "}
            available
          </p>
        </div>

        {units.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
              📘
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No units found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create a unit to start organizing subject content.
            </p>

            <Link
              href="/admin/units/new"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + Create Unit
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Unit
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Number
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
                {units.map((unit) => (
                  <tr
                    key={unit.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                          📘
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {unit.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {unit.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                        Unit {unit.unitNumber}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          unit.status === "active"
                            ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                            : "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                        }
                      >
                        {unit.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/units/${unit.id}/edit`}
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
