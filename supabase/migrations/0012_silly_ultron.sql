ALTER TABLE "features" ALTER COLUMN "premium_limit" SET DEFAULT 100;--> statement-breakpoint
ALTER TABLE "usage" ALTER COLUMN "feature_limit" SET NOT NULL;