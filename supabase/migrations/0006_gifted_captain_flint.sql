ALTER TABLE "users" ADD COLUMN "prompted_recipes" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "prompted_meal_plans" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_plan" varchar(256) DEFAULT 'free' NOT NULL;