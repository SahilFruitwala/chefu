"use server";

import { parseMealPlan } from "@/lib/prompt";
import { db } from "@/db";
import {
  users,
  mealPlans,
  SelectMealPlan,
} from "@/db/schema";
import { and, count, desc, eq } from "drizzle-orm";
import { Features, MealPlanFormValues } from "@/lib/types";
import { getFeatureCountAndLimit } from "./counter";



export async function createMealPlan(mealPlan: string, userId: string, formData: MealPlanFormValues) {
  const { usageCount, featureLimit} = await getFeatureCountAndLimit(userId, Features.SAVE_MEAL_PLAN);
    if (usageCount >= featureLimit) {
      throw new Error("You have used all your max usage.");
    }

  const extractedRecipe = parseMealPlan(mealPlan);
  const tags = [formData.dietaryPreferences, formData.calorieTarget];
  const data = {
    days: Object.keys(extractedRecipe).length,
    tags: tags,
    mealPlan: mealPlan,
    userId: userId,
  };
  await db.insert(mealPlans).values(data);
}

export async function getMealPlanForUser(
  userId: string
): Promise<Array<{id: number; days: number, tags: any}>> {
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
  return db
    .select()
    .from(mealPlans)
    .where(and(eq(mealPlans.userId, userId), eq(mealPlans.id, mealPlanId)))
    .limit(1);
}

export async function deleteMealPlanById(mealPlansId: number, userId: string) {
  return db
    .delete(mealPlans)
    .where(and(eq(mealPlans.userId, userId), eq(mealPlans.id, mealPlansId)));
}
