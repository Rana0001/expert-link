import { ExpertsGrid } from "@/components/experts/ExpertsGrid";
import { GlassNavbar } from "@/components/ui/GlassNavbar";
import { MOCK_EXPERTS } from "@/lib/mock/experts";
import { Footer } from "@/components/landing/Footer";

export default function BrowsePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialQuery = typeof searchParams.q === "string" ? searchParams.q : "";

  return (
    <div className="min-h-screen pt-20 bg-slate-50 relative overflow-hidden">
       {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-transparent pointer-events-none" />
      
      <GlassNavbar />

      <main className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-xs mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Over 500+ Active Experts
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Find the perfect mentor <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">to accelerate your growth.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Connect with world-class professionals for 1:1 guidance, code reviews, and career advice.
            </p>
        </div>

        <ExpertsGrid 
            initialExperts={MOCK_EXPERTS} 
            initialQuery={initialQuery}
        />
      </main>

      <Footer />
    </div>
  );
}
