import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { NetworkBox, NetworksGrid, TitleBox, TypographyGradient } from './HomeStyles';
import useResponsive from '../../hooks/useResponsive';
import Slider from 'react-slick';
import { networksSliderSettings } from './SliderSettings';

const ContainerNetwork = styled(Box)(({ theme }) => ({
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(5, 1fr)',

    '& a': {
        background: 'rgba(50,53,96,0.33)',
        margin: '0.3rem',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.5rem',
        '&:nth-of-type(n + 7)': {
            opacity: '0.7',
        },
        '&:nth-of-type(n + 13)': {
            opacity: '0.5',
        },
    },

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',

        '& a': {
            '&:nth-of-type(n + 7)': {
                display: 'none',
            },
        },
    },
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
}));

const CustomLogo = styled('img')(() => ({
    transition: 'transform 150ms ease-in-out',
    padding: 0,
    display: 'block',
    maxHeight: '45px',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const networks = [
    {
        label: 'network-bnb',
        link: '/',
    },
    {
        label: 'network-etherum',
        link: '/',
    },
    {
        label: 'network-polygon',
        link: '/',
    },
    {
        label: 'network-klaytn',
        link: '/',
    },
    {
        label: 'network-fantom',
        link: '/',
    },
    {
        label: 'network-kcc-2',
        link: '/',
    },
    {
        label: 'network-solana',
        link: '/',
    },
];

const networksNumber = [
    {
        label: 'Blockchains',
        amount: '18',
    },
    {
        label: 'Total Fundraised',
        amount: '$ 2.5M',
    },
    {
        label: 'Total Participant',
        amount: '3 K+',
    },
    {
        label: 'Projects',
        amount: '3 +',
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
export default function Networks() {
    const isDesktop = useResponsive('up', 'md');

    return (
        <Box pt={isDesktop ? 15 : 5} pb={5}>
            <Box id="Network"></Box>
            <Container>
                <TitleBox
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TypographyGradient
                        sx={{
                            fontSize: isDesktop ? '1.75rem' : '1.25rem',
                            fontFamily: 'SVN-Gilroy-heavy',
                            marginBottom: '1rem',
                        }}
                    >
                        ALL MAIN BLOCKCHAIN NETWORKS
                    </TypographyGradient>
                    <img alt="gatekeeper" src="/images/home/line.png" width={'30%'} />
                </TitleBox>
                <SliderCustom {...networksSliderSettings}>
                    {networks.map((network, index) => (
                        <NetworkBox key={index}>
                            <a href={network.link} target="_blank" rel="noreferrer">
                                <CustomLogo src={`./images/networks/${network.label}.png`} alt={network.label} />
                            </a>
                        </NetworkBox>
                    ))}
                </SliderCustom>

                <NetworksGrid container>
                    <Grid
                        item
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: isDesktop ? 'flex-start' : 'center',
                            }}
                        >
                            {/* <img alt="gatekeeper" src="/images/home/gate-2.png" width={'90%'} /> */}
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        pr={isDesktop && 2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TypographyGradient
                            sx={{
                                fontSize: isDesktop ? '2.5rem' : '1.1rem',
                                fontFamily: 'SVN-Gilroy-semi-bold',
                                textTransform: 'inherit',
                                textAlign: 'center',
                            }}
                        >
                            YouSUI Overview
                        </TypographyGradient>
                        <Grid
                            container
                            sx={{
                                borderRadius: '1rem',
                                border: '1px solid #416FD9',
                                marginTop: '1.5rem',
                            }}
                        >
                            {networksNumber.map((detail, index) => (
                                <Grid
                                    item
                                    xs={3}
                                    key={index}
                                    sx={{
                                        padding: '0 0.5rem',
                                        margin: '0.5rem 0',
                                        color: 'white',
                                        textAlign: 'center',
                                        borderRight:
                                            networksNumber.length !== index + 1 ? '1px solid #416FD9 ' : 'none',
                                    }}
                                >
                                    <Typography variant="h4" fontSize={isDesktop ? '1.5rem' : '1rem'}>
                                        {detail.amount}
                                    </Typography>
                                    <Typography fontSize={'0.75rem'} variant="body2">
                                        {detail.label}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </NetworksGrid>
            </Container>
        </Box>
    );
}
