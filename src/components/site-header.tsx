'use client'

import { UtensilsCrossed } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar"
import { ThemeSwitcher } from "./ThemeSwitcher";

export function SiteHeader() {
  const { state } = useSidebar();

  const isSidebarCollapsed = state === "collapsed";
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear min-w-full z-50 bg-background m-0 top-0 pv-6">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 justify-between">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center justify-center space-x-2">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full">
            <UtensilsCrossed className="w-3 h-3 text-primary" />
          </div>
          <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 select-none">
            Chefu
          </h1>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
