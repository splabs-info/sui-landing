import { styled } from '@mui/material/styles';
import { Box, Typography, Stack, Button } from '@mui/material';
import { InputField } from 'components/base/InputFieldV2';
import { CheckboxFiled } from 'components/base/CheckField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import useResponsive from 'hooks/useResponsive';
import { IdoSchema } from 'components/ido-detail/validations';

const StyledBuyTokenBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
  padding: '32px 32px',
  color: 'white',
  borderRadius: 10,
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
  position: 'relative',
  height: '100%',
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
  padding: '0.25rem 0.75rem',
  fontSize: 12,
  borderRadius: 10,
  '&.active': {
    background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
  },
  [theme.breakpoints.down('sm')]: {
  }
}));
export const BuyTokenForm = () => {
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ marginRight: 2, minWidth: 64 }}>Pricing:</Typography>
        <Typography fontWeight={'bold'}>0.125 SUI</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: isMobile ? 2 : 1 }}>
        <Typography >Available amount:  20,000 SUI</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ marginRight: 2, minWidth: 64 }}>Amount:</Typography>
        <InputField
          id="amount"
          name="amount"
          control={control}
          sx={{
            fontWeight: 'bold',
            color: 'white',
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '80px', mt: 1, gap: 1, flexWrap: 'wrap' }}>
        {['25', '50', '75', '100'].map((token) => (
          <TokenButton key={token} className={chosenToken === token ? "active" : ""}
            onClick={() => setChosenToken(token)}>{token}%</TokenButton>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 3 }}>
        <Typography sx={{ marginRight: 2, minWidth: 64 }}>NOTICE:</Typography>
        <Box>
          <Typography variant='body2'>
            Token Distribution Logic : FCFS
            <br />TGE Claim time :
            <br /> Time to swap BXUI to XUI:
            <br />Multiple purchases per wallet</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, }}>
        <CheckboxFiled />
        <Typography variant='body2'>
          I’ve read and accepted all the{' '}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'rgba(91, 184, 240, 1)',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            YouSUI Launchpad Privacy Policy, Terms of Service & Disclaimer
          </a>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, }}>
        <BuyTokenButton>Buy Now</BuyTokenButton>
      </Box>
    </StyledBuyTokenBox>
  );
};
