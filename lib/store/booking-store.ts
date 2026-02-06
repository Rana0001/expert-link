import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Expert, Service, TimeSlot } from '@/lib/types';

interface BookingState {
  // Wizard State
  currentStep: number;
  
  // Selection State
  selectedExpert: Expert | null;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null; // Contains start/end date objects
  
  // User Data State (Step 3)
  intakeData: {
    name: string;
    email: string;
    notes: string;
  } | null;

  // Actions
  setStep: (step: number) => void;
  setExpert: (expert: Expert) => void;
  setService: (service: Service) => void;
  setDate: (date: Date) => void;
  setTimeSlot: (slot: TimeSlot) => void;
  setIntakeData: (data: BookingState['intakeData']) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      currentStep: 1,
      selectedExpert: null,
      selectedService: null,
      selectedDate: null,
      selectedSlot: null,
      intakeData: null,

      setStep: (step) => set({ currentStep: step }),
      setExpert: (expert) => set({ selectedExpert: expert, currentStep: 1, selectedService: null, selectedDate: null, selectedSlot: null }),
      setService: (service) => set({ selectedService: service }),
      setDate: (date) => set({ selectedDate: date, selectedSlot: null }), // Reset slot if date changes
      setTimeSlot: (slot) => set({ selectedSlot: slot }),
      setIntakeData: (data) => set({ intakeData: data }),
      resetBooking: () => set({
        currentStep: 1,
        selectedExpert: null,
        selectedService: null,
        selectedDate: null,
        selectedSlot: null,
        intakeData: null
      }),
    }),
    {
      name: 'expert-link-booking-storage',
      storage: createJSONStorage(() => localStorage),
      // Important: Date objects need special handling when hydrating from JSON (strings)
      // We can use a custom storage or onRehydrate, but simplest is to parsing in UI or custom merge.
      // Or use `superjson`?
      // For simple MVP without extra deps, we'll let them be strings on rehydrate and needing manual "new Date()"?
      // Actually Zustand persist handles JSON parsing. new Date("ROI") works. 
      // BUT `selectedDate` will come out as STRING from localStorage.
      // We need `onRehydrateStorage`? Or logic in components to handle string conversion.
      // Let's implement partialize or simple storage.
      // Actually, standard `persist` returns strings for Dates.
      // We should probably convert them on access or provide a robust storage.
      // For now, let's keep it simple: The UI will check `typeof state.selectedDate === 'string' ? new Date(state.selectedDate) : state.selectedDate`.
    }
  )
);
