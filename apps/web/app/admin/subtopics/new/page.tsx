import { db, programs, semesters, subjects, topics, units } from "@mediverse/database";
import { asc } from "drizzle-orm";
import { SubtopicForm } from "../../../../src/features/subtopic/components/subtopic-form";

export default async function NewSubtopicPage() {
  const [
    programList,
    semesterList,
    subjectList,
    unitList,
    topicList,
  ] = await Promise.all([
    db.select().from(programs).orderBy(asc(programs.name)),
    db.select().from(semesters).orderBy(asc(semesters.number)),
    db.select().from(subjects).orderBy(asc(subjects.name)),
    db.select().from(units).orderBy(asc(units.unitNumber)),
    db.select().from(topics).orderBy(asc(topics.topicNumber)),
  ]);

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Create Subtopic</h1>

      <SubtopicForm
        programs={programList}
        semesters={semesterList}
        subjects={subjectList}
        units={unitList}
        topics={topicList}
      />
    </main>
  );
}