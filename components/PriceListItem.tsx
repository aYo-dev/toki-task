import {
  ListItem,
  Divider,
} from '@mui/material';
import moment from 'moment';
import { dateFormat } from '../constants';

interface SelectProps {
  priceData: {
    timestamp: number,
    price: number,
    currency: string,
  },
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
        <p>{priceData.price}{priceData.currency}</p>
      </ListItem>
    </>
  );
}