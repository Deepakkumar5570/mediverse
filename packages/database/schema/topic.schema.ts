import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { units } from "./unit.schema";

export const topics = pgTable("topics", {
  id: uuid("id").defaultRandom().primaryKey(),

  unitId: uuid("unit_id")
    .notNull()
    .references(() => units.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  slug: text("slug").notNull().unique(),

  topicNumber: integer("topic_number").notNull(),

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