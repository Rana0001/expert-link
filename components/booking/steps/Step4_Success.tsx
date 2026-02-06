"use client";

import { useBookingStore } from "@/lib/store/booking-store";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar as CalIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function Step4_Success() {
  const { selectedExpert, selectedService, selectedDate, selectedSlot, intakeData, resetBooking } = useBookingStore();

  if (!selectedExpert || !selectedDate || !selectedSlot) return null;

  const handleFinish = () => {
    resetBooking();
    // Redirect to home or allow another book? Link handles redirection.
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-8 animate-in zoom-in-95 duration-500">
       <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
          <CheckCircle2 size={40} />
       </div>
       
       <h2 className="text-3xl font-bold text-slate-900">Booking Confirmed!</h2>
       <p className="text-slate-600 max-w-sm">
         You are booked with <strong>{selectedExpert.name}</strong> for <strong>{selectedService?.name}</strong>.
       </p>
       
       <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 w-full max-w-sm text-left space-y-3">
          <div className="flex items-center gap-3 text-slate-700">
             <CalIcon size={18} className="text-slate-400" />
             <span className="font-medium">
                {format(selectedDate, 'MMMM d, yyyy')}
             </span>
          </div>
          <div className="text-sm text-slate-500 pl-8">
             Check your email ({intakeData?.email}) for the calendar invite.
          </div>
       </div>
       
       <div className="pt-4 w-full max-w-sm">
          <Button asChild className="w-full" variant="outline" onClick={handleFinish}>
            <Link href="/">Book Another Expert</Link>
          </Button>
       </div>
    </div>
  );
}
