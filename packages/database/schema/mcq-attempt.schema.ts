import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { mcqs } from "./mcq.schema";
import { practiceSessions } from "./practice-session.schema";

export const mcqAttempts = pgTable(
  "mcq_attempts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    sessionId: uuid("session_id")
      .references(() => practiceSessions.id, {
        onDelete: "cascade",
      })
      .notNull(),

    userId: text("user_id").notNull(),

    mcqId: uuid("mcq_id")
      .references(() => mcqs.id, {
        onDelete: "cascade",
      })
      .notNull(),

    selectedOption: integer("selected_option").notNull(),

    correct: boolean("correct").notNull(),

    timeTaken: integer("time_taken"),

    attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index("mcq_attempts_user_id_idx").on(
      table.userId,
    ),

    sessionIdIndex: index("mcq_attempts_session_id_idx").on(
      table.sessionId,
    ),

    mcqIdIndex: index("mcq_attempts_mcq_id_idx").on(
      table.mcqId,
    ),

    attemptedAtIndex: index("mcq_attempts_attempted_at_idx").on(
      table.attemptedAt,
    ),
  }),
);