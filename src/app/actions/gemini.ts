"use server";

import { GoogleGenAI } from "@google/genai";
import generatRecipePrompt, {
  generatMealPlanPrompt,
  parseMealPlan,
} from "@/lib/prompt";
import { FormValues, MealPlanFormValues } from "@/lib/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateRecipe(
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
          "You are a professional chef. You know recipes of every kind, every type and of every falvors. Your job is to consider clients preference and oblige to recipe request.",
        temperature: 0.6,
      },
    });
    return { data: response.text || "", error: null };
  } catch (err: any) {
    console.log(err);
    return { error: err?.message || "An unknown error occurred!", data: null };
  }
}

export async function generateMealPlan(
  formData: MealPlanFormValues
): Promise<{ data: string | null; error: string | null }> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not defined in the environment variables."
    );
  }
  try {
    const {
      calorieTarget,
      equipment,
      dietaryPreferences,
      allergies,
      mealPlanFor,
      isBudgetFriendly,
    } = formData;

    const mealPlanPrompt = generatMealPlanPrompt(
      dietaryPreferences,
      equipment,
      allergies,
      mealPlanFor,
      isBudgetFriendly,
      calorieTarget
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: mealPlanPrompt,
      config: {
        systemInstruction:
          "You are a professional dietitian. You know recipes of every kind, every type and of every falvors. Your job is to consider clients preference and oblige to meal plan request.",
        temperature: 0.6,
      },
    });
    return { data: response.text || "", error: null };
  } catch (err: any) {
    console.log(err);
    return { error: err?.message || "An unknown error occurred!", data: null };
  }
}
