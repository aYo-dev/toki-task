import * as React from 'react';
import Box from '@mui/material/Box';
import ControllersBox from './ControllersBox';
import { DataCategories } from '../enums';
import SelectButton from './SelectButton';

export default function DashboardForm() {
  const [metric, setMetric] = React.useState('Usage');
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ControllersBox>
        <SelectButton options={[DataCategories.usage, DataCategories.prices]} onChange={setMetric} />
      </ControllersBox>
    </Box>
  );
}