import {
  ListItem,
  Divider,
} from '@mui/material';
import moment from 'moment';
import { dateFormat } from '../constants';
import { UsageData } from '../interfaces';

interface SelectProps {
  priceData: UsageData,
  hasDivider: boolean,
}

export default function PriceListItem({priceData, hasDivider}: SelectProps) {
  return (
    <>
      {hasDivider && <Divider />}
      <ListItem sx={{justifyContent: 'space-between'}}>
        <p>
          {moment.unix(priceData.timestamp).format(dateFormat)}
        </p>
        <p>{priceData.kwh}kwh</p>
      </ListItem>
    </>
  );
}