"use client";
import React, { useState } from "react";
import { SlotMachine } from "@/components/ui/slot-machine";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, Trash2Icon } from "lucide-react";

export function SlotMachineDemo() {
  const [options, setOptions] = useState<string[]>([
    "Pizza 🍕",
    "Burger 🍔",
    "Sushi 🍣",
    "Tacos 🌮",
    "Pasta 🍝",
  ]);
  const [newOption, setNewOption] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<
    "default" | "casino" | "minimal"
  >("default");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleAddOption = () => {
    if (newOption.trim() === "") return;
    setOptions([...options, newOption.trim()]);
    setNewOption("");
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
    setHistory((prev) => [option, ...prev.slice(0, 9)]);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Slot Machine Demo</CardTitle>
        <CardDescription>
          Spin to randomly select from the available options
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="machine" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="machine">Slot Machine</TabsTrigger>
            <TabsTrigger value="options">Options & Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="machine" className="space-y-6">
            <div className="flex justify-center py-6">
              <SlotMachine
                options={options}
                variant={selectedVariant}
                spinDuration={2000}
                onSelect={handleOptionSelected}
              />
            </div>

            {selectedOption && (
              <div className="flex flex-col items-center gap-2 mt-4 p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  Selected Option:
                </p>
                <Badge variant="outline" className="text-lg py-2 px-4">
                  {selectedOption}
                </Badge>
              </div>
            )}

            {history.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Selection History</h3>
                <ScrollArea className="h-24 w-full rounded-md border">
                  <div className="p-4">
                    {history.map((item, i) => (
                      <div key={i} className="flex items-center py-1">
                        <Badge
                          variant="secondary"
                          className="w-6 h-6 flex items-center justify-center rounded-full mr-2"
                        >
                          {i + 1}
                        </Badge>
                        <span>{item}</span>
                        {i === 0 && (
                          <Badge className="ml-2 bg-primary" variant="default">
                            Latest
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </TabsContent>

          <TabsContent value="options" className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a new option..."
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
                />
                <Button onClick={handleAddOption}>
                  <PlusIcon className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              <div className="mt-4">
                <Label className="text-sm font-medium mb-2 block">
                  Current Options
                </Label>
                <ScrollArea className="h-32 w-full rounded-md border">
                  <div className="p-2">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-accent rounded-md"
                      >
                        <span>{option}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveOption(index)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label>Appearance</Label>
                <RadioGroup
                  value={selectedVariant}
                  onValueChange={(value) =>
                    setSelectedVariant(
                      value as "default" | "casino" | "minimal"
                    )
                  }
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="default" id="default" />
                    <Label htmlFor="default">Default</Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="casino" id="casino" />
                    <Label htmlFor="casino">Casino</Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal">Minimal</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setOptions([])}>
          Clear All Options
        </Button>
        <Button onClick={() => window.location.reload()}>Reset Demo</Button>
      </CardFooter>
    </Card>
  );
}
