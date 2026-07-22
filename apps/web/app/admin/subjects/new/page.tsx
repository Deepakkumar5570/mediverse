import { getProgramsAction } from "@/src/features/program/actions";
import { getSemestersAction } from "@/src/features/semester/actions";
import { SubjectForm } from "@/src/features/subject/components/subject-form";

export default async function NewSubjectPage() {
  const [programs, semesters] = await Promise.all([
    getProgramsAction(),
    getSemestersAction(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Subject</h1>

        <p className="text-muted-foreground">
          Add a new subject to a semester.
        </p>
      </div>

      <SubjectForm
        programs={programs}
        semesters={semesters}
      />
    </div>
  );
}