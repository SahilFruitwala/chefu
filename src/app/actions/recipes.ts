"use server";

import { parseRecipe } from "@/lib/prompt";
import { db } from "@/db";
import {
  SelectUser,
  users,
  SelectRecipe,
  recipes,
} from "@/db/schema";
import { and, count, desc, eq } from "drizzle-orm";
import { getFeatureCountAndLimit } from "./counter";
import { Features } from "@/lib/types";

export async function addUser(email: string, id: string) {
  const existingUser = await getUser(email);
  if (existingUser.length === 0) {
    await db.insert(users).values({ email: email, id: id });
  }
}

export async function getUser(email: string): Promise<Array<SelectUser>> {
  return db.select().from(users).where(eq(users.email, email)).limit(1);
}

export async function createRecipe(recipe: String, userId: string) {
  const { usageCount, featureLimit} = await getFeatureCountAndLimit(userId, Features.SAVE_RECIPE);
  if (usageCount >= featureLimit) {
    throw new Error("You have used all your max usage.");
  }

  const extractedRecipe = parseRecipe(recipe);
  const data = {
    title: extractedRecipe.title,
    tags: extractedRecipe.tags,
    recipe: recipe,
    userId: userId,
  };
  await db.insert(recipes).values(data);
}

export async function getRecipeForUser(
  userId: string
): Promise<Array<{id: number; title: string}>> {
  return db
    .select({
      id: recipes.id,
      title: recipes.title,
    })
    .from(recipes)
    .where(eq(recipes.userId, userId))
    .orderBy(desc(recipes.createdAt));
}

export async function getRecipeById(
  recipeId: number,
  userId: string
): Promise<Array<SelectRecipe>> {
  return db
    .select()
    .from(recipes)
    .where(and(eq(recipes.userId, userId), eq(recipes.id, recipeId)))
    .limit(1);
}

export async function deleteRecipeById(
  recipeId: number,
  userId: string
) {
  return db.delete(recipes).where(
    and(eq(recipes.userId, userId), eq(recipes.id, recipeId))
  );
}
