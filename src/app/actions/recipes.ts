"use server";

import { parseRecipe } from "@/lib/prompt";
import { db } from "@/db";
import { SelectRecipe, recipes } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { getFeatureCountAndLimit } from "./counter";
import { Features } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { logger } from "@/lib/logger";

const log = logger.child({ module: "recipe" });

export async function createRecipe(recipe: String, userId: string) {
  const user = await currentUser();
  if (!user) {
    log.error("User is not authorized");
    return { error: "You have used all your max usage." };
  }

  const { usageCount, featureLimit } = await getFeatureCountAndLimit(
    user.id,
    Features.SAVE_RECIPE
  );
  if (usageCount >= featureLimit) {
    logger.error("'%s' has reached the limit for recipe save", user.id);
    return {'error': "You have used all your max usage."};
  }

  const extractedRecipe = parseRecipe(recipe);
  const data = {
    title: extractedRecipe.title,
    tags: extractedRecipe.tags,
    recipe: recipe,
    userId: user.id,
  };
  await db.insert(recipes).values(data);
  logger.info("'%s' has created a meal plan", user.id);
}

export async function getRecipeForUser(
  userId: string
): Promise<Array<{ id: number; title: string }>> {
  const user = await currentUser();
  if (!user) {
    log.error("User is not authorized");
    return { 'error': "User is not authorized" };
  }
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
  const user = await currentUser();
  if (!user) {
    log.error("User is not authorized");
    return { 'error': "User is not authorized" };
  }
  return db
    .select()
    .from(recipes)
    .where(and(eq(recipes.userId, userId), eq(recipes.id, recipeId)))
    .limit(1);
}

export async function deleteRecipeById(recipeId: number, userId: string) {
  const user = await currentUser();
  if (!user) {
    log.error("User is not authorized");
    return { 'error': "User is not authorized" };
  }
  return db
    .delete(recipes)
    .where(and(eq(recipes.userId, userId), eq(recipes.id, recipeId)));
}
