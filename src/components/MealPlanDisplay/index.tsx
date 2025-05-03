"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Utensils, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import EmptyState from "./EmptyState";
import MealPlanLoadingState from "./LoadingState";
import { parseMealPlan } from "@/lib/prompt";
import { Button } from "../ui/button";

export default function MealPlansCard({
  mealPlan,
  isLoading,
  onSave,
  readOnly = false,
}: {
  mealPlan: string | null;
  isLoading: boolean;
  onSave: null | (() => void);
  readonly: boolean;
}) {
  const [openDays, setOpenDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setOpenDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  if (!mealPlan && !isLoading) {
    return (
      <Card className="w-full h-auto flex flex-col transition-all duration-300 shadow-lg hover:shadow-md hover:shadow-amber-400">
        <EmptyState />
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-8">
        <MealPlanLoadingState />
      </Card>
    );
  }

  const extractedData = parseMealPlan(mealPlan || "");
  //   "Day 1:": {
  //     breakfast: {
  //       name: "Avocado Toast with Fried Egg",
  //       description:
  //         "Whole-wheat toast topped with mashed avocado, a fried egg, and a sprinkle of red pepper flakes.",
  //     },
  //     lunch: {
  //       name: "Mediterranean Quinoa Salad",
  //       description:
  //         "Quinoa salad with cucumbers, tomatoes, Kalamata olives, feta cheese, and a lemon-herb vinaigrette.",
  //     },
  //     dinner: {
  //       name: "Baked Salmon with Roasted Asparagus and Sweet Potato",
  //       description:
  //         "Baked salmon fillet seasoned with herbs, served with roasted asparagus and sweet potato wedges.",
  //     },
  //   },
  //   "Day 2:": {
  //     breakfast: {
  //       name: "Berry Smoothie with Greek Yogurt",
  //       description:
  //         "Smoothie made with mixed berries, Greek yogurt, spinach, and a splash of almond milk.",
  //     },
  //     lunch: {
  //       name: "Chicken Caesar Salad",
  //       description:
  //         "Grilled chicken breast over romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.",
  //     },
  //     dinner: {
  //       name: "Lentil Soup with Crusty Bread",
  //       description:
  //         "Hearty lentil soup with vegetables, served with a slice of crusty bread.",
  //     },
  //   },
  //   "Day 3:": {
  //     breakfast: {
  //       name: "Oatmeal with Berries and Nuts",
  //       description:
  //         "Oatmeal cooked with water or milk, topped with fresh berries and a handful of nuts.",
  //     },
  //     lunch: {
  //       name: "Turkey and Avocado Wrap",
  //       description:
  //         "Whole-wheat wrap filled with sliced turkey breast, avocado, lettuce, and a light spread of hummus.",
  //     },
  //     dinner: {
  //       name: "Shrimp Scampi with Zucchini Noodles",
  //       description:
  //         "Shrimp sautéed in garlic butter sauce, served over zucchini noodles.",
  //     },
  //   },
  //   "Day 4:": {
  //     breakfast: {
  //       name: "Oatmeal with Berries and Nuts",
  //       description:
  //         "Oatmeal cooked with water or milk, topped with fresh berries and a handful of nuts.",
  //     },
  //     lunch: {
  //       name: "Turkey and Avocado Wrap",
  //       description:
  //         "Whole-wheat wrap filled with sliced turkey breast, avocado, lettuce, and a light spread of hummus.",
  //     },
  //     dinner: {
  //       name: "Shrimp Scampi with Zucchini Noodles",
  //       description:
  //         "Shrimp sautéed in garlic butter sauce, served over zucchini noodles.",
  //     },
  //   },
  //   "Day 5:": {
  //     breakfast: {
  //       name: "Oatmeal with Berries and Nuts",
  //       description:
  //         "Oatmeal cooked with water or milk, topped with fresh berries and a handful of nuts.",
  //     },
  //     lunch: {
  //       name: "Turkey and Avocado Wrap",
  //       description:
  //         "Whole-wheat wrap filled with sliced turkey breast, avocado, lettuce, and a light spread of hummus.",
  //     },
  //     dinner: {
  //       name: "Shrimp Scampi with Zucchini Noodles",
  //       description:
  //         "Shrimp sautéed in garlic butter sauce, served over zucchini noodles.",
  //     },
  //   },
  //   "Day 6:": {
  //     breakfast: {
  //       name: "Oatmeal with Berries and Nuts",
  //       description:
  //         "Oatmeal cooked with water or milk, topped with fresh berries and a handful of nuts.",
  //     },
  //     lunch: {
  //       name: "Turkey and Avocado Wrap",
  //       description:
  //         "Whole-wheat wrap filled with sliced turkey breast, avocado, lettuce, and a light spread of hummus.",
  //     },
  //     dinner: {
  //       name: "Shrimp Scampi with Zucchini Noodles",
  //       description:
  //         "Shrimp sautéed in garlic butter sauce, served over zucchini noodles.",
  //     },
  //   },
  //   "Day 7:": {
  //     breakfast: {
  //       name: "Oatmeal with Berries and Nuts",
  //       description:
  //         "Oatmeal cooked with water or milk, topped with fresh berries and a handful of nuts.",
  //     },
  //     lunch: {
  //       name: "Turkey and Avocado Wrap",
  //       description:
  //         "Whole-wheat wrap filled with sliced turkey breast, avocado, lettuce, and a light spread of hummus.",
  //     },
  //     dinner: {
  //       name: "Shrimp Scampi with Zucchini Noodles",
  //       description:
  //         "Shrimp sautéed in garlic butter sauce, served over zucchini noodles.",
  //     },
  //   },
  //   "Day 8:": {
  //     breakfast: {
  //       name: "Oatmeal with Berries and Nuts",
  //       description:
  //         "Oatmeal cooked with water or milk, topped with fresh berries and a handful of nuts.",
  //     },
  //     lunch: {
  //       name: "Turkey and Avocado Wrap",
  //       description:
  //         "Whole-wheat wrap filled with sliced turkey breast, avocado, lettuce, and a light spread of hummus.",
  //     },
  //     dinner: {
  //       name: "Shrimp Scampi with Zucchini Noodles",
  //       description:
  //         "Shrimp sautéed in garlic butter sauce, served over zucchini noodles.",
  //     },
  //   },
  //   "Day 9:": {
  //     breakfast: {
  //       name: "Oatmeal with Berries and Nuts",
  //       description:
  //         "Oatmeal cooked with water or milk, topped with fresh berries and a handful of nuts.",
  //     },
  //     lunch: {
  //       name: "Turkey and Avocado Wrap",
  //       description:
  //         "Whole-wheat wrap filled with sliced turkey breast, avocado, lettuce, and a light spread of hummus.",
  //     },
  //     dinner: {
  //       name: "Shrimp Scampi with Zucchini Noodles",
  //       description:
  //         "Shrimp sautéed in garlic butter sauce, served over zucchini noodles.",
  //     },
  //   },
  //   "Day 10:": {
  //     breakfast: {
  //       name: "Oatmeal with Berries and Nuts",
  //       description:
  //         "Oatmeal cooked with water or milk, topped with fresh berries and a handful of nuts.",
  //     },
  //     lunch: {
  //       name: "Turkey and Avocado Wrap",
  //       description:
  //         "Whole-wheat wrap filled with sliced turkey breast, avocado, lettuce, and a light spread of hummus.",
  //     },
  //     dinner: {
  //       name: "Shrimp Scampi with Zucchini Noodles",
  //       description:
  //         "Shrimp sautéed in garlic butter sauce, served over zucchini noodles.",
  //     },
  //   },
  // };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Your Weekly Meal Plan</h2>
              <p className="text-muted-foreground">
                A balanced mix of nutritious meals tailored to your preferences.
                Click on each day to view the meals.
              </p>
            </div>
            {!readOnly && (
              <Button onClick={onSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Meal Plan
              </Button>
            )}
          </div>
        </Card>
        <div className="overflow-hidden no-scrollbar bg-card rounded-lg space-y-4 max-w-2xl mx-auto lg:max-h-[720px] lg:overflow-y-auto">
          {Object.entries(extractedData).map(([day, meals]) => (
            <Collapsible
              key={day}
              open={openDays.includes(day)}
              onOpenChange={() => toggleDay(day)}
            >
              <Card className="bg-primary/5 hover:bg-primary/10">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="transition-colors py-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{day}</CardTitle>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          openDays.includes(day) ? "transform rotate-180" : ""
                        )}
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-background">
                  <CardContent className="divide-y pt-4">
                    {meals.breakfast && (
                      <div className="py-4 first:pt-0">
                        <Badge variant="outline" className="mb-2">
                          Breakfast
                        </Badge>
                        <h3 className="font-medium mb-1">
                          {meals.breakfast.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {meals.breakfast.description}
                        </p>
                      </div>
                    )}
                    {meals.lunch && (
                      <div className="py-4">
                        <Badge variant="outline" className="mb-2">
                          Lunch
                        </Badge>
                        <h3 className="font-medium mb-1">{meals.lunch.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {meals.lunch.description}
                        </p>
                      </div>
                    )}
                    {meals.dinner && (
                      <div className="py-4">
                        <Badge variant="outline" className="mb-2">
                          Dinner
                        </Badge>
                        <h3 className="font-medium mb-1">
                          {meals.dinner.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {meals.dinner.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
