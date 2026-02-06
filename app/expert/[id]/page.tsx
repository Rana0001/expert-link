import { notFound } from "next/navigation";
import { getExpertById } from "@/lib/mock/experts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import WizardContainer from "@/components/booking/WizardContainer";

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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Expert Profile */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
               <Avatar className="h-32 w-32 border-4 border-white shadow-md mb-4 bg-slate-200">
                  <AvatarImage src={expert.avatarUrl} alt={expert.name} />
                  <AvatarFallback className="text-2xl">{expert.name[0]}</AvatarFallback>
               </Avatar>
               
               <h1 className="text-2xl font-bold text-slate-900">{expert.name}</h1>
               <p className="text-blue-600 font-medium">{expert.title}</p>
               
               <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
                 <Badge variant="secondary">{expert.timezone}</Badge>
               </div>
               
               <div className="mt-6 text-sm text-slate-600 space-y-4 text-left">
                 <p>{expert.bio}</p>
                 <div className="pt-4 border-t border-slate-100">
                   <h4 className="font-semibold text-slate-900 mb-2">Availability</h4>
                   <p>Mon-Fri, 9am - 5pm ({expert.timezone})</p>
                 </div>
               </div>
            </div>
          </div>
        </aside>
        
        {/* Right Column: Booking Wizard */}
        <main className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
             {/* Header */}
             <div className="p-6 border-b border-slate-100 bg-slate-50/50">
               <h2 className="text-xl font-semibold text-slate-900">Book a Session</h2>
               <p className="text-slate-500 text-sm">Select a service to get started.</p>
             </div>
             
             {/* Wizard Content */}
             <div className="flex-1 p-6 relative">
                <WizardContainer expert={expert} />
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
