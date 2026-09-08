CREATE TABLE "user_gamification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"total_xp" integer DEFAULT 0 NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_gamification_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "xp_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"event_key" varchar(255) NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"points" integer NOT NULL,
	"reference_type" varchar(50),
	"reference_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "xp_events_event_key_unique" UNIQUE("event_key")
);
--> statement-breakpoint
CREATE INDEX "user_gamification_user_id_idx" ON "user_gamification" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "xp_events_user_id_idx" ON "xp_events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "xp_events_created_at_idx" ON "xp_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "xp_events_reference_idx" ON "xp_events" USING btree ("reference_type","reference_id");