export type AchievementCategory =
  | "streak"
  | "lesson"
  | "mcq";

export type AchievementDefinition = {
  key: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  requirement: number;
  xpReward: number;
};

export const ACHIEVEMENTS: AchievementDefinition[] = [
  // -------------------------
  // STREAK
  // -------------------------

  {
    key: "streak_3",
    title: "3 Day Streak",
    description:
      "You maintained a 3-day learning streak.",
    category: "streak",
    icon: "🔥",
    requirement: 3,
    xpReward: 25,
  },

  {
    key: "streak_7",
    title: "7 Day Streak",
    description:
      "You maintained a 7-day learning streak.",
    category: "streak",
    icon: "🔥",
    requirement: 7,
    xpReward: 50,
  },

  {
    key: "streak_14",
    title: "14 Day Streak",
    description:
      "You maintained a 14-day learning streak.",
    category: "streak",
    icon: "🔥",
    requirement: 14,
    xpReward: 0,
  },

  {
    key: "streak_30",
    title: "30 Day Streak",
    description:
      "You maintained a 30-day learning streak.",
    category: "streak",
    icon: "🔥",
    requirement: 30,
    xpReward: 200,
  },

  {
    key: "streak_50",
    title: "50 Day Learner",
    description:
      "You maintained a 50-day learning streak.",
    category: "streak",
    icon: "🔥",
    requirement: 50,
    xpReward: 500,
  },

  {
    key: "streak_100",
    title: "100 Day Streak",
    description:
      "You maintained a 100-day learning streak.",
    category: "streak",
    icon: "🔥",
    requirement: 100,
    xpReward: 0,
  },

  {
    key: "streak_365",
    title: "365 Day Streak",
    description:
      "You maintained a 365-day learning streak.",
    category: "streak",
    icon: "👑",
    requirement: 365,
    xpReward: 0,
  },

  // -------------------------
  // LESSONS
  // -------------------------

  {
    key: "lesson_1",
    title: "First Lesson",
    description:
      "You completed your first lesson.",
    category: "lesson",
    icon: "📚",
    requirement: 1,
    xpReward: 0,
  },

  {
    key: "lesson_10",
    title: "Getting Started",
    description:
      "You completed 10 lessons.",
    category: "lesson",
    icon: "📚",
    requirement: 10,
    xpReward: 0,
  },

  {
    key: "lesson_25",
    title: "Consistent Learner",
    description:
      "You completed 25 lessons.",
    category: "lesson",
    icon: "📚",
    requirement: 25,
    xpReward: 0,
  },

  {
    key: "lesson_50",
    title: "Knowledge Builder",
    description:
      "You completed 50 lessons.",
    category: "lesson",
    icon: "📚",
    requirement: 50,
    xpReward: 0,
  },

  {
    key: "lesson_100",
    title: "Scholar",
    description:
      "You completed 100 lessons.",
    category: "lesson",
    icon: "🎓",
    requirement: 100,
    xpReward: 0,
  },

  {
    key: "lesson_500",
    title: "Medical Master",
    description:
      "You completed 500 lessons.",
    category: "lesson",
    icon: "🏆",
    requirement: 500,
    xpReward: 0,
  },

  // -------------------------
  // MCQ
  // -------------------------

  {
    key: "mcq_1",
    title: "First Practice",
    description:
      "You attempted your first MCQ.",
    category: "mcq",
    icon: "🧠",
    requirement: 1,
    xpReward: 0,
  },

  {
    key: "mcq_10",
    title: "Curious Mind",
    description:
      "You attempted 10 MCQs.",
    category: "mcq",
    icon: "🧠",
    requirement: 10,
    xpReward: 0,
  },

  {
    key: "mcq_50",
    title: "Practice Mode",
    description:
      "You attempted 50 MCQs.",
    category: "mcq",
    icon: "🧠",
    requirement: 50,
    xpReward: 0,
  },

  {
    key: "mcq_100",
    title: "Question Hunter",
    description:
      "You attempted 100 MCQs.",
    category: "mcq",
    icon: "🎯",
    requirement: 100,
    xpReward: 0,
  },

  {
    key: "mcq_500",
    title: "Knowledge Seeker",
    description:
      "You attempted 500 MCQs.",
    category: "mcq",
    icon: "🎯",
    requirement: 500,
    xpReward: 0,
  },

  {
    key: "mcq_1000",
    title: "MCQ Master",
    description:
      "You attempted 1000 MCQs.",
    category: "mcq",
    icon: "🏆",
    requirement: 1000,
    xpReward: 0,
  },

  {
    key: "mcq_correct_10",
    title: "Sharp Mind",
    description:
      "You answered 10 MCQs correctly.",
    category: "mcq",
    icon: "⚡",
    requirement: 10,
    xpReward: 0,
  },

  {
    key: "mcq_accuracy_80",
    title: "Accuracy Pro",
    description:
      "You maintained 80%+ accuracy across 100 attempts.",
    category: "mcq",
    icon: "🎯",
    requirement: 80,
    xpReward: 0,
  },

  {
    key: "perfect_session",
    title: "Perfect Session",
    description:
      "You completed a practice session with 100% accuracy.",
    category: "mcq",
    icon: "💯",
    requirement: 100,
    xpReward: 0,
  },
];