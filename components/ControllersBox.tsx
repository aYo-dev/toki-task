import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TokiIcon from '@mui/icons-material/OfflineBolt';
import { Stack } from '@mui/system';
import SelectButton from './SelectButton';

interface ControllersBoxProps {
  children: JSX.Element;
}

export default function ControllersBox(props: ControllersBoxProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row">
        {props.children}
      </Stack>
    </Box>
  );
}