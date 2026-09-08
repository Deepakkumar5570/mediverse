type Props = {
  totalXp: number;
  level: number;
  levelName: string;
  progress: number;
  xpToNextLevel: number;
  nextLevelName: string | null;
};

export function XpCard({
  totalXp,
  level,
  levelName,
  progress,
  xpToNextLevel,
  nextLevelName,
}: Props) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Your journey
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            Level {level} · {levelName}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Keep learning to unlock new levels,
            badges and achievements.
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-right">
          <p className="text-2xl font-black text-indigo-700">
            {totalXp.toLocaleString()}
          </p>

          <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            XP
          </p>
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-600">
            Level progress
          </span>

          <span className="font-black text-slate-950">
            {progress}%
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {nextLevelName ? (
          <p className="mt-3 text-sm text-slate-500">
            {xpToNextLevel.toLocaleString()} XP
            to reach{" "}
            <span className="font-bold text-slate-700">
              {nextLevelName}
            </span>
          </p>
        ) : (
          <p className="mt-3 text-sm font-bold text-emerald-600">
            🏆 Maximum level reached
          </p>
        )}
      </div>
    </section>
  );
}