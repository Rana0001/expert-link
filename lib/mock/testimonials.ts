import { Testimonial } from "@/lib/types";

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    expertId: "exp-1",
    author: "Alex Morgan",
    role: "Frontend Developer",
    content: "Absolutely transformed my understanding of React performance. The practical examples were spot on!",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    type: "text",
    date: "2 days ago"
  },
  {
    id: "t2",
    expertId: "exp-1",
    author: "Sarah Jenkins",
    role: "Tech Lead",
    content: "Great session. Very knowledgeable and got straight to the point.",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    date: "1 week ago"
  },
  {
    id: "t3",
    expertId: "exp-1",
    author: "David Chen",
    role: "Founder",
    content: "Worth every penny. The strategic advice on scalability saved us months of rework.",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026708c",
    type: "text",
    date: "2 weeks ago"
  },
  {
    id: "t4",
    expertId: "exp-1",
    author: "Emily Davis",
    role: "Product Manager",
    content: "Sarah helped us untangle our complex state management issues. Highly recommend!",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026702a",
    type: "text",
    date: "3 weeks ago"
  },
  {
    id: "t5",
    expertId: "exp-1",
    author: "Michael Brown",
    role: "CTO",
    content: "The best consultation I've had in years. Clear, concise, and actionable.",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026701b",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ", // Placeholder
    date: "1 month ago"
  }
];

export function getTestimonialsByExpertId(expertId: string): Testimonial[] {
  return MOCK_TESTIMONIALS.filter(t => t.expertId === expertId || t.expertId === "exp-1"); // Fallback for demo
}
