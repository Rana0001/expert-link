import { describe, it, expect } from 'vitest';
import { generateSlots, formatSlot } from '../lib/core/scheduling';
import { Expert, Availability } from '../lib/types';
import { toZonedTime } from 'date-fns-tz';

const mockExpert: Expert = {
  id: 'exp-1',
  name: 'Dr. Time',
  title: 'Time Lord',
  timezone: 'America/New_York', // EST/EDT
  availability: {
    days: [1, 2, 3, 4, 5], // Mon-Fri
    startHour: 9, // 9 AM EST
    endHour: 17, // 5 PM EST
  },
  services: []
};

describe('Time Engine (Scheduling Core)', () => {
  it('should generate slots for a given date in Expert Timezone', () => {
    // Test Date: 2023-10-10 (Tuesday)
    // We pass a Date object. Let's create a UTC date that represents the start of that day roughly.
    // Or just any time on that day.
    const date = new Date('2023-10-10T12:00:00Z'); 
    
    const slots = generateSlots(mockExpert, date, 60); // 60 min slots
    
    expect(slots.length).toBeGreaterThan(0);
    
    // First slot should be 9:00 AM New York time.
    // 9:00 AM NY on Oct 10 (EDT) is UTC-4. So 13:00 UTC.
    const firstSlot = slots[0];
    
    // Verify using formatSlot
    expect(formatSlot(firstSlot, 'America/New_York')).toBe('9:00 AM');
    expect(formatSlot(firstSlot, 'Europe/London')).toBe('2:00 PM'); // 9+5 = 14:00
  });

  it('should respect the 30 minute start interval grid even for 60 min services', () => {
    const date = new Date('2023-10-10T12:00:00Z');
    const slots = generateSlots(mockExpert, date, 60);
    
    // Expected: 9:00, 9:30, 10:00...
    expect(formatSlot(slots[0], 'America/New_York')).toBe('9:00 AM');
    expect(formatSlot(slots[1], 'America/New_York')).toBe('9:30 AM');
  });

  it('should handle timezone differences correctly (Nepal vs NY)', () => {
    // Nepal is UTC+5:45. NY is UTC-4 (EDT in Oct). Diff = 9h 45m.
    // 9:00 AM NY = 18:45 Nepal.
    
    const date = new Date('2023-10-10T12:00:00Z');
    const slots = generateSlots(mockExpert, date, 60);
    
    expect(formatSlot(slots[0], 'Asia/Kathmandu')).toBe('6:45 PM');
  });
  
  it('should stop generating slots at endHour', () => {
    const date = new Date('2023-10-10T12:00:00Z');
    // End hour is 17 (5 PM). 
    // Last 60 min slot starting at X must end by 17:00?
    // If logic: slotEnd > endLimit -> break.
    // So if start 16:00 -> ends 17:00. OK.
    // If start 16:30 -> ends 17:30. Should be excluded.
    
    const slots = generateSlots(mockExpert, date, 60);
    const lastSlot = slots[slots.length - 1];
    
    // Last slot should start at 16:00 (4 PM)
    expect(formatSlot(lastSlot, 'America/New_York')).toBe('4:00 PM');
    
    // Check if there is no 4:30 PM slot
    const has430 = slots.some(s => formatSlot(s, 'America/New_York') === '4:30 PM');
    expect(has430).toBe(false);
  });
});
