"use client";

import { useEffect, useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { generateRecipe } from "@/app/actions/gemini";
import { createRecipe, getRecipeForUser } from "@/app/actions/recipes";
import { addUser } from "@/app/actions/users";
import RecipeCard from "@/components/RecipeDisplay/RecipeCard";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  getFeatureCountAndLimit,
  updateFeatureCount,
} from "@/app/actions/counter";
import { useRecipeStore } from "@/stores/counter-store";
import { Features } from "@/lib/types";

export default function RecipeHome() {
  const [recipe, setRecipe] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const fromPath = searchParams.get("from");
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();
  const { id: userId, primaryEmailAddress } = user!;
  const emailAddress = primaryEmailAddress?.emailAddress!;

  const { count, maxUsageCount, increaseCount, setCounter } = useRecipeStore();

  const setCounterData = async () => {
    const { usageCount, featureLimit } = await getFeatureCountAndLimit(
      userId,
      Features.RECIPE
    );
    setCounter({
      currentCount: usageCount,
      maxUsageCount: featureLimit,
    });
  };

  useEffect(() => {
    if (fromPath && fromPath === "sign-up" && emailAddress) {
      addUser(emailAddress, userId);
      toast.success("You are in now!");
      router.replace(pathname);
    }
    if (count === null) {
      setCounterData();
    }
  }, []);

  const onGenerateRecipe = async (formData: any) => {
    if (count! >= maxUsageCount) {
      toast.error("You have used all your max usage for today.");
    } else {
      setIsLoading(true);
      try {
        const response = await generateRecipe(formData);
        if (response.error) {
          toast.error("Failed to generate recipe. Please try again.");
          return;
        }
        const recipeText = response.data!;
        setRecipe(recipeText);
        try {
          updateFeatureCount(userId, Features.RECIPE);
          increaseCount();
        } catch (error) {
          console.log("Error updating feature count:", error);
        }
        !recipeText.includes("Error:") && toast.success("Recipe Generated", {
          description: "Your personalized recipe is ready!",
        });
      } catch (error) {
        setRecipe(null);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOnSave = async () => {
    try {
      await createRecipe(recipe!, userId);
      try {
        updateFeatureCount(userId, Features.SAVE_RECIPE);
      } catch (error) {
        console.log("Error updating feature count:", error);
      }
      toast.success("Recipe saved successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <RecipeForm onSubmit={onGenerateRecipe} isLoading={isLoading} />
          <RecipeCard
            recipe={recipe}
            isLoading={isLoading}
            onSave={handleOnSave}
          />
        </div>
      </div>
      <Toaster richColors closeButton />
    </main>
  );
}
