import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TokiIcon from '@mui/icons-material/OfflineBolt';
import { Stack } from '@mui/system';

interface HeaderProps {
  brand: string;
}

export default function Header({brand}: HeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignContent="center">
            <TokiIcon sx={{ display: 'flex', mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                lineHeight: 'inherit',
              }}
            >
              Toki
            </Typography>
          </Stack>
          <Typography variant="h6" component="div">
            {brand}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}