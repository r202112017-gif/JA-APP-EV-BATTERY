import { RecyclingPoint, HealthDataPoint, CarbonDataPoint } from './types';

export const RECYCLING_POINTS: RecyclingPoint[] = [
  {
    id: '1',
    name: 'EcoPark Battery Processing Center',
    district: 'NT',
    address: '133 Lung Mun Road, Tuen Mun, N.T.',
    certified: true,
  },
  {
    id: '2',
    name: 'Kowloon Bay Green Hub',
    district: 'Kowloon',
    address: '11 Lam Chak Street, Kowloon Bay',
    certified: true,
  },
  {
    id: '3',
    name: 'HK Island Tech Recycle',
    district: 'HK Island',
    address: 'Cyberport Road, Telegraph Bay',
    certified: false,
  },
  {
    id: '4',
    name: 'Yuen Long EV Depot',
    district: 'NT',
    address: 'Wang Chau Road, Yuen Long',
    certified: true,
  }
];

export const BATTERY_HEALTH_HISTORY: HealthDataPoint[] = [
  { month: 'Jan', soh: 98 },
  { month: 'Feb', soh: 97.5 },
  { month: 'Mar', soh: 96 },
  { month: 'Apr', soh: 95.2 },
  { month: 'May', soh: 94 },
  { month: 'Jun', soh: 92.5 },
  { month: 'Jul', soh: 91 },
  { month: 'Aug', soh: 89.5 },
  { month: 'Sep', soh: 88 },
  { month: 'Oct', soh: 86.5 },
  { month: 'Nov', soh: 85 },
  { month: 'Dec', soh: 82 },
];

export const CARBON_STATS: CarbonDataPoint[] = [
  { category: 'Manufacturing', saved: 1250 },
  { category: 'Transport', saved: 450 },
  { category: 'Material Recovery', saved: 890 },
];