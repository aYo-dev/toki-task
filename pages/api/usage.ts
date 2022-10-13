import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllFiles, getUsagePerDay } from '../../services/api.service';
import { isEmpty, pathOr } from 'ramda';
import { Date, UsageResponse } from '../../interfaces';
import { UsageMetricPoints } from '../../enums';

type RequestData = {
  meteringPoinId: UsageMetricPoints,
  date: Date
}

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

  if (method !== "POST" || isEmpty(body) || validate(body)) {
    return res.status(400);
  };

  try {
    const usage = await getUsagePerDay(body.metricPointId, body.date);
    res.status(200).json(usage);
  } catch(e) {
  console.log('result3');

    res.status(500);
    throw e;
  }
}