export interface RecyclingPoint {
  id: string;
  name: string;
  district: 'NT' | 'Kowloon' | 'HK Island';
  address: string;
  certified: boolean;
}

export interface HealthDataPoint {
  month: string;
  soh: number; // State of Health %
}

export interface CarbonDataPoint {
  category: string;
  saved: number; // kg CO2
}