"use client";

import { useEffect, useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import { Recipe } from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { addUser, createRecipe, getRecipe, getRecipeForUser } from "./actions";
import RecipeCard from "@/components/RecipeDisplay/RecipeCard";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function RecipeHome() {
  const [recipe, setRecipe] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const fromPath = searchParams.get("from");

  const { user } = useUser();

  const {id: userId, primaryEmailAddress: { emailAddress }} = user!;

  useEffect(() => {
    if (fromPath && fromPath === "sign-up" && emailAddress) {
      addUser(emailAddress, userId);
      toast.success("You are in now!");
    }
    getRecipeForUser(userId)
  }, []);

  const generateRecipe = async (formData: any) => {
    setIsLoading(true);

    try {
      const response = await getRecipe(formData);
      if (response.error) {
        toast.error("Failed to generate recipe. Please try again.");
        return;
      }
      const recipeText = response.data!;
      setRecipe(recipeText);
      toast.success("Recipe Generated", {
        description: "Your personalized recipe is ready!",
      });
    } catch (error) {
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSave = async () => {
    try {
      await createRecipe(recipe!, userId); 
      toast.success("Recipe saved successfully!")
    } catch (error) {
      toast.error("Failed to save recipe. Please try again.");
    }
  }

  return (
    <main className="flex min-h-screen justify-center items-center min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <RecipeForm onSubmit={generateRecipe} isLoading={isLoading} />
          <RecipeCard recipe={recipe} isLoading={isLoading} onSave={handleOnSave}/>
        </div>
      </div>
      <Toaster richColors closeButton />
    </main>
  );
}
