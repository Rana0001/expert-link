export type Service = {
  id: string;
  name: string;
  durationInMinutes: number;
  price: number;
  description?: string;
};

export type Availability = {
  days: number[]; // 0 = Sunday, 1 = Monday, etc.
  startHour: number; // e.g. 9 for 9:00 AM
  endHour: number; // e.g. 17 for 5:00 PM
};

export type Expert = {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  bio?: string;
  timezone: string; // IANA timezone string e.g. "America/New_York"
  availability: Availability;
  services: Service[];
};

export type TimeSlot = {
  start: Date;
  end: Date;
  isAvailable: boolean;
};
