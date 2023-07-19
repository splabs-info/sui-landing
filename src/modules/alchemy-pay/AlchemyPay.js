import { Box, Button } from '@mui/material';
import React from 'react';
import { config } from './init';

export default function AlchemyPay() {
  console.log(`${config.link}?crypto=${`USDT`}&network=${config.network}&appId=${config.appId}`);

  const handleOpen = () => {
    window.open(
      `${config.link}?crypto=${`USDT`}&network=${config.network}&appId=${config.appId}`,
      '',
      'width=500,height=700'
    );
  };

  return (
    <Box mt={10}>
      <Button onClick={handleOpen}>Payment</Button>
    </Box>
  );
}
