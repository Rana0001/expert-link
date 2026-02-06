"use client";

import { Shield, Clock, CreditCard, Globe, Zap, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Vetted Professionals",
    description: "Every expert is verified for authenticity and quality assurance.",
  },
  {
    icon: Clock,
    title: "Global Scheduling",
    description: "Smart calendar handles timezone conversions automatically.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Funds are held in escrow until the session is successfully completed.",
  },
  {
    icon: Globe,
    title: "Browser-Based Calls",
    description: "Crystal clear video calls directly in your browser. No installs.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description: "See real-time availability and book sessions in seconds.",
  },
  {
    icon: Heart,
    title: "Satisfaction Guarantee",
    description: "Not satisfied with your session? Gets a full refund, no questions asked.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl mb-4">
            Why Choose ExpertLink?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            We provide the infrastructure so you can focus on the conversation.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 group"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
