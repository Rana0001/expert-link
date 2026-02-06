import { Expert } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Card className="group relative border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-md overflow-hidden rounded-2xl hover:-translate-y-1">
      <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <CardHeader className="pb-3 pt-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300">
                    <AvatarImage src={expert.avatarUrl} alt={expert.name} />
                    <AvatarFallback className="bg-linear-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold text-lg">
                        {expert.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                    <div className="bg-green-500 w-2.5 h-2.5 rounded-full border border-white"></div>
                </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {expert.name}
              </h3>
              <p className="text-slate-500 text-sm font-medium mb-1">{expert.title}</p>
              
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin size={12} />
                <span>{expert.timezone}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 relative z-10">
         <div className="flex items-center gap-1 mb-3 text-orange-400 text-xs font-bold">
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <span className="text-slate-400 font-normal ml-1">(5.0)</span>
         </div>
         
         <p className="text-slate-600 text-sm line-clamp-2 min-h-[40px] mb-4">
           {expert.bio}
         </p>
         
         <div className="flex flex-wrap gap-2">
           {expert.services.slice(0,2).map(service => (
             <Badge key={service.id} variant="secondary" className="bg-slate-100/80 hover:bg-blue-50 text-slate-600 font-normal border border-transparent hover:border-blue-100 transition-colors">
               {service.name}
             </Badge>
           ))}
         </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-5 relative z-10 px-6">
        <Button asChild className="w-full gap-2 bg-slate-900/90 hover:bg-blue-600 text-white shadow-lg shadow-slate-200/50 hover:shadow-blue-500/25 rounded-xl transition-all duration-300">
          <Link href={`/expert/${expert.id}`}>
            Book Session 
            <ArrowRight size={16} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
