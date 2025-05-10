import { Features, SubscriptionPlan } from "@/lib/types";
import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  varchar,
  json,
  timestamp,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";

export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  SubscriptionPlan.BASIC,
  SubscriptionPlan.PREMIUM,
]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull(),
  savedRecipes: integer("saved_recipes").default(0).notNull(),
  promptedRecipes: integer("prompted_recipes").default(0).notNull(),
  savedMealPlans: integer("saved_meal_plans").default(0).notNull(),
  promptedMealPlans: integer("prompted_meal_plans").default(0).notNull(),
  subscriptionPlna: subscriptionPlanEnum("subscription_plan")
    .default(SubscriptionPlan.BASIC)
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
  mealPlans: many(mealPlans),
}));

export const featuresEnum = pgEnum("feature_name", [
  Features.RECIPE,
  Features.SAVE_RECIPE,
  Features.MEAL_PLAN,
  Features.SAVE_MEAL_PLAN,
]);

export const featureLimitTypeEnum = pgEnum("limit_type", [
  "daily",
  "monthly",
]);

export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  featureName: featuresEnum("feature_name").notNull(),
  limitType: featureLimitTypeEnum("limit_type").notNull(),
  freeLimit: integer("free_limit").default(3),
  premiumLimit: integer("premium_limit").default(100),
});

export const usage = pgTable(
  "usage",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    featureId: integer("feature_id").notNull(),
    usageCount: integer("usage_count").default(0).notNull(),
    periodStart: timestamp("period_start").notNull().defaultNow(),
    featureLimit: integer("feature_limit").notNull(),
  },
  (table) => [unique().on(table.userId, table.featureId, table.periodStart)]
);

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  title: varchar().notNull(),
  tags: json().notNull(),
  recipe: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  userId: varchar("user_id").notNull(),
});

export const recipesRelations = relations(recipes, ({ one }) => ({
  user: one(users, {
    fields: [recipes.userId],
    references: [users.id],
  }),
}));

export const mealPlans = pgTable("meal_plans", {
  id: serial("id").primaryKey(),
  days: integer().notNull(),
  tags: json().notNull(),
  mealPlan: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  userId: varchar("user_id").notNull(),
});

export const mealPlanRelations = relations(mealPlans, ({ one }) => ({
  user: one(users, {
    fields: [mealPlans.userId],
    references: [users.id],
  }),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertRecipe = typeof recipes.$inferInsert;
export type SelectRecipe = typeof recipes.$inferSelect;

export type InsertMealPlan = typeof mealPlans.$inferInsert;
export type SelectMealPlan = typeof mealPlans.$inferSelect;

export type InsertFeature = typeof features.$inferInsert;
export type SelectFeature = typeof features.$inferSelect;

export type InsertUsage = typeof usage.$inferInsert;
export type SelectUsage = typeof usage.$inferSelect;

