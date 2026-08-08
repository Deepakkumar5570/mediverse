import Link from "next/link";

type LessonNavigationItem = {
  id: string;
  title: string;
};

type Props = {
  previous: LessonNavigationItem | null;
  next: LessonNavigationItem | null;
};

export function LessonNavigation({
  previous,
  next,
}: Props) {
  return (
    <nav className="mt-10 grid gap-4 border-t pt-6 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/learn/subtopics/${previous.id}`}
          className="group rounded-xl border p-4 transition hover:bg-muted"
        >
          <span className="text-sm text-muted-foreground">
            Previous Lesson
          </span>

          <span className="mt-1 block font-medium group-hover:underline">
            ← {previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/learn/subtopics/${next.id}`}
          className="group rounded-xl border p-4 text-right transition hover:bg-muted"
        >
          <span className="text-sm text-muted-foreground">
            Next Lesson
          </span>

          <span className="mt-1 block font-medium group-hover:underline">
            {next.title} →
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}