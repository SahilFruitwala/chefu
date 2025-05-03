"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeDisplay/RecipeCard";
import { History, Trash2 } from "lucide-react";
import { deleteRecipeById, getRecipeById, getRecipeForUser } from "@/app/actions/recipes";
import { useUser } from "@clerk/nextjs";
import { SelectRecipe } from "@/db/schema";
import {toast, Toaster} from 'sonner'

export default function HistoryPage() {
  const [recipes, setRecipes] = useState<Array<{ id: number; title: string }>>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<SelectRecipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useUser();
  const {id: userId} = user!;

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      const savedRecipes = await getRecipeForUser(userId);
      setRecipes(savedRecipes);
      if (savedRecipes.length > 0) {
        const recipe = await getRecipeById(savedRecipes[0].id, userId)
        setSelectedRecipe(recipe[0]);
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const onRecipeSelect = async (recipeId: number) => {
    setIsLoading(true);
    const recipe = await getRecipeById(recipeId, userId);
    setSelectedRecipe(recipe[0]);
    setIsLoading(false);
  }
  

  const handleDeleteRecipe = async (recipeId: number) => {
    setIsLoading(true);
    await deleteRecipeById(recipeId, userId);
    setRecipes(recipes.filter((recipe) => recipe.id !== recipeId))
    if (selectedRecipe?.id === recipeId) {
      setSelectedRecipe(null);
    }
    setIsLoading(false);
    toast.info("The recipe has been removed from your history.");
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {recipes.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 bg-card rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Saved Recipes
              </h2>
              <div className="space-y-2 max-h-[400px] pr-8 rounded-lg">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className={`flex items-center justify-between rounded-lg transition-colors ${
                      selectedRecipe?.id === recipe.id
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    } group`}
                  >
                    <Button
                      variant={
                        selectedRecipe?.id === recipe.id ? "default" : "ghost"
                      }
                      className={`w-full justify-start h-auto py-3 px-4 rounded-lg text-left font-medium transition-colors`}
                      onClick={() => onRecipeSelect(recipe.id)}
                    >
                      <span className="truncate">{recipe.title}</span>
                    </Button>
                    {/* Uncomment and implement delete logic to enable delete button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${
                        selectedRecipe?.id === recipe.id
                          ? "opacity-100"
                          : "opacity-30"
                      } group-hover:opacity-100 transition-opacity ml-2  hover:bg-destructive/10`}
                      onClick={() => handleDeleteRecipe(recipe.id)}
                      aria-label={`Delete ${recipe.title}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <RecipeCard
                recipe={selectedRecipe?.recipe!}
                isLoading={isLoading}
                readOnly={true}
                onSave={null}
              />
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
      <Toaster richColors closeButton />
    </main>
  );
}
