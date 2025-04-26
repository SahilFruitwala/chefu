import * as React from "react";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div>
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6" />
            <span className="font-bold text-xl">Chefu</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link
              href="#features"
              className="hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link href="#demo" className="hover:text-primary transition-colors">
              Demo
            </Link>
            {/* <Link
              href="#testimonials"
              className="hover:text-primary transition-colors"
            >
              Testimonials
            </Link> */}
            <Link
              href="#pricing"
              className="hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chefu. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
