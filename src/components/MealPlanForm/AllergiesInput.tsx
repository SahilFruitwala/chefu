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

interface AllergiesInputProps {
  form: UseFormReturn<FormValues>;
}

export default function AllergiesInput({ form }: AllergiesInputProps) {
  const [inputValue, setInputValue] = useState("");
  const allergies = form.watch("allergies");

  // Add allergies to the list
  const addAllergie = (allergie: string) => {
    if (!allergie.trim()) return;

    // Don't add duplicates
    if (!allergies.includes(allergie.trim())) {
      form.setValue("allergies", [...allergies, allergie.trim()]);
      form.trigger("allergies");
    }

    setInputValue("");
  };

  // Remove allergie from the list
  const removeAllergie = (index: number) => {
    const newAllergies = [...allergies];
    newAllergies.splice(index, 1);
    form.setValue("allergies", newAllergies);
    form.trigger("allergies");
  };

  // Handle keyboard events (Enter, comma)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addAllergie(inputValue);
    }
  };

  return (
    <FormField
      control={form.control}
      name="allergies"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-base font-medium">Add Allergies</FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type allergie and press Enter"
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => addAllergie(inputValue)}
                  disabled={!inputValue.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div
                className={cn(
                  "min-h-20 p-2 rounded-md border flex flex-wrap gap-2",
                  allergies.length === 0 ? "items-center justify-center" : ""
                )}
              >
                {allergies.length > 0 ? (
                  allergies.map((allergie, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="h-7 px-2 text-sm flex items-center gap-1 animate-in fade-in duration-300"
                    >
                      {allergie}
                      <button
                        type="button"
                        className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors flex items-center justify-center"
                        onClick={() => removeAllergie(index)}
                      >
                        <X />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Add allergies you have
                  </p>
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