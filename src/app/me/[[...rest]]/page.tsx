"use client";

import { UserProfile } from "@clerk/nextjs";

import { useTheme } from "next-themes";
import { dark, simple } from "@clerk/themes";
import { Header } from "@/components/LandingPage/header";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="container items-center justify-center min-h-screen bg-background px-4 mx-auto">
      <Header />
      <section className="relative py-20 md:py-10 overflow-hidden items-center justify-center mx-auto flex">
        <UserProfile
          appearance={{
            baseTheme: theme === "light" ? simple : dark,
          }}
        />
      </section>
    </div>
  );
}
