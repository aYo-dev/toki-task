import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsagePerDay } from '../../services/api.service';
import { isEmpty, pathOr } from 'ramda';
import { RequestData, UsageResponse } from '../../interfaces';

const validate = (body: RequestData) => {
  return pathOr(false, ['meteringPoinId'], body)
    && pathOr(false, ['date'], body)
    && pathOr(false, ['data', 'year'], body)
    && pathOr(false, ['data', 'month'], body)
    && pathOr(false, ['data', 'day'], body);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse< UsageResponse[]>
) {
  const { method } = req;
  const { body } = req;

  if (method !== "POST" || isEmpty(body) || !validate(body)) {
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