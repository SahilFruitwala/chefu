"use client";

import { useEffect, useState } from "react";
import { MealPlanFormValues} from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { addUser } from "@/app/actions/users";
import { createMealPlan, getMealPlanForUser } from "@/app/actions/meal-plans";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import MealPlanForm from "@/components/MealPlanForm";
import { generateMealPlan } from "@/app/actions/gemini";
import MealPlansCard from "@/components/MealPlanDisplay";

export default function MealPlanHome() {
  const [mealPlan, setMealPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({} as MealPlanFormValues);

  const searchParams = useSearchParams();
  const fromPath = searchParams.get("from");

  const { user } = useUser();
  const { id: userId, primaryEmailAddress } = user!;
  const emailAddress = primaryEmailAddress?.emailAddress!;

  useEffect(() => {
    if (fromPath && fromPath === "sign-up" && emailAddress) {
      addUser(emailAddress, userId);
      toast.success("You are in!");
    }
    getMealPlanForUser(userId);
  }, []);

  const onGenerateMealPlan = async (formData: MealPlanFormValues) => {
    setIsLoading(true);
    setFormData(formData);
    try {
      const response = await generateMealPlan(formData);
      if (response.error) {
        toast.error("Failed to generate recipe. Please try again.");
        return;
      }
      const mealPlanText = response.data!;
      setMealPlan(mealPlanText);
      toast.success("Meal Plan Generated", {
        description: "Your personalized meal plan is ready!",
      });
    } catch (error) {
      setFormData({} as MealPlanFormValues);
      console.error("Error generating meal plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSave = async () => {
    try {
      await createMealPlan(mealPlan!, userId, formData);
      toast.success("Meal plan saved successfully!");
    } catch (error) {
      toast.error("Failed to save meal plan. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <MealPlanForm onSubmit={onGenerateMealPlan} isLoading={isLoading} />
          <MealPlansCard
            mealPlan={mealPlan}
            isLoading={isLoading}
            onSave={handleOnSave}
          />
        </div>
      </div>
      <Toaster richColors closeButton />
    </main>
  );
}
