"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { UtensilsCrossed, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { dark, simple } from "@clerk/themes";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { theme} = useTheme();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 px-4 rounded-lg ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between">
        <SignedOut>
          <Link
            href="/"
            className="flex items-center space-x-2"
          >
            <UtensilsCrossed className="h-6 w-6" />
            <span className="font-bold text-xl">Chefu</span>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link
            href="/app/recipes"
            className="flex items-center space-x-2"
          >
            <UtensilsCrossed className="h-6 w-6" />
            <span className="font-bold text-xl">Chefu</span>
          </Link>
        </SignedIn>

        <nav className="hidden md:flex items-center gap-6">
          <SignedOut>
            <Link
              href="/#features"
              className="text-sm font-medium hover:text-primary/80 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#demo"
              className="text-sm font-medium hover:text-primary/80 transition-colors"
            >
              Demo
            </Link>
            {/* <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary/80 transition-colors"
          >
            Testimonials
          </Link> */}
            <Link
              href="/#pricing"
              className="text-sm font-medium hover:text-primary/80 transition-colors"
            >
              Pricing
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/app/recipes"
              className="text-sm font-medium hover:text-primary/80 transition-colors"
            >
              Go to app
            </Link>
            </SignedIn>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <div className="hidden md:flex gap-2">
            <SignedOut>
              <Button variant="outline" size="sm">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton
                userProfileUrl="/me"
                userProfileMode="navigation"
                appearance={{
                  baseTheme: theme === "light" ? simple : dark,
                  elements: {
                    userButtonBox: "text-foreground",
                  },
                }}
              />
            </SignedIn>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="hidden">Navigation</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8 px-4">
                <SheetClose asChild>
                  <Link
                    href="/#features"
                    className="text-base font-medium hover:text-primary/80 transition-colors"
                  >
                    Features
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#demo"
                    className="text-base font-medium hover:text-primary/80 transition-colors"
                  >
                    Demo
                  </Link>
                </SheetClose>
                {/* <Link
                  href="#testimonials"
                  className="text-base font-medium hover:text-primary/80 transition-colors"
                >
                  Testimonials
                </Link> */}
                <SheetClose asChild>
                  <Link
                    href="/#pricing"
                    className="text-base font-medium hover:text-primary/80 transition-colors"
                  >
                    Pricing
                  </Link>
                </SheetClose>
                <div className="flex flex-col gap-2 mt-4">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <Button variant="outline" asChild>
                      <Link href="/sign-in">Log in</Link>
                    </Button>
                    <Button>
                      <Link href="/sign-up">Sign up</Link>
                    </Button>
                  </SignedOut>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
