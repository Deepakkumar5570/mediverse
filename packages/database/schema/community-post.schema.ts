import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const communityPosts = pgTable("community_posts", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  authorId: text("author_id").notNull(),

  title: varchar("title", {
    length: 200,
  }).notNull(),

  content: text("content").notNull(),

  category: varchar("category", {
    length: 50,
  })
    .default("general")
    .notNull(),

  status: varchar("status", {
    length: 20,
  })
    .default("published")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});