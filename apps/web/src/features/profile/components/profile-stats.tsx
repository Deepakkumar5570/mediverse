type ProfileStatsProps = {
  totalLessons: number;
  completedLessons: number;
  percentage: number;
};

export function ProfileStats({
  totalLessons,
  completedLessons,
  percentage,
}: ProfileStatsProps) {
  const remaining = Math.max(totalLessons - completedLessons, 0);

  const stats = [
    {
      label: "Total Lessons",
      value: totalLessons,
      icon: "📚",
    },
    {
      label: "Completed",
      value: completedLessons,
      icon: "✓",
    },
    {
      label: "Remaining",
      value: remaining,
      icon: "🌱",
    },
    {
      label: "MCQs Attempted",
      value: "—",
      icon: "🧠",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>

              <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                {stat.value}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}