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
export const getUsagePerDay = async (metricPointId: UsageMetricPoints, date: Date): Promise<UsageResponse[]> => {
  try {
    // first we download the file
    const file = await db.file(`usage/${date.year}/${date.month}/${date.day}/${metricPointId}.jsonl`)
      .download();
    // then we convert it in buffer string
    const bufferString = file[0].toString('utf8');
    // and then we can parse it as regular json Array
    const result = parseJSONL(bufferString) as UsageResponse[];
    return result;
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