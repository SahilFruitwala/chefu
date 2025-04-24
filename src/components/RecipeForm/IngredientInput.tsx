"use client";

import { useState, KeyboardEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/lib/types";
import { cn } from "@/lib/utils";

interface IngredientInputProps {
  form: UseFormReturn<FormValues>;
}

export default function IngredientInput({ form }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");
  const ingredients = form.watch("ingredients");

  // Add ingredient to the list
  const addIngredient = (ingredient: string) => {
    if (!ingredient.trim()) return;
    
    // Don't add duplicates
    if (!ingredients.includes(ingredient.trim())) {
      form.setValue("ingredients", [...ingredients, ingredient.trim()]);
      form.trigger("ingredients");
    }
    
    setInputValue("");
  };

  // Remove ingredient from the list
  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    form.setValue("ingredients", newIngredients);
    form.trigger("ingredients");
  };

  // Handle keyboard events (Enter, comma)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient(inputValue);
    }
  };

  return (
    <FormField
      control={form.control}
      name="ingredients"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-base font-medium">Available Ingredients</FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type ingredient and press Enter"
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => addIngredient(inputValue)}
                  disabled={!inputValue.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div 
                className={cn(
                  "min-h-20 p-2 rounded-md border flex flex-wrap gap-2",
                  ingredients.length === 0 ? "items-center justify-center" : ""
                )}
              >
                {ingredients.length > 0 ? (
                  ingredients.map((ingredient, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="h-7 px-2 text-sm flex items-center gap-1 animate-in fade-in duration-300"
                    >
                      {ingredient}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors" 
                        onClick={() => removeIngredient(index)}
                      />
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Add ingredients you have available</p>
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}