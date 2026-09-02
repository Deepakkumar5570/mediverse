import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { communityPosts } from "./community-post.schema";

export const communityComments = pgTable(
  "community_comments",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    postId: uuid("post_id")
      .notNull()
      .references(() => communityPosts.id, {
        onDelete: "cascade",
      }),

    authorId: text("author_id").notNull(),

    content: text("content").notNull(),

    status: varchar("status", {
      length: 20,
    })
      .notNull()
      .default("published"),

    createdAt: timestamp("created_at")
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    postIdIdx: index("community_comments_post_id_idx").on(
      table.postId,
    ),

    authorIdIdx: index(
      "community_comments_author_id_idx",
    ).on(table.authorId),
  }),
);

export type CommunityComment =
  typeof communityComments.$inferSelect;

export type NewCommunityComment =
  typeof communityComments.$inferInsert;