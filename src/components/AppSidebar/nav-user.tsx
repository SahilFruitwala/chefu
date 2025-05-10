"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { dark, simple } from "@clerk/themes";

export function NavUser() {
  const { theme, setTheme } = useTheme();
  const { open } = useSidebar();
  const { isLoaded } = useUser();
  if (!isLoaded) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center space-x-2">
        <UserButton
          userProfileUrl="/me"
          userProfileMode="navigation"
          showName={open}
          appearance={{
            baseTheme: theme === "light" ? simple : dark,
            elements: {
              userButtonBox: "text-foreground",
            },
          }}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
