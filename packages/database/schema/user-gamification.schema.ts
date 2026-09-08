import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userGamification = pgTable(
  "user_gamification",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id").notNull().unique(),

    totalXp: integer("total_xp").default(0).notNull(),

    level: integer("level").default(1).notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIndex: index("user_gamification_user_id_idx").on(
      table.userId,
    ),
  }),
);