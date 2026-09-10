import {
  index,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const userAchievements = pgTable(
  "user_achievements",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id").notNull(),

    achievementKey: text("achievement_key").notNull(),

    unlockedAt: timestamp("unlocked_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIndex: index(
      "user_achievements_user_id_idx",
    ).on(table.userId),

    achievementKeyIndex: index(
      "user_achievements_achievement_key_idx",
    ).on(table.achievementKey),

    userAchievementUnique: unique(
      "user_achievements_user_id_key_unique",
    ).on(
      table.userId,
      table.achievementKey,
    ),
  }),
);