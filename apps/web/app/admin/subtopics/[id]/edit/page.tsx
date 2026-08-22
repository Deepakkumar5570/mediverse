import { notFound } from "next/navigation";

import { getProgramsAction } from "@/src/features/program/actions";
import { getSemestersAction } from "@/src/features/semester/actions";
import { getSubjectsAction } from "@/src/features/subject/actions";
import { getUnitsAction } from "@/src/features/unit/actions";
import { getTopicsAction } from "@/src/features/topic/actions";
import { getSubtopicByIdAction } from "@/src/features/subtopic/actions";

import { SubtopicForm } from "@/src/features/subtopic/components/subtopic-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSubtopicPage({
  params,
}: Props) {
  const { id } = await params;

  const [
    subtopic,
    programs,
    semesters,
    subjects,
    units,
    topics,
  ] = await Promise.all([
    getSubtopicByIdAction(id),
    getProgramsAction(),
    getSemestersAction(),
    getSubjectsAction(),
    getUnitsAction(),
    getTopicsAction(),
  ]);

  if (!subtopic) {
    notFound();
  }

  const topic = topics.find(
    (item) => item.id === subtopic.topicId,
  );

  if (!topic) {
    notFound();
  }

  const unit = units.find(
    (item) => item.id === topic.unitId,
  );

  if (!unit) {
    notFound();
  }

  const subject = subjects.find(
    (item) => item.id === unit.subjectId,
  );

  if (!subject) {
    notFound();
  }

  const semester = semesters.find(
    (item) => item.id === subject.semesterId,
  );

  if (!semester) {
    notFound();
  }

  const program = programs.find(
    (item) => item.id === semester.programId,
  );

  if (!program) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-8">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Edit Subtopic
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update this MediVerse academic subtopic.
        </p>
      </div>

      <SubtopicForm
        programs={programs}
        semesters={semesters}
        subjects={subjects}
        units={units}
        topics={topics}
        initialData={subtopic}
        initialHierarchy={{
          programId: program.id,
          semesterId: semester.id,
          subjectId: subject.id,
          unitId: unit.id,
          topicId: topic.id,
        }}
      />
    </main>
  );
}