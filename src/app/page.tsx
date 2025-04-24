"use client";

import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import RecipeDisplay from "@/components/RecipeDisplay";
import { Recipe } from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { saveRecipe } from "@/lib/storage";
import { UtensilsCrossed } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateRecipe = async (formData: any) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newRecipe: Recipe = {
        id: Date.now().toString(),
        title: `${formData.mealType} with ${formData.ingredients
          .slice(0, 3)
          .join(", ")}`,
        ingredients: formData.ingredients.map((ing: string) => `- ${ing}`),
        equipment: formData.equipment,
        instructions: [
          "1. Prepare all ingredients by washing and chopping as needed.",
          "2. Heat your cooking equipment to the appropriate temperature.",
          `3. If making ${formData.mealType}, start with the base ingredients.`,
          "4. Combine all ingredients in the appropriate order.",
          "5. Cook until done to your preference.",
          "6. Serve and enjoy your meal!",
        ],
        dietaryInfo: formData.dietaryRestrictions,
        cookingTime: formData.cookingTime,
        skillLevel: formData.skillLevel,
        cuisineType: formData.cuisineType,
        imageUrl: "",
      };

      setRecipe(newRecipe);
      toast.success("Recipe Generated", {
        description: "Your personalized recipe is ready!",
      });
    } catch (error) {
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecipe = () => {
    if (recipe) {
      saveRecipe(recipe);
      toast.info("Recipe Saved", {
        description: "Your recipe has been saved to your collection.",
      });
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-full">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-3 select-none">
            Plate Pal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your available ingredients into delicious meals with our
            AI-powered recipe generator
          </p>
        </header> */}

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <RecipeForm onSubmit={generateRecipe} isLoading={isLoading} />
          <RecipeDisplay
            recipe={recipe}
            isLoading={isLoading}
            onSave={handleSaveRecipe}
          />
        </div>
      </div>
      <Toaster richColors closeButton />
    </main>
  );
}
