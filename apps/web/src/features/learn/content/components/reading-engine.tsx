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
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          <span className="shrink-0 text-sm text-muted-foreground">
            {readingTime} min read
          </span>
        </div>

        {summary && (
          <p className="text-muted-foreground">
            {summary}
          </p>
        )}
      </header>

      <MarkdownContent content={content} />

      <div className="flex justify-end border-t pt-6">
        <ProgressButton
          contentId={contentId}
          initialCompleted={initialCompleted}
        />
      </div>
    </section>
  );
}