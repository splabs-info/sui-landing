import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
const BoxGradientOpacityBorder = styled(Box)(({ theme }) => ({
  padding: '2rem',
  borderRadius: '1rem',
  textAlign: 'flex-start',
  borderTopWidth: '80%',
  background: 'linear-gradient(0deg, rgba(234, 204, 248, 0.15) 0%, rgba(150, 224, 218, 0.15) 100%)',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
  color: 'white',
}));

const fields = [
  { key: 'expectedAPY', label: 'Expected APY', format: (e) => `${e}%/daily` },
  {
    key: 'subscriptionDate',
    label: 'Subscript Date',
    format: (e) => e.format('YYYY-MM-DD'),
  },
  {
    key: 'firstRewardPayment',
    label: 'First Reward Payment',
    format: (e) => e.format('YYYY-MM-DD'),
  },
  {
    key: 'stakingExpirationDate',
    label: 'Staking Expiration Date',
    format: (e) => e.format('YYYY-MM-DD'),
  },
  {
    key: 'unstakeFee',
    label: 'Unstake fee',
    format: (e) => `${e}%`,
  },
];

export default function StakingForm({ verifyData, setVerifyData, packages }) {
  const [amount, setAmount] = React.useState(0);
  const [isAgree, setIsAgree] = React.useState(false);
  const theme = useTheme();

  return (
    <BoxGradientOpacityBorder>
      <Grid container justifyContent={'space-between'} spacing={5}>
        <Grid item md={5.5} xs={12}>
          <Stack direction={'column'} justifyContent="space-between" height={'100%'}>
            {fields.map((field, index) => (
              <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} key={index}>
                <Typography variant="h6">{field.label}</Typography>
                <Typography>{field.format ? field.format(verifyData[field.key]) : verifyData[field.key]}</Typography>
              </Stack>
            ))}
            <Box textAlign={'center'} mt={2}>
              <Typography textAlign={'center'} variant="caption">
                Staking Rewards are distributed every 24 hours.
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" flexItem sx={{ marginTop: '0 !important' }} />
        </Grid>
        <Grid item md={5.5} xs={12}>
          <Stack direction={'row'} justifyContent="space-between">
            <Typography>Amount</Typography>
            <Typography>0 XUI</Typography>
          </Stack>
          <CustomInput
            id="amount"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Stack direction={'row'} alignItems="center" mr={'-14px'}>
                  <Typography>XUI</Typography>
                  <Button variant="contained">ALL</Button>
                </Stack>
              ),
              onWheel: (e) => e.target.blur(),
            }}
            type="number"
            onKeyDown={(e) => {
              if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) {
                e.preventDefault();
              }
              if (e.target.value.length === 0 && e.key === '.') {
                e.preventDefault();
              }
            }}
            min={0}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            fullWidth
          />
          <Typography mt={1}>
            Minimum: <strong>3,000 XUI</strong>
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} mt={2}>
            {packages.map((p, index) => (
              <PackageButton
                className={p.time === verifyData.time ? 'active' : ''}
                onClick={() => setVerifyData(p)}
                key={index}
              >
                {p.time} days
              </PackageButton>
            ))}
          </Stack>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={isAgree} onChange={(e) => setIsAgree(e.target.checked)} />}
              label={<CheckBoxLabel />}
              sx={{
                margin: '1rem 0',
                '& svg': {
                  color: '#28A3AB',
                },
              }}
            />
          </FormGroup>
          <Box
            textAlign={'right'}
            sx={{
              [theme.breakpoints.down(900)]: {
                display: 'flex',
                justifyContent: 'center',
              },
            }}
          >
            <Button
              sx={{
                background:
                  'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
                borderRadius: 90,
                px: 5,
                py: 1,
                color: 'white',
              }}
              type="submit"
            >
              Staking now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </BoxGradientOpacityBorder>
  );
}

const PackageButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  color: 'white',
  width: '24%',
  background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
  border: '1px solid #00C5D3',
  '&.active': {
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
  },
}));
export const CustomInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  color: '#28A3AB',
  marginTop: '0.5rem',
  background: 'rgba(104, 229, 184, 0.1)',
  '& .MuiSelect-select': {
    display: 'inline-flex',
  },
  '& label.Mui-focused': {
    color: '#28A3AB',
  },
  '& .MuiOutlinedInput-input': {
    padding: '0px 14px',
  },
  '& .MuiOutlinedInput-root': {
    color: '#28A3AB',
    '& fieldset': {
      borderColor: '#28A3AB',
    },
    '&:hover fieldset': {
      borderColor: '#28A3AB',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#28A3AB',
    },
  },
  '& > label': {
    color: '28A3AB !important',
  },
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': {
      color: '28A3AB',
      boxShadow: '#28A3AB 0 0 10px',
    },
  },
  '& .MuiButtonBase-root': {
    padding: theme.spacing(1.5),
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    width: 80,
  },
  '& .MuiTypography-root': {
    whiteSpace: 'nowrap',
    marginRight: theme.spacing(2),
    color: 'white',
  },
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
        href="https://docs.google.com/document/d/1JzcDYZby0DkeSJFM2uyqRMlf6UMY2GKuO7wXaIH6NXQ/"
        target="_blank"
        rel="noreferrer"
      >
        {' '}
        YouSUI Staking Service Agreement.
      </a>
    </Typography>
  );
};
