import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { contents } from "./content.schema";

export const flashcards = pgTable("flashcards", {
  id: uuid("id").defaultRandom().primaryKey(),

  contentId: uuid("content_id")
    .notNull()
    .references(() => contents.id, {
      onDelete: "cascade",
    }),

  question: text("question").notNull(),

  answer: text("answer").notNull(),

  cardNumber: integer("card_number").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});