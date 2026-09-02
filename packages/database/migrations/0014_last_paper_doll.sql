CREATE TABLE "community_comment_likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"comment_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "community_comment_likes_comment_user_unique" UNIQUE("comment_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "community_comment_likes" ADD CONSTRAINT "community_comment_likes_comment_id_community_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."community_comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "community_comment_likes_comment_id_idx" ON "community_comment_likes" USING btree ("comment_id");--> statement-breakpoint
CREATE INDEX "community_comment_likes_user_id_idx" ON "community_comment_likes" USING btree ("user_id");