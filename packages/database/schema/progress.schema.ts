import {
  boolean,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  text,
} from "drizzle-orm/pg-core";

import { contents } from "./content.schema";

export const progress = pgTable(
  "progress",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    userId: text("user_id").notNull(),

    contentId: uuid("content_id")
      .notNull()
      .references(() => contents.id, {
        onDelete: "cascade",
      }),

    completed: boolean("completed")
      .default(false)
      .notNull(),

    completedAt: timestamp("completed_at"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userContentUnique: uniqueIndex(
      "progress_user_content_unique"
    ).on(table.userId, table.contentId),
  })
);