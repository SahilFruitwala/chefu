"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loader2, Sparkles } from "lucide-react";
import EquipmentSelector from "./EquipmentSelector";
import FormFields from "./FormFields";
import {
  MealPlanFormValues,
  EQUIPMENT_OPTIONS,
  CALORIES_TRAGET,
  DIETARY_PREFERENCE,
  MEAL_PLAN_DURATION,
} from "@/lib/types";
import AllergiesInput from "./AllergiesInput";

const formSchema = z.object({
  calorieTarget: z.string().default(CALORIES_TRAGET[0].value),
  equipment: z.array(z.string()).default([EQUIPMENT_OPTIONS[0].id]),
  allergies: z.array(z.string()),
  dietaryPreferences: z.string().default(DIETARY_PREFERENCE[0].value),
  mealsPerDay: z.string().default("3"),
  mealPlanFor: z.string().default(MEAL_PLAN_DURATION[0].value),
  isBudgetFriendly: z.boolean().default(false),
});

interface MealPlanFormProps {
  onSubmit: (data: MealPlanFormValues) => void;
  isLoading: boolean;
}

export default function MealPlanForm({ onSubmit, isLoading }: MealPlanFormProps) {
  const form = useForm<MealPlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calorieTarget: CALORIES_TRAGET[0].value,
      equipment: [EQUIPMENT_OPTIONS[0].id],
      dietaryPreferences: DIETARY_PREFERENCE[0].value,
      allergies: [],
      mealsPerDay: "3",
      mealPlanFor: MEAL_PLAN_DURATION[0].value,
      isBudgetFriendly: false,
    },
  });

  const handleFormSubmit = (data: MealPlanFormValues) => {
    onSubmit(data);
  };

  const handleClearForm = () => {
    form.reset({
      calorieTarget: CALORIES_TRAGET[0].value,
      equipment: [EQUIPMENT_OPTIONS[0].id],
      dietaryPreferences: DIETARY_PREFERENCE[0].value,
      allergies: [],
      mealsPerDay: "3",
      mealPlanFor: MEAL_PLAN_DURATION[0].value,
      isBudgetFriendly: false,
    });
  };

  return (
    <Card className="recipe-card bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl">Create Your Meal Plan</CardTitle>
        <CardDescription>
          Generate personalized meal plans based on your preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <FormFields form={form} />
            <EquipmentSelector form={form} />
            <AllergiesInput form={form} />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-md hover:shadow-amber-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {isLoading ? "Creating Meal Plan..." : "Generate Meal Plan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClearForm}
                className="flex-1"
                disabled={isLoading}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}