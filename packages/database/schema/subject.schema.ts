import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { programs } from "./program.schema";

export const subjects = pgTable("subjects", {
  id: uuid("id").defaultRandom().primaryKey(),

  programId: uuid("program_id")
    .references(() => programs.id, {
      onDelete: "restrict",
    })
    .notNull(),

  name: varchar("name", { length: 150 }).notNull(),

  slug: varchar("slug", { length: 180 })
    .notNull()
    .unique(),

  code: varchar("code", { length: 30 })
    .notNull()
    .unique(),

  description: text("description"),

  semester: integer("semester").notNull(),

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