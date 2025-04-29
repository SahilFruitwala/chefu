"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Save, Printer, Flame, Dumbbell, Wheat, Droplet, Leaf, Candy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Clock, Utensils, Users, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LoadingState from "@/components/RecipeDisplay/LoadingState";
import EmptyState from "@/components/RecipeDisplay/EmptyState";
import { parseRecipe } from "@/lib/prompt";

export default function RecipeCard({
  recipe,
  isLoading,
  onSave,
  readOnly = false,
}: {
  recipe: String | null;
  isLoading: boolean;
  onSave: () => void;
  readOnly?: boolean;
}) {
  if (isLoading) {
    return (
      <Card className="w-full h-[1098px] flex flex-col shadow-md transition-all duration-300 shadow-lg hover:shadow-md hover:shadow-amber-400">
        <LoadingState />
      </Card>
    );
  }

  if (!recipe && !isLoading) {
    return (
      <Card className="w-full h-[1098px] flex flex-col shadow-md transition-all duration-300 shadow-lg hover:shadow-md hover:shadow-amber-400">
        <EmptyState />
      </Card>
    );
  }

  const extractedData = parseRecipe(recipe || "");

  return (
    <div id="print-area">
      <Card className="w-full h-auto md:h-[1098px] flex flex-col transition-all duration-300 shadow-lg hover:shadow-md hover:shadow-amber-400">
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{extractedData.title}</CardTitle>
              <CardDescription>{extractedData.description}</CardDescription>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {extractedData.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="pb-0 space-y-4 overflow-y-auto flex-1">
          <div className="flex flex-wrap gap-4 text-sm mt-2">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{extractedData.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              <span>{extractedData.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{extractedData.servings} servings</span>
            </div>
          </div>

          <Separator />

          {/* Nutrition Information */}
          {(extractedData.nutrition && extractedData.nutrition?.calories) && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Nutrition Information</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  Calories: {extractedData.nutrition.calories} kcal
                </li>
                <li className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Protein: {extractedData.nutrition.protein} g
                </li>
                <li className="flex items-center gap-2">
                  <Wheat className="h-4 w-4" />
                  Carbohydrates: {extractedData.nutrition.carbohydrates} g
                </li>
                <li className="flex items-center gap-2">
                  <Droplet className="h-4 w-4" />
                  Fat: {extractedData.nutrition.fat} g
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Fiber: {extractedData.nutrition.fiber} g
                </li>
                <li className="flex items-center gap-2">
                  <Candy className="h-4 w-4" />
                  Sugar: {extractedData.nutrition.sugar} g
                </li>
              </ul>

              <div className="mt-3 flex items-center gap-2 p-2 border border-yellow-100 rounded text-xs">
                <svg
                  className="w-3 h-3 text-yellow-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Nutrition facts may not be fully accurate. Please verify with
                  trusted sources.
                </span>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-2">Ingredients</h3>
            <ul className="space-y-1 text-sm">
              {extractedData.ingredients.map((ingredient, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Instructions</h3>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              {extractedData.instructions.map((step, i) => (
                <li key={i} className="pl-2">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>

        {!readOnly && (
          <CardFooter className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-shrink-0">
            <p className="text-sm text-muted-foreground">
              {extractedData.note}
            </p>
            <div className="flex gap-2">
              <Button onClick={onSave}>
                <Save className="w-4 h-4 mr-1" />
                Save Recipe
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-1" />
                Print Recipe
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}