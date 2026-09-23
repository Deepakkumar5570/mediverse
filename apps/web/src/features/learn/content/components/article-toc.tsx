"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LessonItem = {
    id: string;
    title: string;
};

type TocItem = {
    id: string;
    text: string;
    level: 2 | 3;
};

type Props = {
    articleId: string;
    practiceHref: string;
    nextLesson: LessonItem | null;
    previousLesson: LessonItem | null;
    flashcardsAvailable: boolean;
};

function FlashcardIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="h-5 w-5"
        >
            <rect
                x="4"
                y="5"
                width="13"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path
                d="M8 9H13M8 12H11"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
            <path
                d="M7 19H17C18.1 19 19 18.1 19 17V9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
        </svg>
    );
}

function McqIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="h-5 w-5"
        >
            <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path
                d="M8 9H16M8 12H13M8 15H15"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
        </svg>
    );
}

function AiIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="h-5 w-5"
        >
            <path
                d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
            <path
                d="M18 15L18.7 17.3L21 18L18.7 18.7L18 21L17.3 18.7L15 18L17.3 17.3L18 15Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ArticleToc({
    articleId,
    practiceHref,
    nextLesson,
    previousLesson,
    flashcardsAvailable,
}: Props) {
    const [items, setItems] = useState<
        TocItem[]
    >([]);

    const [activeId, setActiveId] =
        useState("");

    useEffect(() => {
        const article =
            document.getElementById(
                articleId,
            );

        if (!article) {
            return;
        }

        const headings =
            Array.from(
                article.querySelectorAll<HTMLHeadingElement>(
                    "h2, h3",
                ),
            );

        const usedIds = new Set<string>();

        function slugify(text: string) {
            const slug = text
                .toLowerCase()
                .trim()
                .replace(
                    /[^\p{L}\p{N}\s-]/gu,
                    "",
                )
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

            return slug || "section";
        }

        const tocItems =
            headings.map(
                (heading, index) => {
                    let id =
                        heading.id ||
                        slugify(
                            heading.textContent ??
                                "",
                        );

                    while (
                        usedIds.has(id)
                    ) {
                        id = `${id}-${index + 1}`;
                    }

                    usedIds.add(id);
                    heading.id = id;

                    return {
                        id,
                        text:
                            heading.textContent?.trim() ||
                            "Section",
                        level:
                            heading.tagName ===
                            "H3"
                                ? (3 as const)
                                : (2 as const),
                    };
                },
            );

        const frameId = window.requestAnimationFrame(() => {
            setItems(tocItems);
            setActiveId(tocItems[0]?.id ?? "");
        });

        const observer =
            new IntersectionObserver(
                (entries) => {
                    const visible =
                        entries
                            .filter(
                                (
                                    entry,
                                ) =>
                                    entry.isIntersecting,
                            )
                            .sort(
                                (
                                    a,
                                    b,
                                ) =>
                                    a.boundingClientRect
                                        .top -
                                    b.boundingClientRect
                                        .top,
                            );

                    if (
                        visible.length >
                        0
                    ) {
                        setActiveId(
                            visible[0]
                                .target
                                .id,
                        );
                    }
                },
                {
                    rootMargin:
                        "-100px 0px -65% 0px",
                    threshold: 0,
                },
            );

        headings.forEach(
            (heading) =>
                observer.observe(
                    heading,
                ),
        );

        return () => {
            window.cancelAnimationFrame(frameId);
            observer.disconnect();
        };
    }, [articleId]);

    const hasQuickActions =
        flashcardsAvailable ||
        Boolean(practiceHref);

    const hasNavigation =
        Boolean(nextLesson) ||
        Boolean(previousLesson);

    const hasContent =
        items.length > 0 ||
        hasQuickActions ||
        hasNavigation;

    if (!hasContent) {
        return null;
    }

    return (
        <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-24">
                <div className="max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
                    {/* ON THIS PAGE */}
                    {items.length > 0 && (
                        <section className="rounded-xl border border-slate-200 bg-white p-4">
                            <p className="mb-4 text-[12px] font-bold text-slate-950">
                                On this page
                            </p>

                            <nav aria-label="On this page">
                                <div className="border-l border-slate-200">
                                    {items.map(
                                        (
                                            item,
                                        ) => {
                                            const active =
                                                activeId ===
                                                item.id;

                                            return (
                                                <a
                                                    key={
                                                        item.id
                                                    }
                                                    href={`#${item.id}`}
                                                    className={[
                                                        "relative block py-1.5 text-[12px] leading-5 transition",
                                                        item.level ===
                                                        3
                                                            ? "pl-5"
                                                            : "pl-3",
                                                        active
                                                            ? "font-semibold text-violet-600"
                                                            : "text-slate-500 hover:text-slate-900",
                                                    ].join(
                                                        " ",
                                                    )}
                                                >
                                                    {active && (
                                                        <span
                                                            aria-hidden="true"
                                                            className="absolute -left-px inset-y-0 w-0.5 rounded-full bg-violet-600"
                                                        />
                                                    )}

                                                    {item.text}
                                                </a>
                                            );
                                        },
                                    )}
                                </div>
                            </nav>
                        </section>
                    )}

                    {/* QUICK ACTIONS */}
                    {hasQuickActions && (
                        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                            <p className="mb-3 text-[12px] font-bold text-slate-950">
                                Quick Actions
                            </p>

                            <div className="space-y-2">
                                {flashcardsAvailable && (
                                    <a
                                        href="#flashcards"
                                        className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-emerald-200 hover:bg-emerald-50"
                                    >
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                            <FlashcardIcon />
                                        </span>

                                        <span className="min-w-0">
                                            <span className="block text-[12px] font-bold text-slate-900">
                                                Flashcards
                                            </span>

                                            <span className="mt-0.5 block text-[11px] text-slate-500">
                                                Revise key concepts
                                            </span>
                                        </span>

                                        <span className="ml-auto text-slate-300 transition group-hover:text-emerald-500">
                                            →
                                        </span>
                                    </a>
                                )}

                                {practiceHref && (
                                    <Link
                                        href={
                                            practiceHref
                                        }
                                        className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-violet-200 hover:bg-violet-50"
                                    >
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                            <McqIcon />
                                        </span>

                                        <span className="min-w-0">
                                            <span className="block text-[12px] font-bold text-slate-900">
                                                Practice MCQs
                                            </span>

                                            <span className="mt-0.5 block text-[11px] text-slate-500">
                                                Test your understanding
                                            </span>
                                        </span>

                                        <span className="ml-auto text-slate-300 transition group-hover:text-violet-500">
                                            →
                                        </span>
                                    </Link>
                                )}

                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                                        <AiIcon />
                                    </span>

                                    <span className="min-w-0">
                                        <span className="flex items-center gap-1.5 text-[12px] font-bold text-slate-900">
                                            Ask AI
                                            <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-orange-600">
                                                Soon
                                            </span>
                                        </span>

                                        <span className="mt-0.5 block text-[11px] text-slate-500">
                                            Get instant explanations
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* NEXT LESSON */}
                    {hasNavigation && (
                        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                            <p className="text-[11px] font-semibold text-slate-400">
                                Next Lesson
                            </p>

                            {nextLesson && (
                                <Link
                                    href={`/learn/subtopics/${nextLesson.id}`}
                                    className="group mt-2 flex items-center justify-between gap-3"
                                >
                                    <span className="min-w-0">
                                        <span className="block text-[13px] font-bold leading-5 text-slate-900 transition group-hover:text-violet-600">
                                            {
                                                nextLesson.title
                                            }
                                        </span>

                                        <span className="mt-1 block text-[11px] text-slate-500">
                                            Continue learning
                                            →
                                        </span>
                                    </span>

                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 transition group-hover:bg-violet-100">
                                        →
                                    </span>
                                </Link>
                            )}

                            {(previousLesson ||
                                nextLesson) && (
                                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                                    {previousLesson ? (
                                        <Link
                                            href={`/learn/subtopics/${previousLesson.id}`}
                                            className="text-[11px] font-semibold text-slate-500 transition hover:text-violet-600"
                                        >
                                            ←
                                            Previous
                                        </Link>
                                    ) : (
                                        <span />
                                    )}

                                    {nextLesson ? (
                                        <Link
                                            href={`/learn/subtopics/${nextLesson.id}`}
                                            className="text-[11px] font-semibold text-violet-600 transition hover:text-violet-700"
                                        >
                                            Next
                                            →
                                        </Link>
                                    ) : (
                                        <span />
                                    )}
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </aside>
    );
}