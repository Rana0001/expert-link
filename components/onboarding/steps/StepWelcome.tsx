"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function StepWelcome({ onNext }: { onNext: () => void }) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNext]);

  return (
    <div className="space-y-12 max-w-3xl animate-in fade-in duration-500">
      <div className="space-y-8">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center">
          <Sparkles size={32} className="text-white" />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight">
            Welcome to<br />ExpertLink
          </h1>
          <p className="text-2xl text-slate-600 leading-relaxed max-w-2xl">
            Let's set up your expert profile. This will only take <span className="font-semibold text-slate-900">2 minutes</span>.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={onNext}
          className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white text-lg rounded-lg transition-all duration-200 cursor-pointer group"
        >
          Let's Get Started
          <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-sm text-slate-400 flex items-center gap-2">
          press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">Enter ↵</kbd> to continue
        </p>
      </div>
    </div>
  );
}
