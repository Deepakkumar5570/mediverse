import Link from "next/link";
import { notFound } from "next/navigation";

import { getProgramsAction } from "@/src/features/program/actions";
import { SemesterForm } from "@/src/features/semester/components/semester-form";
import { getSemesterByIdService } from "@/src/features/semester/services/semester.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSemesterPage({
  params,
}: Props) {
  const { id } = await params;

  const [semester, programs] = await Promise.all([
    getSemesterByIdService(id),
    getProgramsAction(),
  ]);

  if (!semester) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-8">
      <div>
        <Link
          href="/admin/semesters"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to Semesters
        </Link>

        <p className="mt-6 text-sm font-medium text-slate-500">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Edit Semester
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update this MediVerse academic semester.
        </p>
      </div>

      <SemesterForm
        programs={programs}
        initialData={{
          id: semester.id,
          programId: semester.programId,
          name: semester.name,
          number: semester.number,
          status:
            semester.status === "active"
              ? "active"
              : "inactive",
        }}
      />
    </main>
  );
}