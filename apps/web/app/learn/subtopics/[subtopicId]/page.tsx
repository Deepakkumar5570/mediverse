import Link from "next/link";
import { notFound } from "next/navigation";

import { LearnLayout } from "@/src/components/learn";

import {
  getSubtopicDetailsAction,
} from "@/src/features/learn/subtopics";

import {
  getContentBySubtopicAction,
  getLessonNavigationAction,
  LessonNavigation,
  ReadingEngine,
} from "@/src/features/learn/content";

import {
  FlashcardDeck,
  getFlashcardsByContentAction,
} from "@/src/features/learn/flashcards";

import {
  MCQPractice,
  getMcqsBySubtopicAction,
} from "@/src/features/learn/mcqs";

import {
  getContentProgressAction,
  getSubtopicProgressAction,
} from "@/src/features/progress";

import {
  getTopicsByUnitAction,
} from "@/src/features/topic";

import {
  getSubtopicsByTopicAction,
} from "@/src/features/subtopic";

import { ArticleBreadcrumb } from "@/src/features/learn/content/components/article-breadcrumb";
import { ArticleSidebar } from "@/src/features/learn/content/components/article-sidebar";
import { ArticleToc } from "@/src/features/learn/content/components/article-toc";

type Props = {
  params: Promise<{
    subtopicId: string;
  }>;

  searchParams: Promise<{
    mode?: string;
  }>;
};

export default async function SubtopicDetailsPage({
  params,
  searchParams,
}: Props) {
  const { subtopicId } = await params;
  const { mode } = await searchParams;

  const isPracticeMode =
    mode === "practice";

  const details =
    await getSubtopicDetailsAction(
      subtopicId,
    );

  if (!details) {
    notFound();
  }

  const lesson =
    await getContentBySubtopicAction(
      subtopicId,
    );

  const lessonProgress = lesson
    ? await getContentProgressAction(
      lesson.id,
    )
    : null;

  const lessonNavigation =
    await getLessonNavigationAction(
      subtopicId,
    );

  const mcqs =
    await getMcqsBySubtopicAction(
      subtopicId,
    );

  const subtopicProgress =
    await getSubtopicProgressAction(
      subtopicId,
    );

  const {
    subtopic,
    topic,
    unit,
    subject,
    semester,
    program,
  } = details;

  /*
   * Build:
   *
   * Unit
   *   ├── Topic
   *   │    ├── Subtopic
   *   │    ├── Subtopic
   *   │
   *   ├── Topic
   *   │    ├── Subtopic
   *
   * This powers the GFG-style accordion
   * curriculum on the left.
   */
  const unitTopics =
    await getTopicsByUnitAction(
      unit.id,
    );

  const topicGroups =
    await Promise.all(
      unitTopics.map(
        async (unitTopic) => ({
          id: unitTopic.id,
          title: unitTopic.title,
          topicNumber:
            unitTopic.topicNumber,
          subtopics:
            await getSubtopicsByTopicAction(
              unitTopic.id,
            ),
        }),
      ),
    );

  const percentage =
    subtopicProgress.percentage;

  const flashcards = lesson
    ? await getFlashcardsByContentAction(
      lesson.id,
    )
    : [];

  return (
    <LearnLayout>
      {/* Breadcrumb */}
      <ArticleBreadcrumb
        items={[
          {
            label: "Programs",
            href: "/learn/programs",
          },
          {
            label: program.name,
            href: `/learn/programs/${program.slug}`,
          },
          {
            label: semester.name,
            href: `/learn/semesters/${semester.id}`,
          },
          {
            label: subject.name,
            href: `/learn/subjects/${subject.id}`,
          },
          {
            label: unit.title,
            href: `/learn/units/${unit.id}`,
          },
          {
            label: topic.title,
            href: `/learn/topics/${topic.id}`,
          },
          {
            label: subtopic.title,
          },
        ]}
      />

      {/* Mobile curriculum */}
      <div className="mt-5 lg:hidden">
        <details className="overflow-hidden border border-slate-200 bg-white">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-bold text-slate-900">
            <div className="flex items-center justify-between gap-3">
              <span>{unit.title}</span>

              <span
                aria-hidden="true"
                className="text-slate-400"
              >
                ≡
              </span>
            </div>
          </summary>

          <div className="border-t border-slate-100">
            <div className="px-3 py-2">
              <Link
                href={`/learn/units/${unit.id}`}
                className="block px-2 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Overview
              </Link>

              {topicGroups.map(
                (topicGroup) => {
                  const isCurrentTopic =
                    topicGroup.subtopics.some(
                      (item) =>
                        item.id ===
                        subtopicId,
                    );

                  return (
                    <details
                      key={topicGroup.id}
                      open={isCurrentTopic}
                      className="border-t border-slate-100"
                    >
                      <summary className="cursor-pointer list-none px-2 py-3 text-sm font-semibold text-slate-800">
                        <div className="flex items-center justify-between gap-3">
                          <span>
                            {
                              topicGroup.title
                            }
                          </span>

                          <span
                            aria-hidden="true"
                            className="text-xs text-slate-400"
                          >
                            ⌄
                          </span>
                        </div>
                      </summary>

                      <div className="pb-2">
                        {topicGroup.subtopics.map(
                          (item) => {
                            const isCurrent =
                              item.id ===
                              subtopicId;

                            return (
                              <Link
                                key={
                                  item.id
                                }
                                href={`/learn/subtopics/${item.id}`}
                                className={[
                                  "flex items-start gap-2 px-3 py-2.5 text-sm",
                                  isCurrent
                                    ? "bg-violet-50 font-semibold text-violet-700"
                                    : "text-slate-600 hover:bg-slate-50",
                                ].join(
                                  " ",
                                )}
                              >
                                <span className="w-5 shrink-0 text-[10px] font-semibold text-slate-400">
                                  {String(
                                    item.subtopicNumber,
                                  ).padStart(
                                    2,
                                    "0",
                                  )}
                                </span>

                                <span>
                                  {
                                    item.title
                                  }
                                </span>

                                {isCurrent &&
                                  lessonProgress?.completed && (
                                    <span className="ml-auto text-xs font-bold text-emerald-600">
                                      ✓
                                    </span>
                                  )}
                              </Link>
                            );
                          },
                        )}
                      </div>
                    </details>
                  );
                },
              )}
            </div>
          </div>
        </details>
      </div>

      {/* Main 3-column lesson layout */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)_250px] lg:gap-8 xl:grid-cols-[240px_minmax(0,1fr)_260px] xl:gap-10">
        {/* LEFT SIDEBAR */}
        <ArticleSidebar
          subjectId={subject.id}
          unitId={unit.id}
          unitTitle={unit.title}
          subjectTitle={subject.name}
          unitNumber={unit.unitNumber}
          topicGroups={topicGroups}
          currentSubtopicId={subtopicId}
          completed={
            subtopicProgress.completed
          }
          total={
            subtopicProgress.total
          }
          currentLessonCompleted={
            lessonProgress?.completed ??
            false
          }
        />

        {/* CENTER ARTICLE */}
        <main className="min-w-0">
          {isPracticeMode ? (
            <section>
              <div className="border-b border-slate-200 pb-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                  Practice
                </p>

                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                  {subtopic.title}
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  Test your understanding
                  of this subtopic.
                </p>
              </div>

              <div className="pt-8">
                <MCQPractice
                  mcqs={mcqs}
                />
              </div>
            </section>
          ) : lesson ? (
            <>
              <ReadingEngine
                contentId={lesson.id}
                title={lesson.title}
                summary={lesson.summary}
                content={lesson.content}
                readingTime={
                  lesson.readingTime
                }
                initialCompleted={
                  lessonProgress?.completed ??
                  false
                }
                updatedAt={
                  lesson.updatedAt
                }
              />

              <LessonNavigation
                previous={
                  lessonNavigation?.previous ??
                  null
                }
                next={
                  lessonNavigation?.next ??
                  null
                }
              />

              {/* FLASHCARDS */}
              {flashcards.length > 0 && (
                <section
                  id="flashcards"
                  className="scroll-mt-24 border-t border-slate-200 pt-12"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                    Practice
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    Reinforce what you
                    learned.
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Quickly review the key
                    concepts from this
                    lesson.
                  </p>

                  <div className="mt-6">
                    <FlashcardDeck
                      flashcards={
                        flashcards
                      }
                    />
                  </div>
                </section>
              )}

              {/* MCQs */}
              {mcqs.length > 0 && (
                <section
                  id="mcq-practice"
                  className="scroll-mt-24 border-t border-slate-200 pt-12"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                    Practice
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    Check your
                    understanding.
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Practice with questions
                    based on this subtopic.
                  </p>

                  <div className="mt-6">
                    <MCQPractice
                      mcqs={mcqs}
                    />
                  </div>
                </section>
              )}
            </>
          ) : (
            <section className="border-b border-slate-200 pb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                Lesson
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                {subtopic.title}
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Lesson content is not
                available yet.
              </p>
            </section>
          )}

          {/* Progress footer */}
          <div className="mt-12 border-t border-slate-200 py-6">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-slate-500">
                Subtopic progress
              </span>

              <span className="font-semibold text-slate-800">
                {subtopicProgress.completed}{" "}
                /{" "}
                {subtopicProgress.total}{" "}
                lessons · {percentage}%
              </span>
            </div>
          </div>
        </main>

        {/* RIGHT TOC */}
        <ArticleToc
          articleId="article-content"
          practiceHref={`/learn/subtopics/${subtopicId}?mode=practice`}
          nextLesson={
            lessonNavigation?.next ??
            null
          }
          previousLesson={
            lessonNavigation?.previous ??
            null
          }
          flashcardsAvailable={
            flashcards.length > 0
          }
        />
      </div>
    </LearnLayout>
  );
}