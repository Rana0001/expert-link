"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, User, Calendar, Briefcase, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Services", href: "/dashboard/services", icon: Briefcase },
  { label: "Availability", href: "/dashboard/availability", icon: Calendar },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  /* Auth Logic */
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh(); // Refresh to clear server sessions
  };

  return (
    <div className="w-64 border-r border-white/20 bg-white/40 backdrop-blur-xl h-screen fixed left-0 top-0 hidden md:flex flex-col p-4">
      <div className="space-y-1 mt-8">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-white/20">
        <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
        >
          <LogOut size={18} className="mr-3" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
