ALTER TABLE "subjects" DROP CONSTRAINT "subjects_program_id_programs_id_fk";
--> statement-breakpoint
ALTER TABLE "subjects" ADD COLUMN "semester_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_semester_id_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."semesters"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subjects" DROP COLUMN "program_id";