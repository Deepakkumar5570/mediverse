import {
  contents,
  db,
  programs,
  semesters,
  subjects,
  subtopics,
  topics,
  units,
} from "@mediverse/database";
import { asc } from "drizzle-orm";

import { ContentForm } from "../../../../src/features/content/components/content-form";

export default async function NewContentPage() {
  const [
    programList,
    semesterList,
    subjectList,
    unitList,
    topicList,
    subtopicList,
  ] = await Promise.all([
    db.select().from(programs).orderBy(asc(programs.name)),
    db.select().from(semesters).orderBy(asc(semesters.number)),
    db.select().from(subjects).orderBy(asc(subjects.name)),
    db.select().from(units).orderBy(asc(units.unitNumber)),
    db.select().from(topics).orderBy(asc(topics.topicNumber)),
    db.select().from(subtopics).orderBy(asc(subtopics.subtopicNumber)),
  ]);

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Content
        </h1>

        <p className="text-muted-foreground">
          Create rich educational content for a subtopic.
        </p>
      </div>

      <ContentForm
        programs={programList}
        semesters={semesterList}
        subjects={subjectList}
        units={unitList}
        topics={topicList}
        subtopics={subtopicList}
      />
    </main>
  );
}