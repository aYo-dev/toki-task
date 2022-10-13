import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ControllersBox from './ControllersBox';
import { DataCategories, UsageMetricPoints } from '../enums';
import SelectButton from './SelectButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment, { Moment } from 'moment';
import TextField from '@mui/material/TextField';
import { dateFormat } from '../constants';
import DataList from './DataList';
import { isUsageCategory } from '../utils';
import { useApi } from '../hooks/useApi';
import {toLower} from 'ramda';
import { DataCategory } from '../interfaces';

const dummyPriceList = [
  { "timestamp": 1649732400, "price": 0.12, "currency": "BGN"},
  { "timestamp": 1649736000, "price": 0.13, "currency": "BGN"}
];

const dummyUsageList = [
  { "timestamp": 1649732400, "kwh": 0.5},
  { "timestamp": 1649736000, "kwh": 0.6}
];

export default function DashboardForm() {
  const [category, setCategory] = useState(DataCategories.usage);
  const [metricPoint, setMetricPoint] = useState(UsageMetricPoints.first);
  const [date, setDate] = useState<Moment | null>(null);
  const [dataItems, setDataItems] = useState([] as DataCategory);
  const {
    isLoading,
    isError, // show message on error
    request,
  } = useApi((v) => setDataItems(v as DataCategory));

  useEffect(() => console.log('data is --->>>', dataItems), [dataItems]);
  useEffect(() => console.log(date), [date]);

  const showMetricsSelect = useMemo(() => isUsageCategory(category), [category])

  const getData = () => request({
    url: `/api/${toLower(category)}`,
    method: 'post',
    data: {
      metricPointId: metricPoint,
      date: {
        year: date?.format('Y'),
        month: date?.format('MM'),
        day: date?.format('D'),
      }
    }
  })

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 850}} padding={2}>
      <ControllersBox>
        <Box flexGrow={1}>
          <SelectButton
            options={[DataCategories.usage, DataCategories.prices]}
            onChange={(v) => setCategory(v as DataCategories)}
            label="Category"
            defaultValue={category}
          />
        </Box>
        <Box flexGrow={2}>
          <DatePicker
            disableFuture
            value={date}
            openTo="year"
            inputFormat={dateFormat}
            minDate={moment('20220401')}
            maxDate={moment('20220430')}
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
        {/* child element must be wrapped in fragment or any other element when is used in condition */}
        <>
        { showMetricsSelect && 
          <Box flexGrow={1}>
            <SelectButton
              options={[UsageMetricPoints.first, UsageMetricPoints.second]}
              onChange={(v) => setMetricPoint(v as UsageMetricPoints)}
              label="Metric point"
              defaultValue={metricPoint}
            />
          </Box>}
        </>
        <Button 
          sx={{flexGrow: 1}}
          variant="contained"
          size="small"
          disabled={isLoading}
          onClick={getData}>Show</Button>
      </ControllersBox>
      <DataList category={category} items={dataItems} />
    </Box>
  );
}