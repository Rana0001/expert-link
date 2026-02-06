import { notFound } from "next/navigation";
import { getExpertById } from "@/lib/mock/experts";
import { getTestimonialsByExpertId } from "@/lib/mock/testimonials";
import { TestimonialCard } from "@/components/experts/TestimonialCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TestimonialsPage({ params }: Props) {
  const { id } = await params;
  const expert = getExpertById(id);
  
  if (!expert) {
    notFound();
  }

  const testimonials = getTestimonialsByExpertId(id);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
       {/* Header */}
       <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <Button variant="ghost" asChild size="sm" className="-ml-2 text-slate-500 hover:text-slate-900">
                    <Link href={`/expert/${id}`}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Profile
                    </Link>
                </Button>
                <div className="h-6 w-px bg-slate-200 hidden sm:block" />
                <div className="items-center gap-3 hidden sm:flex">
                    <Avatar className="h-8 w-8 border border-slate-100">
                        <AvatarImage src={expert.avatarUrl} />
                        <AvatarFallback>{expert.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-slate-900 text-sm">Testimonials</span>
                </div>
             </div>
             
             <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>5.0 Rating</span>
             </div>
          </div>
       </div>

       {/* Banner */}
       <div className="bg-slate-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
             <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-2 backdrop-blur-sm">
                <MessageSquare className="w-6 h-6 text-white" />
             </div>
             <h1 className="text-3xl md:text-5xl font-bold tracking-tight">What others are saying</h1>
             <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Read trusted reviews from clients who have worked with {expert.name}.
             </p>
          </div>
       </div>

       {/* Grid Content */}
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="h-full">
                    <TestimonialCard testimonial={testimonial} />
                </div>
             ))}
          </div>
          
          {testimonials.length === 0 && (
             <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
                <p className="text-slate-400">No testimonials yet.</p>
             </div>
          )}
       </div>
    </div>
  );
}
