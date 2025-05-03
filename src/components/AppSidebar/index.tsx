"use client";

import * as React from "react";
import { BookMarked, CookingPot, Minus, NotebookTabs, Plus, UtensilsCrossed } from "lucide-react";

import { NavUser } from "@/components/AppSidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Recipes",
      url: "/recipes",
      items: [
        {
          title: "Generate Recipes",
          url: "/recipes",
          icons: <CookingPot className="size-4" />,
        },
        {
          title: "Saved Reciepes",
          url: "/recipes/history",
          icons: <BookMarked className="size-4" />,
        },
      ],
    },
    {
      title: "Meal Plans",
      url: "/meal-plans",
      items: [
        {
          title: "Generate Meal Plans",
          url: "/meal-plans",
          icons: <NotebookTabs className="size-4" />,
        },
        {
          title: "Saved Meal Plans",
          url: "/meal-plans/history",
          icons: <BookMarked className="size-4" />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/recipes">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <UtensilsCrossed className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none text-lg">
                  <span className="truncate font-semibold">Chefu</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem key={item.title}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}&nbsp;
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.url === pathname}
                            >
                              <Link href={item.url}>
                                {item.icons}
                                {item.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
