"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "@/components/ui/motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-10 overflow-hidden">
      <div className=" relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-muted">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              <span>AI-Powered Recipe Generation</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Create delicious recipes{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-500">
                tailored to you
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Transform your cooking experience with our AI recipe generator.
              Create, save, print, and share unique recipes based on your
              preferences and ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group">
                <Link href="/sign-up" className="flex items-center">
                  <span>Get started</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              {/* <Button size="lg" variant="outline">
                Watch demo
              </Button> */}
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">2,000+</span> happy cooks
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg"
              alt="Recipe app in action"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-border/20">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-green-500/20 p-2">
                  <Sparkles className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Recipe Generated</h3>
                  <p className="text-xs text-muted-foreground">
                    Perfect pasta carbonara with your ingredients
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#303030_1px,transparent_1px),linear-gradient(to_bottom,#303030_1px,transparent_1px)] bg-[size:60px_60px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-amber-400 opacity-20 blur-[100px]"></div>
      </div>
    </section>
  );
}
