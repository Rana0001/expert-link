import { notFound, redirect } from "next/navigation";
import { getExpertById } from "@/lib/mock/experts";
import WizardContainer from "@/components/booking/WizardContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/experts/BackButton";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookingPage({ params }: Props) {
  const { id } = await params;
  
  // Check authentication
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Redirect to login with return URL if not authenticated
  if (!user) {
    redirect(`/login?redirect=/expert/${id}/book`);
  }
  
  const expert = getExpertById(id);

  if (!expert) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
       {/* Simple Header */}
       <div className="w-full max-w-5xl mb-6 flex items-center justify-between">
          <BackButton />
       </div>

       <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100 min-h-[600px]">
          {/* Left Column: Expert Summary (simplified for booking context) */}
          <aside className="lg:w-[320px] bg-white p-8 border-r border-slate-100 shrink-0 flex flex-col items-center text-center lg:items-start lg:text-left">
              <Avatar className="h-24 w-24 mb-4 border border-slate-100 shadow-sm">
                <AvatarImage src={expert.avatarUrl} alt={expert.name} />
                <AvatarFallback className="text-xl bg-slate-50">{expert.name[0]}</AvatarFallback>
              </Avatar>
              
              <h1 className="text-xl font-bold text-slate-900 mb-1">Book a Session</h1>
              <p className="text-slate-500 text-sm mb-6">with {expert.name}</p>
              
              <div className="w-full border-t border-slate-100 pt-6 mt-auto">
                 <p className="text-xs text-slate-400 leading-relaxed">
                   Check the duration and timezone before confirming your slot.
                 </p>
              </div>
          </aside>

          {/* Right Column: The Wizard */}
          <main className="flex-1 bg-white p-0 relative">
            <WizardContainer expert={expert} />
          </main>
       </div>
    </div>
  );
}
