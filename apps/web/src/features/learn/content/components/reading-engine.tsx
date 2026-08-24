import { MarkdownContent } from "./markdown-content";
import { ProgressButton } from "@/src/features/progress/components/progress-button";

type Props = {
  contentId: string;
  title: string;
  summary?: string | null;
  content: string;
  readingTime: number;
  initialCompleted?: boolean;
};

export function ReadingEngine({
  contentId,
  title,
  summary,
  content,
  readingTime,
  initialCompleted = false,
}: Props) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Lesson Header */}
      <header className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-violet-50 px-6 py-7 md:px-10 md:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600">
                Lesson
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              {title}
            </h2>

            {summary && (
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                {summary}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              {readingTime} min read
            </span>

            {initialCompleted && (
              <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                ✓ Completed
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Lesson Content */}
      <div className="px-6 py-8 md:px-10 md:py-10 lg:px-12">
        <MarkdownContent content={content} />
      </div>

      {/* Completion */}
      <footer className="border-t border-slate-200 bg-slate-50/70 px-6 py-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Finished reading?
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Mark this lesson as completed to keep your progress updated.
            </p>
          </div>

          <ProgressButton
            contentId={contentId}
            initialCompleted={initialCompleted}
          />
        </div>
      </footer>
    </article>
  );
}