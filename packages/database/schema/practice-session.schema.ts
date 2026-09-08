import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const practiceSessions = pgTable(
  "practice_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id").notNull(),

    mode: varchar("mode", { length: 20 }).notNull(),

    totalQuestions: integer("total_questions").default(0).notNull(),

    correctAnswers: integer("correct_answers").default(0).notNull(),

    wrongAnswers: integer("wrong_answers").default(0).notNull(),

    startedAt: timestamp("started_at").defaultNow().notNull(),

    completedAt: timestamp("completed_at"),
  },
  (table) => ({
    userIdIndex: index("practice_sessions_user_id_idx").on(
      table.userId,
    ),

    startedAtIndex: index("practice_sessions_started_at_idx").on(
      table.startedAt,
    ),
  }),
);