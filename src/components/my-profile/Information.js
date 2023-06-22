import styled from '@emotion/styled';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { IconBell } from '@tabler/icons';
import IcSex from 'components/asset/icon/IcSex';
import IcVerify from 'components/asset/icon/IcVerify';
import { BorderGradientButton } from 'components/common/CustomButton';
import { UploadAvatar } from 'components/upload-avatar';
import useResponsive from 'hooks/useResponsive';
import NotifiNetwork from 'modules/notifi-network/NotifiNetwork';
import React from 'react';
import { toast } from 'react-toastify';

const WrapperAreaInformation = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(104, 230, 184, 0.15) 0%, rgba(109, 133, 218, 0.15) 100%)',
  boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(50px)',
  borderRadius: '15px',
  minHeight: '97%',
  padding: '96px 32px 32px',
  [theme.breakpoints.down('sm')]: {
    margin: '40px 0',
    padding: '32px',

    minHeight: 'max-content',
  }
}));

const InfoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  color: '#ffffff',
}));

const InfoTitle = styled(Typography)(({ theme }) => ({}));

const Info = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: '#ffffff',
}));

export default function AreaInformation({ onOpen, DATA_DEFAULT, id }) {
  const isMobile = useResponsive('down', 'sm');
  const [showNotification, setShowNotification] = React.useState(false);
  const renderGender = () => {
    switch (DATA_DEFAULT?.gender) {
      case 1:
        return <Info variant="subtitle2">Male</Info>;
      case 2:
        return <Info variant="subtitle3">Female</Info>;
      default:
        return <Info variant="subtitle2">Other</Info>;
    }
  };

  return (
    <>
      <WrapperAreaInformation>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <UploadAvatar avatarUrl={DATA_DEFAULT?.avatar} percent={''} id={id} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: 4 }}>
            <Typography color={'#ffffff'} variant="h5" align="center">
              YouSUI
            </Typography>
            <IcVerify />
          </Box>
        </Box>

        <Stack direction="column" spacing={2}>
          <InfoWrapper sx={{ alignItems: 'center' }}>
            <MailOutlineIcon
              color="inherit"
              fontSize="26px"
              sx={{
                fontSize: 20,
              }}
            />
            <InfoTitle variant="subtitle2">Email:</InfoTitle>
            <Info variant="subtitle2">{DATA_DEFAULT?.email}</Info>
          </InfoWrapper>
          {/* <InfoWrapper>
                    <IcPeople />
                    <InfoTitle variant="subtitle2">Day of birth:</InfoTitle>
                    <Info>{moment(DATA_DEFAULT?.dob).format('DD-MM-YYYY')}</Info>
                </InfoWrapper> */}
          <InfoWrapper sx={{ alignItems: 'center' }}>
            <IcSex fontSize="20px" />
            <InfoTitle variant="subtitle2">Sex:</InfoTitle>
            <Info variant="subtitle2">{renderGender()}</Info>
          </InfoWrapper>
          <InfoWrapper sx={{ alignItems: 'center' }}>
            <PublicOutlinedIcon fontSize="20px" color="inherit" sx={{ fontSize: 20 }} />
            <InfoTitle variant="subtitle2">Nationality:</InfoTitle>

            <Info variant="subtitle2">{DATA_DEFAULT?.nationality}</Info>
          </InfoWrapper>
        </Stack>

        <Stack flexDirection={'column'} justifyContent={'space-between'} gap={1} mt={4}>
          <BorderGradientButton variant="contained" startIcon={<CloudUploadOutlinedIcon />} onClick={onOpen}>
            Update profile
          </BorderGradientButton>
          <BorderGradientButton
            variant="contained"
            startIcon={<IconBell />}
            onClick={() => {
              if (DATA_DEFAULT?.email)
                setShowNotification(true)
              else toast.warning('Updated profile, please!')
            }}
            disabled={!DATA_DEFAULT}
          >
            Get notifications
          </BorderGradientButton>
        </Stack>
        {/* <Box sx={{ textAlign: 'center' }}>
                <Typography
                    color={'#ffffff'}
                    component={'span'}
                    variant="subtitle2"
                    align="center"
                    sx={{ fontWeight: 'normal', fontStyle: 'italic' }}
                >
                    Last signed in --
                </Typography>
            </Box> */}
      </WrapperAreaInformation>
      <NotifiNetwork open={showNotification} handleClose={() => setShowNotification(false)} data={DATA_DEFAULT} />
    </>
  );
}
