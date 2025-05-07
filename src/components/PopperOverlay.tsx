"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";

export default function PopperOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="border-primary/20 hover:border-primary/40 text-foreground font-medium px-6 py-6 rounded-lg transition-all duration-300"
        >
          Open Full Screen Popper
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen h-screen fixed inset-0 m-0 p-0 rounded-none border-none shadow-none bg-background/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 duration-300">
        <div className="h-full w-full flex flex-col">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-semibold">Popper Overlay</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="rounded-full hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-xl font-medium mb-4">
                Full Screen Popper Content
              </h3>
              <p className="text-muted-foreground mb-6">
                This popper takes up the entire screen and provides a subtle
                backdrop blur effect. The content is fully customizable to fit
                your specific needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-lg mb-2">Item {item}</h4>
                    <p className="text-muted-foreground">
                      Description for item {item} with relevant details.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto p-6 border-t">
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
