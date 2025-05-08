"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { UserButton, useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

export function NavUser() {
  const { isMobile } = useSidebar();

  const { signOut } = useClerk();
  const { isLoaded, user } = useUser();
  if (!isLoaded) return null;

  const {
    firstName,
    primaryEmailAddress,
    imageUrl,
  } = user!;

  const emailAddress = primaryEmailAddress?.emailAddress!;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center space-x-2">
        <UserButton showName={true} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
