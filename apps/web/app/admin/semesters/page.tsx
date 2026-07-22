import Link from "next/link";

import { getSemestersAction } from "@/src/features/semester/actions";

export default async function SemestersPage() {
  const semesters = await getSemestersAction();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Semesters</h1>
          <p className="text-muted-foreground">
            Manage all semesters.
          </p>
        </div>

        <Link
          href="/admin/semesters/new"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          New Semester
        </Link>
      </div>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Semester No.</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {semesters.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-6 text-center text-muted-foreground"
                >
                  No semesters found.
                </td>
              </tr>
            ) : (
              semesters.map((semester) => (
                <tr key={semester.id} className="border-b">
                  <td className="p-3">{semester.name}</td>
                  <td className="p-3">{semester.number}</td>
                  <td className="p-3">{semester.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}