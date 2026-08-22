import { notFound } from "next/navigation";
import { asc } from "drizzle-orm";

import {
  db,
  programs,
  semesters,
  subjects,
  subtopics,
  topics,
  units,
} from "@mediverse/database";

import {
  getContentByIdWithHierarchyAction,
} from "../../../../../src/features/content/actions";

import { ContentForm } from "../../../../../src/features/content/components/content-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditContentPage({
  params,
}: Props) {
  const { id } = await params;

  /*
   * Fetch the content together with its complete
   * curriculum hierarchy.
   *
   * Content
   *   ↓
   * Subtopic
   *   ↓
   * Topic
   *   ↓
   * Unit
   *   ↓
   * Subject
   *   ↓
   * Semester
   *   ↓
   * Program
   */
  const result =
    await getContentByIdWithHierarchyAction(id);

  if (!result) {
    notFound();
  }

  const {
    content,
    subtopic,
    topic,
    unit,
    subject,
    semester,
    program,
  } = result;

  /*
   * ContentForm still needs the complete lists
   * for its cascading selectors:
   *
   * Program → Semester → Subject → Unit
   * → Topic → Subtopic
   */
  const [
    programList,
    semesterList,
    subjectList,
    unitList,
    topicList,
    subtopicList,
  ] = await Promise.all([
    db
      .select()
      .from(programs)
      .orderBy(asc(programs.name)),

    db
      .select()
      .from(semesters)
      .orderBy(asc(semesters.number)),

    db
      .select()
      .from(subjects)
      .orderBy(asc(subjects.name)),

    db
      .select()
      .from(units)
      .orderBy(asc(units.unitNumber)),

    db
      .select()
      .from(topics)
      .orderBy(asc(topics.topicNumber)),

    db
      .select()
      .from(subtopics)
      .orderBy(asc(subtopics.subtopicNumber)),
  ]);

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div>
          <div className="mb-2 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Content CMS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Edit Content
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update the content and curriculum placement.
          </p>
        </div>

        {/* CURRENT HIERARCHY */}
        <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Current Curriculum
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-lg bg-indigo-50 px-3 py-1.5 font-semibold text-indigo-700">
              {program.name}
            </span>

            <span className="text-slate-300">
              →
            </span>

            <span className="rounded-lg bg-violet-50 px-3 py-1.5 font-semibold text-violet-700">
              {semester.name}
            </span>

            <span className="text-slate-300">
              →
            </span>

            <span className="rounded-lg bg-blue-50 px-3 py-1.5 font-semibold text-blue-700">
              {subject.name}
            </span>

            <span className="text-slate-300">
              →
            </span>

            <span className="rounded-lg bg-amber-50 px-3 py-1.5 font-semibold text-amber-700">
              {unit.title}
            </span>

            <span className="text-slate-300">
              →
            </span>

            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">
              {topic.title}
            </span>

            <span className="text-slate-300">
              →
            </span>

            <span className="rounded-lg bg-pink-50 px-3 py-1.5 font-semibold text-pink-700">
              {subtopic.title}
            </span>
          </div>
        </div>

        {/* FORM */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <ContentForm
            programs={programList}
            semesters={semesterList}
            subjects={subjectList}
            units={unitList}
            topics={topicList}
            subtopics={subtopicList}
            initialData={{
              id: content.id,

              programId: program.id,

              semesterId: semester.id,

              subjectId: subject.id,

              unitId: unit.id,

              topicId: topic.id,

              subtopicId: subtopic.id,

              title: content.title,

              slug: content.slug,

              summary:
                content.summary ?? "",

              content:
                content.content,

              readingTime:
                content.readingTime,

              seoTitle:
                content.seoTitle ?? "",

              seoDescription:
                content.seoDescription ?? "",

              status:
                content.status as
                  | "draft"
                  | "active"
                  | "archived",
            }}
          />
        </div>
      </div>
    </main>
  );
}