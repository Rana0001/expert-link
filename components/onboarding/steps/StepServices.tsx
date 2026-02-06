"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";

type Service = {
  name: string;
  description: string;
  duration: number;
  price: number;
};

type StepServicesProps = {
  data: { services: Service[] };
  onUpdate: (data: { services: Service[] }) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepServices({ data, onUpdate, onNext, onBack }: StepServicesProps) {
  const [services, setServices] = useState<Service[]>(
    data.services.length > 0 ? data.services : []
  );
  const [currentService, setCurrentService] = useState<Service>({
    name: "",
    description: "",
    duration: 60,
    price: 100,
  });
  const [currentField, setCurrentField] = useState<'name' | 'duration' | 'price' | 'description'>('name');
  const [isAddingService, setIsAddingService] = useState(services.length === 0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && isAddingService) {
        e.preventDefault();
        if (currentField === 'name' && currentService.name.length >= 3) {
          setCurrentField('duration');
        } else if (currentField === 'duration') {
          setCurrentField('price');
        } else if (currentField === 'price') {
          setCurrentField('description');
        } else if (currentField === 'description') {
          handleAddService();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentField, currentService, isAddingService]);

  const handleAddService = () => {
    if (currentService.name && currentService.price > 0) {
      setServices([...services, currentService]);
      setCurrentService({ name: "", description: "", duration: 60, price: 100 });
      setCurrentField('name');
      setIsAddingService(false);
    }
  };

  const handleNext = () => {
    onUpdate({ services });
    onNext();
  };

  const canContinue = services.length > 0;

  // Show service list if not adding
  if (!isAddingService && services.length > 0) {
    return (
      <div className="space-y-12 max-w-3xl">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="text-2xl font-bold">3</span>
          <ArrowRight size={20} />
          <span className="text-lg">Your services</span>
        </div>

        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-slate-900">
            Great! Here's what you offer
          </h2>

          <div className="space-y-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 border-l-4 border-slate-900 bg-slate-50 rounded-r-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
                    {service.description && (
                      <p className="text-slate-600 mt-1">{service.description}</p>
                    )}
                    <div className="flex gap-4 mt-2 text-sm text-slate-500">
                      <span>{service.duration} minutes</span>
                      <span>•</span>
                      <span className="font-semibold">${service.price}</span>
                    </div>
                  </div>
                  <Check size={24} className="text-green-600" />
                </div>
              </div>
            ))}
          </div>

          {services.length < 3 && (
            <Button
              onClick={() => setIsAddingService(true)}
              variant="outline"
              className="h-12 px-6 border-2 border-dashed border-slate-300 hover:border-slate-900 cursor-pointer"
            >
              <Plus size={16} className="mr-2" /> Add another service
            </Button>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleNext}
              className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
            >
              Continue <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-400">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
      </div>
    );
  }

  // Show service creation form
  return (
    <div className="space-y-12 max-w-3xl">
      <div className="flex items-center gap-3 text-slate-400">
        <span className="text-2xl font-bold">3</span>
        <ArrowRight size={20} />
        <span className="text-lg">Add a service</span>
      </div>

      {/* Service Name */}
      {currentField === 'name' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <label className="block">
            <span className="text-5xl font-bold text-slate-900 block mb-6">
              What service do you offer?
            </span>
            <Input
              placeholder="e.g., 1:1 Code Review"
              value={currentService.name}
              onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
              className="h-16 text-2xl font-medium border-0 border-b-[3px] border-slate-300 rounded-none focus:border-slate-900 focus:ring-0 focus-visible:ring-0 outline-none focus-visible:outline-none px-0 bg-transparent placeholder:text-slate-400 placeholder:font-normal transition-colors duration-200 focus:placeholder:text-slate-500"
              autoFocus
            />
          </label>
          
          {currentService.name.length >= 3 && (
            <div className="flex gap-3 animate-in fade-in duration-200">
              <Button
                onClick={() => setCurrentField('duration')}
                className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
              >
                OK <ArrowRight size={16} className="ml-2" />
              </Button>
              <p className="text-sm text-slate-400 flex items-center">
                press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs mx-1">Enter ↵</kbd>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Duration */}
      {currentField === 'duration' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <label className="block">
            <span className="text-5xl font-bold text-slate-900 block mb-6">
              How long is each session?
            </span>
            <div className="flex items-baseline gap-3">
              <Input
                type="number"
                value={currentService.duration}
                onChange={(e) => setCurrentService({ ...currentService, duration: parseInt(e.target.value) || 0 })}
                className="h-16 text-2xl font-medium border-0 border-b-[3px] border-slate-300 rounded-none focus:border-slate-900 focus:ring-0 focus-visible:ring-0 outline-none focus-visible:outline-none px-0 bg-transparent w-32 transition-colors duration-200"
                autoFocus
              />
              <span className="text-2xl text-slate-400">minutes</span>
            </div>
          </label>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setCurrentField('price')}
              className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
            >
              OK <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Price */}
      {currentField === 'price' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <label className="block">
            <span className="text-5xl font-bold text-slate-900 block mb-6">
              What's your rate?
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl text-slate-400">$</span>
              <Input
                type="number"
                value={currentService.price}
                onChange={(e) => setCurrentService({ ...currentService, price: parseInt(e.target.value) || 0 })}
                className="h-16 text-2xl font-medium border-0 border-b-[3px] border-slate-300 rounded-none focus:border-slate-900 focus:ring-0 focus-visible:ring-0 outline-none focus-visible:outline-none px-0 bg-transparent w-32 transition-colors duration-200"
                autoFocus
              />
            </div>
          </label>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setCurrentField('description')}
              className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
            >
              OK <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Description (Optional) */}
      {currentField === 'description' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <label className="block">
            <span className="text-5xl font-bold text-slate-900 block mb-6">
              Add a description (optional)
            </span>
            <Textarea
              placeholder="What's included in this session?"
              value={currentService.description}
              onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
              className="min-h-24 text-xl font-normal leading-relaxed border-0 border-b-[3px] border-slate-300 rounded-none focus:border-slate-900 focus:ring-0 focus-visible:ring-0 outline-none focus-visible:outline-none px-0 bg-transparent placeholder:text-slate-400 placeholder:font-normal resize-none transition-colors duration-200 focus:placeholder:text-slate-500"
              autoFocus
            />
          </label>
          
          <div className="flex gap-3">
            <Button
              onClick={handleAddService}
              className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
            >
              Add Service <Check size={16} className="ml-2" />
            </Button>
            <Button
              onClick={() => {
                setCurrentService({ ...currentService, description: "" });
                handleAddService();
              }}
              variant="ghost"
              className="h-12 px-6"
            >
              Skip
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-slate-400">
        <button
          onClick={() => {
            if (services.length > 0) {
              setIsAddingService(false);
            } else {
              onBack();
            }
          }}
          className="flex items-center gap-2 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
