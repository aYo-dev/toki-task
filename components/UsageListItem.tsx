import {
  ListItem,
  Divider,
} from '@mui/material';
import moment from 'moment';
import { dateFormatFull } from '../constants';
import { UsageData } from '../interfaces';

interface SelectProps {
  priceData: UsageData,
  hasDivider: boolean,
}

export default function UsageListItem({priceData, hasDivider}: SelectProps) {
  return (
    <>
      {hasDivider && <Divider />}
      <ListItem sx={{justifyContent: 'space-between'}}>
        <p>
          {moment(priceData.timestamp).format(dateFormatFull)}
        </p>
        <p>{priceData.kwh.toFixed(3)} kwh</p>
      </ListItem>
    </>
  );
}