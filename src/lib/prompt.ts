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

Based on the user's input, generate a complete recipe using the structure below. Your response MUST follow this format exactly — no extra notes, no missing sections, and no creative formatting. This will be parsed by a program. 

Important information: Consider Eggs  and any egg dish as non-vegetarian and give me a non-vegetarian tag.

Respond in plain text using this exact structure:

Title: <Recipe Title>  
Description: <One-line description of the dish>  
Cuisine: <Cuisine type>  
Style: <Cooking style, e.g., one-pan, slow cooker, grill>  
Tags: <Comma-separated list of tags like gluten-free, vegan, etc.>  
Time: <Total time, e.g., 45 mins>  
Difficulty: <Easy | Medium | Hard>  
Servings: <Number of servings>

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
  console.log("Selected Recipe: ", recipeText, typeof(recipeText));
  const lines = recipeText.trim().split("\n");
  let currentSection = "";

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
    } else if (line.startsWith("Ingredients:")) {
      recipeData.ingredients = [];
      currentSection = "ingredients";
    } else if (line.startsWith("Instructions:")) {
      recipeData.instructions = [];
      currentSection = "instructions";
    } else if (line.startsWith("Note:")) {
      recipeData.note = line.split(": ")[1].trim();
      currentSection = "";
    } else if (currentSection === "ingredients" && line.startsWith("-")) {
      recipeData.ingredients.push(line.substring(2).trim());
    } else if (currentSection === "instructions" && line.match(/^\d+\./)) {
      recipeData.instructions.push(
        line.substring(line.indexOf(".") + 1).trim()
      );
    }
  }
  return recipeData as Recipe;
};