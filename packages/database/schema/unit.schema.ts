import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { subjects } from "./subject.schema";

export const units = pgTable("units", {
  id: uuid("id").defaultRandom().primaryKey(),

  subjectId: uuid("subject_id")
    .references(() => subjects.id, {
      onDelete: "restrict",
    })
    .notNull(),

  title: varchar("title", { length: 200 }).notNull(),

  slug: varchar("slug", { length: 220 })
    .notNull()
    .unique(),

  unitNumber: integer("unit_number").notNull(),

  description: text("description"),

  status: varchar("status", { length: 20 })
    .$default(() => "active")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});