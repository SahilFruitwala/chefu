import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  varchar,
  json,
  timestamp,
} from "drizzle-orm/pg-core";


export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull(),
  savedRecipes: integer("saved_recipes").default(0).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
}));


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


export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertRecipe = typeof recipes.$inferInsert;
export type SelectRecipe = typeof recipes.$inferSelect;