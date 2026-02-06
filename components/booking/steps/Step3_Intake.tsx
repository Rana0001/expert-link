"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBookingStore } from "@/lib/store/booking-store";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  notes: z.string().optional(),
});

export default function Step3_Intake() {
  const { setIntakeData, setStep, intakeData } = useBookingStore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: intakeData || {
      name: "",
      email: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIntakeData({
        ...values,
        notes: values.notes || ""
    });
    // Simulate API call?
    setTimeout(() => {
        setStep(4);
    }, 500);
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
      <div>
        <h3 className="font-semibold text-slate-900 text-lg">Your Details</h3>
        <p className="text-slate-500 text-sm">Where should we send the invite?</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes for Expert (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="I'd like to discuss..." 
                    className="resize-none h-24"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white mt-4">
            Confirm Booking
          </Button>
        </form>
      </Form>
    </div>
  );
}
