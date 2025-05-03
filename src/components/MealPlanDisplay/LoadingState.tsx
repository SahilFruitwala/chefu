"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function MealPlanLoadingState() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 p-4">
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </Card>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="bg-primary/5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="divide-y pt-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="py-4 first:pt-0">
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-6 w-48 mb-1" />
                  <Skeleton className="h-4 w-64" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}