"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PartyPopperModal({ variant = "default" }: { variant?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const end = Date.now() + 1000;

      const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant || "default"}
          onClick={() => setIsOpen(true)}
          // className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {/* <DialogHeader>
          <DialogTitle>Gotch! 😉</DialogTitle>
        </DialogHeader> */}
        <div className="text-center py-4 space-y-4">
          <p className="text-xl font-semibold mb-2">Gotch! 😉</p>
          <p className="text-muted-foreground">
            Chefu is in public beta and free to use for now! 🎉
          </p>
          <Link href="/sign-in" className="w-full">
            <Button variant="default" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
