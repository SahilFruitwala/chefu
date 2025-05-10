ALTER TYPE "public"."name" RENAME TO "feature_name";--> statement-breakpoint
ALTER TABLE "features" RENAME COLUMN "name" TO "feature_name";