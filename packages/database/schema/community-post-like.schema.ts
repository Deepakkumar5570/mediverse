import {
  pgTable,
  uuid,
  text,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

import { communityPosts } from "./community-post.schema";

export const communityPostLikes = pgTable(
  "community_post_likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    postId: uuid("post_id")
      .notNull()
      .references(() => communityPosts.id, {
        onDelete: "cascade",
      }),

    userId: text("user_id").notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    postUserUnique: unique(
      "community_post_likes_post_user_unique",
    ).on(table.postId, table.userId),

    postIdIdx: index(
      "community_post_likes_post_id_idx",
    ).on(table.postId),

    userIdIdx: index(
      "community_post_likes_user_id_idx",
    ).on(table.userId),
  }),
);

export type CommunityPostLike =
  typeof communityPostLikes.$inferSelect;

export type NewCommunityPostLike =
  typeof communityPostLikes.$inferInsert;