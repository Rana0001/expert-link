"use client";

import { useBookingStore } from "@/lib/store/booking-store";
import { generateSlots, formatSlot } from "@/lib/core/scheduling";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { TimeSlot } from "@/lib/types";
import { format as formatLocal } from "date-fns";
import { Globe } from "lucide-react";

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Asia/Kathmandu"
];

export default function Step2_Calendar() {
  const { selectedExpert, selectedService, selectedDate, setDate, setTimeSlot, selectedSlot, setStep } = useBookingStore();
  
  // Local state for timezone selection
  const [userTimezone, setUserTimezone] = useState<string>(() => {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
        return "UTC";
    }
  }); 

  // Ensure user's timezone is in the list
  const visibleTimezones = useMemo(() => {
     const set = new Set(TIMEZONES);
     set.add(userTimezone);
     if (selectedExpert?.timezone) set.add(selectedExpert.timezone);
     return Array.from(set).sort();
  }, [userTimezone, selectedExpert]);
  
  // Compute Available Slots
  const availableSlots = useMemo(() => {
    if (!selectedExpert || !selectedDate || !selectedService) return [];
    
    // Call our Core Logic
    // We pass the user's selected date.
    return generateSlots(selectedExpert, selectedDate, selectedService.durationInMinutes);
  }, [selectedExpert, selectedDate, selectedService]);

  const handleSlotSelect = (slot: TimeSlot) => {
    setTimeSlot(slot);
  };

  if (!selectedExpert) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 px-2">
      <div className="flex flex-col md:flex-row gap-8">
         {/* Left: Calendar & Timezone */}
         <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Pick a Date</h3>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 p-2 inline-block shadow-sm">
                <Calendar
                    mode="single"
                    selected={selectedDate || undefined}
                    onSelect={(d) => d && setDate(d)}
                    className="rounded-md"
                    disabled={(date) => {
                        // Disable past dates
                        if (date < new Date(new Date().setHours(0,0,0,0))) return true;
                        // Disable days expert is not working (simple check)
                        const day = date.getDay(); // 0 = Sun
                        if (!selectedExpert.availability.days.includes(day)) return true;
                        return false;
                    }}
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500 flex items-center gap-2">
                    <Globe size={14} /> Timezone
                </label>
                <Select value={userTimezone} onValueChange={setUserTimezone}>
                    <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-slate-900">
                        <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                        {visibleTimezones.map(tz => (
                            <SelectItem key={tz} value={tz}>
                                {tz.replace(/_/g, ' ')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
         </div>
         
         {/* Right: Slots Grid */}
         <div className="flex-1 space-y-4">
             <div className="flex items-center justify-between h-8">
                 <h3 className="font-semibold text-slate-900">
                    {selectedDate ? formatLocal(selectedDate, 'EEEE, MMM d') : 'Select date...'}
                 </h3>
             </div>
             
             {!selectedDate && (
                 <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-lg text-slate-400 text-sm">
                     Choose a date to see times
                 </div>
             )}
             
             {selectedDate && availableSlots.length === 0 && (
                 <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg text-slate-500 text-sm">
                     No slots available for this date.
                 </div>
             )}
             
             {selectedDate && availableSlots.length > 0 && (
                 <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                     {availableSlots.map((slot, idx) => {
                         const startLabel = formatSlot(slot, userTimezone);
                         // Check equality by value for object
                         const isSelected = selectedSlot && new Date(slot.start).getTime() === new Date(selectedSlot.start).getTime();
                         
                         return (
                             <Button
                                key={idx}
                                variant={isSelected ? "default" : "outline"}
                                className={`w-full justify-center ${isSelected ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'hover:bg-slate-50 hover:text-slate-900 text-slate-600 border-slate-200'}`}
                                onClick={() => handleSlotSelect(slot)}
                             >
                                {startLabel}
                             </Button>
                         );
                     })}
                 </div>
             )}

             
             {selectedSlot && (
                <Button className="w-full mt-4 bg-slate-900" onClick={() => setStep(3)}>
                    Continue to Details
                </Button>
             )}
         </div>
      </div>
    </div>
  );
}
