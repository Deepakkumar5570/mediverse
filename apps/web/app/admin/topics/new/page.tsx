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
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* Page Header */}
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Create Topic
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Add a new topic to a unit.
          </p>
        </div>

        {/* Topic Form */}
        <TopicForm
          programs={programs}
          semesters={semesters}
          subjects={subjects}
          units={units}
        />
      </div>
    </main>
  );
}