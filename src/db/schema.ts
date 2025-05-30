import { Features, SubscriptionPlan } from "@/lib/types";
import { relations } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
  unique,
} from "drizzle-orm/sqlite-core";

// SQLite does not support enums, use text and enforce in code
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  savedRecipes: integer("saved_recipes").default(0).notNull(),
  promptedRecipes: integer("prompted_recipes").default(0).notNull(),
  savedMealPlans: integer("saved_meal_plans").default(0).notNull(),
  promptedMealPlans: integer("prompted_meal_plans").default(0).notNull(),
  subscriptionPlan: text("subscription_plan")
    .default(SubscriptionPlan.BASIC)
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
  mealPlans: many(mealPlans),
}));

export const features = sqliteTable("features", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  featureName: text("feature_name").notNull(), // enforce enum in code
  limitType: text("limit_type").notNull(), // enforce enum in code
  freeLimit: integer("free_limit").default(3),
  premiumLimit: integer("premium_limit").default(100),
});

export const usage = sqliteTable(
  "usage",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id").notNull(),
    featureId: integer("feature_id").notNull(),
    usageCount: integer("usage_count").default(0).notNull(),
    periodStart: integer("period_start").notNull().default(0), // store as unix timestamp
    featureLimit: integer("feature_limit").notNull(),
  },
  (table) => [
    unique().on(table.userId, table.featureId, table.periodStart),
  ]
);

export const recipes = sqliteTable("recipes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  tags: text("tags", { mode: "json" }).notNull(), // store JSON as string, parse/stringify in app code
  recipe: text("recipe").notNull(),
  createdAt: integer("created_at").default(0).notNull(),
  userId: text("user_id").notNull(),
});

export const recipesRelations = relations(recipes, ({ one }) => ({
  user: one(users, {
    fields: [recipes.userId],
    references: [users.id],
  }),
}));

export const mealPlans = sqliteTable("meal_plans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  days: integer("days").notNull(),
  tags: text("tags", {mode: 'json'}).notNull(),
  mealPlan: text("meal_plan").notNull(),
  createdAt: integer("created_at").default(0).notNull(),
  userId: text("user_id").notNull(),
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
