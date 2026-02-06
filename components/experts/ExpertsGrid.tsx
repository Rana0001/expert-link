"use client";

import { useState } from "react";
import { Expert } from "@/lib/types";
import { ExpertCard } from "./ExpertCard";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ExpertsGridProps {
  initialExperts: Expert[];
  initialQuery?: string;
}

export function ExpertsGrid({ initialExperts, initialQuery = "" }: ExpertsGridProps) {
  const [query, setQuery] = useState(initialQuery);

  const filteredExperts = initialExperts.filter((expert) => {
    const searchLower = query.toLowerCase();
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchLower) ||
      expert.title.toLowerCase().includes(searchLower) ||
      (expert.bio && expert.bio.toLowerCase().includes(searchLower)) ||
      expert.services.some(s => s.name.toLowerCase().includes(searchLower));

    return matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-16">
        <div className="relative group z-20">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-xl flex items-center gap-2">
            <Search className="ml-4 text-slate-400 dark:text-slate-500" size={20} />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 'React', 'Marketing', 'Legal'..."
                className="flex-1 bg-transparent border-none outline-none text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 h-10 w-full"
            />
            <Button type="button" size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700">
              Find Expert
            </Button>
            </div>
            
            {/* Suggestions Dropdown */}
            {query.length > 0 && (
                <div className="absolute top-FULL left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-[300px] overflow-y-auto py-2">
                        {filteredExperts.length > 0 ? (
                            filteredExperts.map(expert => (
                                <button
                                    key={expert.id}
                                    onClick={() => setQuery(expert.name)} 
                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 group/item"
                                >
                                    <Search size={16} className="text-slate-400 dark:text-slate-500 group-hover/item:text-blue-500 transition-colors" />
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white group-hover/item:text-blue-700 dark:group-hover/item:text-blue-400 transition-colors">{expert.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{expert.title}</p>
                                    </div>
                                </button>
                            ))
                        ) : (
                             <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                                <p>No suggestions found.</p>
                             </div>
                        )}
                    </div>
                </div>
            )}
        </div>
        <div className="flex justify-center gap-2 mt-4 text-sm text-slate-500 dark:text-slate-400 relative z-10">
           <span>Suggested:</span>
           <button onClick={() => setQuery('React')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">React</button>
           <button onClick={() => setQuery('Design')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">Design</button>
           <button onClick={() => setQuery('Marketing')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">Marketing</button>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
      {filteredExperts.length > 0 ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredExperts.map((expert) => (
            <motion.div key={expert.id} variants={item}>
                <ExpertCard expert={expert} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700"
        >
          <div className="bg-white dark:bg-slate-700 p-4 rounded-full w-fit mx-auto shadow-sm mb-4">
             <Search size={32} className="text-slate-300 dark:text-slate-600" />
          </div>
          <p className="text-slate-900 dark:text-white font-semibold text-xl mb-1">No experts found</p>
          <p className="text-slate-500 dark:text-slate-400 text-base mb-6">We couldn't find matches for "{query}"</p>
          <button 
            onClick={() => setQuery("")}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline flex items-center justify-center gap-2 mx-auto"
          >
            Clear Search & Show All
          </button>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
