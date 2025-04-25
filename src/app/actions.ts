"use server";

import { GoogleGenAI } from "@google/genai";
import generatRecipePrompt from "@/lib/prompt";
import { FormValues } from "@/lib/types";

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
    });
    return { data: response.text, error: null };
  } catch (err) {
    return { error: err?.message || "An unknown error occurred", data: null };
  }
}
