import {
  getActivityTimestampsRepository,
} from "../repositories/activity.repository";

export type ActivityDay = {
  date: string;
  count: number;
  lessonCount: number;
  mcqCount: number;
};

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getDayNumber(dateKey: string) {
  const [year, month, day] =
    dateKey.split("-").map(Number);

  return (
    Date.UTC(
      year,
      month - 1,
      day,
    ) / 86_400_000
  );
}

function getPreviousDateKey(dateKey: string) {
  const dayNumber =
    getDayNumber(dateKey) - 1;

  return new Date(
    dayNumber * 86_400_000,
  )
    .toISOString()
    .slice(0, 10);
}

function calculateLongestStreak(
  dates: string[],
) {
  if (dates.length === 0) {
    return 0;
  }

  let longest = 1;
  let current = 1;

  for (let index = 1; index < dates.length; index++) {
    const previousDay = getDayNumber(
      dates[index - 1],
    );

    const currentDay = getDayNumber(
      dates[index],
    );

    if (
      currentDay === previousDay + 1
    ) {
      current += 1;
      longest = Math.max(
        longest,
        current,
      );
    } else {
      current = 1;
    }
  }

  return longest;
}

function calculateCurrentStreak(
  dates: string[],
) {
  if (dates.length === 0) {
    return 0;
  }

  const activeDates = new Set(dates);

  const today = toDateKey(new Date());

  const yesterday =
    getPreviousDateKey(today);

  let cursor: string | null = null;

  if (activeDates.has(today)) {
    cursor = today;
  } else if (activeDates.has(yesterday)) {
    cursor = yesterday;
  }

  if (!cursor) {
    return 0;
  }

  let streak = 0;

  while (activeDates.has(cursor)) {
    streak += 1;
    cursor = getPreviousDateKey(cursor);
  }

  return streak;
}

export async function getActivityStatsService(
  userId: string,
) {
  const {
    lessonActivity,
    mcqActivity,
  } =
    await getActivityTimestampsRepository(
      userId,
    );

  const activityMap = new Map<
    string,
    ActivityDay
  >();

  for (const date of lessonActivity) {
    const dateKey = toDateKey(date);

    const existing =
      activityMap.get(dateKey);

    if (existing) {
      existing.count += 1;
      existing.lessonCount += 1;
    } else {
      activityMap.set(dateKey, {
        date: dateKey,
        count: 1,
        lessonCount: 1,
        mcqCount: 0,
      });
    }
  }

  for (const date of mcqActivity) {
    const dateKey = toDateKey(date);

    const existing =
      activityMap.get(dateKey);

    if (existing) {
      existing.count += 1;
      existing.mcqCount += 1;
    } else {
      activityMap.set(dateKey, {
        date: dateKey,
        count: 1,
        lessonCount: 0,
        mcqCount: 1,
      });
    }
  }

  const activityDays = Array.from(
    activityMap.values(),
  ).sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  const activeDates =
    activityDays.map(
      (activity) => activity.date,
    );

  return {
    currentStreak:
      calculateCurrentStreak(
        activeDates,
      ),

    longestStreak:
      calculateLongestStreak(
        activeDates,
      ),

    totalActiveDays:
      activeDates.length,

    activityDays,
  };
}