"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Learners",
    price: "0",
    description: "Pay only when you book. No subscription fees.",
    features: [
      "Access to all experts",
      "Secure payment protection",
      "Video call platform",
      "Session recording (beta)",
      "24/7 Support"
    ],
    cta: "Start Browsing",
    popular: false
  },
  {
    name: "Experts",
    price: "10%",
    currency: "fee",
    description: "We only earn when you earn. Everything you need to grow.",
    features: [
      "Verified expert badge",
      "Calendar integration",
      "Automated payouts",
      "No monthly subscription",
      "Marketing tools"
    ],
    cta: "Apply as Expert",
    popular: true
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            ExpertLink is a community-first platform. We align our success with yours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`relative p-8 rounded-3xl border dark:bg-slate-800 ${plan.popular ? 'border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-900/10 dark:shadow-blue-500/10' : 'border-slate-200 dark:border-slate-700 shadow-sm'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6 h-10">{plan.description}</p>
              
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {plan.currency === 'fee' ? '' : '$'}
                  {plan.price}
                </span>
                {plan.currency === 'fee' && <span className="text-xl font-semibold text-slate-900 dark:text-white ml-1">fee</span>}
                <span className="text-slate-500 dark:text-slate-400 ml-2">
                  {plan.currency === 'fee' ? 'per transaction' : '/ month'}
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className={`w-full rounded-xl ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'}`}
              >
                {plan.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
