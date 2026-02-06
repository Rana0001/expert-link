"use client";

import { Search, Calendar, Video } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Find Your Expert",
    description: "Browse thousands of verified professionals by industry, skill, or rating.",
  },
  {
    icon: Calendar,
    title: "Book a Session",
    description: "Choose a time that works for you. Integrated scheduling handles timezones automatically.",
  },
  {
    icon: Video,
    title: "Connect & Learn",
    description: "Join your 1:1 video call instantly via our secure platform. No downloads required.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
            How ExpertLink Works
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            From discovery to mastery in three simple steps.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative flex flex-col items-center text-center group"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {/* Connector Line (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-10" />
              )}
              
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center mb-6 group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:shadow-md transition-all duration-300">
                <step.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
