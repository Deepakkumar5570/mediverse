import Link from "next/link";
import { notFound } from "next/navigation";

import { getProgramsAction } from "@/src/features/program/actions";
import { getSemestersAction } from "@/src/features/semester/actions";
import { getSubjectsAction } from "@/src/features/subject/actions";
import { UnitForm } from "@/src/features/unit/components";
import { getUnitByIdService } from "@/src/features/unit/services";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUnitPage({
  params,
}: Props) {
  const { id } = await params;

  const [
    unit,
    programs,
    semesters,
    subjects,
  ] = await Promise.all([
    getUnitByIdService(id),
    getProgramsAction(),
    getSemestersAction(),
    getSubjectsAction(),
  ]);

  if (!unit) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-8">
      <div>
        <Link
          href="/admin/units"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to Units
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          Edit Unit
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update this MediVerse academic unit.
        </p>
      </div>

      <UnitForm
        programs={programs}
        semesters={semesters}
        subjects={subjects}
        initialData={{
          id: unit.id,
          subjectId: unit.subjectId,
          title: unit.title,
          slug: unit.slug,
          unitNumber: unit.unitNumber,
          description: unit.description,
          status:
            unit.status === "active"
              ? "active"
              : "inactive",
        }}
      />
    </main>
  );
}