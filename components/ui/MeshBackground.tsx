"use client";

import { motion } from "framer-motion";

export function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-0 left-0 w-full h-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl" />
      
      {/* Orb 1: Blue - Top Left */}
      <motion.div 
        animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-[100px]"
      />
      
      {/* Orb 2: Purple/Indigo - Top Right */}
      <motion.div 
         animate={{ 
            x: [0, -40, 0], 
            y: [0, 50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-0 -right-20 w-[600px] h-[600px] bg-indigo-200/30 dark:bg-indigo-900/15 rounded-full blur-[100px]"
      />
      
      {/* Orb 3: Bottom Center */}
       <motion.div 
         animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute -bottom-40 left-1/4 w-[700px] h-[600px] bg-sky-100/50 dark:bg-sky-900/20 rounded-full blur-[100px]"
      />
    </div>
  );
}
