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
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Lesson navigation"
      className="mt-14 grid gap-8 border-t border-slate-200 pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/learn/subtopics/${previous.id}`}
          className="group"
        >
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
            Previous lesson
          </span>

          <span className="mt-2 block text-sm font-semibold leading-6 text-slate-800 group-hover:text-indigo-600">
            ← {previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/learn/subtopics/${next.id}`}
          className="group text-left sm:text-right"
        >
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
            Next lesson
          </span>

          <span className="mt-2 block text-sm font-semibold leading-6 text-slate-800 group-hover:text-indigo-600">
            {next.title} →
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}