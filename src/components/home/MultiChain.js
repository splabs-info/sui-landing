import { Box, Card, Container, Grid, Stack, styled, Typography } from '@mui/material';
import Slider from 'react-slick';
import useResponsive from '../../hooks/useResponsive';
import { TitleBox, TypographyGradient } from './HomeStyles';
import { multiChainSliderSettings } from './SliderSettings';

const teams = [
    {
        title: 'Self-sustaining ecosystem',
        photoUrl: '/images/multi-chain/Expansion_01.png',
        text: 'Blockchain with everybody able to Supply & Demand',
    },
    {
        title: 'Expand with us',
        photoUrl: '/images/multi-chain/Expansion_02.png',
        text: 'With Blockchain and Web3 experts everything would be possible',
    },
    {
        title: 'Must be verified',
        photoUrl: '/images/multi-chain/Expansion_03.png',
        text: 'We integrate with only potential and passionate projects',
    },
    {
        title: 'Multi-Chain',
        photoUrl: '/images/multi-chain/Expansion_04.png',
        text: 'Not only with SUI blockchain but expanding to multichain',
    },
];

const SliderCustom = styled(Slider)(() => ({
    '&.slick-slide': {
        padding: '10px!important',
    },
    '& .slick-slide': {
        transition: 'all 0.3s ease-in-out',
        padding: '10px!important',
        '&.slick-active': {
            opacity: '1',
            color: 'red',
        },
        '&.slick-current': {
            opacity: '1',
        },
        '&.slick-center': {
            marginTop: '-3rem',
        },
        '&.slick-prev': {
            height: '3rem',
        },
        '& li.slick-active button::before': {
            color: 'red',
        },
        '& li': {
            color: 'red',
        },
    },
}));

const CustomBox = styled(Box)(({ theme }) => ({
    padding: '2rem',
    border: '1px solid #98cafe',
    borderRadius: '1rem',
    background: 'rgba(49, 72, 99, 0.3)',
    textAlign: 'flex-start',
    borderTopWidth: '80%',
    boxShadow: ' 0px 1px 9px rgba(0, 0, 0, 0.34)',
    minHeight: '330px',
    '&:hover': {
        background: 'linear-gradient(336.08deg, #81ECC5 10.7%, #8596FF 97.43%)',
    },
    [theme.breakpoints.down('md')]: {
        minHeight: 'unset',
        padding: '2rem',
    },
}));

const CardContent = styled(Card)(({ theme }) => ({
    background: 'transparent',
    borderRadius: '0px!important',
    width: '100%',
    margin: '0 auto 0 auto',
    boxShadow: 'none',
    color: 'white',
    maxHeight: '200px',
    [theme.breakpoints.down('md')]: {
        padding: '0px',
    },
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontFamily: 'SVN-Gilroy-semi-bold',
    marginBottom: '.5rem',
    textTransform: 'uppercase',
    background: 'linear-gradient(to right, #81ECC5 0%, #94CBFF 100%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    minHeight: '60px',
    [theme.breakpoints.down('md')]: {
        marginBottom: '1rem',
    },
}));

export default function MultiChain() {
    const isDesktop = useResponsive('up', 'md');

    return (
        <Box
            pt={isDesktop ? 30 : 15}
            pb={isDesktop ? 20 : 5}
            sx={{
                background: "url('/images/frame/background_01.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                overflowX: 'clip',
                position: 'relative',
            }}
        >
            <Box
                component={'img'}
                src="/images/home/blur.png"
                alt=""
                sx={{
                    width: isDesktop ? '450px' : '200px',
                    position: 'absolute',
                    right: isDesktop ? '-9rem' : '-5rem',
                    top: isDesktop ? '0rem' : '2rem',
                    zIndex: 0,
                }}
            />
            <Container>
                <Box mb={5} sx={{ position: 'relative' }}>
                    <Box
                        component={'img'}
                        src="/images/home/shape.png"
                        alt=""
                        sx={{
                            width: '240px',
                            position: 'absolute',
                            left: '-7rem',
                            top: '-4.5rem',
                            zIndex: 0,
                        }}
                    />
                    <TitleBox
                        sx={{
                            zIndex: 2,
                            '& .MuiTypography-root': {
                                fontSize: isDesktop ? '3.5rem' : '2rem',
                                fontFamily: 'SVN-Gilroy-heavy',
                                color: 'white',
                                textTransform: 'uppercase',
                            },
                        }}
                    >
                        <Typography>Multi-Chain</Typography>
                        <TypographyGradient>Launchpad</TypographyGradient>
                        <Typography variant="span">Platform</Typography>
                    </TitleBox>

                    <Box mt={4}>
                        <SliderCustom {...multiChainSliderSettings}>
                            {teams.map((item, index) => (
                                <Grid alignItems="flex-start" justifyContent="space-evenly" key={index} container>
                                    <CustomBox>
                                        <Box mb={4}>
                                            <img style={{ width: 'min(25%,70px)' }} src={item.photoUrl} alt="" />
                                        </Box>
                                        <CardContent>
                                            <Stack>
                                                <TypographyTitle variant="h6">{item.title}</TypographyTitle>
                                                <Typography
                                                    variant="body2"
                                                    className="content"
                                                    sx={{
                                                        lineHeight: 'unset',
                                                        color: 'white',
                                                        paddingBottom: '2rem',
                                                    }}
                                                >
                                                    {item.text}
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </CustomBox>
                                </Grid>
                            ))}
                        </SliderCustom>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
