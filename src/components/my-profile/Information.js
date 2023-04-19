import styled from '@emotion/styled';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import IcVerify from 'components/asset/icon/IcVerify';
import { UploadBtn } from 'components/create-profile';
import { UploadAvatar } from 'components/upload-avatar';

const WrapperAreaInformation = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(180deg, rgba(104, 230, 184, 0.15) 0%, rgba(109, 133, 218, 0.15) 100%)',
    boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(50px)',
    borderRadius: '15px',
    height: '750px',
    padding: '40px',
}));

export default function AreaInformation({ onOpen, DATA_DEFAULT }) {
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
                <UploadAvatar avatarUrl="" percent={''} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: 4 }}>
                    <Typography color={'#ffffff'} variant="h5" align="center">
                        YouSUI
                    </Typography>
                    <IcVerify />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {DATA_DEFAULT.map((el, i) => (
                    <Box sx={{ display: 'flex', gap: '8px', color: '#ffffff' }}>
                        <span>{el.icon}</span>
                        {el.titleName && (
                            <Typography color={'#ffffff'} component={'span'} variant="subtitle2" align="center">
                                {el.titleName}:
                            </Typography>
                        )}

                        {el.title && (
                            <Typography
                                sx={{ fontWeight: 400 }}
                                color={'#ffffff'}
                                component={'span'}
                                variant="subtitle2"
                                align="center"
                            >
                                {el.title}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>

            <Box sx={{ textAlign: 'center', margin: '24px 0' }}>
                <UploadBtn variant="contained" startIcon={<CloudUploadOutlinedIcon />} onClick={onOpen}>
                    Update profile
                </UploadBtn>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    color={'#ffffff'}
                    component={'span'}
                    variant="subtitle2"
                    align="center"
                    sx={{ fontWeight: 'normal', fontStyle: 'italic' }}
                >
                    Last signed in --
                </Typography>
            </Box>
        </WrapperAreaInformation>
    );
}
