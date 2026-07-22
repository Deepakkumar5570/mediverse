import { getProgramsAction } from "@/src/features/program/actions";
import { getSemestersAction } from "@/src/features/semester/actions";
import { getSubjectsAction } from "@/src/features/subject/actions";
import { UnitForm } from "@/src/features/unit/components";

export default async function NewUnitPage() {
  const [programs, semesters, subjects] = await Promise.all([
    getProgramsAction(),
    getSemestersAction(),
    getSubjectsAction(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Unit
        </h1>

        <p className="text-muted-foreground">
          Add a new unit to a subject.
        </p>
      </div>

      <UnitForm
        programs={programs}
        semesters={semesters}
        subjects={subjects}
      />
    </div>
  );
}