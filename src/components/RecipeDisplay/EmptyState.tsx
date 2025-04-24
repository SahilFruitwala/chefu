import { CookingPot } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <CookingPot className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No Recipe Generated Yet</h3>
      <p className="text-muted-foreground max-w-sm">
        Fill out the form with your available ingredients and preferences, then click &quot;Generate Recipe&quot; to see your personalized dish.
      </p>
    </div>
  );
}