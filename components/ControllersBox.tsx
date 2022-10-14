import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { Alert, Typography } from '@mui/material';

interface ControllersBoxProps {
  children: JSX.Element[];
  isInvalid: boolean;
}

export default function ControllersBox(props: ControllersBoxProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={2}>
        {props.children}
      </Stack>
      <Box marginTop={2}>
        {props.isInvalid && <Alert color='error'>All fields are required, please fill them and try again</Alert>}
      </Box>
    </Box>
  );
}