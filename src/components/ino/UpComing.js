/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { BorderGradientButton } from 'components/common/CustomButton';
import { GradientShadowTypography, ShadowTypography } from 'components/common/CustomTypography';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';

// const upComingItem = [
//     {
//         id: '1',
//         avatar: '/coming-1.svg',
//     },
//     {
//         id: '2',
//         avatar: '/coming-2.svg',
//     },
//     {
//         id: '3',
//         avatar: '/coming-3.svg',
//     },
//     {
//         id: '4',
//         avatar: '/coming-4.svg',
//     },
// ];

const StyledBtnBorderGreen = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.3) 0%, rgba(109, 133, 218, 0.3) 100%)',
    borderRadius: '50px',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    paddingRight: 18,
    paddingLeft: 18,

    '::before': {
        content: "''",
        position: 'absolute',
        background: 'linear-gradient(180deg, rgba(104, 229, 184, 1) 0%, rgba(109, 133, 218, 1) 100%)',
        inset: '0px',
        zIndex: 1,
        borderRadius: '50px',
        padding: '2px',
        '-webkit-mask':
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        '-webkit-mask-composite': 'xor',
    },
}));

export default function UpComing() {
    const isMobile = useResponsive('down', 'sm');

    const navigate = useNavigate();
    return (
        <Box mb={20} mt={10} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Up-Coming</Typography>
                <TypographyGradient>INOs</TypographyGradient>
            </TitleBox>

            <Box
                sx={{
                    background: 'linear-gradient(323.96deg, rgba(45, 126, 200, 0.1) 0%, rgba(181, 255, 211, 0.1) 89.18%)',
                    boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(25px)',
                    borderRadius: isMobile ? '10px' : '15px',
                    padding: isMobile ? '32px' : '64px',
                    mt: 5,
                    '& img': { padding: isMobile ? '0 10%' : '0' },
                }}
            >
                <Grid container alignItems={'center'} spacing={5}>
                    <Grid item md={5} xs={12} sx={{ position: 'relative' }}>
                        <img src={'/images/ino/nft.png'} style={{ width: '100%', height: '100%' }} alt="" />
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Typography textAlign={'center'} fontSize={isMobile ? '24px' : '84px'} fontWeight={'bold'} mb={3}>
                            <ShadowTypography variant='span' > Free </ShadowTypography>
                            <GradientShadowTypography variant='span'>Minting</GradientShadowTypography>
                        </Typography>
                        <ProcessBarBox
                            title={
                                <>
                                    <Typography>Progress</Typography>
                                    <Typography>Total amount: 2000</Typography>
                                </>
                            }
                            percent={57}

                            sx={{ margin: isMobile ? '24px 0px' : '0px' }}
                        />
                        <Stack spacing={1.5} alignItems={'center'} sx={{ marginTop: isMobile ? '24px' : '24px' }}>
                            <BorderGradientButton
                                onClick={() => navigate('/ino-launchpad/free-minting-nft')}
                                sx={{

                                }}
                            >
                                JOIN NOW
                            </BorderGradientButton>
                        </Stack>

                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    background: 'linear-gradient(323.96deg, rgba(45, 126, 200, 0.1) 0%, rgba(181, 255, 211, 0.1) 89.18%)',
                    boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(25px)',
                    borderRadius: isMobile ? '10px' : '15px',
                    padding: isMobile ? '32px' : '64px',
                    mt: 5,
                    '& img': { padding: isMobile ? '0 10%' : '0' },
                }}
            >
                <Grid container alignItems={'center'} spacing={5}>
                    <Grid item md={5} xs={12} sx={{ position: 'relative' }}>
                        <img src={'/images/ino/nft-2.png'} style={{ width: '100%', height: '100%' }} alt="" />
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Typography textAlign={'center'} fontSize={isMobile ? '24px' : '36px'} fontWeight={'bold'}>
                            <ShadowTypography variant='span' > First </ShadowTypography>
                            <GradientShadowTypography variant='span'>Move To Earn</GradientShadowTypography>
                            <ShadowTypography variant='span' > on SUI Network </ShadowTypography>
                        </Typography>
                        <Stack spacing={1.5} alignItems={'center'}>
                            <img src={'/images/ino/logo-hood.png'} alt="" />
                            <BorderGradientButton
                                disabled={true}
                            >
                                Official Launch : July 25th
                            </BorderGradientButton>
                        </Stack>

                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
