"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { History, Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { SelectMealPlan } from "@/db/schema";
import { toast, Toaster } from "sonner";
import {
  deleteMealPlanById,
  getMealPlanById,
  getMealPlanForUser,
} from "@/app/actions/meal-plans";
import MealPlansCard from "@/components/MealPlanDisplay";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function HistoryPage() {
  const [mealPlans, setMealPlans] = useState<
    Array<{ id: number; days: number; tags: any }>
  >([]);
  const [selectedMealPlan, setSelectedMealPlan] =
    useState<SelectMealPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useUser();
  const { id: userId } = user!;

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      const savedMealPlans = await getMealPlanForUser(userId);
      setMealPlans(savedMealPlans);
      if (savedMealPlans.length > 0) {
        const mealPlan = await getMealPlanById(savedMealPlans[0].id, userId);
        setSelectedMealPlan(mealPlan[0]);
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const onRecipeSelect = async (recipeId: number) => {
    setIsLoading(true);
    const mealPlan = await getMealPlanById(recipeId, userId);
    setSelectedMealPlan(mealPlan[0]);
    setIsLoading(false);
  };

  const handleDeleteRecipe = async (mealPlanId: number) => {
    setIsLoading(true);
    await deleteMealPlanById(mealPlanId, userId);
    setMealPlans(mealPlans.filter((mealPlan) => mealPlan.id !== mealPlanId));
    if (selectedMealPlan?.id === mealPlanId) {
      setSelectedMealPlan(null);
    }
    setIsLoading(false);
    toast.info("Meal plan has been removed from your history.");
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {mealPlans.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 bg-card rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Saved Meal Plans
              </h2>
              <div className="space-y-2 max-h-[400px] pr-8 rounded-lg">
                {mealPlans.map((mealPlan) => (
                  <div
                    key={mealPlan.id}
                    className={`flex items-center justify-between rounded-lg transition-colors ${
                      selectedMealPlan?.id === mealPlan.id
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    } group`}
                  >
                    <Button
                      variant={
                        selectedMealPlan?.id === mealPlan.id
                          ? "secondary"
                          : "ghost"
                      }
                      className={`w-full justify-start h-auto py-3 px-4 rounded-lg text-left font-medium transition-colors`}
                      onClick={() => onRecipeSelect(mealPlan.id)}
                    >
                      <span className="truncate">{mealPlan.days} Days</span>
                      <Separator orientation="vertical" />
                      {Array.from(mealPlan.tags).map((tag, index) => (
                        <Badge variant="default" key={index}>
                          {String(tag)}
                        </Badge>
                      ))}
                    </Button>
                    {/* Uncomment and implement delete logic to enable delete button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${
                        selectedMealPlan?.id === mealPlan.id
                          ? "opacity-100"
                          : "opacity-30"
                      } group-hover:opacity-100 transition-opacity ml-2  hover:bg-destructive/10`}
                      onClick={() => handleDeleteRecipe(mealPlan.id)}
                      aria-label={`Delete ${mealPlan.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <MealPlansCard
                mealPlan={selectedMealPlan?.mealPlan!}
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
