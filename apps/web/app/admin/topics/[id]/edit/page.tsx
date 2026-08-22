import { notFound } from "next/navigation";

import { getProgramsAction } from "@/src/features/program/actions";
import { getSemestersAction } from "@/src/features/semester/actions";
import { getSubjectsAction } from "@/src/features/subject/actions";
import { getUnitsAction } from "@/src/features/unit/actions";
import { getTopicByIdAction } from "@/src/features/topic/actions";

import { TopicForm } from "@/src/features/topic/components";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTopicPage({
  params,
}: Props) {
  const { id } = await params;

  const [
    topic,
    programs,
    semesters,
    subjects,
    units,
  ] = await Promise.all([
    getTopicByIdAction(id),
    getProgramsAction(),
    getSemestersAction(),
    getSubjectsAction(),
    getUnitsAction(),
  ]);

  if (!topic) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Topic
        </h1>

        <p className="text-muted-foreground">
          Update the topic details.
        </p>
      </div>

      <TopicForm
        programs={programs}
        semesters={semesters}
        subjects={subjects}
        units={units}
        initialData={topic}
      />
    </div>
  );
}