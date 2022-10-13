import { useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { Alert, List, Typography } from '@mui/material';
import { DataCategories } from '../enums';
import { DataCategory, PriceData, UsageData } from '../interfaces';
import PriceListItem from './PriceListItem';
import UsageListItem from './UsageListItem';
import { isEmpty } from 'ramda';
import { isPricesCategory } from '../utils';
import { nanoid } from 'nanoid';


interface ControllersBoxProps {
  items: DataCategory;
  category: DataCategories;
}

const NoData = () => (
  <Alert variant="outlined" severity="info">
    Data is missing for this day.
  </Alert>
);

// items should have strict type
const getDailyAmount = (items: any[], key: string): number =>
  items.reduce((acc, item) => acc + item[key], 0);  

export const DataList = ({items, category}: ControllersBoxProps) => {
  const noItems = isEmpty(items);
  const listItems = useMemo(() => {
    if(isPricesCategory(category)){
      return items.map((el, index) => 
        <PriceListItem key={nanoid()} priceData={el as PriceData} hasDivider={index !== 0}/>);
    }

    return items.map((el, index) => 
      <UsageListItem key={nanoid()} priceData={el as UsageData} hasDivider={index !== 0}/>);
  }, [category, items]);

  const dailyAmount = useMemo(() => {
    const result = getDailyAmount(items, 'kwh');
    // we don't want very long float number
    return result.toFixed(3);
  }, [items])

  return (
    <Paper sx={{marginTop: 4, padding: 2}}>
      <Typography 
        paddingRight={2}
        paddingTop={2}
        fontWeight='bold'
        textAlign='right'
        borderBottom="1px solid"
      >
          Total amount: {dailyAmount}
      </Typography>
      <List>
        {!noItems && listItems}
        {noItems && <NoData />}
      </List>
    </Paper>
  );
};