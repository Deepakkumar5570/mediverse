import { notFound } from "next/navigation";

import {
  db,
  mcqs,
  subtopics,
} from "@mediverse/database";

import { asc, eq } from "drizzle-orm";

import { MCQForm } from "@/src/features/learn/mcqs/components";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMCQPage({
  params,
}: Props) {
  const { id } = await params;

  const [[mcq], subtopicList] =
    await Promise.all([
      db
        .select()
        .from(mcqs)
        .where(eq(mcqs.id, id))
        .limit(1),

      db
        .select({
          id: subtopics.id,
          title: subtopics.title,
          subtopicNumber:
            subtopics.subtopicNumber,
        })
        .from(subtopics)
        .orderBy(
          asc(subtopics.subtopicNumber),
        ),
    ]);

  if (!mcq) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
        <header>
          <p className="text-sm font-medium text-violet-600">
            MediVerse CMS
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Edit MCQ
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update this question and its answer.
          </p>
        </header>

        <MCQForm
          subtopics={subtopicList}
          initialData={mcq}
        />
      </div>
    </main>
  );
}