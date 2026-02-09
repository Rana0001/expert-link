"use client";

import { MobileSidebar } from "./MobileSidebar";
import Link from "next/link";

export function DashboardHeader({ user }: { user: any }) {
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/50 backdrop-blur-xl px-4 lg:hidden">
      <MobileSidebar user={user} />
      <div className="ml-4 flex items-center gap-2">
         <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
         </div>
         <span className="font-heading font-bold text-xl text-slate-900">ExpertLink</span>
      </div>
    </div>
  );
}
