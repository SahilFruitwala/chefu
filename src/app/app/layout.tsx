'use client'

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar/index";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-40 w-40 animate-spin" />
      </div>
    );
  }

   if (!isSignedIn) {
     redirect("/waitlist");
    //  redirect("/sign-in");
   }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
