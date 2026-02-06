import { Testimonial } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, PlayCircle, Quote, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const isVideo = testimonial.type === 'video' && testimonial.videoUrl;

  return (
    <Card className="h-full border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group rounded-xl">
      {/* Video Thumbnail / Header */}
      {isVideo ? (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative w-full cursor-pointer overflow-hidden">
                    {/* Using AspectRatio component for stable layout */}
                    <AspectRatio ratio={16 / 9}>
                        <div className="relative w-full h-full bg-slate-900 group-hover:brightness-105 transition-all">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${testimonial.author}&background=0f172a&color=fff&size=400&font-size=0.1`}
                                alt="Video Thumbnail"
                                className="w-full h-full object-cover opacity-60 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-40" 
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
                            
                            {/* Glassmorphic Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative group/play">
                                    <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse group-hover/play:animate-none group-hover/play:bg-amber-500/50 transition-colors" />
                                    <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20 shadow-2xl transform group-hover:scale-110 transition-all duration-300 relative z-10 group-hover:bg-amber-500 group-hover:border-amber-400">
                                        <PlayCircle className="w-8 h-8 text-white fill-white/20 group-hover:fill-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AspectRatio>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl p-0 bg-black border-slate-800 overflow-hidden">
                 <DialogTitle className="sr-only">Video Testimonial from {testimonial.author}</DialogTitle>
                 <AspectRatio ratio={16 / 9}>
                    <iframe 
                        src={testimonial.videoUrl} 
                        className="w-full h-full" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                 </AspectRatio>
            </DialogContent>
        </Dialog>
      ) : null}

      <CardContent className={`p-6 flex-1 flex flex-col ${!isVideo ? 'relative' : ''}`}>
        {!isVideo && <Quote className="absolute top-6 right-6 text-slate-100 w-12 h-12 rotate-180" />}

        {/* Author Header */}
        <div className="flex items-start gap-4 mb-4 relative z-10">
            <Avatar className="w-12 h-12 border-2 border-white shadow-md ring-1 ring-slate-100">
                <AvatarImage src={testimonial.avatarUrl} />
                <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
            </Avatar>
            <div>
                <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-base leading-tight group-hover:text-amber-600 transition-colors">
                        {testimonial.author}
                    </h4>
                     {/* "Verified Client" Badge */}
                    <div className="group/badge relative flex items-center justify-center">
                         <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-50 cursor-help" />
                    </div>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{testimonial.role}</p>
            </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
            <div className="flex bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" className="text-amber-400" />
                ))}
            </div>
            <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 bg-slate-50 rounded-full border border-slate-100">
                {testimonial.date}
            </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed flex-1 italic relative">
           <span className="text-slate-300 text-xl font-serif absolute -left-2 -top-1">“</span>
           {testimonial.content}
           <span className="text-slate-300 text-xl font-serif absolute -bottom-2 ml-1">”</span>
        </p>
      </CardContent>
    </Card>
  );
}
