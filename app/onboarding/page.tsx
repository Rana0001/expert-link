"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepWelcome from "@/components/onboarding/steps/StepWelcome";
import StepBio from "@/components/onboarding/steps/StepBio";
import StepServices from "@/components/onboarding/steps/StepServices";
import StepSuccess from "@/components/onboarding/steps/StepSuccess";

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    timezone: "America/New_York",
    website: "",
    services: [] as Array<{ name: string; description: string; duration: number; price: number }>,
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal Progress Bar */}
      {currentStep < TOTAL_STEPS && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
          <motion.div
            className="h-full bg-slate-900"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      )}

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {currentStep === 1 && <StepWelcome onNext={nextStep} />}
              {currentStep === 2 && (
                <StepBio
                  data={formData}
                  onUpdate={updateFormData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 3 && (
                <StepServices
                  data={formData}
                  onUpdate={updateFormData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 4 && <StepSuccess data={formData} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
