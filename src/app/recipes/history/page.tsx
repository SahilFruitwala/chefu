"use client";

import { useState, useEffect } from "react";
import { Recipe } from "@/lib/types";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeDisplay/RecipeCard";
import { History, Trash2 } from "lucide-react";
import { getRecipeForUser } from "../actions";
import { useUser } from "@clerk/nextjs";
import { SelectRecipe } from "@/db/schema";

export default function HistoryPage() {
  const [recipes, setRecipes] = useState<SelectRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<SelectRecipe | null>(
    null
  );
  const { user } = useUser();
  const {id: userId} = user!;

  useEffect(() => {
    const loadRecipes = async () => {
      const savedRecipes = await getRecipeForUser(userId);
      setRecipes(savedRecipes);
      if (savedRecipes.length > 0) {
        setSelectedRecipe(savedRecipes[0]);
      }
    };

    loadRecipes();
  }, []);

  const handleDeleteRecipe = (id: number) => {
    // removeSavedRecipe(id);
    // const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    // setRecipes(updatedRecipes);

    // if (selectedRecipe?.id === id) {
    //   setSelectedRecipe(updatedRecipes[0] || null);
    // }

    // toast({
    //   title: "Recipe Deleted",
    //   description: "The recipe has been removed from your history.",
    // });
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {recipes.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Saved Recipes</h2>
              <div className="space-y-2">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center justify-between group"
                  >
                    <Button
                      variant={
                        selectedRecipe?.id === recipe.id ? "default" : "ghost"
                      }
                      className="w-full justify-start h-auto py-3 px-4"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      <span className="truncate">{recipe.title}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {}}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <RecipeCard recipe={selectedRecipe?.recipe!} isLoading={false} readOnly={true} onSave={() => {}}/>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Saved Recipes</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              You haven't saved any recipes yet. Generate and save recipes to
              see them here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
