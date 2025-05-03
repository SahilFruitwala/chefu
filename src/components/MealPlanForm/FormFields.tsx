"use client";

import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormValues, DIETARY_RESTRICTIONS, MEAL_TYPES, COOKING_TIMES, SKILL_LEVELS, MEAL_PLAN_DURATION, CALORIES_TRAGET, DIETARY_PREFERENCE } from "@/lib/types"
import { Checkbox } from "../ui/checkbox";

interface FormFieldsProps {
  form: UseFormReturn<FormValues>;
}

export default function FormFields({ form }: FormFieldsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="dietaryPreferences"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">
              Dietary Preferences
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {DIETARY_PREFERENCE.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
        {/* Meal plan duration */}
        <FormField
          control={form.control}
          name="mealPlanFor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Meal Plan Duration
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MEAL_PLAN_DURATION.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Skill Level */}
        <FormField
          control={form.control}
          name="calorieTarget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Calorie Target
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CALORIES_TRAGET.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="isBudgetFriendly"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2 rounded-md py-3 transition-colors hover:bg-secondary/50">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="size-5"
              />
            </FormControl>
            <div>
              <FormLabel className="text-md">
                Prefer budget-friendly options?
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}