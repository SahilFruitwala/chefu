"use client"

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

interface SlotMachineProps {
  options: string[];
  className?: string;
  variant?: "default" | "casino" | "minimal";
  onSelect?: (option: string) => void;
  spinDuration?: number;
}

export function SlotMachine({
  options,
  className,
  variant = "default",
  onSelect,
  spinDuration = 2000,
}: SlotMachineProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);
  const spinIntervalRef = useRef<NodeJS.Timeout>();

  const variants = {
    enter: { y: -20, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  };

  const handleSpin = () => {
    if (isSpinning || options.length === 0) return;

    setIsSpinning(true);
    setSelectedOption(null);

    // Fast spinning animation
    spinIntervalRef.current = setInterval(() => {
      setDisplayedOptions([
        options[Math.floor(Math.random() * options.length)],
      ]);
    }, 50);

    // Stop spinning after duration
    setTimeout(() => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }

      const finalOption = options[Math.floor(Math.random() * options.length)];
      setDisplayedOptions([finalOption]);
      setSelectedOption(finalOption);
      setIsSpinning(false);
      onSelect?.(finalOption);
    }, spinDuration);
  };

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, []);

  const slotStyles = {
    default: "bg-card border-4 border-primary rounded-xl p-6 shadow-lg",
    casino: "bg-black border-8 border-yellow-500 rounded-2xl p-8 shadow-2xl text-white",
    minimal: "bg-background border border-border rounded-md p-4",
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className={cn(
          "relative w-64 h-20 overflow-hidden",
          slotStyles[variant]
        )}
      >
        <AnimatePresence mode="wait">
          {displayedOptions.map((option, index) => (
            <motion.div
              key={`${option}-${index}`}
              className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.2 }}
            >
              {option}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Button
        onClick={handleSpin}
        disabled={isSpinning || options.length === 0}
        variant={variant === "casino" ? "destructive" : "default"}
        className="w-32"
      >
        <PlayIcon className="mr-2 h-4 w-4" />
        Spin
      </Button>
    </div>
  );
}
