"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "@/components/ui/motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  delay: number;
}

function Testimonial({
  name,
  role,
  content,
  rating,
  image,
  delay,
}: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? "text-amber-500 fill-amber-500" : "text-muted"
                  }`}
                />
              ))}
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-muted-foreground">{content}</p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center space-x-4">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Emily Johnson",
      role: "Home Cook",
      content:
        "Chefu has completely transformed my cooking routine. The AI generates amazing recipes from whatever ingredients I have on hand!",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      name: "Mark Thompson",
      role: "Food Blogger",
      content:
        "The recipe sharing feature is incredible. I can easily share my creations with my followers across all platforms with just one click.",
      rating: 4,
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      name: "Sarah Chen",
      role: "Busy Parent",
      content:
        "As a parent of three, I love how quickly I can generate nutritious meal ideas and print the recipes for my weekly meal planning.",
      rating: 5,
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      name: "James Wilson",
      role: "Fitness Enthusiast",
      content:
        "The ability to generate recipes based on my nutritional needs has been a game-changer for my fitness journey.",
      rating: 4,
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by home cooks everywhere
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of happy users who have transformed their cooking
            experience with Chefu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              image={testimonial.image}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
