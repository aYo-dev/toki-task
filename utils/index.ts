import { equals, pathOr } from 'ramda';
import { DataCategories } from '../enums';
import { RequestData } from '../interfaces';

export const isPricesCategory = equals(DataCategories.prices);
export const isUsageCategory = equals(DataCategories.usage);

// We use this function on client and on the API to validate request data
export const pricesRequstValidator = (body: RequestData) => {
  return pathOr(false, ['date'], body)
    && pathOr(false, ['date', 'year'], body)
    && pathOr(false, ['date', 'month'], body)
    && pathOr(false, ['date', 'day'], body);
}

// We use this function on client and on the API to validate request data
export const usageRequstValidator = (body: RequestData) => {
  return pathOr(false, ['meteringPoinId'], body)
    && pathOr(false, ['date'], body)
    && pathOr(false, ['date', 'year'], body)
    && pathOr(false, ['date', 'month'], body)
    && pathOr(false, ['date', 'day'], body);
}