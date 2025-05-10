ALTER TABLE "features" ADD COLUMN "free_limit" integer DEFAULT 3;--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "premium_limit" integer DEFAULT null;--> statement-breakpoint
ALTER TABLE "usage" ADD COLUMN "feature_limit" integer DEFAULT null NOT NULL;