import Link from "next/link";

import { getProgramsAction } from "@/src/features/program/actions";
import { SemesterForm } from "@/src/features/semester/components/semester-form";

export default async function NewSemesterPage() {
  const programs = await getProgramsAction();

  return (
    <main className="mx-auto max-w-4xl space-y-8 p-8">
      {/* Header */}
      <section>
        <Link
          href="/admin/semesters"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to Semesters
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium text-slate-500">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Create Semester
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add a semester and associate it with an academic program.
          </p>
        </div>
      </section>

      {/* Form */}
      <section>
        <SemesterForm programs={programs} />
      </section>
    </main>
  );
}