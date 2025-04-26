export interface Recipe {
  title: string;
  description: string;
  cuisine: string;
  style: string;
  tags: string[];
  time: string;
  difficulty: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  note?: string;
}

export interface FormValues {
  ingredients: string[];
  equipment: string[];
  allergies: string[];
  dietaryRestrictions: string;
  mealType: string;
  cookingTime: string;
  skillLevel: string;
  servings: string;
}

export const EQUIPMENT_OPTIONS = [
  { id: "stove", label: "Stove/Range" },
  { id: "oven", label: "Oven" },
  { id: "microwave", label: "Microwave" },
  { id: "blender", label: "Blender" },
  { id: "foodProcessor", label: "Food Processor" },
  { id: "slowCooker", label: "Slow Cooker" },
  { id: "instantPot", label: "Instant Pot" },
  { id: "airFryer", label: "Air Fryer" },
  { id: "grill", label: "Grill" },
];

export const MEAL_TYPES = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "dessert", label: "Dessert" },
  { value: "snack", label: "Snack" },
  { value: "appetizer", label: "Appetizer" },
];

export const DIETARY_RESTRICTIONS = [
  { value: "none", label: "No Restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "glutenFree", label: "Gluten-Free" },
  { value: "dairyFree", label: "Dairy-Free" },
  { value: "nutFree", label: "Nut-Free" },
  { value: "lowCarb", label: "Low Carb" },
  { value: "keto", label: "Keto" },
];

export const COOKING_TIMES = [
  { value: "under15", label: "Under 15 minutes" },
  { value: "under30", label: "Under 30 minutes" },
  { value: "under60", label: "Under 1 hour" },
  { value: "over60", label: "Over 1 hour" },
];

export const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const CUISINE_TYPES = [
  { value: "any", label: "Any Cuisine" },
  { value: "italian", label: "Italian" },
  { value: "mexican", label: "Mexican" },
  { value: "asian", label: "Asian" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "american", label: "American" },
  { value: "indian", label: "Indian" },
  { value: "french", label: "French" },
];
