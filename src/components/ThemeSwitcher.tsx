"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher({
  atSidebar = false,
  state = "collapsed",
}: {
  atSidebar?: boolean;
  state?: "collapsed" | "expanded";
}) {
  const { theme, setTheme } = useTheme();

  const handleOnClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (atSidebar) {
    return (
      <Button
        variant={state === "expanded" ? "ghost" : "secondary"}
        size="icon"
        onClick={handleOnClick}
        className={`flex items-center gap-2 px-1 py-1.5 text-left w-full justify-start p-2 ${
          state === "expanded" && 'pl-4'
        }`}
      >
        <Sun className="h-15 w-15 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-15 w-15 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
        <span className={state === "expanded" ? "block" : "hidden"}>
          Toggle theme
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      // className="fixed top-4 right-4"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}