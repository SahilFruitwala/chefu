import { Recipe } from "./types";

const STORAGE_KEY = "saved_recipes";

export const saveRecipe = (recipe: Recipe): void => {
  try {
    const savedRecipes = getSavedRecipes();
    const exists = savedRecipes.some(r => r.id === recipe.id);
    
    if (!exists) {
      const updatedRecipes = [...savedRecipes, recipe];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
    }
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
};

export const getSavedRecipes = (): Recipe[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error getting saved recipes:", error);
    return [];
  }
};

export const removeSavedRecipe = (id: string): void => {
  try {
    const savedRecipes = getSavedRecipes();
    const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
  } catch (error) {
    console.error("Error removing recipe:", error);
  }
};

export const clearAllSavedRecipes = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing saved recipes:", error);
  }
};