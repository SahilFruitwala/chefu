"use server";

import { parseMealPlan } from "@/lib/prompt";
import { db } from "@/db";
import {
  users,
  mealPlans,
  SelectMealPlan,
} from "@/db/schema";
import { and, count, desc, eq } from "drizzle-orm";
import { MealPlanFormValues } from "@/lib/types";


export async function getMealPlanCountForUser(userId: string): Promise<number> {
  const mealPlansCount = await db
    .select({ count: count() })
    .from(mealPlans)
    .where(eq(mealPlans.userId, userId));
  return mealPlansCount[0].count;
}

export async function createMealPlan(mealPlan: string, userId: string, formData: MealPlanFormValues) {
  const count = await getMealPlanCountForUser(userId);
  const extractedRecipe = parseMealPlan(mealPlan);
  const tags = [formData.dietaryPreferences, formData.calorieTarget];
  const data = {
    days: Object.keys(extractedRecipe).length,
    tags: tags,
    mealPlan: mealPlan,
    userId: userId,
  };
  await db.insert(mealPlans).values(data);
  await db
    .update(users)
    .set({ savedMealPlans: count + 1 })
    .where(eq(users.id, userId));
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
