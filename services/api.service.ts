import {Storage} from '@google-cloud/storage';
import { UsageMetricPoints } from '../enums';
import { Date, UsageResponse } from '../interfaces';

const bucketName = 'toki-take-home.appspot.com';
const storage = new Storage({keyFilename: 'key.json'});
const db = storage.bucket(bucketName);

/**
 * convert jsonl string to json array
 * @param jsonlString - jsonl file in string format
 * @returns json array
 */
export const parseJSONL = (jsonlString: string): Record<string, any>[] => 
  jsonlString.split(/\n/)
    .map(line => JSON.parse(line)) as UsageResponse[];

// dev purposes
const getFilesSelfLink = (files: any[]) =>
  files.map(el => el.metadata.selfLink);

/**
 * return used electricity for a day in format related to meteringPoinId
 */
export const getUsagePerDay = async (meteringPoinId: UsageMetricPoints, date: Date): Promise<UsageResponse[]> => {
  const file = await db.file(`usage/${date.year}/${date.month}/${date.day}/${meteringPoinId}.jsonl`)
    .download();
  const bufferString = file[0].toString('utf8');
  return parseJSONL(bufferString) as UsageResponse[];
};