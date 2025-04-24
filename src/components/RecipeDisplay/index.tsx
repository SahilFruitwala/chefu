"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSavedRecipes } from "@/lib/storage";
import { Bookmark, Printer, Share2, Trash } from "lucide-react";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import RecipeContent from "./RecipeContent";

interface RecipeDisplayProps {
  recipe: Recipe | null;
  isLoading: boolean;
  onSave: () => void;
}

export default function RecipeDisplay({ recipe, isLoading, onSave }: RecipeDisplayProps) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [activeTab, setActiveTab] = useState("current");
  const [selectedSavedRecipe, setSelectedSavedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSavedRecipes(getSavedRecipes());
    }
  }, []);

  const handlePrintRecipe = () => {
    const printWindow = window.open('', '_blank');
    const recipeToUse = activeTab === "current" ? recipe : selectedSavedRecipe;
    
    if (printWindow && recipeToUse) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${recipeToUse.title}</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
              h1 { color: #333; }
              h2 { color: #555; margin-top: 20px; }
              li { margin-bottom: 5px; }
              .tag { display: inline-block; padding: 4px 8px; background: #f0f0f0; border-radius: 4px; margin: 4px; }
            </style>
          </head>
          <body>
            <h1>${recipeToUse.title}</h1>
            
            <div>
              <span class="tag">${recipeToUse.cuisineType}</span>
              <span class="tag">${recipeToUse.dietaryInfo}</span>
              <span class="tag">${recipeToUse.cookingTime}</span>
              <span class="tag">${recipeToUse.skillLevel}</span>
            </div>
            
            <h2>Ingredients</h2>
            <ul>
              ${recipeToUse.ingredients.map(ing => `<li>${ing.replace('- ', '')}</li>`).join('')}
            </ul>
            
            <h2>Equipment Needed</h2>
            <ul>
              ${recipeToUse.equipment.map(equip => `<li>${equip}</li>`).join('')}
            </ul>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const handleShareRecipe = () => {
    const recipeToShare = activeTab === "current" ? recipe : selectedSavedRecipe;
    
    if (recipeToShare && navigator.share) {
      navigator.share({
        title: recipeToShare.title,
        text: `Check out this recipe: ${recipeToShare.title}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Recipe URL copied to clipboard!');
        })
        .catch(err => {
          console.error('Error copying to clipboard:', err);
        });
    }
  };

  const displayedRecipe = activeTab === "current" ? recipe : selectedSavedRecipe;
  
  return (
    <Card className="w-full h-full flex flex-col shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-card border-b pb-4">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Your Recipe</span>
          
          {savedRecipes.length > 0 && (
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => {
                setActiveTab(value);
                if (value === "saved" && savedRecipes.length > 0) {
                  setSelectedSavedRecipe(savedRecipes[0]);
                }
              }}
              className="w-fit"
            >
              <TabsList>
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="saved">Saved ({savedRecipes.length})</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-6">
        {activeTab === "current" ? (
          <>
            {isLoading ? (
              <LoadingState />
            ) : recipe ? (
              <RecipeContent {...recipe} />
            ) : (
              <EmptyState />
            )}
          </>
        ) : (
          <div>
            {savedRecipes.length > 0 ? (
              <div className="h-full">
                <div className="border-b mb-6">
                  <div className="pb-4 overflow-x-auto flex gap-2">
                    {savedRecipes.map((savedRecipe) => (
                      <Button
                        key={savedRecipe.id}
                        variant={selectedSavedRecipe?.id === savedRecipe.id ? "default" : "outline"}
                        className="whitespace-nowrap text-sm h-8"
                        onClick={() => setSelectedSavedRecipe(savedRecipe)}
                      >
                        {savedRecipe.title}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {selectedSavedRecipe && (
                  <RecipeContent {...selectedSavedRecipe} />
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground">No saved recipes yet.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t p-4 flex flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handlePrintRecipe}
            disabled={!displayedRecipe}
            className="gap-1"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleShareRecipe}
            disabled={!displayedRecipe}
            className="gap-1"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
        
        {activeTab === "current" ? (
          <Button 
            onClick={onSave} 
            size="sm" 
            disabled={!recipe}
            className="gap-1"
          >
            <Bookmark className="h-4 w-4" />
            Save Recipe
          </Button>
        ) : (
          <Button 
            variant="destructive" 
            size="sm" 
            disabled={!selectedSavedRecipe}
            className="gap-1"
          >
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}