import { Calendar } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">No Meal Plan Generated</h2>
      <p className="text-muted-foreground">
        Configure your preferences and generate a meal plan to get started.
      </p>
    </div>
  );
}