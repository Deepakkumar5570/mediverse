import {
  pgTable,
  uuid,
  text,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

import { communityComments } from "./community-comment.schema";

export const communityCommentLikes = pgTable(
  "community_comment_likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    commentId: uuid("comment_id")
      .notNull()
      .references(() => communityComments.id, {
        onDelete: "cascade",
      }),

    userId: text("user_id").notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    commentUserUnique: unique(
      "community_comment_likes_comment_user_unique",
    ).on(table.commentId, table.userId),

    commentIdIdx: index(
      "community_comment_likes_comment_id_idx",
    ).on(table.commentId),

    userIdIdx: index(
      "community_comment_likes_user_id_idx",
    ).on(table.userId),
  }),
);

export type CommunityCommentLike =
  typeof communityCommentLikes.$inferSelect;

export type NewCommunityCommentLike =
  typeof communityCommentLikes.$inferInsert;