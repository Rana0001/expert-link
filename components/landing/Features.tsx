"use client";

import { Shield, Clock, CreditCard, Globe, Zap, Heart } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: Shield,
    name: "Vetted Professionals",
    description: "Every expert is verified for authenticity and quality assurance.",
    stats: ["500+ Experts", "98% Success Rate"],
    href: "/browse",
    cta: "Browse Experts",
    className: "col-span-3 lg:col-span-1",
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/25 dark:to-indigo-900/25 opacity-70" />
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 dark:from-indigo-500/10 dark:to-blue-500/10 rounded-full blur-2xl" />
      </>
    ),
  },
  {
    Icon: Clock,
    name: "Global Scheduling",
    description: "Smart calendar handles timezone conversions automatically.",
    stats: ["150+ Countries", "24/7 Availability"],
    href: "/#how-it-works",
    cta: "Learn More",
    className: "col-span-3 lg:col-span-2",
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/25 dark:to-teal-900/25 opacity-70" />
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute left-1/4 bottom-0 w-40 h-40 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 dark:from-teal-500/10 dark:to-emerald-500/10 rounded-full blur-2xl" />
      </>
    ),
  },
  {
    Icon: CreditCard,
    name: "Secure Payments",
    description: "Funds are held in escrow until the session is successfully completed.",
    stats: ["Bank-Level Security", "$5M+ Processed"],
    href: "/browse",
    cta: "Learn More",
    className: "col-span-3 lg:col-span-2",
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/25 dark:to-orange-900/25 opacity-70" />
        <div className="absolute -left-10 top-1/4 w-56 h-56 bg-gradient-to-br from-amber-400/20 to-orange-400/20 dark:from-amber-500/10 dark:to-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute right-1/4 -bottom-10 w-44 h-44 bg-gradient-to-br from-orange-400/20 to-amber-400/20 dark:from-orange-500/10 dark:to-amber-500/10 rounded-full blur-2xl" />
      </>
    ),
  },
  {
    Icon: Globe,
    name: "Browser-Based Calls",
    description: "Crystal clear video calls directly in your browser. No installs.",
    stats: ["HD Quality", "No Downloads"],
    href: "/browse",
    cta: "Try Now",
    className: "col-span-3 lg:col-span-1",
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/25 dark:to-cyan-900/25 opacity-70" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-sky-400/20 to-cyan-400/20 dark:from-sky-500/10 dark:to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -left-6 -bottom-6 w-36 h-36 bg-gradient-to-br from-cyan-400/20 to-sky-400/20 dark:from-cyan-500/10 dark:to-sky-500/10 rounded-full blur-2xl" />
      </>
    ),
  },
  {
    Icon: Zap,
    name: "Instant Booking",
    description: "See real-time availability and book sessions in seconds.",
    stats: ["< 60 Seconds", "Real-Time"],
    href: "/browse",
    cta: "Get Started",
    className: "col-span-3 lg:col-span-1",
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/25 dark:to-amber-900/25 opacity-70" />
        <div className="absolute right-1/3 -top-12 w-52 h-52 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 dark:from-yellow-500/10 dark:to-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -left-8 bottom-1/4 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 dark:from-amber-500/10 dark:to-yellow-500/10 rounded-full blur-2xl" />
      </>
    ),
  },
  {
    Icon: Heart,
    name: "Satisfaction Guarantee",
    description: "Not satisfied with your session? Get a full refund, no questions asked.",
    stats: ["100% Refund", "No Questions"],
    href: "/browse",
    cta: "Learn More",
    className: "col-span-3 lg:col-span-2",
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/25 dark:to-pink-900/25 opacity-70" />
        <div className="absolute left-0 top-0 w-60 h-60 bg-gradient-to-br from-rose-400/20 to-pink-400/20 dark:from-rose-500/10 dark:to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute right-1/3 bottom-0 w-48 h-48 bg-gradient-to-br from-pink-400/20 to-rose-400/20 dark:from-pink-500/10 dark:to-rose-500/10 rounded-full blur-2xl" />
      </>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl mb-4">
            Why Choose ExpertLink?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            We provide the infrastructure so you can focus on the conversation.
          </p>
        </div>

        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
