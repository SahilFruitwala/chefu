"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loader2, Sparkles } from "lucide-react";
import IngredientInput from "./IngredientInput";
import EquipmentSelector from "./EquipmentSelector";
import FormFields from "./FormFields";
import { DIETARY_RESTRICTIONS, MEAL_TYPES, COOKING_TIMES, SKILL_LEVELS, FormValues, EQUIPMENT_OPTIONS } from "@/lib/types";
import AllergiesInput from "./AllergiesInput";

const formSchema = z.object({
  ingredients: z.array(z.string()).min(1, "Add at least one ingredient"),
  equipment: z.array(z.string()).default([EQUIPMENT_OPTIONS[0].id]),
  dietaryRestrictions: z.string().default(DIETARY_RESTRICTIONS[0].value),
  allergies: z.array(z.string()),
  mealType: z.string().default(MEAL_TYPES[0].value),
  cookingTime: z.string().default(COOKING_TIMES[0].value),
  skillLevel: z.string().default(SKILL_LEVELS[0].value),
  servings: z.string().default("1"),
});

interface RecipeFormProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}

export default function RecipeForm({ onSubmit, isLoading }: RecipeFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: [],
      equipment: [EQUIPMENT_OPTIONS[0].id],
      dietaryRestrictions: DIETARY_RESTRICTIONS[0].value,
      allergies: [],
      mealType: MEAL_TYPES[0].value,
      cookingTime: COOKING_TIMES[0].value,
      skillLevel: SKILL_LEVELS[0].value,
      servings: "1",
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
  };

  const handleClearForm = () => {
    form.reset({
      ingredients: [],
      equipment: [EQUIPMENT_OPTIONS[0].id],
      dietaryRestrictions: DIETARY_RESTRICTIONS[0].value,
      allergies: [],
      mealType: MEAL_TYPES[0].value,
      cookingTime: COOKING_TIMES[0].value,
      skillLevel: SKILL_LEVELS[0].value,
      servings: "1",
    });
  };

  return (
    <Card className="recipe-card bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl">Create Your Recipe</CardTitle>
        <CardDescription>
          Tell us what you have, and we'll create a delicious recipe for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <IngredientInput form={form} />
            <EquipmentSelector form={form} />
            <AllergiesInput form={form} />
            <FormFields form={form} />

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
                {isLoading ? "Creating Recipe..." : "Generate Recipe"}
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