CREATE TABLE "mcq_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"mcq_id" uuid NOT NULL,
	"selected_option" integer NOT NULL,
	"correct" boolean NOT NULL,
	"time_taken" integer,
	"attempted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "practice_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"mode" varchar(20) NOT NULL,
	"total_questions" integer DEFAULT 0 NOT NULL,
	"correct_answers" integer DEFAULT 0 NOT NULL,
	"wrong_answers" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "mcq_attempts" ADD CONSTRAINT "mcq_attempts_session_id_practice_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."practice_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mcq_attempts" ADD CONSTRAINT "mcq_attempts_mcq_id_mcqs_id_fk" FOREIGN KEY ("mcq_id") REFERENCES "public"."mcqs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "mcq_attempts_user_id_idx" ON "mcq_attempts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "mcq_attempts_session_id_idx" ON "mcq_attempts" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "mcq_attempts_mcq_id_idx" ON "mcq_attempts" USING btree ("mcq_id");--> statement-breakpoint
CREATE INDEX "mcq_attempts_attempted_at_idx" ON "mcq_attempts" USING btree ("attempted_at");--> statement-breakpoint
CREATE INDEX "practice_sessions_user_id_idx" ON "practice_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "practice_sessions_started_at_idx" ON "practice_sessions" USING btree ("started_at");