CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"username" varchar(50),
	"bio" text,
	"program_id" uuid,
	"semester_id" uuid,
	"profile_visibility" varchar(20) DEFAULT 'public' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "user_profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_semester_id_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."semesters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_profiles_user_id_idx" ON "user_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_profiles_username_idx" ON "user_profiles" USING btree ("username");