CREATE TABLE "meal_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"days" varchar NOT NULL,
	"tags" json NOT NULL,
	"mealPlan" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar NOT NULL
);
