import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ControllersBox from './ControllersBox';
import { DataCategories } from '../enums';
import SelectButton from './SelectButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment, { Moment } from 'moment';
import TextField from '@mui/material/TextField';
import { dateFormat } from '../constants';
import DataList from './DataList';

const dummyPriceList = [
  { "timestamp": 1649732400, "price": 0.12, "currency": "BGN"},
  { "timestamp": 1649736000, "price": 0.13, "currency": "BGN"}
];

const dummyUsageList = [
  { "timestamp": 1649732400, "kwh": 0.5},
  { "timestamp": 1649736000, "kwh": 0.6}
];

export default function DashboardForm() {
  const [metric, setMetric] = useState(DataCategories.usage);
  const [date, setDate] = useState<Moment | null>(moment);

  const listItems = useMemo(() => {
    if(metric === DataCategories.prices) {
      return dummyPriceList;
    }

    return dummyUsageList;
  }, [metric])

  useEffect(() => console.log(date?.format(dateFormat)), [date]);

  // when we don't have data for this date it should be disabled
  const outOfrange = (date: Moment) => {
    const day = date.day();
  
    return day === 0 || day === 6;
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 850}} padding={2}>
      <ControllersBox>
        <Box flexGrow={1}>
          <SelectButton
            options={[DataCategories.usage, DataCategories.prices]}
            onChange={setMetric} />
        </Box>
        <Box flexGrow={2}>
          <DatePicker
            disableFuture
            value={date}
            shouldDisableDate={outOfrange}
            openTo="year"
            minDate={moment('20210401')}
            maxDate={moment('20220401')}
            onChange={setDate}
            renderInput={(params) => <TextField {...params} sx={{width: '100%', minWidth: '190px'}} />}
            views={['year', 'month', 'day']}
            componentsProps={{
              actionBar: {
                actions: [],
              },
            }}
          />
        </Box>
        <Button sx={{flexGrow: 1}} variant="contained" size="small">Show</Button>
      </ControllersBox>
      <DataList category={metric} items={listItems}/>
    </Box>
  );
}