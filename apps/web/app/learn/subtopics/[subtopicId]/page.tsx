import { notFound } from "next/navigation";

import {
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";

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
    getContentProgressAction,
    getSubtopicProgressAction,
} from "@/src/features/progress";

type Props = {
    params: Promise<{
        subtopicId: string;
    }>;
};

export default async function SubtopicDetailsPage({
    params,
}: Props) {
    const { subtopicId } = await params;

    const details =
        await getSubtopicDetailsAction(subtopicId);

    if (!details) {
        notFound();
    }

    const lesson =
        await getContentBySubtopicAction(
            subtopicId,
        );

    const lessonProgress = lesson
        ? await getContentProgressAction(lesson.id)
        : null;

    const lessonNavigation =
        await getLessonNavigationAction(
            subtopicId,
        );

    const flashcards = lesson
        ? await getFlashcardsByContentAction(
              lesson.id,
          )
        : [];

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

    return (
        <PageTemplate
            title={subtopic.title}
            description={`${topic.title} • Subtopic ${subtopic.subtopicNumber}`}
            sidebarTitle="Subtopic"
            breadcrumbs={[
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
            sidebar={[
                {
                    label: "Overview",
                    href: "#overview",
                },
                {
                    label: "Progress",
                    href: "#progress",
                },
                {
                    label: "Lesson",
                    href: "#lesson",
                },
                {
                    label: "Flashcards",
                    href: "#flashcards",
                },
            ]}
        >
            {/* ─────────────────────────────────────────────
                STATS
            ───────────────────────────────────────────── */}

            <section className="grid gap-6 md:grid-cols-4">
                <StatCard
                    label="Subtopic Number"
                    value={subtopic.subtopicNumber}
                />

                <StatCard
                    label="Status"
                    value={subtopic.status}
                />

                <StatCard
                    label="Lessons"
                    value={subtopicProgress.total}
                />

                <StatCard
                    label="Progress"
                    value={`${subtopicProgress.percentage}%`}
                />
            </section>

            {/* ─────────────────────────────────────────────
                OVERVIEW
            ───────────────────────────────────────────── */}

            <Section
                title="Overview"
                id="overview"
            >
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        {subtopic.description ??
                            "No description available."}
                    </p>
                </div>
            </Section>

            {/* ─────────────────────────────────────────────
                PROGRESS
            ───────────────────────────────────────────── */}

            <Section
                title="Your Progress"
                id="progress"
            >
                <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
                    <div className="p-7 md:p-8">
                        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Subtopic completion
                                </p>

                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-5xl font-semibold tracking-tight text-slate-900">
                                        {subtopicProgress.percentage}
                                    </span>

                                    <span className="text-xl font-medium text-slate-400">
                                        %
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                                {subtopicProgress.completed} of{" "}
                                {subtopicProgress.total} lessons
                                completed
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 transition-all duration-700"
                                    style={{
                                        width: `${subtopicProgress.percentage}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-3 flex justify-between text-xs text-slate-400">
                            <span>Start</span>

                            <span>
                                {subtopicProgress.percentage}% complete
                            </span>

                            <span>100%</span>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 bg-slate-50/70 px-7 py-5 md:px-8">
                        <p className="text-sm text-slate-600">
                            {subtopicProgress.percentage === 100
                                ? "Amazing. You've completed this entire subtopic."
                                : subtopicProgress.percentage >= 75
                                  ? "You're almost there. Keep going."
                                  : subtopicProgress.percentage >= 50
                                    ? "You're halfway there. Keep building your progress."
                                    : subtopicProgress.percentage > 0
                                      ? "Good progress. Keep learning one lesson at a time."
                                      : "Your journey starts here. Complete your first lesson."}
                        </p>
                    </div>
                </div>
            </Section>

            {/* ─────────────────────────────────────────────
                LESSON
            ───────────────────────────────────────────── */}

            <Section
                title="Lesson"
                id="lesson"
            >
                {lesson ? (
                    <ReadingEngine
                        contentId={lesson.id}
                        title={lesson.title}
                        summary={lesson.summary}
                        content={lesson.content}
                        readingTime={lesson.readingTime}
                        initialCompleted={
                            lessonProgress?.completed ?? false
                        }
                    />
                ) : (
                    <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                        Lesson content not available.
                    </div>
                )}

                <LessonNavigation
                    previous={lessonNavigation?.previous}
                    next={lessonNavigation?.next}
                />
            </Section>

            {/* ─────────────────────────────────────────────
                FLASHCARDS
            ───────────────────────────────────────────── */}

            <Section
                id="flashcards"
                title="Flashcards"
            >
                <FlashcardDeck
                    flashcards={flashcards}
                />
            </Section>
        </PageTemplate>
    );
}