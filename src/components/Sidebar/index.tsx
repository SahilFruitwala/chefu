"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, History, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-screen border-r bg-card/50 backdrop-blur fixed top-0 left-0 z-40 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className={cn("flex items-center gap-3", isCollapsed && "hidden")}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">Premium User</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("shrink-0", !isCollapsed && "ml-auto")}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )} />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className={cn("w-full justify-start", isCollapsed && "justify-center")}
            >
              <User className="h-4 w-4 mr-2" />
              {!isCollapsed && "Profile"}
            </Button>
            <Button 
              variant="ghost" 
              className={cn("w-full justify-start", isCollapsed && "justify-center")}
            >
              <History className="h-4 w-4 mr-2" />
              {!isCollapsed && "Recipe History"}
            </Button>
            <Button 
              variant="ghost" 
              className={cn("w-full justify-start", isCollapsed && "justify-center")}
            >
              <Settings className="h-4 w-4 mr-2" />
              {!isCollapsed && "Settings"}
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}