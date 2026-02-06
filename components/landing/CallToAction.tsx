"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function CallToAction() {
  return (
    <section className="py-24 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-800">
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl mb-6">
          Ready to Share Your Expertise?
        </h2>
        <p className="text-lg text-slate-400 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
          Join thousands of professionals earning on their own terms. Set your rates, control your schedule, and inspire others.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white min-w-[200px] h-12 text-base shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-105">
            Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-xl bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 hover:border-white/20 min-w-[200px] h-12 text-base transition-all duration-300">
            Learn More
          </Button>
        </div>
        
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          No credit card required. Cancel anytime.
        </p>
      </motion.div>
    </section>
  );
}
