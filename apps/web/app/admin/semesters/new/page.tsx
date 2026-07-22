import { getProgramsAction } from "@/src/features/program/actions";
import { SemesterForm } from "@/src/features/semester/components/semester-form";

export default async function NewSemesterPage() {
  const programs = await getProgramsAction();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Semester
        </h1>

        <p className="text-muted-foreground">
          Add a semester to a program.
        </p>
      </div>

      <SemesterForm programs={programs} />
    </div>
  );
}