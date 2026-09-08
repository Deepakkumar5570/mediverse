type Props = {
  summary: {
    total: number;
    completed: number;
    remaining: number;
    percentage: number;
  };

  mcqStats: {
    attempted: number;
    correct: number;
    wrong: number;
    accuracy: number;
  };
};

export function ProfileStats({
  summary,
  mcqStats,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">
          Total Lessons
        </p>

        <p className="mt-2 text-3xl font-black text-slate-950">
          {summary.total}
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">
          Completed
        </p>

        <p className="mt-2 text-3xl font-black text-emerald-600">
          {summary.completed}
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">
          Remaining
        </p>

        <p className="mt-2 text-3xl font-black text-orange-600">
          {summary.remaining}
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">
          MCQs Attempted
        </p>

        <p className="mt-2 text-3xl font-black text-indigo-600">
          {mcqStats.attempted}
        </p>
      </div>
    </div>
  );
}