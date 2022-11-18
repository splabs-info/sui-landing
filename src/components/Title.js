import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';

export default function Title({ label }) {
  return (
    <Stack alignItems="center">
      <Typography variant="h3" fontFamily="SVN-Gilroy-heavy" color="#565b61" textTransform="uppercase">
        {label}
      </Typography>
      <Divider width="100px" sx={{ borderWidth: '2px', borderColor: '#fa8962' }} />
    </Stack>
  );
}
