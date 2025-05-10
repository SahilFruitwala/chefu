"use server";

import { GoogleGenAI } from "@google/genai";
import generatRecipePrompt, { generatMealPlanPrompt } from "@/lib/prompt";
import { Features, FormValues, MealPlanFormValues } from "@/lib/types";
import { getFeatureCountAndLimit } from "./counter";
import { currentUser } from "@clerk/nextjs/server";
import { logger } from "@/lib/logger";

const log = logger.child({ module: "gemini" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateRecipe(
  formData: FormValues
): Promise<{ data: string | null; error: string | null }> {
  if (!process.env.GEMINI_API_KEY) {
    log.error("GEMINI_API_KEY is not defined in the environment variables.");
    throw new Error(
      "GEMINI_API_KEY is not defined in the environment variables."
    );
  }
  const user = await currentUser();
  if(!user) {
    log.error("User is not authorized");
    throw new Error("User is not authorized");
  }

  const { usageCount, featureLimit } = await getFeatureCountAndLimit(
    user.id,
    Features.RECIPE
  );

  if(usageCount >= featureLimit) {
    logger.error("'%s' has reached the limit for recipe generation", user.id);
    throw new Error("You have used all your max usage for today.");
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
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash-lite",
      contents: recipePrompt,
      config: {
        systemInstruction:
          "You are a professional chef. You know recipes of every kind, every type and of every falvors. Your job is to consider clients preference and oblige to recipe request.",
        temperature: 0.6,
      },
    });
    logger.info("'%s' has used the recipe generation feature", user.id);
    return { data: response.text || "", error: null };
  } catch (err: any) {
    logger.error("Error generating recipe: %s", err);
    return { error: err?.message || "An unknown error occurred!", data: null };
  }
}

export async function generateMealPlan(
  formData: MealPlanFormValues
): Promise<{ data: string | null; error: string | null }> {
  if (!process.env.GEMINI_API_KEY) {
    log.error("GEMINI_API_KEY is not defined in the environment variables.");
    throw new Error(
      "GEMINI_API_KEY is not defined in the environment variables."
    );
  }

  const user = await currentUser();
  if (!user) {
    log.error("User is not authorized");
    throw new Error("User is not authorized");
  }

  const { usageCount, featureLimit } = await getFeatureCountAndLimit(
    user.id,
    Features.MEAL_PLAN
  );

  if (usageCount >= featureLimit) {
    logger.error("'%s' has reached the limit for meal plan generation", user.id);
    throw new Error("You have used all your max usage.");
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
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash-lite",
      contents: mealPlanPrompt,
      config: {
        systemInstruction:
          "You are a professional dietitian. You know recipes of every kind, every type and of every falvors. Your job is to consider clients preference and oblige to meal plan request.",
        temperature: 0.6,
      },
    });
    logger.info("'%s' has used the meal plan generation feature", user.id);
    return { data: response.text || "", error: null };
  } catch (err: any) {
    logger.error("Error generating recipe: %s", err);
    return { error: err?.message || "An unknown error occurred!", data: null };
  }
}
