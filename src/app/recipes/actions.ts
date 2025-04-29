"use server";

import { GoogleGenAI } from "@google/genai";
import generatRecipePrompt, { parseRecipe } from "@/lib/prompt";
import { FormValues } from "@/lib/types";
import { db } from "@/db";
import {
  SelectUser,
  users,
  InsertRecipe,
  SelectRecipe,
  recipes,
} from "@/db/schema";
import { and, count, desc, eq } from "drizzle-orm";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getRecipe(
  formData: FormValues
): Promise<{ data: string | null; error: string | null }> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not defined in the environment variables."
    );
  }
  try {
    const {
      ingredients,
      equipment,
      dietaryRestrictions,
      allergies,
      mealType,
      servings,
      skillLevel,
      cookingTime,
    } = formData;

    const recipePrompt = generatRecipePrompt(
      ingredients,
      equipment,
      dietaryRestrictions,
      allergies,
      mealType,
      servings,
      skillLevel,
      cookingTime
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: recipePrompt,
      config: {
        systemInstruction:
          "You are a professional chef. You know recipes of every kind, every type and of evry falvors.",
        temperature: 0.5,
      },
    });
    return { data: response.text || "", error: null };
  } catch (err: any) {
    console.log(err);
    return { error: err?.message || "An unknown error occurred!", data: null };
  }
}

export async function addUser(email: string, id: string) {
  const existingUser = await getUser(email);
  if (existingUser.length === 0) {
    await db.insert(users).values({ email: email, id: id });
  }
}

export async function getUser(email: string): Promise<Array<SelectUser>> {
  return db.select().from(users).where(eq(users.email, email)).limit(1);
}

export async function getRecipeCountForUser(userId: string): Promise<number> {
  const recipeCount = await db
    .select({ count: count() })
    .from(recipes)
    .where(eq(recipes.userId, userId));
  return recipeCount[0].count;
}

export async function createRecipe(recipe: String, userId: string) {
  const count = await getRecipeCountForUser(userId);
  const extractedRecipe = parseRecipe(recipe);
  const data = {
    title: extractedRecipe.title,
    tags: extractedRecipe.tags,
    recipe: recipe,
    userId: userId,
  };
  await db.insert(recipes).values(data);
  await db
    .update(users)
    .set({ savedRecipes: count + 1 })
    .where(eq(users.id, userId));
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
