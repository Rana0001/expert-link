"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";

const testimonials = [
  {
    content: "ExpertLink helped me find a mentor who guided me through my transition into product management. invaluable!",
    author: "Sarah J.",
    role: "Product Manager",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    content: "The video quality is amazing and the booking process is seamless. I've booked 5 sessions this month alone.",
    author: "Michael C.",
    role: "Startup Founder",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    content: "As an expert, this platform handles everything I experienced headache with before. Payments are always on time.",
    author: "Dr. Emily R.",
    role: "Legal Consultant",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 tracking-tight sm:text-4xl mb-16">
          Loved by Professionals
        </h2>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {/* First row - normal direction */}
          <Marquee pauseOnHover={true} repeat={3} className="[--duration:30s]">
            {testimonials.map((t, index) => (
              <motion.div 
                key={`row1-${index}`} 
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative w-[400px] mx-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={t.image} 
                    alt={t.author} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-50"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{t.author}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Marquee>

          {/* Second row - reverse direction */}
          <Marquee pauseOnHover={true} reverse={true} repeat={3} className="[--duration:30s]">
            {testimonials.map((t, index) => (
              <motion.div 
                key={`row2-${index}`} 
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative w-[400px] mx-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={t.image} 
                    alt={t.author} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-50"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{t.author}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Marquee>

          {/* Gradient blur overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-slate-50"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-slate-50"></div>
        </div>
      </div>
    </section>
  );
}
