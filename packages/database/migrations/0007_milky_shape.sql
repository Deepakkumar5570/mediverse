CREATE TABLE "contents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subtopic_id" uuid NOT NULL,
	"title" varchar(250) NOT NULL,
	"slug" varchar(300) NOT NULL,
	"summary" text,
	"content" text NOT NULL,
	"reading_time" integer DEFAULT 1 NOT NULL,
	"seo_title" varchar(250),
	"seo_description" text,
	"status" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contents_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "contents" ADD CONSTRAINT "contents_subtopic_id_subtopics_id_fk" FOREIGN KEY ("subtopic_id") REFERENCES "public"."subtopics"("id") ON DELETE cascade ON UPDATE no action;