// src/types.ts
export type Temperature = 'warm' | 'cold';
export type TripType = 'backpack' | 'bikepack' | 'sport' | 'beach' | 'city' | 'roadtrip' | 'winter' | 'hike' | 'party'| 'resort'| 'cruise' | 'chill' | 'camping' | 'culture' | 'other';

export interface Item {
  id: string;
  name: string;
  done: boolean;
  category?: string;
}

export interface PackList {
  id: string;
  name: string;
  tripType: TripType;
  temperature: Temperature;
  durationDays: number;
  startDate: string; // ISO date string
  items: Item[];
  createdAt: string;
}
