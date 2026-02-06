"use client";

import { useBookingStore } from "@/lib/store/booking-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function Step1_Service() {
  const { selectedExpert, selectedService, setService, setStep } = useBookingStore();

  if (!selectedExpert) return <div>No expert selected</div>;

  const handleSelect = (service: any) => {
    setService(service);
    // Auto advance after small delay for effect? Or instant?
    // Let's do instant for "Optimistic" feel.
    setTimeout(() => setStep(2), 200);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Select a Service</h3>
      <div className="grid gap-4">
        {selectedExpert.services.map((service) => {
           const isSelected = selectedService?.id === service.id;
           return (
             <Card 
                key={service.id}
                onClick={() => handleSelect(service)}
                className={`
                    cursor-pointer p-4 transition-all duration-200 border-2
                    ${isSelected ? 'border-blue-600 bg-blue-50/10 shadow-md' : 'border-slate-200 hover:border-slate-300'}
                `}
             >
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2">
                             <h4 className="font-bold text-slate-900">{service.name}</h4>
                             {service.description?.includes("Async") && <Badge variant="secondary" className="text-xs">Async</Badge>}
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{service.description || `${service.durationInMinutes} mins`}</p>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-lg text-slate-900">${service.price}</span>
                        <span className="text-xs text-slate-400">{service.durationInMinutes} min</span>
                    </div>
                </div>
             </Card>
           );
        })}
      </div>
    </div>
  );
}
