import { getProgramsAction } from "@/src/features/program/actions";
import { getSemestersAction } from "@/src/features/semester/actions";
import { getSubjectsAction } from "@/src/features/subject/actions";
import { getUnitsAction } from "@/src/features/unit/actions";
import { TopicForm } from "@/src/features/topic/components";

export default async function NewTopicPage() {
  const [
    programs,
    semesters,
    subjects,
    units,
  ] = await Promise.all([
    getProgramsAction(),
    getSemestersAction(),
    getSubjectsAction(),
    getUnitsAction(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Topic
        </h1>

        <p className="text-muted-foreground">
          Add a new topic to a unit.
        </p>
      </div>

      <TopicForm
        programs={programs}
        semesters={semesters}
        subjects={subjects}
        units={units}
      />
    </div>
  );
}