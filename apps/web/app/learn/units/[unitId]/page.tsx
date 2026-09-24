import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
    Breadcrumb,
    LearnLayout,
} from "@/src/components/learn";

import { getUnitDetailsAction } from "@/src/features/learn/units";

import { getTopicsByUnitAction } from "@/src/features/topic";

import { getSubtopicsByTopicAction } from "@/src/features/subtopic";

import {
    getUnitByIdAction,
    getUnitBySlugAction,
} from "@/src/features/unit";

import {
    getSingleUnitProgressAction,
    getSubtopicProgressAction,
} from "@/src/features/progress";

import { isUuid } from "@/src/lib/learn/routing";

type Props = {
    params: Promise<{
        unitId: string;
    }>;
    searchParams: Promise<{
        mode?: string;
    }>;
};

type TopicGroup = {
    id: string;
    title: string;
    topicNumber: number;
    description: string | null;
    subtopics: Array<{
        id: string;
        title: string;
        slug: string;
        subtopicNumber: number;
        description: string | null;
        completed: boolean;
    }>;
};

export default async function UnitDetailsPage({
    params,
    searchParams,
}: Props) {
    const { unitId: unitSlugOrId } =
        await params;

    const { mode } = await searchParams;

    const isPracticeMode =
        mode === "practice";

    /*
     * Support both:
     *
     * /learn/units/:uuid
     * /learn/units/:slug
     *
     * UUIDs are resolved internally and
     * redirected to the canonical slug URL.
     */
    const resolvedUnit = isUuid(unitSlugOrId)
        ? await getUnitByIdAction(
              unitSlugOrId,
          )
        : await getUnitBySlugAction(
              unitSlugOrId,
          );

    if (!resolvedUnit) {
        notFound();
    }

    /*
     * Legacy UUID URL -> canonical slug URL.
     */
    if (isUuid(unitSlugOrId)) {
        redirect(
            `/learn/units/${resolvedUnit.slug}`,
        );
    }

    /*
     * Everything below this point works with
     * the internal database UUID.
     */
    const unitId = resolvedUnit.id;

    const details =
        await getUnitDetailsAction(unitId);

    if (!details) {
        notFound();
    }

    const topics =
        await getTopicsByUnitAction(unitId);

    /*
     * Build the complete unit curriculum:
     *
     * Unit
     *   ├── Topic
     *   │    ├── Subtopic / Lesson
     *   │    ├── Subtopic / Lesson
     *   │
     *   ├── Topic
     *        ├── Subtopic / Lesson
     *
     * Progress is fetched per subtopic so the
     * completion state shown in the UI is real.
     */
    const topicGroups: TopicGroup[] =
        await Promise.all(
            topics.map(async (topic) => {
                const subtopics =
                    await getSubtopicsByTopicAction(
                        topic.id,
                    );

                const subtopicsWithProgress =
                    await Promise.all(
                        subtopics.map(
                            async (subtopic) => {
                                const progress =
                                    await getSubtopicProgressAction(
                                        subtopic.id,
                                    );

                                return {
                                    id: subtopic.id,
                                    title: subtopic.title,
                                    slug: subtopic.slug,
                                    subtopicNumber:
                                        subtopic.subtopicNumber,
                                    description:
                                        subtopic.description,
                                    completed:
                                        progress.percentage >=
                                        100,
                                };
                            },
                        ),
                    );

                return {
                    id: topic.id,
                    title: topic.title,
                    topicNumber:
                        topic.topicNumber,
                    description:
                        topic.description,
                    subtopics:
                        subtopicsWithProgress,
                };
            }),
        );

    const unitProgress =
        await getSingleUnitProgressAction(
            unitId,
        );

    const totalLessons =
        topicGroups.reduce(
            (total, topic) =>
                total +
                topic.subtopics.length,
            0,
        );

    const completedLessons =
        unitProgress.completed;

    const progressPercentage =
        unitProgress.percentage;

    const {
        unit,
        subject,
        semester,
        program,
    } = details;

    return (
        <LearnLayout>
            {/* =====================================================
                BREADCRUMB
            ====================================================== */}

            <Breadcrumb
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
                        href: `/learn/semesters/${semester.slug}`,
                    },
                    {
                        label: subject.name,
                        href: `/learn/subjects/${subject.slug}`,
                    },
                    {
                        label: unit.title,
                    },
                ]}
            />

            <div className="mx-auto mt-5 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                {/* =================================================
                    BACK TO SUBJECT
                ================================================== */}

                <Link
                    href={`/learn/subjects/${subject.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600"
                >
                    <span className="text-base">
                        ←
                    </span>

                    Back to Subject
                </Link>

                {/* =================================================
                    UNIT HEADER
                ================================================== */}

                <section className="mt-5 overflow-hidden rounded-[26px] border border-indigo-100 bg-white shadow-sm">
                    <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_220px] lg:p-8">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
                                    Unit{" "}
                                    {unit.unitNumber}
                                </span>

                                <span className="text-sm text-slate-400">
                                    {subject.name}
                                </span>
                            </div>

                            <h1 className="mt-3 max-w-4xl text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                                {unit.title}
                            </h1>

                            {unit.description && (
                                <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                                    {unit.description}
                                </p>
                            )}

                            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                        ▦
                                    </span>

                                    <span>
                                        <strong className="font-bold text-slate-900">
                                            {
                                                topicGroups.length
                                            }
                                        </strong>{" "}
                                        {topicGroups.length ===
                                        1
                                            ? "topic"
                                            : "topics"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-slate-600">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                        ▤
                                    </span>

                                    <span>
                                        <strong className="font-bold text-slate-900">
                                            {
                                                totalLessons
                                            }
                                        </strong>{" "}
                                        {totalLessons ===
                                        1
                                            ? "lesson"
                                            : "lessons"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-slate-600">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                        ◷
                                    </span>

                                    <span>
                                        Self-paced learning
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            PROGRESS
                        ================================================== */}

                        <div className="rounded-[22px] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-5 text-center">
                            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[9px] border-indigo-100 bg-white">
                                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-[7px] border-indigo-500">
                                    <span className="text-xl font-black text-slate-900">
                                        {
                                            progressPercentage
                                        }
                                        %
                                    </span>
                                </div>
                            </div>

                            <p className="mt-3 text-sm font-bold text-slate-900">
                                {progressPercentage ===
                                100
                                    ? "Unit completed!"
                                    : "Unit progress"}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                {
                                    completedLessons
                                }{" "}
                                of{" "}
                                {
                                    totalLessons
                                }{" "}
                                lessons completed
                            </p>

                            {progressPercentage ===
                                100 && (
                                <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-700">
                                    ✓ All lessons
                                    completed
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* =================================================
                    PRACTICE MODE
                ================================================== */}

                {isPracticeMode && (
                    <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
                        <span className="font-semibold">
                            Practice mode
                        </span>{" "}
                        — choose a lesson below to
                        continue.
                    </div>
                )}

                {/* =================================================
                    MAIN CONTENT
                ================================================== */}

                <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_290px]">
                    {/* =================================================
                        LESSON NAVIGATION
                    ================================================== */}

                    <main>
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                                Unit contents
                            </p>

                            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                Choose a lesson
                            </h2>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                Select a topic to reveal
                                its lessons. Open any
                                lesson to start reading.
                            </p>
                        </div>

                        {topicGroups.length ===
                        0 ? (
                            <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-12 text-center">
                                <h3 className="font-bold text-slate-900">
                                    No lessons available
                                    yet
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Lessons will appear
                                    here when they are
                                    added.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {topicGroups.map(
                                    (
                                        topic,
                                        index,
                                    ) => {
                                        const lessonCount =
                                            topic
                                                .subtopics
                                                .length;

                                        return (
                                            <details
                                                key={
                                                    topic.id
                                                }
                                                id={`topic-${topic.id}`}
                                                open={
                                                    index ===
                                                    0
                                                }
                                                className="group overflow-hidden rounded-[22px] border border-indigo-100 bg-white shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
                                            >
                                                {/* =================================================
                                                    TOPIC HEADER
                                                ================================================== */}

                                                <summary className="cursor-pointer list-none px-4 py-4 sm:px-5 sm:py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-black text-indigo-700 ring-1 ring-indigo-100">
                                                            {String(
                                                                topic.topicNumber,
                                                            ).padStart(
                                                                2,
                                                                "0",
                                                            )}
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                                <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                                                                    {
                                                                        topic.title
                                                                    }
                                                                </h3>

                                                                <span className="text-xs font-semibold text-indigo-500">
                                                                    {
                                                                        lessonCount
                                                                    }{" "}
                                                                    {lessonCount ===
                                                                    1
                                                                        ? "lesson"
                                                                        : "lessons"}
                                                                </span>
                                                            </div>

                                                            {topic.description && (
                                                                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm">
                                                                    {
                                                                        topic.description
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Expand / collapse */}
                                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-indigo-600 transition-all duration-200 group-open:rotate-180 group-hover:bg-indigo-100">
                                                            ↓
                                                        </span>
                                                    </div>
                                                </summary>

                                                {/* =================================================
                                                    LESSON LIST
                                                ================================================== */}

                                                <div className="border-t border-indigo-50 bg-slate-50/50 px-3 py-3 sm:px-4">
                                                    {lessonCount ===
                                                    0 ? (
                                                        <div className="rounded-xl bg-white px-4 py-5 text-sm text-slate-500">
                                                            No lessons
                                                            available
                                                            yet.
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-1.5">
                                                            {topic.subtopics.map(
                                                                (
                                                                    subtopic,
                                                                    lessonIndex,
                                                                ) => {
                                                                    const lessonHref =
                                                                        isPracticeMode
                                                                            ? `/learn/subtopics/${subtopic.slug}?mode=practice`
                                                                            : `/learn/subtopics/${subtopic.slug}`;

                                                                    return (
                                                                        <Link
                                                                            key={
                                                                                subtopic.id
                                                                            }
                                                                            href={
                                                                                lessonHref
                                                                            }
                                                                            className="group/lesson flex items-center gap-3 rounded-xl border border-transparent bg-white px-3 py-3 transition-all hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-sm sm:px-4"
                                                                        >
                                                                            {/* Number */}
                                                                            <span className="w-6 shrink-0 text-center text-xs font-bold text-slate-400">
                                                                                {String(
                                                                                    subtopic.subtopicNumber ??
                                                                                        lessonIndex +
                                                                                            1,
                                                                                ).padStart(
                                                                                    2,
                                                                                    "0",
                                                                                )}
                                                                            </span>

                                                                            {/* Lesson icon */}
                                                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 transition group-hover/lesson:bg-indigo-100">
                                                                                ▤
                                                                            </span>

                                                                            {/* Lesson content */}
                                                                            <div className="min-w-0 flex-1">
                                                                                <p className="text-sm font-bold text-indigo-800 transition-colors group-hover/lesson:text-indigo-600 sm:text-[15px]">
                                                                                    {
                                                                                        subtopic.title
                                                                                    }
                                                                                </p>

                                                                                {subtopic.description && (
                                                                                    <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-slate-400">
                                                                                        {
                                                                                            subtopic.description
                                                                                        }
                                                                                    </p>
                                                                                )}
                                                                            </div>

                                                                            {/* Completed */}
                                                                            {subtopic.completed && (
                                                                                <span className="hidden shrink-0 items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 sm:inline-flex">
                                                                                    <span>
                                                                                        ✓
                                                                                    </span>

                                                                                    Completed
                                                                                </span>
                                                                            )}

                                                                            {/* Navigation arrow */}
                                                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-sm transition-all group-hover/lesson:translate-x-0.5 group-hover/lesson:bg-violet-600 group-hover/lesson:shadow-md">
                                                                                →
                                                                            </span>
                                                                        </Link>
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </details>
                                        );
                                    },
                                )}
                            </div>
                        )}
                    </main>

                    {/* =================================================
                        UNIT MAP
                    ================================================== */}

                    <aside>
                        <div className="rounded-[24px] border border-indigo-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600">
                                    ◫
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
                                        Unit map
                                    </p>

                                    <h3 className="mt-0.5 text-lg font-black text-slate-900">
                                        In this unit
                                    </h3>
                                </div>
                            </div>

                            {/* Topic navigation */}
                            <div className="relative mt-6">
                                <div className="absolute bottom-6 left-[9px] top-5 w-px bg-indigo-100" />

                                <div className="space-y-1">
                                    {topicGroups.map(
                                        (
                                            topic,
                                            index,
                                        ) => (
                                            <Link
                                                key={
                                                    topic.id
                                                }
                                                href={`#topic-${topic.id}`}
                                                className="group/map relative flex gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-indigo-50/60"
                                            >
                                                <span
                                                    className={`relative z-10 mt-1 h-[18px] w-[18px] shrink-0 rounded-full border-4 border-white ${
                                                        index ===
                                                        0
                                                            ? "bg-indigo-600 shadow-sm"
                                                            : "bg-indigo-100 group-hover/map:bg-indigo-300"
                                                    }`}
                                                />

                                                <span className="min-w-0">
                                                    <span
                                                        className={`block text-sm font-bold ${
                                                            index ===
                                                            0
                                                                ? "text-indigo-700"
                                                                : "text-slate-800 group-hover/map:text-indigo-700"
                                                        }`}
                                                    >
                                                        <span className="mr-2 text-xs text-slate-400">
                                                            {String(
                                                                topic.topicNumber,
                                                            ).padStart(
                                                                2,
                                                                "0",
                                                            )}
                                                        </span>

                                                        {
                                                            topic.title
                                                        }
                                                    </span>

                                                    <span className="mt-1 block text-xs text-slate-400">
                                                        {
                                                            topic
                                                                .subtopics
                                                                .length
                                                        }{" "}
                                                        {topic
                                                            .subtopics
                                                            .length ===
                                                        1
                                                            ? "lesson"
                                                            : "lessons"}
                                                    </span>
                                                </span>
                                            </Link>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Unit statistics */}
                            <div className="mt-5 border-t border-slate-100 pt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">
                                        Total lessons
                                    </span>

                                    <span className="font-bold text-slate-900">
                                        {
                                            totalLessons
                                        }
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <span className="text-slate-500">
                                        Your progress
                                    </span>

                                    <span className="font-bold text-indigo-600">
                                        {
                                            progressPercentage
                                        }
                                        %
                                    </span>
                                </div>

                                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-indigo-50">
                                    <div
                                        className="h-full rounded-full bg-indigo-600"
                                        style={{
                                            width: `${progressPercentage}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Navigation hint */}
                            <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-3 text-xs leading-5 text-indigo-700">
                                Click a topic above to
                                jump directly to its
                                lessons.
                            </div>
                        </div>
                    </aside>
                </div>

                {/* =================================================
                    FOOTER
                ================================================== */}

                <footer className="mt-8 border-t border-slate-200 pt-5">
                    <Link
                        href={`/learn/subjects/${subject.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                        ← Back to Subject
                    </Link>
                </footer>
            </div>
        </LearnLayout>
    );
}