export interface Recipe {
  title: string;
  description: string;
  cuisine: string;
  style: string;
  tags: string[];
  time: string;
  difficulty: string;
  servings: number;
  nutrition: {
    [key: string]: string | number;
  }
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

export interface MealPlanFormValues {
  calorieTarget: string;
  equipment: string[];
  allergies: string[];
  dietaryPreferences: string;
  mealsPerDay: string;
  mealPlanFor: string;
  additionalNotes: string;
  isBudgetFriendly: boolean;
}

export interface Meal {
  name: string;
  description: string;
}

export interface DayPlan {
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
}

export interface MealPlan {
  [day: string]: DayPlan;
}

export const EQUIPMENT_OPTIONS = [
  { id: "stove", label: "Stove/Range" },
  { id: "oven", label: "Oven" },
  { id: "microwave", label: "Microwave" },
  { id: "blender", label: "Blender" },
  { id: "food Processor", label: "Food Processor" },
  { id: "slow Cooker", label: "Slow Cooker" },
  { id: "instant Pot", label: "Instant Pot" },
  { id: "air Fryer", label: "Air Fryer" },
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
  { value: "no restrictions", label: "No Restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten Free", label: "Gluten-Free" },
  { value: "dairy Free", label: "Dairy-Free" },
  { value: "nut Free", label: "Nut-Free" },
  { value: "low Carb", label: "Low Carb" },
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

export const CALORIES_TRAGET = [
  { value: "less than 1500", label: "Less than 1500" },
  { value: "1500-2000", label: "1500-2000" },
  { value: "2000-2500", label: "2000-2500" },
  { value: "more than 2500", label: "More than 2500" },
];

export const DIETARY_PREFERENCE = [
  { value: "no preference", label: "No Preference" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten Free", label: "Gluten-Free" },
  { value: "dairy Free", label: "Dairy-Free" },
  { value: "nut Free", label: "Nut-Free" },
  { value: "low Carb", label: "Low Carb" },
  { value: "keto", label: "Keto" },
  { value: "halal", label: "Halal" },
];


export const MEAL_PLAN_DURATION = [
  { value: "3 days", label: "3 Days" },
  { value: "5 days", label: "5 Days" },
  { value: "7 days", label: "7 Days" },
  { value: "15 Days", label: "15 Days" },
  { value: "20 Days", label: "20 Days" },
];
