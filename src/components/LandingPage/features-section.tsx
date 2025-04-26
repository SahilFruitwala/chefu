"use client";

import * as React from "react";
import {
  BookOpen,
  ChefHat,
  Cloud,
  Copy,
  Cpu,
  Edit,
  FileSearch,
  ListChecks,
  MessageSquare,
  Printer,
  Save,
  Share2,
} from "lucide-react";
import { motion } from "@/components/ui/motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Card className="border border-border/50 h-full transition-all duration-200 hover:border-border hover:shadow-md">
        <CardHeader>
          <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "AI Recipe Generation",
      description:
        "Create unique recipes based on ingredients, dietary restrictions, and preferences.",
    },
    {
      icon: <Edit className="h-6 w-6 text-primary" />,
      title: "Customize Recipes",
      description:
        "Adjust ingredients, serving sizes, and cooking methods to your liking.",
    },
    {
      icon: <Save className="h-6 w-6 text-primary" />,
      title: "Save Favorites",
      description:
        "Store your favorite recipes in collections for quick access anytime.",
    },
    {
      icon: <Printer className="h-6 w-6 text-primary" />,
      title: "Print Recipes",
      description:
        "Get print-friendly versions of any recipe with clear instructions.",
    },
    {
      icon: <Share2 className="h-6 w-6 text-primary" />,
      title: "Share Instantly",
      description:
        "Share recipes with friends and family via social media or messaging.",
    },
    {
      icon: <FileSearch className="h-6 w-6 text-primary" />,
      title: "Smart Search",
      description:
        "Find recipes by ingredients, cuisine, or dietary preferences.",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Cooking Assistance",
      description: "Get help and answers to cooking questions in real-time.",
    },
    {
      icon: <ListChecks className="h-6 w-6 text-primary" />,
      title: "Shopping Lists",
      description:
        "Generate shopping lists from your selected recipes automatically.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/50 px-4 rounded-lg">
      <div >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for delicious meals
          </h2>
          <p className="text-muted-foreground text-lg">
            Our recipe generator combines powerful AI with thoughtful features
            to make cooking easier and more enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
