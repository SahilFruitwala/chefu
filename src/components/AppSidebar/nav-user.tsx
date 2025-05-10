"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser() {
  const { open } = useSidebar();
  const { isLoaded } = useUser();
  if (!isLoaded) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center space-x-2">
        <UserButton
          showName={open}
          appearance={{
            elements: {
              userButtonBox: "text-foreground",
            },
          }}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
