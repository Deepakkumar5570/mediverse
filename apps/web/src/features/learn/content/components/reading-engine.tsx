import { MarkdownContent } from "./markdown-content";
import { ProgressButton } from "@/src/features/progress/components/progress-button";

type Props = {
    contentId: string;
    title: string;
    summary?: string | null;
    content: string;
    readingTime: number;
    initialCompleted?: boolean;
    updatedAt?: Date | string | null;
};

function formatUpdatedDate(
    value?: Date | string | null,
) {
    if (!value) {
        return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function ReadingEngine({
    contentId,
    title,
    summary,
    content,
    readingTime,
    initialCompleted = false,
    updatedAt,
}: Props) {
    const formattedDate =
        formatUpdatedDate(updatedAt);

    return (
        <article className="min-w-0">
            {/* Lesson Header */}
            <header className="border-b border-slate-200 pb-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                    Lesson
                </p>

                <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-slate-950 md:text-[2.75rem] md:leading-[1.12]">
                    {title}
                </h1>

                {summary && (
                    <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                        {summary}
                    </p>
                )}

                {/* Lesson metadata */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                        <span aria-hidden="true">
                            ◷
                        </span>
                        {readingTime} min read
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                        <span aria-hidden="true">
                            ▥
                        </span>
                        Beginner
                    </span>

                    {formattedDate && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                            <span aria-hidden="true">
                                □
                            </span>
                            Updated{" "}
                            {formattedDate}
                        </span>
                    )}

                    {initialCompleted && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                            <span aria-hidden="true">
                                ✓
                            </span>
                            Completed
                        </span>
                    )}
                </div>
            </header>

            {/* Article */}
            <div
                id="article-content"
                className="pt-8 md:pt-10"
            >
                <MarkdownContent
                    content={content}
                />
            </div>

            {/* Lesson Completion */}
            <div
                id="lesson-completion"
                className="mt-14 scroll-mt-24 border-t border-slate-200 pt-7"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-bold text-slate-950">
                            Finished this lesson?
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Mark it complete to
                            keep your learning
                            progress updated.
                        </p>
                    </div>

                    <ProgressButton
                        contentId={contentId}
                        initialCompleted={
                            initialCompleted
                        }
                    />
                </div>
            </div>
        </article>
    );
}