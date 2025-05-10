"use client";

import { useEffect, useState } from "react";
import { Features, MealPlanFormValues } from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { addUser } from "@/app/actions/users";
import { createMealPlan, getMealPlanForUser } from "@/app/actions/meal-plans";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import MealPlanForm from "@/components/MealPlanForm";
import { generateMealPlan } from "@/app/actions/gemini";
import MealPlansCard from "@/components/MealPlanDisplay";
import { useMealPlanStore } from "@/stores/counter-store";
import {
  getFeatureCountAndLimit,
  updateFeatureCount,
} from "@/app/actions/counter";

export default function MealPlanHome() {
  const [mealPlan, setMealPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({} as MealPlanFormValues);

  const searchParams = useSearchParams();
  const fromPath = searchParams.get("from");

  const { user } = useUser();
  const { id: userId, primaryEmailAddress } = user!;
  const emailAddress = primaryEmailAddress?.emailAddress!;

  const { count, maxUsageCount, increaseCount, setCounter } =
    useMealPlanStore();

  const setCounterData = async () => {
    const { usageCount, featureLimit } = await getFeatureCountAndLimit(
      userId,
      Features.MEAL_PLAN
    );
    setCounter({
      currentCount: usageCount,
      maxUsageCount: featureLimit,
    });
  };

  useEffect(() => {
    if (fromPath && fromPath === "sign-up" && emailAddress) {
      addUser(emailAddress, userId);
      toast.success("You are in!");
    }
    if (count === null) {
      setCounterData();
    }
  }, []);

  const onGenerateMealPlan = async (formData: MealPlanFormValues) => {
    if (count! >= maxUsageCount) {
      toast.error("You have used all your max usage");
    } else {
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
        try {
          updateFeatureCount(userId, Features.MEAL_PLAN);
          increaseCount();
        } catch (error) {
          console.log("Error updating feature count:", error);
        }
        toast.success("Meal Plan Generated", {
          description: "Your personalized meal plan is ready!",
        });
      } catch (error) {
        setMealPlan(null);
        setFormData({} as MealPlanFormValues);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOnSave = async () => {
    try {
      await createMealPlan(mealPlan!, userId, formData);
      try {
        updateFeatureCount(userId, Features.SAVE_MEAL_PLAN);
      } catch (error) {
        console.log("Error updating feature count:", error);
      }
      toast.success("Meal plan saved successfully!");
    } catch (error) {
      toast.error(error.message);
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
            readonly={false}
          />
        </div>
      </div>
      <Toaster richColors closeButton />
    </main>
  );
}
