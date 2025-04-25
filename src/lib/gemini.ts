import { GoogleGenAI } from "@google/genai";
import generatRecipePrompt from "./prompt";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBedCyrjqEwQaWVDeJkqZH9WYVgwfiapPI",
});

export default async function getReceipe(
  ingredients_list: string = "chickpeas, canned tomatoes, onion, garlic, spinach, olive oil, cumin, turmeric",
  equipment_list: string = "stove, pot, knife, cutting board",
  dietary_preferences: string = "vegetarian, gluten-free",
  allergies_list: string = "gluten",
  meal_type: string = "lunch",
  servings: number = 2
) {
  const recipePrompt = generatRecipePrompt(
    ingredients_list,
    equipment_list,
    dietary_preferences,
    allergies_list,
    meal_type,
    servings
  );

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: recipePrompt,
  });
  return response.text;
}
