import type { ActivityDay } from "../services/activity.service";

type ActivityCalendarProps = {
  activityDays: ActivityDay[];
};

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getUtcStartOfWeek(date: Date) {
  const day = date.getUTCDay();

  const mondayOffset =
    day === 0 ? 6 : day - 1;

  const result = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
    ),
  );

  result.setUTCDate(
    result.getUTCDate() -
      mondayOffset,
  );

  return result;
}

function getActivityClass(
  count: number,
) {
  if (count === 0) {
    return "bg-slate-100";
  }

  if (count <= 2) {
    return "bg-emerald-100";
  }

  if (count <= 5) {
    return "bg-emerald-300";
  }

  if (count <= 10) {
    return "bg-emerald-500";
  }

  return "bg-emerald-700";
}

export function ActivityCalendar({
  activityDays,
}: ActivityCalendarProps) {
  const activityMap = new Map(
    activityDays.map((activity) => [
      activity.date,
      activity,
    ]),
  );

  const today = new Date();

  const currentWeekStart =
    getUtcStartOfWeek(today);

  const startDate = new Date(
    currentWeekStart,
  );

  startDate.setUTCDate(
    startDate.getUTCDate() -
      11 * 7,
  );

  const days: Array<{
    date: string;
    activity: ActivityDay | null;
  }> = [];

  for (let index = 0; index < 84; index++) {
    const date = new Date(startDate);

    date.setUTCDate(
      date.getUTCDate() + index,
    );

    const dateKey = toDateKey(date);

    days.push({
      date: dateKey,
      activity:
        activityMap.get(dateKey) ?? null,
    });
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Activity
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            Your learning activity
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Lessons completed and MCQs attempted over the last 12 weeks.
          </p>
        </div>

        <div className="text-sm font-semibold text-slate-500">
          {activityDays.length} active days
        </div>
      </div>

      <div className="mt-7 overflow-x-auto">
        <div className="flex min-w-[560px] gap-3">
          {/* Weekday labels */}
          <div className="grid grid-rows-7 gap-1 pt-1">
            <span className="text-[10px] font-bold text-slate-400">
              M
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              T
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              W
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              T
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              F
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              S
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              S
            </span>
          </div>

          {/* Calendar */}
          <div className="grid auto-cols-fr grid-flow-col grid-rows-7 gap-1">
            {days.map((day) => {
              const count =
                day.activity?.count ?? 0;

              const label =
                count === 0
                  ? `${day.date}: No activity`
                  : `${day.date}: ${count} ${
                      count === 1
                        ? "activity"
                        : "activities"
                    }`;

              return (
                <div
                  key={day.date}
                  title={label}
                  className={`h-3.5 w-3.5 rounded-[4px] ${getActivityClass(
                    count,
                  )}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <span className="text-xs text-slate-400">
          Less
        </span>

        <span className="h-3.5 w-3.5 rounded-[4px] bg-slate-100" />
        <span className="h-3.5 w-3.5 rounded-[4px] bg-emerald-100" />
        <span className="h-3.5 w-3.5 rounded-[4px] bg-emerald-300" />
        <span className="h-3.5 w-3.5 rounded-[4px] bg-emerald-500" />
        <span className="h-3.5 w-3.5 rounded-[4px] bg-emerald-700" />

        <span className="text-xs text-slate-400">
          More
        </span>
      </div>
    </section>
  );
}