import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';

interface ControllersBoxProps {
  children: JSX.Element[];
}

export default function ControllersBox(props: ControllersBoxProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={2}>
        {props.children}
      </Stack>
    </Box>
  );
}