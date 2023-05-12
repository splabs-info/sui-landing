/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
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
    const isDesktop = useResponsive('up', 'md');
    const theme = useTheme();

    const navigate = useNavigate();
    return (
        <Box mb={20} mt={10} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Up-Coming</Typography>
                <TypographyGradient>INOs</TypographyGradient>
            </TitleBox>
            <Stack
                direction={{ lg: 'row', md: 'row', sm: 'column' }}
                justifyContent={{ lg: 'space-between', md: 'center' }}
                alignItems="center"
                flexWrap="wrap"
                sx={{
                    marginTop: 4,
                    background: 'linear-gradient(0deg, rgba(234, 204, 248, 0.15) 0%, rgba(150, 224, 218, 0.15) 100%)',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
                    borderRadius: '16px',
                    padding: '32px 64px',
                    [theme.breakpoints.down(1400)]: {
                        justifyContent: 'center',
                    },
                }}
            >
                <Box
                    sx={{
                        [theme.breakpoints.down(1400)]: {
                            marginBottom: '64px',
                        },
                    }}
                >
                    <img src="/upcoming-banner.svg" style={{ width: '100%' }} />
                </Box>
                <Box sx={{ marginBottom: 3, textAlign: 'center' }}>
                    <img src="/upcoming-banner-2.svg" style={{ width: '100%' }} />
                    {isDesktop ? (
                        <StyledBtnBorderGreen
                            size="large"
                            disabled
                            sx={{ paddingRight: 3.5, paddingLeft: 3.5 }}
                        >
                            Official Launch : July 25th
                        </StyledBtnBorderGreen>
                    ) : (
                        <></>
                    )}
                </Box>
                {/* {upComingItem.map((item) => (
                    <UpComingINOCard avatar={item.avatar} />
                ))} */}
            </Stack>
        </Box>
    );
}
