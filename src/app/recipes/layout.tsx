'use client'

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

   if (!isSignedIn) {
     redirect("/sign-in");
   }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
