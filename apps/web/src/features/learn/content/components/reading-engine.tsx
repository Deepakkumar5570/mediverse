import { MarkdownContent } from "./markdown-content";

type Props = {
  title: string;
  summary?: string | null;
  content: string;
  readingTime: number;
};

export function ReadingEngine({
  title,
  summary,
  content,
  readingTime,
}: Props) {
  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          <span className="text-sm text-muted-foreground">
            {readingTime} min read
          </span>
        </div>

        {summary && (
          <p className="text-muted-foreground">
            {summary}
          </p>
        )}
      </header>

      <MarkdownContent
        content={content}
      />
    </section>
  );
}