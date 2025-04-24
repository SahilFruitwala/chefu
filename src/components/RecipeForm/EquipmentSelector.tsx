"use client";

import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormValues, EQUIPMENT_OPTIONS } from "@/lib/types";

interface EquipmentSelectorProps {
  form: UseFormReturn<FormValues>;
}

export default function EquipmentSelector({ form }: EquipmentSelectorProps) {
  const equipment = form.watch("equipment") || [];

  // Toggle equipment selection
  const toggleEquipment = (checked: boolean, value: string) => {
    const updatedEquipment = checked
      ? [...equipment, value]
      : equipment.filter(item => item !== value);
    
    form.setValue("equipment", updatedEquipment);
  };

  return (
    <FormField
      control={form.control}
      name="equipment"
      render={() => (
        <FormItem>
          <FormLabel className="text-base font-medium">Kitchen Equipment</FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
              {EQUIPMENT_OPTIONS.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center space-x-2 border rounded-md p-3 transition-colors hover:bg-secondary/50"
                >
                  <Checkbox 
                    id={item.id} 
                    checked={equipment.includes(item.id)}
                    onCheckedChange={(checked) => toggleEquipment(checked as boolean, item.id)}
                  />
                  <label 
                    htmlFor={item.id} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}