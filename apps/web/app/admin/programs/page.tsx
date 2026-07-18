import Link from "next/link";

import { getProgramsAction } from "@/src/features/program/actions";

export default async function ProgramsPage() {
  const programs = await getProgramsAction();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Programs
          </h1>

          <p className="text-gray-500">
            Manage all medical programs
          </p>
        </div>

        <Link
          href="/admin/programs/new"
          className="rounded-md bg-black px-5 py-2 text-white transition hover:bg-gray-800"
        >
          + Add Program
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {programs.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-500"
                >
                  No programs found.
                </td>
              </tr>
            ) : (
              programs.map((program) => (
                <tr
                  key={program.id}
                  className="border-t"
                >
                  <td className="p-4">{program.name}</td>

                  <td className="p-4">{program.code}</td>

                  <td className="p-4">
                    {program.duration} Years
                  </td>

                  <td className="p-4">
                    {program.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}