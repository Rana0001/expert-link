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
  const { currentStep, setStep, selectedExpert, setExpert } = useBookingStore();
  
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

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 4) {
        setStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full flex flex-col h-full relative">
      {/* Top Header / Navigation (Cal.com style simple back button) */}
      <div className="flex items-center justify-between mb-6 px-1">
         {currentStep > 1 && currentStep < 4 ? (
             <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack} 
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 -ml-3 h-8 px-2"
             >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Back</span>
             </Button>
         ) : <div className="h-8" /> /* Spacer to keep layout stable */}
         
         {/* Simple Step Indicator */}
         {currentStep < 4 && (
            <div className="flex gap-1">
                {[1, 2, 3].map(step => (
                    <div 
                        key={step} 
                        className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${step <= currentStep ? 'bg-slate-900' : 'bg-slate-200'}`} 
                    />
                ))}
            </div>
         )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full"
          >
            {currentStep === 1 && <div className="max-w-xl mx-auto"><Step1_Service /></div>}
            {currentStep === 2 && <Step2_Calendar />}
            {currentStep === 3 && <Step3_Intake />}
            {currentStep === 4 && <Step4_Success />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
