CREATE TYPE "public"."limit_type" AS ENUM('daily', 'monthly');--> statement-breakpoint
CREATE TYPE "public"."name" AS ENUM('recipe', 'save_recipe', 'meal_plan', 'save_meal_plan');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('free', 'premium');--> statement-breakpoint
CREATE TABLE "features" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "name" NOT NULL,
	"limit_type" "limit_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usage" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"feature_id" varchar NOT NULL,
	"usage_count" integer DEFAULT 0 NOT NULL,
	"period_start" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usage_user_id_feature_id_period_start_unique" UNIQUE("user_id","feature_id","period_start")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "subscription_plan" SET DEFAULT 'free'::"public"."subscription_plan";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "subscription_plan" SET DATA TYPE "public"."subscription_plan" USING "subscription_plan"::"public"."subscription_plan";