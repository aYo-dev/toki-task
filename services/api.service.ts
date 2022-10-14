import {Storage} from '@google-cloud/storage';
import { UsageMeteringPoints } from '../enums';
import { Date, UsageResponse } from '../interfaces';

const bucketName = 'toki-take-home.appspot.com';
const storage = new Storage({keyFilename: 'key.json'});
const db = storage.bucket(bucketName);

/**
 * convert buffer to json array
 * @param buffer - jsonl file in string format
 * @returns json array
 */
export const convertToJSON = (buffer: Buffer): Record<string, any>[] => {
  const bufferString = buffer.toString('utf8');  
  
  return bufferString.split(/\n/)
    .map(line => JSON.parse(line)) as UsageResponse[];
}

// dev purposes
const getFilesSelfLink = (files: any[]) =>
  files.map(el => el.metadata.selfLink);

/**
 * return used electricity for a day in format related to meteringPoinId
 */
export const getUsagePerDay = async (meteringPointId: UsageMeteringPoints, date: Date): Promise<UsageResponse[]> => {
  try {
    // first we download the file
    const file = await db.file(`usage/${date.year}/${date.month}/${date.day}/${meteringPointId}.jsonl`)
      .download();

    // when file is converted to JSON array we can return it
    return convertToJSON(file[0]) as UsageResponse[];
  } catch(e: any) {
    // if file doesn't exist in the clould storage then we have to return empty array
    if (e?.code === 404) return [];

    throw e;
  }
};

export const getPricesPerDay = async (meteringPointId: UsageMeteringPoints, date: Date): Promise<UsageResponse[]> => {
  try {
    // first we download the file
    const file = await db.file(`prices/${date.year}/${date.month}/${date.day}.jsonl`)
      .download();
    
    // when file is converted to JSON array we can return it
    return convertToJSON(file[0]) as UsageResponse[];
  } catch(e: any) {
    // if file doesn't exist in the clould storage then we have to return empty array
    if (e?.code === 404) return [];

    throw e;
  }
};

export const getAllFiles = async () => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    const filesSelfLinks= getFilesSelfLink(files);
    console.log('file is --->>>', filesSelfLinks);
  } catch(e: any) {
    // if file doesn't exist in the clould storage then we have to return empty array
    if (e?.code === 404) return [];

    throw e;
  }
} 