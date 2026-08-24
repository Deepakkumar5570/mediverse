import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { subtopics } from "./subtopic.schema";

export const mcqs = pgTable("mcqs", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  subtopicId: uuid("subtopic_id")
    .references(() => subtopics.id, {
      onDelete: "cascade",
    })
    .notNull(),

  question: text("question").notNull(),

  optionA: text("option_a").notNull(),

  optionB: text("option_b").notNull(),

  optionC: text("option_c").notNull(),

  optionD: text("option_d").notNull(),

  correctOption: integer("correct_option")
    .notNull(),

  explanation: text("explanation"),

  difficulty: varchar("difficulty", {
    length: 20,
  })
    .default("medium")
    .notNull(),

  questionNumber: integer("question_number")
    .default(1)
    .notNull(),

  status: varchar("status", {
    length: 20,
  })
    .default("draft")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});