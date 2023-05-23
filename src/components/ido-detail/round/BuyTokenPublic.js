import { styled } from '@mui/material/styles';
import { Box, Typography, Stack, Button } from '@mui/material';
import { InputField } from 'components/base/InputFieldV2';
import { CheckboxFiled } from 'components/base/CheckField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IdoSchema } from '../validations';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import useResponsive from 'hooks/useResponsive';

const StyledBuyTokenBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
  padding: '32px 40px',
  color: 'white',
  borderRadius: 10,
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
  position: 'relative',
  marginTop: '2rem',
  [theme.breakpoints.down('sm')]: {
    padding: '32px 24px',
  }
}));

const BuyTokenButton = styled(Button)(({ them }) => ({
  background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
  color: 'white',
  height: 48,
  width: 156,
  fontSize: 18,
  borderRadius: 48,
  alignItems: 'center',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
}));
const TokenButton = styled(Button)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '0.75rem 1rem',
  fontSize: 18,
  borderRadius: 10,
  marginRight: 16,
  '&.active': {
    background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: 8,
  }
}));

const ExchangeRateBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background:
    'linear-gradient(178.73deg, rgba(32, 123, 191, 1) 2.08%, rgba(74, 148, 203, 1)  32.81%, rgba(92, 186, 242, 1) 100%)',
  color: 'white',
  fontSize: 18,
  borderRadius: 10,
  padding: '7px 18px',
  fontWeight: 'bold',
  top: -20,
  left: 16,
}));
const CheckBoxLabel = () => {
  return (
    <Typography
      sx={{
        color: 'white',
        '& a': { textDecorationColor: '#28A3AB', color: 'white', fontWeight: 700 },
      }}
      variant="body2"
    >
      I have read and agree to the
      <a
        href="https://docs.google.com/document/d/13uPJUMYXx62N9_UidmWwe2mL8MmFOrwVsvqx7byvPdk/edit"
        target="_blank"
        rel="noreferrer"
      >
        {' '}
        YouSUI Staking Service Agreement.
      </a>
    </Typography>
  );
};
export const BuyTokenPublic = () => {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: '',
    resolver: yupResolver(IdoSchema),
  });

  const [chosenToken, setChosenToken] = React.useState('');
  const isMobile = useResponsive('down', 'sm');

  return (
    <StyledBuyTokenBox>
      <ExchangeRateBox>
        4 XUI = 1 USD
      </ExchangeRateBox>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '100%' : '65% 35%',
        gridTemplateRows: isMobile ? '65px 65px 65px 65px' : '70px 70px',
        gridAutoFlow: 'column',
        gap: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ marginRight: 2 }}>Buy width:</Typography>
          <TokenButton className={chosenToken === 'USDT' ? "active" : ""} onClick={() => setChosenToken('USDT')}>
            USDT
          </TokenButton>
          <TokenButton className={chosenToken === 'USDC' ? "active" : ""} onClick={() => setChosenToken('USDC')}>
            USDC
          </TokenButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ marginRight: 2 }}>Amount:</Typography>
          <InputField
            id="amount"
            name="amount"
            control={control}
            sx={{
              fontWeight: 'bold',
              color: 'white',
              [theme.breakpoints.down('sm')]: {
                // width: 320,
              },
              [theme.breakpoints.down(480)]: {
                // width: 280,
              },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CheckboxFiled />
          <Typography>
            I’ve read and accepted all the{' '}
            <a
              href="https://docs.google.com/document/d/13uPJUMYXx62N9_UidmWwe2mL8MmFOrwVsvqx7byvPdk/edit"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'rgba(91, 184, 240, 1)',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              YouSUI's Agreement
            </a>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BuyTokenButton>Buy Now</BuyTokenButton>
        </Box>
      </Box>
    </StyledBuyTokenBox>
  );
};
