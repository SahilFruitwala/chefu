"use server";

import { parseMealPlan } from "@/lib/prompt";
import { db } from "@/db";
import { users, mealPlans, SelectMealPlan } from "@/db/schema";
import { and, count, desc, eq } from "drizzle-orm";
import { Features, MealPlanFormValues } from "@/lib/types";
import { getFeatureCountAndLimit } from "./counter";
import { currentUser } from "@clerk/nextjs/server";
import { logger } from "@/lib/logger";

const log = logger.child({ module: "meal-plan" });

export async function createMealPlan(
  mealPlan: string,
  userId: string,
  formData: MealPlanFormValues
) {
  const user = await currentUser();
  if (!user) {
    log.error("User is not authorized");
    throw new Error("User is not authorized");
  }

  const { usageCount, featureLimit } = await getFeatureCountAndLimit(
    user.id,
    Features.SAVE_MEAL_PLAN
  );
  if (usageCount >= featureLimit) {
    logger.error("'%s' has reached the limit for meal plan save", user.id);
    throw new Error("You have used all your max usage.");
  }

  const extractedRecipe = parseMealPlan(mealPlan);
  const tags = [formData.dietaryPreferences, formData.calorieTarget];
  const data = {
    days: Object.keys(extractedRecipe).length,
    tags: tags,
    mealPlan: mealPlan,
    userId: user.id,
  };
  await db.insert(mealPlans).values(data);
  logger.info("'%s' has created a meal plan", user.id);
}

export async function getMealPlanForUser(
  userId: string
): Promise<Array<{ id: number; days: number; tags: any }>> {
  const user = await currentUser();
  if (!user) {
    log.error("User is not authorized");
    throw new Error("User is not authorized");
  }

  return db
    .select({
      id: mealPlans.id,
      days: mealPlans.days,
      tags: mealPlans.tags,
    })
    .from(mealPlans)
    .where(eq(mealPlans.userId, userId))
    .orderBy(desc(mealPlans.createdAt));
}

export async function getMealPlanById(
  mealPlanId: number,
  userId: string
): Promise<Array<SelectMealPlan>> {
  const user = await currentUser();
  if (!user) {
    log.error("User is not authorized");
    throw new Error("User is not authorized");
  }
  return db
    .select()
    .from(mealPlans)
    .where(and(eq(mealPlans.userId, userId), eq(mealPlans.id, mealPlanId)))
    .limit(1);
}

export async function deleteMealPlanById(mealPlansId: number, userId: string) {
  const user = await currentUser();
  if (!user) {
    log.error("User is not authorized");
    throw new Error("User is not authorized");
  }
  return db
    .delete(mealPlans)
    .where(and(eq(mealPlans.userId, userId), eq(mealPlans.id, mealPlansId)));
}
