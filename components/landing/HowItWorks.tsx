"use client";

import { Search, Calendar, Video } from "lucide-react";

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
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
            How ExpertLink Works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From discovery to mastery in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              {/* Connector Line (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-200 -z-10" />
              )}
              
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300">
                <step.icon className="h-8 w-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
