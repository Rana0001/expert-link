import { MOCK_EXPERTS } from "@/lib/mock/experts";
import { ExpertCard } from "@/components/experts/ExpertCard";
import { Button } from "@/components/ui/button";
import { GlassNavbar } from "@/components/ui/GlassNavbar"; // Import Nav
import { Search, Star, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen pb-20 pt-20"> 
    {/* Added padding top for fixed nav */}
      <GlassNavbar />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 lg:py-32 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/50 border border-blue-100 backdrop-blur-sm text-blue-600 font-semibold text-sm animate-in fade-in slide-in-from-bottom-3 duration-700">
             <Star size={14} fill="currentColor" />
             <span>Trusted by 10,000+ professionals</span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             Master any skill with <br />
             <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
               World-Class Experts
             </span>
           </h1>
           
           <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
             Book 1:1 video consultations instantly. We handle the scheduling, timezone math, and payments so you can focus on learning.
           </p>

           {/* Search Bar Mockup */}
           <div className="max-w-md mx-auto mt-8 relative animate-in zoom-in-95 duration-700 delay-300">
              <div className="relative group">
                 <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                 <div className="relative bg-white rounded-2xl p-2 shadow-xl flex items-center gap-2">
                    <Search className="ml-4 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search 'React', 'Marketing', 'Legal'..."
                      className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 h-10"
                    />
                    <Button size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700">
                       Find Expert
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      </section>
      
      {/* Marketplace Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
             <h2 className="text-2xl font-bold text-slate-900">Featured Experts</h2>
             <p className="text-slate-500">Top rated mentors available this week</p>
          </div>
          <Button variant="ghost" className="hidden md:flex gap-2 text-blue-600 hover:bg-blue-50">
             View All <ArrowRight size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EXPERTS.map(expert => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </main>
    </div>
  );
}
