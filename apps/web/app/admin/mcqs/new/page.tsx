import {
  db,
  subtopics,
} from "@mediverse/database";

import { asc } from "drizzle-orm";

import { MCQForm } from "@/src/features/learn/mcqs/components";

export default async function NewMCQPage() {
  const subtopicList = await db
    .select({
      id: subtopics.id,
      title: subtopics.title,
      subtopicNumber:
        subtopics.subtopicNumber,
    })
    .from(subtopics)
    .orderBy(
      asc(subtopics.subtopicNumber),
    );

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
        <header>
          <p className="text-sm font-medium text-violet-600">
            MediVerse CMS
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Create MCQ
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a multiple-choice question for
            student practice.
          </p>
        </header>

        <MCQForm
          subtopics={subtopicList}
        />
      </div>
    </main>
  );
}