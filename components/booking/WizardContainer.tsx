"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useBookingStore } from "@/lib/store/booking-store";
import { Expert } from "@/lib/types";
import { useEffect, useState } from "react";
import Step1_Service from "@/components/booking/steps/Step1_Service";
import Step2_Calendar from "@/components/booking/steps/Step2_Calendar";
import Step3_Intake from "@/components/booking/steps/Step3_Intake";
import Step4_Success from "@/components/booking/steps/Step4_Success";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function WizardContainer({ expert }: { expert: Expert }) {
  const { currentStep, setStep, selectedExpert, setExpert, resetBooking } = useBookingStore();
  
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
     if (hydrated && expert) {
        if (!selectedExpert || selectedExpert.id !== expert.id) {
            setExpert(expert); 
        }
     }
  }, [hydrated, expert, selectedExpert, setExpert]);

  if (!hydrated) return <div className="p-10 text-center text-slate-400">Loading booking engine...</div>;

  const steps = [
    { number: 1, title: "Service" },
    { number: 2, title: "Date" },
    { number: 3, title: "Details" },
    { number: 4, title: "Done" },
  ];

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 4) {
        setStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full flex flex-col h-full">
      {/* Progress Bar (Floating) */}
      {currentStep < 4 && (
        <div className="flex justify-between mb-8 px-4 relative z-10">
             <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-100 -z-10 rounded-full" />
            {steps.map((s) => (
                <div key={s.number} className="flex flex-col items-center gap-2">
                    <motion.div 
                        initial={false}
                        animate={{
                            backgroundColor: s.number <= currentStep ? "#0f172a" : "#f1f5f9",
                            scale: s.number === currentStep ? 1.1 : 1,
                        }}
                        className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm border-2 border-white
                            ${s.number <= currentStep ? 'text-white' : 'text-slate-400'}
                        `}
                    >
                        {s.number < currentStep ? '✓' : s.number}
                    </motion.div>
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${s.number <= currentStep ? 'text-slate-900' : 'text-slate-300'}`}>
                        {s.title}
                    </span>
                </div>
            ))}
        </div>
      )}

      {/* Step Content */}
      <div className="flex-1 relative overflow-hidden px-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="h-full"
          >
            {currentStep === 1 && <Step1_Service />}
            {currentStep === 2 && <Step2_Calendar />}
            {currentStep === 3 && <Step3_Intake />}
            {currentStep === 4 && <Step4_Success />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {currentStep > 1 && currentStep < 4 && (
         <div className="mt-8 pt-4 border-t border-slate-100 flex items-center">
            <Button variant="ghost" onClick={handleBack} className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 -ml-2">
                <ChevronLeft size={16} className="mr-2" /> Back
            </Button>
         </div>
      )}
    </div>
  );
}
