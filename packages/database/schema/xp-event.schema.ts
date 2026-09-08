import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const xpEvents = pgTable(
  "xp_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id").notNull(),

    /**
     * Unique key makes XP rewards idempotent.
     *
     * Example:
     * lesson:completed:<contentId>
     * mcq:first-attempt:<mcqId>
     * practice-session:completed:<sessionId>
     */
    eventKey: varchar("event_key", {
      length: 255,
    })
      .notNull()
      .unique(),

    eventType: varchar("event_type", {
      length: 50,
    }).notNull(),

    points: integer("points").notNull(),

    referenceType: varchar("reference_type", {
      length: 50,
    }),

    referenceId: text("reference_id"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIndex: index("xp_events_user_id_idx").on(
      table.userId,
    ),

    createdAtIndex: index("xp_events_created_at_idx").on(
      table.createdAt,
    ),

    referenceIndex: index(
      "xp_events_reference_idx",
    ).on(
      table.referenceType,
      table.referenceId,
    ),
  }),
);