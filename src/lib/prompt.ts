// import { RecipeData } from "./types";

import { DayPlan, MealPlan, Recipe } from "./types";

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

export function generatMealPlanPrompt(
  dietaryPreferences: string,
  equipment: Array<string>,
  allergies: Array<string>,
  mealPlanFor: string,
  isBudgetFriendly: boolean,
  calorieTarget: string,
) {
  return `You are a meal planning assistant. Based on the input provided, generate a meal plan in the exact format specified and that is all I want. No extra text or notes. Do new dish for each meal. Do not consider leftover meals. There may not be leftovers.
  Your response MUST follow this format exactly — no extra notes, no missing sections, and no creative formatting. This will be parsed by a program.



### Input:

- Dietary Preference: ${dietaryPreferences}

- Calories per Day: ${calorieTarget}

- Allergies/Restrictions: ${
    allergies.length > 0 ? allergies.join(", ") : "None"
  }

- Equipment: ${equipment.join(", ")}

- Budget Friendly: ${isBudgetFriendly ? "Yes" : "No"}

- Meals per Day: 3



### Output Format (strictly follow):

Day 1:

- Breakfast: [Meal name] - [Description]

- Lunch: [Meal name] - [Description]

- Dinner: [Meal name] - [Description]



Day 2:

- Breakfast: ...

...



Generate the plan for ${mealPlanFor}. Keep each meal nutritionally balanced and aligned with the goal and preferences.`;
};


export function parseMealPlan(mealPlanText: string): MealPlan {
  const mealPlan: MealPlan = {};
  const dayBlocks = mealPlanText.split(/Day \d+:\n/);

  for (let i = 1; i < dayBlocks.length; i++) {
    const dayNumber = i;
    const day = `Day ${dayNumber}:`;
    const dayPlan: DayPlan = {};
    const lines = dayBlocks[i].trim().split("\n");

    for (const line of lines) {
      if (line.startsWith("- Breakfast:")) {
        const parts = line.substring("- Breakfast:".length).trim().split(" - ");
        if (parts.length === 2) {
          dayPlan.breakfast = {
            name: parts[0].trim(),
            description: parts[1].trim(),
          };
        }
      } else if (line.startsWith("- Lunch:")) {
        const parts = line.substring("- Lunch:".length).trim().split(" - ");
        if (parts.length === 2) {
          dayPlan.lunch = {
            name: parts[0].trim(),
            description: parts[1].trim(),
          };
        }
      } else if (line.startsWith("- Dinner:")) {
        const parts = line.substring("- Dinner:".length).trim().split(" - ");
        if (parts.length === 2) {
          dayPlan.dinner = {
            name: parts[0].trim(),
            description: parts[1].trim(),
          };
        }
      }
    }
    mealPlan[day] = dayPlan;
  }

  return mealPlan;
}
