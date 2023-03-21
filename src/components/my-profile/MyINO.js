import { Box, Divider, styled } from '@mui/material';
import { TitleSection } from './TitleSection';

const StyledMyINOBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    padding: '30px 75px',
    display: 'flex',
    justifyContent: 'space-between',
}));

export const MyINOArea = () => {
    return (
        <Box sx={{ padding: 10 }}>
            <TitleSection title="My INO Participated" />
            <StyledMyINOBox>
                <Box sx={{ textAlign: 'center' }}>
                    <Box
                        sx={{
                            fontWeight: 800,
                            fontSize: '24px',
                            lineHeight: '35px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        Time
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(0, 229, 255, 0.2)' }} orientation="vertical" />
                    <Box
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '23px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                        }}
                    >
                        22.0721:12:22 25/12/2022.2022
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(0, 229, 255, 0.2)' }} orientation="vertical" />

                <Box sx={{ textAlign: 'center' }}>
                    <Box
                        sx={{
                            fontWeight: 800,
                            fontSize: '24px',
                            lineHeight: '35px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        IDO Pool
                    </Box>
                    <Box
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '23px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                        }}
                    >
                        ADK Project
                    </Box>
                </Box>
                <Box>
                    {' '}
                    <Divider sx={{ borderColor: 'rgba(0, 229, 255, 0.2)' }} orientation="vertical" />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Box
                        sx={{
                            fontWeight: 800,
                            fontSize: '24px',
                            lineHeight: '35px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        Amount
                    </Box>
                    <Box
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '23px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                        }}
                    >
                        30,000 ADK
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(0, 229, 255, 0.2)' }} orientation="vertical" />

                <Box sx={{ textAlign: 'center' }}>
                    <Box
                        sx={{
                            fontWeight: 800,
                            fontSize: '24px',
                            lineHeight: '35px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        USDT
                    </Box>
                    <Box
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '23px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                        }}
                    >
                        ~ 12,000 USDT
                    </Box>
                </Box>
                <Box>
                    <Divider sx={{ borderColor: 'rgba(0, 229, 255, 0.2)' }} orientation="vertical" />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Box
                        sx={{
                            fontWeight: 800,
                            fontSize: '24px',
                            lineHeight: '35px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        Status
                    </Box>
                    <Box
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '23px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                        }}
                    >
                        Completed
                    </Box>
                </Box>
            </StyledMyINOBox>
        </Box>
    );
};
