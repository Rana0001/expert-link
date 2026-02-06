import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export async function GlassNavbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-sm px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    E
                </div>
                <span className="font-bold text-slate-900 tracking-tight">ExpertLink</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <Link href="/browse" className="hover:text-blue-600 transition-colors">Browse Experts</Link>
                <Link href="/#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</Link>
                <Link href="/#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <AnimatedThemeToggler 
                    className="hidden md:flex text-slate-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-slate-100/50"
                    duration={500}
                />
                <Button variant="ghost" size="icon" asChild className="hidden md:flex text-slate-500 hover:text-blue-600">
                    <Link href="/browse">
                        <Search size={20} />
                    </Link>
                </Button>
                
                {user ? (
                  // Logged-in state
                  <Button asChild className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  // Logged-out state
                  <>
                    <Button variant="ghost" asChild className="hidden md:flex text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">
                        <Link href="/signup">Sign up</Link>
                    </Button>
                  </>
                )}
                
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </div>
        </div>
      </div>
    </nav>
  );
}
