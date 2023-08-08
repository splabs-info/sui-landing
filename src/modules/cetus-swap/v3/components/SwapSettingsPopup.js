import { Box, Divider, InputAdornment, InputBase, Stack, Typography } from '@mui/material';
import CustomModal from 'components/common/CustomModal';
import { TypographyGradient } from 'components/home/HomeStyles';
import React, { useEffect } from 'react';
import { SettingBox, SlippageBox, SlippageSwitch } from './SwapStyles';
const slippageList = [
  { label: '0.1%', value: 0.1 },
  { label: '0.5%', value: 0.5 },
  { label: '1.0%', value: 1 },
];
export function SwapSettings({ open, handleSelect, handleClose, handleChangeSlippage, ...props }) {
  const [slippageValue, setSlippageValue] = React.useState(0.5);
  const [slippageAuto, setSlippageAuto] = React.useState(false);
  useEffect(() => {
    if (slippageAuto) {
      handleChangeSlippage(0.5);
      setSlippageValue(0.5);
    } else handleChangeSlippage(slippageValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slippageValue, slippageAuto]);
  useEffect(() => {
    setSlippageAuto(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomModal open={open} _close={handleClose} isShowCloseButton={true}>
      <Box textAlign={'left'} mb={2}>
        <TypographyGradient variant="h3">Setting</TypographyGradient>
      </Box>
      <SettingBox>
        <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
          <Box textAlign={'left'}>
            <Typography color={'white'} variant="h6">
              Automatic Slippage Tolerance
            </Typography>
            <Typography color={'white'} variant="body2">
              Turn off automatic slippage tolerance to adjust the value
            </Typography>
          </Box>
          <SlippageSwitch onChange={(e) => setSlippageAuto(e.target.checked)} />
        </Stack>
        <Divider style={{ marginTop: 32 }} />
        <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={4}>
          <Typography color={'white'} variant="h6">
            Slippage
          </Typography>
          {/* <Typography color={'white'} variant="h6">
                {slippageValue === 'custom' ? '--' : slippageValue} %
              </Typography> */}
          <InputBase
            sx={{
              color: 'white',
              fontWeight: 'bold',
              '& input': {
                textAlign: 'right',
              },
            }}
            value={slippageValue}
            placeholder={slippageValue === 'custom' ? 'Enter slippage' : slippageValue}
            disabled={slippageAuto}
            endAdornment={
              <InputAdornment position="end">
                <Typography color={'white'} variant="h6">
                  %
                </Typography>
              </InputAdornment>
            }
            onChange={(e) => setSlippageValue(e.target.value)}
          />
        </Stack>
        <SlippageBox>
          {slippageList.map((slippage) => (
            <Stack
              width={'33%'}
              minWidth={'max-content'}
              key={slippage.value}
              className={slippageValue === slippage.value ? 'active' : ''}
              onClick={() => {
                if (!slippageAuto) setSlippageValue(slippage.value);
              }}
              sx={{ cursor: slippageAuto ? 'unset' : 'pointer' }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#9997',
                }}
              >
                {slippage.label}
              </Typography>
            </Stack>
          ))}
        </SlippageBox>
      </SettingBox>
    </CustomModal>
  );
}
