import * as React from 'react';
import Box from '@mui/material/Box';
import ControllersBox from './ControllersBox';

interface ControllersBoxProps {
  options: string[];
  handleSelectChange: (v: string) => void;
}

export default function DashboardForm({options, handleSelectChange}: ControllersBoxProps) {
  const [metric, setMetric] = React.useState('Usage');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ControllersBox options={options} handleSelectChange={setMetric} />
    </Box>
  );
}