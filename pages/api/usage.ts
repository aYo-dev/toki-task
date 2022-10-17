import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsagePerDay } from '../../services/api.service';
import { isEmpty } from 'ramda';
import { UsageResponse } from '../../interfaces';
import { usageRequstValidator } from '../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse< UsageResponse[]>
) {
  const { method } = req;
  const { body } = req;

  if (method !== "POST" || isEmpty(body) || !usageRequstValidator(body)) {
    return res.status(400).json([]);
  };
  
  try {
    const usage = await getUsagePerDay(body.meteringPoinId, body.date);

    res.status(200).json(usage);
  } catch(e) {

    res.status(500).json([]);
    throw e;
  }
}