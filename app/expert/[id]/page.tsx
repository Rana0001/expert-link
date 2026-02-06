import { notFound } from "next/navigation";
import { getExpertById } from "@/lib/mock/experts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import WizardContainer from "@/components/booking/WizardContainer";
import { Clock, Globe, MapPin, Star, ShieldCheck } from "lucide-react";

// Generic param type for Next.js 16/15
type Props = {
  params: Promise<{ id: string }>;
};

export default async function ExpertPage({ params }: Props) {
  // In Next.js 15+, params is a Promise which must be awaited
  const { id } = await params;
  const expert = getExpertById(id);

  if (!expert) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100 min-h-[600px]">
        
        {/* Left Column: Expert Profile (Sidebar) */}
        <aside className="lg:w-[320px] bg-white p-6 lg:p-8 border-r border-slate-100 shrink-0 flex flex-col">
          <div className="flex flex-col items-start space-y-4">
             <Avatar className="h-20 w-20 border border-slate-100 shadow-sm">
                <AvatarImage src={expert.avatarUrl} alt={expert.name} />
                <AvatarFallback className="text-xl font-medium bg-slate-50 text-slate-800">{expert.name[0]}</AvatarFallback>
             </Avatar>
             
             <div>
               <h1 className="text-xl font-bold text-slate-900 tracking-tight">{expert.name}</h1>
               <p className="text-slate-500 font-medium text-sm">{expert.title}</p>
             </div>

             <div className="flex flex-col space-y-3 text-sm text-slate-600 w-full pt-2">
                <div className="flex items-center gap-3 text-slate-500">
                  <Globe className="w-4 h-4" />
                  <span>{expert.timezone}</span>
                </div>
                {/* Simulated metadata */}
                <div className="flex items-center gap-3 text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>15m, 30m, 60m</span>
                </div>
             </div>
             
             <div className="pt-6 border-t border-slate-100 w-full">
               <p className="text-sm text-slate-600 leading-relaxed">{expert.bio}</p>
             </div>
          </div>
          
          <div className="mt-auto pt-8">
             <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
               <ShieldCheck className="w-4 h-4" />
               <span>Verified Expert</span>
             </div>
          </div>
        </aside>
        
        {/* Right Column: Booking Wizard */}
        <main className="flex-1 bg-white p-0 relative">
          <WizardContainer expert={expert} />
        </main>
      </div>
    </div>
  );
}
