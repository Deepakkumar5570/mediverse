import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const programs = pgTable(
  "programs",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),

    slug: text("slug").notNull().unique(),

    code: text("code").notNull().unique(),

    description: text("description"),

    icon: text("icon"),

    color: text("color"),

    isActive: boolean("is_active").default(true).notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    slugIdx: index("program_slug_idx").on(table.slug),
    codeIdx: index("program_code_idx").on(table.code),
  })
);