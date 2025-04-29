// import { RecipeData } from "./types";

import { Recipe } from "./types";

export default function generatRecipePrompt(
  ingredients: Array<string>,
  equipment: Array<string>,
  dietaryRestrictions: string,
  allergies: Array<string>,
  mealType: string = "breakfast",
  servings: string = "1",
  skillLevel: string = "beginner",
  cookingTime: string = "under15"
) {
  return `You are a recipe generator.

Based on the user's input, generate a complete recipe using the structure below. Your response MUST follow this format exactly — no extra notes, no missing sections, and no creative formatting. This will be parsed by a program. And remeber this is important do not use any extra ingredient apart from what is mentioned.

If the ingredients include any meat, poultry, seafood, or egg, create a non-vegetarian recipe.
If the ingredients are all plant-based or dairy, create a vegetarian recipe and do not add any non-vegetarian items.
Do not assume or add ingredients not in the list unless they are basic pantry staples like salt, oil, or water.

Respond in plain text using this exact structure:

Title: <Recipe Title>  
Description: <One-line description of the dish>  
Cuisine: <Cuisine type>  
Style: <Cooking style, e.g., one-pan, slow cooker, grill>  
Tags: <Comma-separated list of tags like gluten-free, vegan, etc.>  
Time: <Total time, e.g., 45 mins>  
Difficulty: <Easy | Medium | Hard>  
Servings: <Number of servings>

Nutrition (per serving):  
Calories: <X kcal>  
Protein: <X g>  
Carbohydrates: <X g>  
Fat: <X g>  
Fiber: <X g>  
Sugar: <X g>

Ingredients:  
- <Ingredient 1>  
- <Ingredient 2>  
...

Instructions:  
1. <Step one>  
2. <Step two>  
...

Note: Suggested based on your preferences.

---

### User Inputs:

Ingredients: ${ingredients.join(", ")}  
Equipment: ${equipment.join(", ")}  
Dietary Preferences: ${dietaryRestrictions}  
Allergies to Avoid: ${allergies.length > 0 ? allergies.join(", ") : "None"}  
Meal Type: ${mealType}
People: ${servings}
Skill Level: ${skillLevel}
Cooking Time: ${cookingTime}

Generate the recipe using this structure and nothing else.
`;
};

export const parseRecipe = (recipeText: String): Recipe => {
  const recipeData: any = {};
  const lines = recipeText.trim().split("\n");
  let currentSection = "";
  let isParsingNutrition = false;

  for (const line of lines) {
    if (line.startsWith("Title:")) {
      recipeData.title = line.split(": ")[1].trim();
      currentSection = "";
    } else if (line.startsWith("Description:")) {
      recipeData.description = line.split(": ")[1].trim();
      currentSection = "";
    } else if (line.startsWith("Cuisine:")) {
      recipeData.cuisine = line.split(": ")[1].trim();
      currentSection = "";
    } else if (line.startsWith("Style:")) {
      recipeData.style = line.split(": ")[1].trim();
      currentSection = "";
    } else if (line.startsWith("Tags:")) {
      recipeData.tags = line
        .split(": ")[1]
        .trim()
        .split(", ")
        .map((tag) => tag.trim());
      currentSection = "";
    } else if (line.startsWith("Time:")) {
      recipeData.time = line.split(": ")[1].trim();
      currentSection = "";
    } else if (line.startsWith("Difficulty:")) {
      recipeData.difficulty = line.split(": ")[1].trim();
      currentSection = "";
    } else if (line.startsWith("Servings:")) {
      recipeData.servings = parseInt(line.split(": ")[1].trim(), 10);
      currentSection = "";
    } else if (line.startsWith("Nutrition (per serving):")) {
      recipeData.nutrition = {}; // Initialize nutrition object
      isParsingNutrition = true; // Set the flag
      currentSection = ""; // Clear general section
    } else if (line.startsWith("Ingredients:")) {
      recipeData.ingredients = [];
      currentSection = "ingredients";
    } else if (line.startsWith("Instructions:")) {
      recipeData.instructions = [];
      currentSection = "instructions";
    } else if (line.startsWith("Note:")) {
      recipeData.note = line.split(": ")[1].trim();
      currentSection = "";
    } else if (isParsingNutrition && line.includes(":")) {
      // This is a nutrition fact line
      const parts = line.split(":");
      if (parts.length === 2 && recipeData.nutrition) {
        const nutrientName = parts[0].trim().toLowerCase(); // e.g., 'calories'
        const valueString = parts[1].trim(); // e.g., '180 kcal' or '12 g'

        // Extract the numeric part using parseFloat (handles "180 kcal" -> 180)
        const numericValue = parseFloat(valueString);

        if (!isNaN(numericValue)) {
          // Store the numeric value under the lowercase nutrient name
          recipeData.nutrition[nutrientName] = numericValue;
        }
        // Optional: Store the unit as well if needed
        // const unit = valueString.split(' ')[1]; // e.g., 'kcal' or 'g'
        // recipeData.nutrition[nutrientName] = { value: numericValue, unit: unit };
      }
    } else if (currentSection === "ingredients" && line.startsWith("-")) {
      recipeData.ingredients.push(line.substring(2).trim());
    } else if (currentSection === "instructions" && line.match(/^\d+\./)) {
      recipeData.instructions.push(
        line.substring(line.indexOf(".") + 1).trim()
      );
    }
  }

  // Ensure arrays/objects exist even if empty
  if (!recipeData.tags) recipeData.tags = [];
  if (!recipeData.nutrition) recipeData.nutrition = {};
  if (!recipeData.ingredients) recipeData.ingredients = [];
  if (!recipeData.instructions) recipeData.instructions = [];

  return recipeData as Recipe;
};