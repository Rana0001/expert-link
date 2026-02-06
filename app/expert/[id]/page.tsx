import { notFound } from "next/navigation";
import { getExpertById } from "@/lib/mock/experts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; 
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
import { BackButton } from "@/components/experts/BackButton";
import { Clock, Globe, MapPin, Star, ShieldCheck, Link as LinkIcon, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header / Hero Section (Simple) */}
      <div className="bg-white border-b border-slate-200">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <BackButton />

            <div className="flex flex-col md:flex-row gap-6 md:items-center">
               <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg shrink-0">
                  <AvatarImage src={expert.avatarUrl} alt={expert.name} />
                  <AvatarFallback className="text-3xl font-bold bg-slate-100 text-slate-800">{expert.name[0]}</AvatarFallback>
               </Avatar>
               
               <div className="space-y-2">
                 <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{expert.name}</h1>
                    <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border border-blue-100">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </div>
                 </div>
                 <p className="text-lg md:text-xl text-slate-600 font-medium">{expert.title}</p>
                 <div className="flex items-center gap-4 text-sm text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4" />
                      <span>{expert.timezone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>Fast responder</span>
                    </div>
                    {expert.websiteUrl && (
                        <HoverCard>
                           <HoverCardTrigger asChild>
                              <a href={expert.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium cursor-pointer">
                                  <LinkIcon className="w-4 h-4" />
                                  <span>Website</span>
                              </a>
                           </HoverCardTrigger>
                           <HoverCardContent className="w-80 p-0 overflow-hidden border-slate-200 shadow-xl bg-slate-50">
                               <div className="relative aspect-video w-full bg-slate-100">
                                  {/* Using standard thum.io for free screenshot preview */}
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img 
                                    src={`https://image.thum.io/get/width/400/crop/600/noanimate/${expert.websiteUrl}`} 
                                    alt="Website Preview" 
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 text-xs text-slate-500 truncate border-t border-slate-100">
                                     {expert.websiteUrl.replace(/^https?:\/\//, '')}
                                  </div>
                               </div>
                           </HoverCardContent>
                        </HoverCard>
                    )}
                 </div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-10">
               {/* About Section */}
               <section className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">About</h2>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                    <p>{expert.bio}</p>
                    <p className="mt-4">
                      I specialize in helping teams scale their frontend architecture. 
                      Whether you're debugging complex race conditions or designing a new design system, I can help you cut through the noise.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {expert.services.map(s => (
                        <div key={s.id} className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm text-slate-600 font-medium shadow-xs">
                          {s.name}
                        </div>
                    ))}
                  </div>
               </section>

               {/* Testimonials Section */}
               <section>
                 <Testimonials expertId={expert.id} />
               </section>
            </div>

            {/* Right Booking Sidebar */}
            <div className="lg:col-span-5 relative">
               <div className="sticky top-6">
                 <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6 ring-1 ring-slate-900/5">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900">Book a Session</h3>
                        <p className="text-slate-500 text-sm">
                          Select a time to speak with {expert.name} about your specific challenges.
                        </p>
                    </div>

                    <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-sm font-medium text-slate-700">Available Today</span>
                           </div>
                           <span className="text-xs text-slate-500">15m / 30m / 60m</span>
                        </div>

                        <Button asChild className="w-full h-12 text-base bg-slate-900 hover:bg-blue-700 text-white shadow-lg shadow-slate-900/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                           <Link href={`/expert/${expert.id}/book`}>
                              Book Session
                           </Link>
                        </Button>
                        
                        <p className="text-xs text-center text-slate-400">
                           No payment required to request a time.
                        </p>
                    </div>
                 </div>
                 
                 {/* Social Proof / Security badges could go here */}
                 <div className="mt-6 flex justify-center gap-4 text-slate-300">
                    <ShieldCheck className="w-5 h-5" />
                    <Star className="w-5 h-5" />
                    <Globe className="w-5 h-5" />
                 </div>
               </div>
            </div>

        </div>
      </div>
    </div>
  );
}

// Layout helper needs to be imported
import { Testimonials } from "@/components/experts/Testimonials";
