import { useMemo, useState } from "react";
import { DataCategories } from "../enums";
import { isPricesCategory } from "../utils";

/**
 * useDataCategory is hook responsible for representative logic 
 * of different data types which we handle 
 * @param setData 
 * @returns 
 */
 
export const useDataCategory = (defaultCategory: DataCategories) => {
  const [category, setCategory] = useState(defaultCategory);
  // this is necesseraly because format of the urls is different 
  // for the different data categories 
  const categoryDayFormat = useMemo(() => {
    if(isPricesCategory(category)) {
      return 'DD';
    }

    return 'D';
  }, [category]);


  return { category, setCategory, categoryDayFormat};
};
