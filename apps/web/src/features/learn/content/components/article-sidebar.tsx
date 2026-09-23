"use client";

import Link from "next/link";
import { useState } from "react";

type LessonItem = {
    id: string;
    title: string;
    subtopicNumber: number;
};

type TopicGroup = {
    id: string;
    title: string;
    topicNumber: number;
    subtopics: LessonItem[];
};

type Props = {
    subjectId: string;
    unitId: string;
    unitTitle: string;
    subjectTitle: string;
    unitNumber: number;
    topicGroups: TopicGroup[];
    currentSubtopicId: string;
    completed: number;
    total: number;
    currentLessonCompleted: boolean;
};

function TopicIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
        >
            <rect
                x="3.5"
                y="3.5"
                width="13"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M7 7H13M7 10H13M7 13H10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

function LessonIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
        >
            <path
                d="M5.5 3.5H11.5L14.5 6.5V16.5H5.5V3.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
            <path
                d="M11.5 3.5V6.5H14.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
            <path
                d="M7.5 9H12.5M7.5 11.5H12.5M7.5 14H10.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function OverviewIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
        >
            <rect
                x="3.5"
                y="3.5"
                width="13"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M7 7H13M7 10H13M7 13H10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

function Chevron({
    open,
}: {
    open: boolean;
}) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className={[
                "h-4 w-4 shrink-0 transition-transform duration-200",
                open ? "rotate-180" : "",
            ].join(" ")}
        >
            <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ArticleSidebar({
    subjectId,
    unitId,
    unitTitle,
    subjectTitle,
    unitNumber,
    topicGroups,
    currentSubtopicId,
    completed,
    total,
    currentLessonCompleted,
}: Props) {
    const currentTopicId =
        topicGroups.find((topic) =>
            topic.subtopics.some(
                (item) =>
                    item.id ===
                    currentSubtopicId,
            ),
        )?.id ?? null;

    const [openTopicId, setOpenTopicId] =
        useState<string | null>(
            currentTopicId,
        );

    const percentage =
        total > 0
            ? Math.round(
                  (completed / total) *
                      100,
              )
            : 0;

    function toggleTopic(
        topicId: string,
    ) {
        setOpenTopicId((current) =>
            current === topicId
                ? null
                : topicId,
        );
    }

    return (
        <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-24">
                <div className="flex max-h-[calc(100vh-7rem)] flex-col">
                    {/* Back */}
                    <div className="shrink-0 pb-4">
                        <Link
                            href={`/learn/subjects/${subjectId}`}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-950"
                        >
                            <span
                                aria-hidden="true"
                                className="text-sm"
                            >
                                ←
                            </span>
                            Back to Subject
                        </Link>
                    </div>

                    {/* Unit */}
                    <div className="shrink-0 border-b border-slate-200 pb-4">
                        <h2 className="text-[15px] font-bold leading-5 text-slate-950">
                            {unitTitle}
                        </h2>

                        <p className="mt-1 text-[11px] leading-4 text-slate-500">
                            Unit {unitNumber}{" "}
                            · {subjectTitle}
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="shrink-0 border-b border-slate-200 py-4">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-[11px] font-medium text-slate-500">
                                Your progress
                            </span>

                            <span className="text-[11px] font-semibold text-slate-700">
                                {completed}/
                                {total}
                            </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-violet-600 transition-all"
                                style={{
                                    width: `${percentage}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Curriculum */}
                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
                        <div className="py-3">
                            {/* Overview */}
                            <Link
                                href={`/learn/units/${unitId}`}
                                className="group mb-1 flex min-h-10 items-center gap-2.5 px-2.5 text-[13px] font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                            >
                                <OverviewIcon />

                                <span>
                                    Overview
                                </span>
                            </Link>

                            {/* Topics */}
                            <div>
                                {topicGroups.map(
                                    (
                                        topicGroup,
                                    ) => {
                                        const isOpen =
                                            openTopicId ===
                                            topicGroup.id;

                                        const isCurrentTopic =
                                            topicGroup.subtopics.some(
                                                (
                                                    item,
                                                ) =>
                                                    item.id ===
                                                    currentSubtopicId,
                                            );

                                        return (
                                            <div
                                                key={
                                                    topicGroup.id
                                                }
                                                className="border-t border-slate-100"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleTopic(
                                                            topicGroup.id,
                                                        )
                                                    }
                                                    aria-expanded={
                                                        isOpen
                                                    }
                                                    className={[
                                                        "group flex w-full items-center gap-2.5 px-2.5 py-3 text-left",
                                                        "text-[13px] font-semibold transition",
                                                        isOpen ||
                                                        isCurrentTopic
                                                            ? "text-slate-950"
                                                            : "text-slate-700",
                                                        "hover:bg-slate-50",
                                                    ].join(
                                                        " ",
                                                    )}
                                                >
                                                    <span
                                                        className={
                                                            isOpen ||
                                                            isCurrentTopic
                                                                ? "text-violet-600"
                                                                : "text-slate-400"
                                                        }
                                                    >
                                                        <TopicIcon />
                                                    </span>

                                                    <span className="min-w-0 flex-1 truncate">
                                                        {
                                                            topicGroup.title
                                                        }
                                                    </span>

                                                    <Chevron
                                                        open={
                                                            isOpen
                                                        }
                                                    />
                                                </button>

                                                {isOpen && (
                                                    <div className="relative pb-2 pl-3">
                                                        <div className="absolute bottom-2 left-[18px] top-0 w-px bg-slate-200" />

                                                        {topicGroup.subtopics.map(
                                                            (
                                                                item,
                                                            ) => {
                                                                const isCurrent =
                                                                    item.id ===
                                                                    currentSubtopicId;

                                                                return (
                                                                    <Link
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        href={`/learn/subtopics/${item.id}`}
                                                                        aria-current={
                                                                            isCurrent
                                                                                ? "page"
                                                                                : undefined
                                                                        }
                                                                        className={[
                                                                            "group relative flex items-start gap-2 px-2.5 py-2.5 pl-5",
                                                                            "text-[12px] leading-4 transition",
                                                                            isCurrent
                                                                                ? "bg-violet-50 font-semibold text-violet-700"
                                                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                                                                        ].join(
                                                                            " ",
                                                                        )}
                                                                    >
                                                                        {isCurrent && (
                                                                            <span
                                                                                aria-hidden="true"
                                                                                className="absolute bottom-1 left-0 top-1 w-0.5 rounded-full bg-violet-600"
                                                                            />
                                                                        )}

                                                                        <span
                                                                            className={[
                                                                                "mt-0.5",
                                                                                isCurrent
                                                                                    ? "text-violet-600"
                                                                                    : "text-slate-400",
                                                                            ].join(
                                                                                " ",
                                                                            )}
                                                                        >
                                                                            <LessonIcon />
                                                                        </span>

                                                                        <span className="min-w-0 flex-1">
                                                                            <span className="mr-1.5 text-[9px] font-semibold text-slate-400">
                                                                                {String(
                                                                                    item.subtopicNumber,
                                                                                ).padStart(
                                                                                    2,
                                                                                    "0",
                                                                                )}
                                                                            </span>

                                                                            {
                                                                                item.title
                                                                            }
                                                                        </span>

                                                                        {isCurrent &&
                                                                            currentLessonCompleted && (
                                                                                <span
                                                                                    aria-label="Completed"
                                                                                    className="mt-0.5 shrink-0 text-[11px] font-bold text-emerald-600"
                                                                                >
                                                                                    ✓
                                                                                </span>
                                                                            )}
                                                                    </Link>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Download */}
                    <div className="shrink-0 border-t border-slate-200 pt-3">
                        <button
                            type="button"
                            className="flex w-full items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 text-left text-[12px] font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            <span>
                                Download Notes
                            </span>

                            <span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-bold text-slate-400 shadow-sm">
                                PDF
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}