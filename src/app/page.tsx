"use client";

import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import { Recipe } from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { parseRecipe } from "@/lib/prompt";
import { getRecipe } from "./actions";
import RecipeCard from "@/components/RecipeDisplay/RecipeCard";

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateRecipe = async (formData: any) => {
    setIsLoading(true);

    try {
      const response = await getRecipe(formData);
      if (response.error) {
        toast.error("Failed to generate recipe. Please try again.");
        return;
      }
      const recipeText = response.data!;
      const extractedData = parseRecipe(recipeText);
      setRecipe(extractedData);
      toast.success("Recipe Generated", {
        description: "Your personalized recipe is ready!",
      });
    } catch (error) {
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <RecipeForm onSubmit={generateRecipe} isLoading={isLoading} />
          <RecipeCard recipe={recipe} isLoading={isLoading} />
        </div>
      </div>
      <Toaster richColors closeButton />
    </main>
  );
}

// "use client";

// import LandingPage from "@/components/LandingPage";

// export default function Home() {
//   return <LandingPage />;
// }