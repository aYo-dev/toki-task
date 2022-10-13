import {
  ListItem,
  Divider,
} from '@mui/material';
import moment from 'moment';
import { dateFormatFull } from '../constants';
import { PriceData } from '../interfaces';

interface SelectProps {
  priceData: PriceData,
  hasDivider: boolean,
}

export default function PriceListItem({priceData, hasDivider}: SelectProps) {
  return (
    <>
      {hasDivider && <Divider />}
      <ListItem sx={{justifyContent: 'space-between'}}>
        <p>
          {moment.unix(priceData.timestamp).format(dateFormatFull)}
        </p>
        <p>{priceData.price}{priceData.currency}</p>
      </ListItem>
    </>
  );
}