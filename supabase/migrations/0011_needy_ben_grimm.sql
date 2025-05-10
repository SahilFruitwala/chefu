ALTER TABLE "features" ALTER COLUMN "premium_limit" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "usage" ALTER COLUMN "feature_limit" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "usage" ALTER COLUMN "feature_limit" DROP NOT NULL;