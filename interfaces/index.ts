export interface AccountInfo {
  name: string,
  owner: string,
  meteringPoints: string[]
}

export interface UsageResponse {
  timestamp: number;
  kwh: number;
}

export type MeteringPoints = '1234' | '5678';

export interface Date {
  year: number;
  month: number;
  day: number;
} 