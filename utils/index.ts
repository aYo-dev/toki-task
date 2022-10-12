import { equals } from 'ramda';
import { DataCategories } from '../enums';

export const isPricesCategory = equals(DataCategories.prices);
export const isUsageCategory = equals(DataCategories.usage);
