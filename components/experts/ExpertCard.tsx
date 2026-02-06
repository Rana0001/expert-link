import { Expert } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Star, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Card className="group relative h-full flex flex-col border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 bg-white overflow-hidden rounded-2xl hover:-translate-y-1">
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="pb-3 pt-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-white ring-2 ring-slate-100 shadow-md group-hover:scale-105 transition-transform duration-300">
                <AvatarImage src={expert.avatarUrl} alt={expert.name} className="object-cover" />
                <AvatarFallback className="bg-linear-to-br from-slate-100 to-slate-200 text-slate-700 font-bold text-lg">
                  {expert.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm ring-1 ring-slate-100">
                <div className="bg-emerald-500 w-2.5 h-2.5 rounded-full border border-white"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {expert.name}
                </h3>
                <ShieldCheck size={14} className="text-blue-500" />
              </div>
              <p className="text-slate-500 text-sm font-medium line-clamp-1">{expert.title}</p>
              
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5">
                <div className="flex items-center gap-1">
                  <MapPin size={11} />
                  <span>{expert.timezone.split('/')[1]?.replace('_', ' ') || expert.timezone}</span>
                </div>
                <div className="flex items-center gap-1">
                   <Clock size={11} />
                   <span>Available Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 relative z-10 flex-1">
        <div className="flex items-center gap-1 mb-4 bg-orange-50/50 w-fit px-2 py-1 rounded-md border border-orange-100/50">
          <div className="flex gap-0.5 text-orange-400">
             {[...Array(5)].map((_, i) => (
               <Star key={i} size={11} fill="currentColor" />
             ))}
          </div>
          <span className="text-slate-700 font-semibold text-xs ml-1.5">5.0</span>
          <span className="text-slate-400 text-xs ml-1">(42 sessions)</span>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 min-h-[40px] mb-5 leading-relaxed">
          {expert.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {expert.services.slice(0, 2).map((service) => (
            <Badge 
              key={service.id} 
              variant="secondary" 
              className="bg-slate-100 hover:bg-white text-slate-600 font-medium border border-transparent hover:border-slate-200 transition-all shadow-xs"
            >
              {service.name}
            </Badge>
          ))}
          {expert.services.length > 2 && (
             <Badge variant="outline" className="text-slate-400 border-slate-200 bg-transparent">+{expert.services.length - 2}</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-5 relative z-10 px-6 grid grid-cols-2 gap-3">
        <Button 
            asChild 
            variant="outline"
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-sm rounded-xl h-10 text-sm font-medium"
        >
          <Link href={`/expert/${expert.id}`}>
            View Profile
          </Link>
        </Button>
        <Button 
            asChild 
            className="w-full gap-2 bg-slate-900 hover:bg-blue-600 text-white shadow-md shadow-slate-900/10 hover:shadow-blue-600/20 rounded-xl transition-all duration-300 h-10 text-sm font-medium"
        >
          <Link href={`/expert/${expert.id}`}>
            Book Session
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
