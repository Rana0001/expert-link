"use client"

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function ThemeFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatedThemeToggler 
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-slate-900 dark:text-white"
        duration={500}
      />
    </div>
  );
}
