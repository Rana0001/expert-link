import { Expert } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Star, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Card className="group relative h-full flex flex-col border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 bg-white dark:bg-slate-800 overflow-hidden rounded-2xl hover:-translate-y-1">
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-50/50 dark:to-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="pb-3 pt-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-white dark:border-slate-700 ring-2 ring-slate-100 dark:ring-slate-600 shadow-md group-hover:scale-105 transition-transform duration-300">
                <AvatarImage src={expert.avatarUrl} alt={expert.name} className="object-cover" />
                 <AvatarFallback className="bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-200 font-bold text-lg">
                  {expert.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm ring-1 ring-slate-100 dark:ring-slate-600">
                <div className="bg-emerald-500 w-2.5 h-2.5 rounded-full border border-white"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {expert.name}
                </h3>
                <ShieldCheck size={14} className="text-blue-500 dark:text-blue-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-1">{expert.title}</p>
              
              <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mt-1.5">
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
        <div className="flex items-center gap-1 mb-4 bg-orange-50/50 dark:bg-orange-900/20 w-fit px-2 py-1 rounded-md border border-orange-100/50 dark:border-orange-800/50">
          <div className="flex gap-0.5 text-orange-400">
             {[...Array(5)].map((_, i) => (
               <Star key={i} size={11} fill="currentColor" />
             ))}
          </div>
          <span className="text-slate-700 dark:text-slate-200 font-semibold text-xs ml-1.5">5.0</span>
          <span className="text-slate-400 dark:text-slate-500 text-xs ml-1">(42 sessions)</span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 min-h-[40px] mb-5 leading-relaxed">
          {expert.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {expert.services.slice(0, 2).map((service) => (
            <Badge 
              key={service.id} 
              variant="secondary" 
              className="bg-slate-100 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-medium border border-transparent hover:border-slate-200 dark:hover:border-slate-500 transition-all shadow-xs"
            >
              {service.name}
            </Badge>
          ))}
          {expert.services.length > 2 && (
             <Badge variant="outline" className="text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-600 bg-transparent">+{expert.services.length - 2}</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-5 relative z-10 px-6 grid grid-cols-2 gap-3">
        <Button 
            asChild 
            variant="outline"
            className="w-full bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 shadow-sm rounded-xl h-10 text-sm font-medium"
        >
          <Link href={`/expert/${expert.id}`}>
            View Profile
          </Link>
        </Button>
        <Button 
            asChild 
            className="w-full gap-2 bg-slate-900 hover:bg-blue-600 text-white shadow-md shadow-slate-900/10 hover:shadow-blue-600/20 rounded-xl transition-all duration-300 h-10 text-sm font-medium"
        >
          <Link href={`/expert/${expert.id}/book`}>
            Book Session
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
