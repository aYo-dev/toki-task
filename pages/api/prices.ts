import type { NextApiRequest, NextApiResponse } from 'next';
import { getPricesPerDay } from '../../services/api.service';
import { isEmpty } from 'ramda';
import { UsageResponse } from '../../interfaces';
import { pricesRequstValidator } from '../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse< UsageResponse[]>
) {
  const { method } = req;
  const { body } = req;

  if (method !== "POST" || isEmpty(body) || !pricesRequstValidator(body)) {
    return res.status(400).json([]);
  };
  
  try {
    const prices = await getPricesPerDay(body.meteringPoinId, body.date);

    res.status(200).json(prices);
  } catch(e) {
    res.status(500).json([]);
    throw e;
  }
}