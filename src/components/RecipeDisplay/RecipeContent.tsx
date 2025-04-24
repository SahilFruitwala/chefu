"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, ChefHat, Globe, Utensils } from "lucide-react";

interface RecipeContentProps {
  title: string;
  ingredients: string[];
  equipment: string[];
  dietaryInfo: string;
  cookingTime: string;
  skillLevel: string;
  cuisineType: string;
}

export default function RecipeContent({
  title,
  ingredients,
  equipment,
  dietaryInfo,
  cookingTime,
  skillLevel,
  cuisineType,
}: RecipeContentProps) {
  return (
    <div className="space-y-8 text-foreground animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="flex items-center gap-1 py-1 text-sm">
            <Globe className="w-3 h-3" />
            {cuisineType}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 py-1 text-sm">
            {dietaryInfo}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 py-1 text-sm">
            <Clock className="w-3 h-3" />
            {cookingTime}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 py-1 text-sm">
            <ChefHat className="w-3 h-3" />
            {skillLevel}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              Ingredients
            </h3>
            <ul className="space-y-2.5">
              {ingredients.map((ingredient, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {ingredient.replace('- ', '')}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-primary" />
              Equipment Needed
            </h3>
            <ul className="space-y-2.5">
              {equipment.map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}