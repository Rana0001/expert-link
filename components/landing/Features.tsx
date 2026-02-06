"use client";

import { Shield, Clock, CreditCard, Globe, Zap, Heart } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: Shield,
    name: "Vetted Professionals",
    description: "Every expert is verified for authenticity and quality assurance.",
    href: "/browse",
    cta: "Browse Experts",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/15 dark:to-indigo-900/15 opacity-50" />
    ),
  },
  {
    Icon: Clock,
    name: "Global Scheduling",
    description: "Smart calendar handles timezone conversions automatically.",
    href: "/#how-it-works",
    cta: "Learn More",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/15 dark:to-teal-900/15 opacity-50" />
    ),
  },
  {
    Icon: CreditCard,
    name: "Secure Payments",
    description: "Funds are held in escrow until the session is successfully completed.",
    href: "/#pricing",
    cta: "View Pricing",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/15 opacity-50" />
    ),
  },
  {
    Icon: Globe,
    name: "Browser-Based Calls",
    description: "Crystal clear video calls directly in your browser. No installs.",
    href: "/browse",
    cta: "Try Now",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-sky-50 to-cyan-50 dark:from-sky-900/15 dark:to-cyan-900/15 opacity-50" />
    ),
  },
  {
    Icon: Zap,
    name: "Instant Booking",
    description: "See real-time availability and book sessions in seconds.",
    href: "/browse",
    cta: "Get Started",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/15 dark:to-amber-900/15 opacity-50" />
    ),
  },
  {
    Icon: Heart,
    name: "Satisfaction Guarantee",
    description: "Not satisfied with your session? Get a full refund, no questions asked.",
    href: "/#pricing",
    cta: "Our Promise",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-rose-50 to-pink-50 dark:from-rose-900/15 dark:to-pink-900/15 opacity-50" />
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
