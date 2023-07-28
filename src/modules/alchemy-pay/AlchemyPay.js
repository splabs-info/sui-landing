import { Typography } from '@mui/material';
import { IconShoppingCart } from '@tabler/icons';
import { BuyCryptoButton } from 'components/common/CustomButton';
import { config } from './init';

export default function AlchemyPay() {
  const handleOpen = () => {
    window.open(
      `${config.link}?crypto=${config.crypto}&network=${config.network}&appId=${config.appId}`,
      '',
      'width=500,height=700'
    );
  };

  return (
    <BuyCryptoButton onClick={handleOpen}>
      <IconShoppingCart size={'18px'} />
      <Typography variant="caption" fontWeight={600} sx={{ textDecoration: 'underline' }}>
        Buy Crypto with Fiat
      </Typography>
    </BuyCryptoButton>
  );
}
