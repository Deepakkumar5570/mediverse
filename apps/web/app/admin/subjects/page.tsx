import Link from "next/link";

import { getSubjectsAction } from "@/src/features/subject/actions";

export default async function SubjectsPage() {
  const subjects = await getSubjectsAction();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subjects</h1>
          <p className="text-muted-foreground">
            Manage all subjects.
          </p>
        </div>

        <Link
          href="/admin/subjects/new"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          New Subject
        </Link>
      </div>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Semester</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {subjects.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-muted-foreground"
                >
                  No subjects found.
                </td>
              </tr>
            ) : (
              subjects.map((subject) => (
                <tr key={subject.id} className="border-b">
                  <td className="p-3">{subject.name}</td>
                  <td className="p-3">{subject.code}</td>
                  <td className="p-3">{subject.semester}</td>
                  <td className="p-3">{subject.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}