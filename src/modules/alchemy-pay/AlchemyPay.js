import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { config } from './init';
import { BuyCryptoButton } from 'components/common/CustomButton';
import { IconShoppingCart } from '@tabler/icons';

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
    // <Box mt={10}>
    //   <Button onClick={handleOpen}>Payment</Button>
    // </Box>
    <BuyCryptoButton onClick={handleOpen}>
      <IconShoppingCart size={'18px'} />
      <Typography variant="caption" fontWeight={600} sx={{ textDecoration: 'underline' }}>
        Buy Crypto with Fiat
      </Typography>
    </BuyCryptoButton>
  );
}
