import * as React from 'react';
import Paper from '@mui/material/Paper';
import { List, Typography } from '@mui/material';
import { DataCategories } from '../enums';
import { PriceData, UsageData } from '../interfaces';
import PriceListItem from './PriceListItem';
import UsageListItem from './UsageListItem';
import {equals, isEmpty} from 'ramda';

interface ControllersBoxProps {
  items: PriceData[] | UsageData[];
  category: DataCategories;
}

const isPriceList = equals(DataCategories.prices);

export default function DataList({items, category}: ControllersBoxProps) {
  const noItems = isEmpty(items);
  const listItems = React.useMemo(() => {
    if(isPriceList(category)){
      return items.map((el, index) => 
        <PriceListItem priceData={el as PriceData} hasDivider={index !== 0}/>);
    }

    return items.map((el, index) => 
      <UsageListItem priceData={el as UsageData} hasDivider={index !== 0}/>);
  }, [category, items]);

  return (
    <Paper sx={{marginTop: 4}}>
      <Typography>{category} for the day</Typography>
      <List>
        {!noItems && listItems}
        {noItems && <p>Data is missing for this day</p>}
      </List>
    </Paper>
  );
}