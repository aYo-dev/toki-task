import { useMemo, useState } from "react";
import { DataCategories } from "../enums";
import {
  isPricesCategory,
  pricesRequstValidator,
  usageRequstValidator,
} from "../utils";

/**
 * useDataCategory is hook responsible for representative logic 
 * of different data types which we handle 
 * @param defaultCategory 
 * @returns 
 */
 
export const useDataCategory = (defaultCategory: DataCategories) => {
  const [category, setCategory] = useState(defaultCategory);

  // with this method we handle the differences which each category has
  // 1. diffrent category expect date format to be different
  // 2. we need a different key to calculate total amount of data category item per day
  // 3. each category data required different validation
  const {
    categoryDayFormat,
    categoryAmountKey,
    validate,
  } = useMemo(() => {
    if(isPricesCategory(category)) {
      return {
        categoryDayFormat: 'DD',
        categoryAmountKey: 'price',
        validate: pricesRequstValidator,
      }
    }

    return {
      categoryDayFormat: 'D',
      categoryAmountKey: 'kwh',
      validate: usageRequstValidator,
    }
  }, [category]);

  return { 
    category,
    setCategory,
    categoryDayFormat,
    categoryAmountKey,
    validate,
  };
};
