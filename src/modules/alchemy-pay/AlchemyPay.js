import { Box, Button, Typography } from '@mui/material';
import { IconCreditCard } from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import { config } from './init';

export default function AlchemyPay() {
  const handleOpenBuy = () => {
    window.open(`${config.link}?appId=${config.appId}`, '', 'width=500,height=700');
  };

  const handleOpenSell = () => {
    window.open(`${config.link}?appId=${config.appId}&type=sell`, '', 'width=500,height=700');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignSelf: 'stretch',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontSize: '13px',
        position: 'relative',
        '& .dropDown': {
          display: 'none',
        },
        '&:hover .dropDown': {
          display: 'block',
        },
      }}
    >
      <NavLink className={'animatedText'}>Buy Crypto</NavLink>
      <Box
        className={'dropDown'}
        sx={{
          position: 'absolute',
          left: '0',
          top: '16px',
          paddingTop: '16px',
          zIndex: 50,
          '&:before': {
            content: '"☗"',
            position: 'absolute',
            top: '2px',
            zIndex: 1,
            color: '#42EECF',
            left: '16px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) -16%, rgba(0, 67, 71,1) 95%)',
            boxShadow: 'inset 0px 0px 15px rgba(255, 255, 255, 0.3), inset 0px 0px 20.203px rgba(185, 247, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            width: '320px',
            borderRadius: '15px',
            padding: '16px',
            gap: '8px',
            '&:before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              background: 'linear-gradient(0deg, #00C5D3 0%, #42EECF 94.62%)',
              borderRadius: '15px',
              inset: '0px',
              padding: '1px',
              WebkitMask:
                'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
              WebkitMaskComposite: 'xor',
              zIndex: 0,
            },
            '& div, span, button': {
              zIndex: 1,
            },
          }}
        >
          <Button
            onClick={handleOpenBuy}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: '8px',
              color: 'white',
            }}
          >
            <IconCreditCard size={'28px'} />
            <Box textAlign={'left'}>
              <Typography typography={'body2'} fontWeight={600}>
                Credit/Debit card
              </Typography>
              <Typography typography={'caption'}>Buy crypto via VISA or Mastercard </Typography>
            </Box>
          </Button>
          <Button
            onClick={handleOpenSell}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: '8px',
              color: 'white',
            }}
          >
            <IconCreditCard size={'28px'} />
            <Box textAlign={'left'}>
              <Typography typography={'body2'} fontWeight={600}>
                Credit/Debit card
              </Typography>
              <Typography typography={'caption'}>Sell crypto via VISA or Mastercard </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
