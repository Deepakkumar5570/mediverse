import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { topics } from "./topic.schema";

export const subtopics = pgTable("subtopics", {
  id: uuid("id").defaultRandom().primaryKey(),

  topicId: uuid("topic_id")
    .notNull()
    .references(() => topics.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  slug: text("slug").notNull().unique(),

  subtopicNumber: integer("subtopic_number").notNull(),

  description: text("description"),

  status: text("status")
    .$type<"active" | "inactive">()
    .default("active")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});