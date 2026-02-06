import { addMinutes, format as formatLocal } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { Expert, TimeSlot } from '@/lib/types';

/**
 * Generates available time slots for a specific date, respecting the expert's timezone
 * and converting them to the user's requested timezone.
 */
export function generateSlots(
  expert: Expert,
  selectedDate: Date,
  durationInMinutes: number = 60
): TimeSlot[] {
  const expertTz = expert.timezone;
  
  // Convert selectedDate (UTC point) to Expert's perspective to ensure we get the correct "Day"
  // e.g. If it's 2AM Oct 11 in Nepal (User), but 4PM Oct 10 in NY (Expert).
  // We want slots for Oct 10th if the User picked "Oct 10" on their calendar app which might be synchronized?
  // Actually, usually Calendar UI passes a Date object representing 00:00 of the selected day.
  // We should rely on `selectedDate` representing the day we want.
  // But strictly, let's look at the date string relative to Expert.
  const expertDate = toZonedTime(selectedDate, expertTz);
  const dateStr = formatLocal(expertDate, 'yyyy-MM-dd'); // "2023-10-10"
  
  const slots: TimeSlot[] = [];
  const startHour = expert.availability.startHour;
  const endHour = expert.availability.endHour;
  
  let currentHour = startHour;
  let currentMinute = 0;
  
  while (true) {
    const timeStr = `${dateStr}T${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:00`;
    
    // Convert "Expert Local Time" to UTC
    const slotStart = fromZonedTime(timeStr, expertTz);
    
    // Calculate end based on duration
    const slotEnd = addMinutes(slotStart, durationInMinutes);
    
    // Calculate limit (End of expert's day)
    const endLimitStr = `${dateStr}T${endHour.toString().padStart(2, '0')}:00:00`;
    const endLimit = fromZonedTime(endLimitStr, expertTz);
    
    if (slotEnd > endLimit) {
      break;
    }
    
    slots.push({
      start: slotStart,
      end: slotEnd,
      isAvailable: true 
    });
    
    // 30 min grid granularity
    const step = 30; 
    const nextMinute = currentMinute + step;
    currentHour += Math.floor(nextMinute / 60);
    currentMinute = nextMinute % 60;
  }
  
  return slots;
}

/**
 * Formats a date range for display in a specific timezone
 */
export function formatSlot(slot: TimeSlot, timezone: string): string {
  // Use Intl.DateTimeFormat for robust timezone support
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(slot.start);
}

