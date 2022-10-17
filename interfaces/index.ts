import { UsageMeteringPoints } from "../enums";

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

export type DataCategory = PriceData | UsageData;

export type RequestData = {
  meteringPoinId?: UsageMeteringPoints,
  date: Date
}

export interface Date {
  year: string;
  month: string;
  day: string;
}

export interface PriceData {
  timestamp: number,
  price: number,
  currency: string,
}

export interface UsageData {
  timestamp: number,
  kwh: number,
}