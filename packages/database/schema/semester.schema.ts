import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { programs } from "./program.schema";

export const semesters = pgTable("semesters", {
  id: uuid("id").defaultRandom().primaryKey(),

  programId: uuid("program_id")
    .references(() => programs.id, {
      onDelete: "restrict",
    })
    .notNull(),

  name: varchar("name", { length: 100 }).notNull(),

  number: integer("number").notNull(),

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