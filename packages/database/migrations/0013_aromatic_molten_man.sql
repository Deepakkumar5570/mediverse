CREATE TABLE "community_post_likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "community_post_likes_post_user_unique" UNIQUE("post_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "community_post_likes" ADD CONSTRAINT "community_post_likes_post_id_community_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "community_post_likes_post_id_idx" ON "community_post_likes" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "community_post_likes_user_id_idx" ON "community_post_likes" USING btree ("user_id");