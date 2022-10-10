import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TokiIcon from '@mui/icons-material/OfflineBolt';
import { Stack } from '@mui/system';
import SelectButton from './SelectButton';

interface ControllersBoxProps {
  options: string[];
  handleSelectChange: (v: string) => void;
}

export default function ControllersBox({options, handleSelectChange}: ControllersBoxProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack>
        <SelectButton options={options} onChange={handleSelectChange}/>
      </Stack>
    </Box>
  );
}