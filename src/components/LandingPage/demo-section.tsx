"use client";

import * as React from "react";
import Image from "next/image";
import {
  BookOpen,
  ChefHat,
  Clock,
  Flame,
  Heart,
  Printer,
  Save,
  Share2,
  Sparkles,
  Utensils,
} from "lucide-react";
import { motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function DemoSection() {
  const [activeTab, setActiveTab] = React.useState("generate");

  return (
    <section id="demo" className="py-20">
      <div >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See how Chefu works
          </h2>
          <p className="text-muted-foreground text-lg">
            Generate, save, print, and share recipes with just a few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger
                  value="generate"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Generate</span>
                </TabsTrigger>
                <TabsTrigger
                  value="save"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Save className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Save</span>
                </TabsTrigger>
                {/* <TabsTrigger
                  value="print"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Print</span>
                </TabsTrigger> */}
                {/* <TabsTrigger
                  value="share"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Share</span>
                </TabsTrigger> */}
              </TabsList>

              <TabsContent value="generate" className="mt-0 space-y-4">
                <h3 className="text-2xl font-bold">Generate custom recipes</h3>
                <p className="text-muted-foreground">
                  Tell our AI what ingredients you have, your dietary
                  preferences, and cooking skill level, and it will generate
                  personalized recipes just for you.
                </p>
                <ul className="space-y-2 mt-4">
                  {[
                    "Input available ingredients",
                    "Specify dietary restrictions",
                    "Set cooking time preferences",
                    // "Choose cuisine style",
                    "Adjust serving size",
                    "Get step-by-step instructions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="save" className="mt-0 space-y-4">
                <h3 className="text-2xl font-bold">Save your favorites</h3>
                <p className="text-muted-foreground">
                  Found a recipe you love? Save it to your collection for quick
                  access anytime. Create custom categories to organize your
                  recipes.
                </p>
                <ul className="space-y-2 mt-4">
                  {[
                    "One-click saving to your library",
                    "Create custom collections",
                    "Add personal notes",
                    "Rate recipes you've tried",
                    "Sync across all your devices",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Save className="h-3 w-3 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              {/* <TabsContent value="print" className="mt-0 space-y-4">
                <h3 className="text-2xl font-bold">Print with ease</h3>
                <p className="text-muted-foreground">
                  Get beautifully formatted, print-friendly versions of any
                  recipe with clear instructions and ingredient lists.
                </p>
                <ul className="space-y-2 mt-4">
                  {[
                    "Clean, printer-friendly formatting",
                    "Adjustable font sizes",
                    "Option to include or exclude images",
                    "Add cooking notes to printouts",
                    "QR code linking back to digital version",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Printer className="h-3 w-3 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="share" className="mt-0 space-y-4">
                <h3 className="text-2xl font-bold">Share instantly</h3>
                <p className="text-muted-foreground">
                  Share your favorite recipes with friends and family across
                  social media, messaging apps, or via email with just one tap.
                </p>
                <ul className="space-y-2 mt-4">
                  {[
                    "Direct sharing to social platforms",
                    "Generate shareable links",
                    "Send via messaging apps",
                    "Email formatted recipes",
                    "Export to PDF format",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Share2 className="h-3 w-3 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent> */}
            </Tabs>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50"
            >
              {activeTab === "generate" && (
                <div className="bg-card">
                  <div className="bg-muted p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        <span className="font-medium">Recipe Generator</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10">
                        AI Powered
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Ingredients</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Chicken",
                            "Spinach",
                            "Garlic",
                            "Olive Oil",
                            "Lemon",
                          ].map((item, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="rounded-full"
                            >
                              {item}
                            </Badge>
                          ))}
                          <Badge
                            variant="outline"
                            className="rounded-full border-dashed"
                          >
                            + Add
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Preferences</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Quick Meal", "Low Carb", "High Protein"].map(
                            (item, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="rounded-full"
                              >
                                {item}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Recipe
                    </Button>

                    <Card className="mt-6 border-dashed border-2 border-primary/20">
                      <CardContent className="p-4 flex items-center justify-center text-muted-foreground h-[300px]">
                        <div className="text-center">
                          <Sparkles className="h-12 w-12 mb-4 mx-auto text-primary/40" />
                          <p>Your personalized recipe will appear here</p>
                          <p className="text-sm">
                            Based on your ingredients and preferences
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "save" && (
                <div className="bg-card">
                  <div className="relative h-[240px] w-full">
                    <Image
                      src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg"
                      alt="Recipe"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-2xl font-bold mb-1">
                          Lemon Herb Chicken
                        </h3>
                        <div className="flex items-center text-white/80 gap-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>30 min</span>
                          </div>
                          <div className="flex items-center">
                            <Flame className="h-4 w-4 mr-1" />
                            <span>Medium</span>
                          </div>
                          <div className="flex items-center">
                            <Utensils className="h-4 w-4 mr-1" />
                            <span>4 servings</span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full h-9 w-9 opacity-90"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full h-9 w-9 opacity-90 bg-amber-500 hover:bg-amber-600 text-white"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium mb-3">Choose collection</h4>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        {
                          name: "Favorites",
                          icon: <Heart className="h-4 w-4" />,
                        },
                        {
                          name: "Weeknight Dinners",
                          icon: <Clock className="h-4 w-4" />,
                        },
                        {
                          name: "Healthy Options",
                          icon: <ChefHat className="h-4 w-4" />,
                        },
                        {
                          name: "+ New Collection",
                          icon: <BookOpen className="h-4 w-4" />,
                        },
                      ].map((collection, i) => (
                        <Button
                          key={i}
                          variant={i === 0 ? "default" : "outline"}
                          className="justify-start h-12"
                        >
                          {collection.icon}
                          <span className="ml-2">{collection.name}</span>
                        </Button>
                      ))}
                    </div>

                    <Button className="w-full mb-3" size="lg">
                      <Save className="mr-2 h-4 w-4" />
                      Save Recipe
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "print" && (
                <div className="bg-card">
                  <div className="bg-muted p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Printer className="h-5 w-5" />
                        <span className="font-medium">Print Preview</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">Letter</Badge>
                        <Badge variant="outline">A4</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="border border-border rounded-md overflow-hidden shadow-sm">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src="https://images.pexels.com/photos/5737232/pexels-photo-5737232.jpeg"
                          alt="Recipe"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">
                          Italian Pasta Primavera
                        </h3>
                        <div className="flex flex-wrap text-sm text-muted-foreground gap-x-4 gap-y-1 mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>25 min</span>
                          </div>
                          <div className="flex items-center">
                            <Flame className="h-4 w-4 mr-1" />
                            <span>Easy</span>
                          </div>
                          <div className="flex items-center">
                            <Utensils className="h-4 w-4 mr-1" />
                            <span>4 servings</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3">
                          <div className="col-span-1">
                            <h4 className="font-medium mb-2">Ingredients</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              {[
                                "8 oz pasta",
                                "2 tbsp olive oil",
                                "3 cloves garlic, minced",
                                "1 cup cherry tomatoes",
                                "1 zucchini, sliced",
                                "1 yellow squash, sliced",
                                "1/2 cup peas",
                                "1/4 cup grated parmesan",
                                "Fresh basil",
                                "Salt and pepper",
                              ].map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="col-span-2">
                            <h4 className="font-medium mb-2">Instructions</h4>
                            <ol className="list-decimal list-inside text-sm space-y-2">
                              {[
                                "Cook pasta according to package directions.",
                                "Heat olive oil in a large skillet over medium heat.",
                                "Add garlic and cook until fragrant, about 30 seconds.",
                                "Add vegetables and cook until tender-crisp, about 5 minutes.",
                                "Drain pasta and add to the skillet with vegetables.",
                                "Toss with parmesan cheese, basil, salt and pepper.",
                                "Serve immediately, garnished with additional cheese if desired.",
                              ].map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          <span>Print with images</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <span>Print text only</span>
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "share" && (
                <div className="bg-card">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">
                      Share "Mediterranean Bowl"
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Choose how you want to share this recipe
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        {
                          name: "Copy Link",
                          icon: <Copy className="h-8 w-8" />,
                          color: "bg-blue-100 dark:bg-blue-900",
                        },
                        {
                          name: "Email",
                          icon: <div className="text-2xl">✉️</div>,
                          color: "bg-amber-100 dark:bg-amber-900",
                        },
                        {
                          name: "Message",
                          icon: <div className="text-2xl">💬</div>,
                          color: "bg-green-100 dark:bg-green-900",
                        },
                        {
                          name: "Social",
                          icon: <Share2 className="h-8 w-8" />,
                          color: "bg-purple-100 dark:bg-purple-900",
                        },
                      ].map((item, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          className={`h-auto flex flex-col items-center justify-center gap-2 py-6 hover:bg-muted ${item.color} text-foreground hover:text-foreground`}
                        >
                          <div className="rounded-full p-3 bg-background/80">
                            {item.icon}
                          </div>
                          <span>{item.name}</span>
                        </Button>
                      ))}
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Social media</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          {
                            name: "Instagram",
                            icon: "📸",
                            color:
                              "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200",
                          },
                          {
                            name: "Facebook",
                            icon: "👍",
                            color:
                              "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
                          },
                          {
                            name: "Twitter",
                            icon: "🐦",
                            color:
                              "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200",
                          },
                          {
                            name: "Pinterest",
                            icon: "📌",
                            color:
                              "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
                          },
                          {
                            name: "WhatsApp",
                            icon: "💬",
                            color:
                              "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
                          },
                        ].map((platform, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            className={`rounded-full ${platform.color}`}
                            size="sm"
                          >
                            <span className="mr-1">{platform.icon}</span>
                            <span>{platform.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="relative rounded-md overflow-hidden border border-border">
                      <div className="flex items-center gap-4 p-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
                            alt="Recipe"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                            Mediterranean Bowl
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            A healthy, flavorful meal with fresh ingredients
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-muted border-t border-border">
                        <Button className="w-full" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Recipe
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
