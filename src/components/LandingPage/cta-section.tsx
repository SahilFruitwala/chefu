"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { PricingTable } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark, simple } from "@clerk/themes";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { motion } from "@/components/ui/motion";

export function CtaSection() {
  const { theme, setTheme } = useTheme();
  return (
    <section id="pricing" className="py-20">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start cooking better today
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your cooking style
          </p>
        </div>

        <div className="flex flex-col md:flex-row sm:space-x-4 space-y-4 max-w-5xl mx-auto items-center justify-center">
          {/* <PricingTable
            appearance={{
              baseTheme: theme === "light" ? simple : dark,
            }}
          /> */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="border-border/50 h-full flex flex-col">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {[
                    "3 AI recipe generations per day",
                    "Save up to 3 recipes every month",
                    "1 AI meal plan generation per month",
                    "Save 1 meal plan every month",
                    "Basic printing options",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Link href="/sign-in" className="flex items-center">
                    Get started free
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="border-primary h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-400 to-red-500"></div>
              <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                Popular
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {[
                    "Unlimited AI recipe generations",
                    "Save unlimited recipes",
                    "Advanced printing options",
                    "Share across all platforms",
                    "Custom collections",
                    "Nutritional information",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Link href="/sign-in" className="flex items-center">
                    <span>Get started</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div> */}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-6">
            Ready to transform your cooking?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              <Link href="/sign-in" className="flex items-center">
                <span>Get started for free</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            {/* <Button size="lg" variant="outline">
              View all features
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
