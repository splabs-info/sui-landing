import styled from '@emotion/styled';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import IcPeople from 'components/asset/icon/IcPeople';
import IcSex from 'components/asset/icon/IcSex';
import IcVerify from 'components/asset/icon/IcVerify';
import { UploadBtn } from 'components/create-profile';
import { UploadAvatar } from 'components/upload-avatar';
import moment from 'moment';

const WrapperAreaInformation = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(180deg, rgba(104, 230, 184, 0.15) 0%, rgba(109, 133, 218, 0.15) 100%)',
    boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(50px)',
    borderRadius: '15px',
    height: '750px',
    minWidth: 320,
    paddingTop: 128,
    paddingRight: 32,
    paddingLeft: 32,
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
                <InfoWrapper sx={{alignItems: 'center'}}>
                    <MailOutlineIcon color="inherit" fontSize="26px" sx={{
                        fontSize: 20,
                    }}/>
                    <InfoTitle variant="subtitle2">Email:</InfoTitle>
                    <Info variant="subtitle2">{DATA_DEFAULT?.email}</Info>
                </InfoWrapper>
                {/* <InfoWrapper>
                    <IcPeople />
                    <InfoTitle variant="subtitle2">Day of birth:</InfoTitle>
                    <Info>{moment(DATA_DEFAULT?.dob).format('DD-MM-YYYY')}</Info>
                </InfoWrapper> */}
                <InfoWrapper sx={{alignItems: 'center'}}>
                    <IcSex fontSize="20px"/>
                    <InfoTitle variant="subtitle2">Sex:</InfoTitle>
                    <Info variant="subtitle2">{renderGender()}</Info>
                </InfoWrapper>
                <InfoWrapper  sx={{alignItems: 'center'}}>
                    <PublicOutlinedIcon fontSize="20px" color="inherit"  sx={{fontSize: 20}}/>
                    <InfoTitle variant="subtitle2">Nationality:</InfoTitle>

                    <Info variant="subtitle2">{DATA_DEFAULT?.nationality}</Info>
                </InfoWrapper>
            </Stack>

            <Box sx={{ textAlign: 'center', margin: '24px 0' }}>
                <UploadBtn variant="contained" startIcon={<CloudUploadOutlinedIcon />} onClick={onOpen}>
                    Update profile
                </UploadBtn>
            </Box>
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
    );
}
