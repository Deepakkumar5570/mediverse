import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { subtopics } from "./subtopic.schema";

export const contents = pgTable("contents", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  subtopicId: uuid("subtopic_id")
    .references(() => subtopics.id, {
      onDelete: "cascade",
    })
    .notNull(),

  title: varchar("title", {
    length: 250,
  }).notNull(),

  slug: varchar("slug", {
    length: 300,
  })
    .unique()
    .notNull(),

  summary: text("summary"),

  content: text("content").notNull(),

  readingTime: integer("reading_time")
    .default(1)
    .notNull(),

  seoTitle: varchar("seo_title", {
    length: 250,
  }),

  seoDescription: text("seo_description"),

  status: varchar("status", {
    length: 20,
  })
    .$default(() => "draft")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});