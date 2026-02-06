import { TestimonialCard } from "@/components/experts/TestimonialCard";
import { Button } from "@/components/ui/button";
import { getTestimonialsByExpertId } from "@/lib/mock/testimonials";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Testimonials({ expertId }: { expertId: string }) {
  const testimonials = getTestimonialsByExpertId(expertId).slice(0, 3); // Show top 3 only

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Top Reviews</h3>
        <div className="flex items-center gap-2 text-slate-600">
           <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
           <span className="font-semibold text-lg">5.0</span>
           <span className="text-sm text-slate-400">(42)</span>
        </div>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
           <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
      
      <div className="pt-2">
         <Button variant="outline" asChild className="w-full text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900">
            <Link href={`/expert/${expertId}/testimonials`}>
               View all testimonials
               <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
         </Button>
      </div>
    </div>
  );
}
