import { MOCK_EXPERTS } from "@/lib/mock/experts";
import { ExpertCard } from "@/components/experts/ExpertCard";
import { Button } from "@/components/ui/button";
import { GlassNavbar } from "@/components/ui/GlassNavbar"; // Import Nav
import { Star, ArrowRight } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export default function Home() {
  return (
    <div className="min-h-screen pt-20"> 
    {/* Added padding top for fixed nav */}
      <GlassNavbar />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 lg:py-32 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/50 dark:bg-blue-900/30 border-2 border-blue-100 dark:border-blue-700/50 backdrop-blur-sm text-blue-600 dark:text-blue-400 font-semibold text-sm animate-in fade-in slide-in-from-bottom-3 duration-700 shadow-lg shadow-blue-500/20 dark:shadow-blue-400/10">
             <Star size={14} fill="currentColor" />
             <span>Trusted by 10,000+ professionals</span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             Master any skill with <br />
             <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
               World-Class Experts
             </span>
           </h1>
           
           <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
             Book 1:1 video consultations instantly. We handle the scheduling, timezone math, and payments so you can focus on learning.
           </p>


           {/* Search Bar */}
           <div className="mt-8 animate-in zoom-in-95 duration-700 delay-300">
              <SearchBar />
           </div>

           {/* Video Showcase */}
           <div className="mt-12 max-w-4xl mx-auto animate-in zoom-in-95 duration-700 delay-400">
              <HeroVideoDialog
                videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
                thumbnailSrc="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1920&h=1080"
                thumbnailAlt="ExpertLink Platform Demo"
                animationStyle="from-center"
                className="rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-slate-600 dark:shadow-[0_0_60px_-15px_rgba(59,130,246,0.4)] dark:ring-1 dark:ring-slate-600"
              />
           </div>
        </div>
      </section>
      
      {/* Marketplace Grid */}
      <main id="experts" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
             <h2 className="text-2xl font-bold text-slate-900">Featured Experts</h2>
             <p className="text-slate-500">Top rated mentors available this week</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex gap-2 text-blue-600 hover:bg-blue-50">
             <a href="/browse">View All <ArrowRight size={16} /></a>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EXPERTS.map(expert => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </main>

      <HowItWorks />
      
      <Features />
      
      <Testimonials />
      
      <CallToAction />
      
      <Footer />
    </div>
  );
}
