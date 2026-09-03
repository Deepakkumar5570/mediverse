import { notFound } from "next/navigation";

import {
    PageTemplate,
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

// import {
//     FlashcardDeck,
//     getFlashcardsByContentAction,
// } from "@/src/features/learn/flashcards";

import {
    MCQPractice,
    getMcqsBySubtopicAction,
} from "@/src/features/learn/mcqs";

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

    // const flashcards = lesson
    //     ? await getFlashcardsByContentAction(
    //           lesson.id,
    //       )
    //     : [];

    // Fetch MCQs for this subtopic
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

    const percentage =
        subtopicProgress.percentage;

    const progressMessage =
        percentage === 100
            ? "You&apos;ve completed this subtopic."
            : percentage >= 75
                ? "You&apos;re almost there. Keep going."
                : percentage >= 50
                    ? "You&apos;re halfway there. Keep building momentum."
                    : percentage > 0
                        ? "Good progress. Keep learning one step at a time."
                        : "Start your first lesson to begin your journey.";

    return (
        <PageTemplate
            wide
            showHeader={false}
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
                {
                    label: "MCQ Practice",
                    href: "#mcq-practice",
                },
            ]}
        >
            <div className="space-y-8">

                {/* =====================================================
                    HERO
                ===================================================== */}
                <section className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-white via-violet-50/70 to-indigo-50 p-7 shadow-sm md:p-10">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" />

                    <div className="relative">
                        <div className="flex flex-wrap items-center gap-2">

                            <span className="rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet-700">
                                Subtopic{" "}
                                {subtopic.subtopicNumber}
                            </span>

                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                {subtopic.status}
                            </span>

                            {lesson && (
                                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">
                                    {lesson.readingTime}{" "}
                                    min read
                                </span>
                            )}
                        </div>

                        <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                            {subtopic.title}
                        </h1>

                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
                            {topic.title} ·{" "}
                            {unit.title}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">

                            <div className="rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Lessons
                                </p>

                                <p className="mt-1 text-xl font-black text-slate-950">
                                    {subtopicProgress.total}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Completed
                                </p>

                                <p className="mt-1 text-xl font-black text-slate-950">
                                    {subtopicProgress.completed}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Progress
                                </p>

                                <p className="mt-1 text-xl font-black text-violet-700">
                                    {percentage}%
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* =====================================================
                    OVERVIEW
                ===================================================== */}
                <section
                    id="overview"
                    className="scroll-mt-24"
                >
                    <div className="mb-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                            About this subtopic
                        </p>

                        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                            Understand what you&apos;ll learn.
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Get familiar with the concept before starting the lesson.
                        </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
                        <div className="flex gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-xl">
                                💡
                            </div>

                            <div>
                                <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
                                    Subtopic overview
                                </p>

                                <p className="mt-3 leading-7 text-slate-600">
                                    {subtopic.description ??
                                        "No description available."}
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* =====================================================
                    PROGRESS
                ===================================================== */}
                <section
                    id="progress"
                    className="scroll-mt-24"
                >
                    <div className="mb-4 flex items-end justify-between gap-4">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                                Your progress
                            </p>

                            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                                Keep moving forward.
                            </h2>
                        </div>

                        <p className="hidden text-sm font-medium text-slate-500 sm:block">
                            {subtopicProgress.completed}{" "}
                            of{" "}
                            {subtopicProgress.total}{" "}
                            lessons
                        </p>

                    </div>

                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-4">

                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-50 ring-8 ring-violet-50/50">
                                    <span className="text-xl font-black text-violet-700">
                                        {percentage}%
                                    </span>
                                </div>

                                <div>
                                    <p className="font-bold text-slate-950">
                                        Subtopic completion
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {progressMessage}
                                    </p>
                                </div>

                            </div>

                            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                                {subtopicProgress.completed}{" "}
                                /{" "}
                                {subtopicProgress.total}{" "}
                                completed
                            </div>

                        </div>

                        <div className="mt-6">

                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-400 transition-all duration-700"
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />
                            </div>

                            <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
                                <span>Start</span>

                                <span>
                                    {percentage}% complete
                                </span>

                                <span>100%</span>
                            </div>

                        </div>
                    </div>
                </section>

                {/* =====================================================
                    LESSON
                ===================================================== */}
                <section
                    id="lesson"
                    className="scroll-mt-24"
                >
                    <div className="mb-4">

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                            Learn
                        </p>

                        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                            Your lesson
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Read through the lesson and complete it at your own pace.
                        </p>

                    </div>

                    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">

                        {lesson ? (
                            <>
                                <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-violet-50 px-6 py-5 md:px-8">

                                    <div className="flex flex-wrap items-center justify-between gap-3">

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                                Lesson
                                            </p>

                                            <h3 className="mt-1 text-xl font-black text-slate-950">
                                                {lesson.title}
                                            </h3>
                                        </div>

                                        {lessonProgress && (
                                            <span
                                                className={`rounded-full px-3 py-1.5 text-xs font-bold ${lessonProgress.completed
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-slate-100 text-slate-600"
                                                    }`}
                                            >
                                                {lessonProgress.completed
                                                    ? "✓ Completed"
                                                    : "In progress"}
                                            </span>
                                        )}

                                    </div>
                                </div>

                                <div className="p-6 md:p-8">

                                    <ReadingEngine
                                        contentId={lesson.id}
                                        title={lesson.title}
                                        summary={lesson.summary}
                                        content={lesson.content}
                                        readingTime={lesson.readingTime}
                                        initialCompleted={
                                            lessonProgress?.completed ??
                                            false
                                        }
                                    />

                                </div>

                                <div className="border-t border-slate-100 bg-slate-50/70 p-5 md:p-6">

                                    <LessonNavigation
                                        previous={
                                            lessonNavigation?.previous
                                        }
                                        next={
                                            lessonNavigation?.next
                                        }
                                    />

                                </div>
                            </>
                        ) : (
                            <div className="p-10 text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                                    📖
                                </div>

                                <h3 className="mt-4 font-bold text-slate-900">
                                    Lesson coming soon
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Lesson content is not available yet.
                                </p>

                            </div>
                        )}

                    </div>
                </section>

                {/* =====================================================
                    FLASHCARDS
                ===================================================== */}
                {/* <section
                    id="flashcards"
                    className="scroll-mt-24"
                >
                    <div className="mb-4">

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
                            Practice
                        </p>

                        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                            Reinforce what you learned.
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Use flashcards to quickly review the key concepts.
                        </p>

                    </div>

                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">

                        <FlashcardDeck
                            flashcards={flashcards}
                        />

                    </div>
                </section> */}

                {/* =====================================================
                    MCQ PRACTICE
                ===================================================== */}
                <section
                    id="mcq-practice"
                    className="scroll-mt-24"
                >
                    <div className="mb-4">

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                            Test yourself
                        </p>

                        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                            Check your understanding.
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Practice with MCQs based on this subtopic.
                        </p>

                    </div>

                    <MCQPractice
                        mcqs={mcqs}
                    />
                </section>

            </div>
        </PageTemplate>
    );
}