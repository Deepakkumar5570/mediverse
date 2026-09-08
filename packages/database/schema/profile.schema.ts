import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { programs } from "./program.schema";
import { semesters } from "./semester.schema";

export const userProfiles = pgTable(
  "user_profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id").notNull().unique(),

    username: varchar("username", { length: 50 }).unique(),

    bio: text("bio"),

    programId: uuid("program_id").references(() => programs.id, {
      onDelete: "set null",
    }),

    semesterId: uuid("semester_id").references(() => semesters.id, {
      onDelete: "set null",
    }),

    profileVisibility: varchar("profile_visibility", {
      length: 20,
    })
      .default("public")
      .notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index("user_profiles_user_id_idx").on(table.userId),
    usernameIndex: index("user_profiles_username_idx").on(table.username),
  }),
);