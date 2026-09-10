export const XP_REWARDS = {
  LESSON_COMPLETED: 10,

  MCQ_FIRST_ATTEMPT: 2,

  MCQ_FIRST_ATTEMPT_CORRECT: 5,

  PRACTICE_SESSION_COMPLETED: 10,
} as const;

export type XpEventType =
  | "lesson_completed"
  | "mcq_first_attempt"
  | "mcq_first_attempt_correct"
  | "practice_session_completed"
  | "achievement_unlocked";

export const LEVELS = [
  {
    level: 1,
    name: "Novice",
    minXp: 0,
  },
  {
    level: 2,
    name: "Learner",
    minXp: 100,
  },
  {
    level: 3,
    name: "Explorer",
    minXp: 300,
  },
  {
    level: 4,
    name: "Scholar",
    minXp: 700,
  },
  {
    level: 5,
    name: "Practitioner",
    minXp: 1500,
  },
  {
    level: 6,
    name: "Achiever",
    minXp: 3000,
  },
  {
    level: 7,
    name: "Expert",
    minXp: 6000,
  },
  {
    level: 8,
    name: "Master",
    minXp: 10000,
  },
] as const;

export function getLevelFromXp(xp: number) {
  let currentLevel: (typeof LEVELS)[number] =
    LEVELS[0];

  for (const level of LEVELS) {
    if (xp >= level.minXp) {
      currentLevel = level;
    } else {
      break;
    }
  }

  return currentLevel;
}

export function getNextLevel(xp: number) {
  return (
    LEVELS.find(
      (level) => level.minXp > xp,
    ) ?? null
  );
}

export function getLevelProgress(xp: number) {
  const current = getLevelFromXp(xp);
  const next = getNextLevel(xp);

  if (!next) {
    return {
      currentLevel: current.level,
      currentLevelName: current.name,
      nextLevel: null,
      nextLevelName: null,
      currentLevelXp: current.minXp,
      nextLevelXp: current.minXp,
      progress: 100,
      xpToNextLevel: 0,
    };
  }

  const range =
    next.minXp - current.minXp;

  const earned =
    xp - current.minXp;

  const progress = Math.min(
    100,
    Math.max(
      0,
      Math.round((earned / range) * 100),
    ),
  );

  return {
    currentLevel: current.level,
    currentLevelName: current.name,
    nextLevel: next.level,
    nextLevelName: next.name,
    currentLevelXp: current.minXp,
    nextLevelXp: next.minXp,
    progress,
    xpToNextLevel: next.minXp - xp,
  };
}