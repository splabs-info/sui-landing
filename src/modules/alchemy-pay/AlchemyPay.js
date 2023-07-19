import { Box, Button } from '@mui/material';
import React from 'react';
import { config } from './init';

export default function AlchemyPay() {
  const handleOpen = () => {
    var myWindow = window.open(
      `${config.link}?crypto=USDT&network=${config.network}&appId=${config.appId}&callbackUrl=http://localhost:3002/`,
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
