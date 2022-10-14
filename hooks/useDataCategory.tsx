import { useMemo, useState } from "react";
import { pricesStartingDate, usageStartingDate } from "../constants";
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
  // 1. categoryDayFormat - diffrent category expect date format to be different
  // 2. categoryAmountKey - we need a different key to calculate total amount of data category item per day
  // 3. categoryStartingDate - the category data provided for the task is in different time range so we need to handle this too
  // 4. validate - each category data required different validation
  const {
    categoryDayFormat,
    categoryAmountKey,
    categoryStartingDate,
    validate,
  } = useMemo(() => {
    if(isPricesCategory(category)) {
      return {
        categoryDayFormat: 'DD',
        categoryAmountKey: 'price',
        categoryStartingDate: pricesStartingDate,
        validate: pricesRequstValidator,
      }
    }

    return {
      categoryDayFormat: 'D',
      categoryAmountKey: 'kwh',
      categoryStartingDate: usageStartingDate,
      validate: usageRequstValidator,
    }
  }, [category]);

  return { 
    category,
    validate,
    setCategory,
    categoryDayFormat,
    categoryAmountKey,
    categoryStartingDate,
  };
};
