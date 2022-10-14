import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ControllersBox from './ControllersBox';
import { DataCategories, UsageMeteringPoints } from '../enums';
import SelectButton from './SelectButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment, { Moment } from 'moment';
import TextField from '@mui/material/TextField';
import { dateFormat } from '../constants';
import { DataList } from './DataList';
import { isUsageCategory } from '../utils';
import { useApi } from '../hooks/useApi';
import {toLower} from 'ramda';
import { DataCategory, RequestData } from '../interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import { useDataCategory } from '../hooks/useDataCategory';

export default function DashboardForm() {
  const [meteringPoint, setMeteringPoint] = useState(UsageMeteringPoints.first);
  const [date, setDate] = useState<Moment | null>(null);
  const [dataItems, setDataItems] = useState([] as DataCategory);
  const [isFormValid, setFormValid] = useState(false);

  const {
    category,
    setCategory,
    categoryDayFormat,
    categoryAmountKey,
    validate,
  } = useDataCategory(DataCategories.usage);

  const {
    isLoading,
    isError, // show message on error
    request,
  } = useApi((v) => setDataItems(v as DataCategory));

  const showMetringPointSelect = useMemo(() => isUsageCategory(category), [category])

  const getCategoryRequestData = (meteringPoinId: UsageMeteringPoints, date: Moment): RequestData => {
    return {
      meteringPoinId,
      date: {
        year: date?.format('Y') as string,
        month: date?.format('MM') as string,
        day: date?.format(categoryDayFormat) as string,
      }
    }
  }

  const getData = () => {
    const requestData = getCategoryRequestData(meteringPoint, date as Moment);

    if(!validate(requestData)) {
      return setFormValid(true);
    }

    request({
      url: `/api/${toLower(category)}`,
      method: 'post',
      data: requestData,
    });
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 850}} padding={2}>
      <ControllersBox isInvalid={isFormValid}>
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
        { showMetringPointSelect && 
          <Box flexGrow={1}>
            <SelectButton
              options={[UsageMeteringPoints.first, UsageMeteringPoints.second]}
              onChange={(v) => setMeteringPoint(v as UsageMeteringPoints)}
              label="Metering point"
              defaultValue={meteringPoint}
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
      {isLoading && <Fade in={isLoading}>
        <Box textAlign="center" marginTop={2}>
          <CircularProgress />
        </Box>
      </Fade>}
      <Fade in={!isLoading}>
        <Box>
          <DataList categoryAmountKey={categoryAmountKey} category={category} items={dataItems} />
        </Box>
      </Fade>
    </Box>
  );
}