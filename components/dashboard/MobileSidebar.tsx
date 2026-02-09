"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarContent } from "./Sidebar";
import { useState } from "react";
import Link from "next/link";

export function MobileSidebar({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6 text-slate-700" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 bg-white/95 backdrop-blur-xl">
        <div className="p-6 h-full flex flex-col">
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            <div className="mb-6 flex items-center gap-2">
                 <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">E</span>
                 </div>
                 <span className="font-heading font-bold text-xl text-slate-900">ExpertLink</span>
            </div>
            <SidebarContent user={user} onLinkClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
