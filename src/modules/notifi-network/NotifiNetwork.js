import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { CheckboxFiled } from 'components';
import CustomModal from 'components/common/CustomModal';
import { ShadowTypography } from 'components/common/CustomTypography';
import { TypographyGradient } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { BlueLoadingButton, OptionBox, SubscribeSwitch, WalletAddressBox } from './NotifiStyled';
import { NotifiNetworkHelper } from './init';
import { IconBrandTelegram, IconMail } from '@tabler/icons';

export default function NotifiNetwork({ open, handleClose, data }) {
  const isMobile = useResponsive('down', 'sm');
  const wallet = useWallet();
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const notifiAction = NotifiNetworkHelper.useAction();
  const notifiState = NotifiNetworkHelper.useState();
  const { client, currentEmail, alerts, userState, notifications } = notifiState;
  const [userAlerts, setUserAlerts] = React.useState(null);

  // React.useEffect(() => {
  //   if (notifications) {
  //     console.log(notifications);
  //   }
  // }, [notifications]);

  // React.useEffect(() => {
  //   if (wallet.address) {
  //     (async () => {
  //       await notifiAction.init(wallet.address);
  //     })();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [wallet.address]);

  // React.useEffect(() => {
  //   if (userState?.status === 'authenticated') {
  //     (async () => {
  //       await notifiAction.syncData();
  //       await notifiAction.getNotifications();
  //     })();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userState]);

  React.useEffect(() => {
    if (alerts) {
      setUserAlerts(alerts);
    }
  }, [alerts]);

  const login = async (e) => {
    e.preventDefault();
    await notifiAction.login();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await notifiAction.updateAlerts(data?.email, userAlerts);
    setLoading(false);
    handleClose();
  };

  return (
    <CustomModal
      _close={handleClose}
      open={open}
      style={{ position: 'relative' }}
      className="container"
      isShowCloseButton={true}
    >
      <Box>
        <Stack
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent={'space-between'}
          mb={3}
          alignItems={isMobile ? 'flex-start' : 'flex-end'}
          gap={1}
        >
          <Box textAlign={'left'} display={'flex'} flexDirection={'column'}>
            <TypographyGradient variant={isMobile ? 'h3' : "h2"} >Get Notifications</TypographyGradient>
            <ShadowTypography variant={isMobile ? 'caption' : "body1"} fontWeight={isMobile ? 'normal' : 'bold'}>
              Get real-time alerts to the destination of your choise
            </ShadowTypography>
          </Box>
          <Box
            sx={{
              mb: 1,
              textAlign: isMobile ? 'left' : 'right',
              display: isMobile ? 'flex' : 'block',
              alignItems: 'flex-start',
            }}
          >
            <ShadowTypography variant={isMobile ? 'caption' : "body1"} fontWeight={isMobile ? 'normal' : 'bold'}>
              Ref by
            </ShadowTypography>
            <Box
              component={'img'}
              src={`./images/partners/notifi.svg`}
              alt={'notifi'}
              height={isMobile ? '16px' : '20px'}
              ml={1}
            />
          </Box>
        </Stack>
        {userState?.status === 'authenticated' ? (
          <Box component="form" onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': {
                margin: '8px 0'
              },
              '& .MuiInputAdornment-root': {
                marginRight: '16px',
                color: '#FFFFFF99',
              },
              '& .MuiInputBase-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF99',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.05)'
              },
            }}
          >

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="end"
                  >
                    <IconMail />
                  </InputAdornment>
                ),
              }}
              value={data?.email}
              size="medium"
              fullWidth
              placeholder='Email address'
            />
            {/* <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="end"
                  >
                    <IconBrandTelegram />
                  </InputAdornment>
                ),
              }}
              value={currentEmail}
              size="medium"
              fullWidth
              placeholder='Telegram ID'
            /> */}
            <OptionBox>
              {userAlerts &&
                userAlerts.map((a, index) => (
                  <Stack direction={'row'} justifyContent={'space-between'} key={index} className='option-detail'>
                    <Typography>{a.name}</Typography>
                    <SubscribeSwitch
                      defaultChecked={a.isOn}
                      onChange={(e) => {
                        const temp = [...alerts];
                        temp[index].isOn = e.target.checked;
                        setUserAlerts(temp);
                      }}
                    />
                  </Stack>
                ))}
            </OptionBox>
            <BlueLoadingButton
              variant="contained"
              type="submit"
              loading={loading}
            >
              Subscribe
            </BlueLoadingButton>
          </Box>
        ) : (
          <Box component="form" onSubmit={login}>
            <Typography variant="body1" textAlign={'left'}> Your wallet address: </Typography>
            <WalletAddressBox>
              <Typography sx={{ lineBreak: isMobile ? 'anywhere' : 'unset' }}>
                {wallet.address}
              </Typography>
            </WalletAddressBox>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                '& a': {
                  color: '#5CBAF2',
                  textDecoration: 'underline',
                  fontWeight: 700
                },
                '& a:hover': {
                  fontStyle: 'italic',
                  textDecoration: 'underline',
                }
              }}
            >
              <CheckboxFiled handleChecked={(event) => {
                setChecked(event.target.checked);
              }} />
              <Typography variant="body2" textAlign={'left'}>
                I've have read & accepted all the {' '}
                <a
                  href="https://docs.google.com/document/d/1guvKALX-dLP_wH7YErnrS00WWZZzhARdSyl_pK3Es3o/edit?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                >
                  YouSUI’s disclaimer
                </a>
              </Typography>
            </Box>
            <BlueLoadingButton
              disabled={!checked}
              variant="contained"
              type="submit"
              loading={loading}
            >
              Sign
            </BlueLoadingButton>
          </Box>
        )}
      </Box>
    </CustomModal>
  );
}
