import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ImgTitleBox, SectionBox, TextTypography, TitleBox, TypographyGradient } from './HomeStyles';
import useResponsive from '../../hooks/useResponsive';
import { Color } from '../../constant/styled';

const ContainerNetwork = styled(Box)(({ theme }) => ({
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(4, 1fr)',
    marginTop: '2rem',
    '& a': {
        background: 'rgba(50,53,96,0.33)',
        margin: '0.75rem',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.5rem',
        '&:nth-of-type(n + 5)': {
            opacity: '0.7',
            '& img': {
                maxHeight: '35px',
            },
        },
        '&:nth-of-type(n + 9)': {
            opacity: '0.5',
        },
        '&:hover': {
            color: Color.primary,
            '& img': {
                transform: 'scale(1.05)',
            },
        },
    },

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',

        '& a': {
            '&:nth-of-type(n + 7)': {
                // display: 'none'
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
}));

const networks = [
    {
        icon: '/images/networks/icon-1.png',
        label: 'SUI',
        link: '/',
    },
    {
        icon: '/images/networks/icon-2.png',
        label: 'Ethereum',
        link: '/',
    },
    {
        icon: '/images/networks/BNB.svg',
        label: 'BNB Chain',
        link: '/',
    },
    // {
    //   icon: '/images/icon/networks/',
    //   label: "BNB Chain",
    //   link: "/",
    // },
    {
        icon: '/images/networks/icon-3.png',
        label: 'Solana',
        link: '/',
    },
    {
        icon: '/images/networks/icon-4.png',
        label: 'Polygon',
        link: '/',
    },
    {
        icon: '/images/networks/icon-5.png',
        label: 'Fantom',
        link: '/',
    },
    {
        icon: '/images/networks/icon-6.png',
        label: 'Avalanche',
        link: '/',
    },
    {
        icon: '/images/networks/icon-7.png',
        label: 'Arbitrum',
        link: '/',
    },
    {
        icon: '/images/networks/icon-8.png',
        label: 'Optimism',
        link: '/',
    },
    {
        icon: '/images/networks/icon-9.png',
        label: 'Harmony',
        link: '/',
    },
    {
        icon: '/images/networks/icon-10.png',
        label: 'Aptos',
        link: '/',
    },
    {
        icon: '/images/networks/icon-11.png',
        label: 'Gnosis',
        link: '/',
    },
    {
        icon: '/images/networks/icon-12.png',
        label: 'Boba',
        link: '/',
    },
    {
        icon: '/images/networks/icon-13.png',
        label: 'Ontology',
        link: '/',
    },
    {
        icon: '/images/networks/icon-14.png',
        label: 'Tron',
        link: '/',
    },
    {
        icon: '/images/networks/icon-15.png',
        label: 'HECO',
        link: '/',
    },
    {
        icon: '/images/networks/icon-16.png',
        label: 'OKC',
        link: '/',
    },
];

export default function Ecosystem() {
    const isDesktop = useResponsive('up', 'md');

    return (
        <SectionBox>
            <Container maxWidth={'xl'}>
                <Box mb={5} sx={{ position: 'relative' }}>
                    <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                    <TitleBox>
                        <Typography> Multi-Chain</Typography>
                        <TypographyGradient>Ecosystem</TypographyGradient>
                    </TitleBox>
                </Box>
                <TextTypography variant={'body1'}>
                    Although it is a launchpad platform operated by SUI blockchain, various chains can be accessed with
                    scalability through the bridge, <br />
                    and users can easily access games and NFTs of various chains and get the opportunity to become early
                    investors.
                </TextTypography>
                {/* <TextTypography variant={'body1'}>
          various chains can be accessed with scalability through the bridge,
        </TextTypography>
        <TextTypography variant={'body1'}>
          and users can easily access games and NFTs of various chains and get the opportunity to become early investors.
        </TextTypography> */}
                <ContainerNetwork>
                    {networks.map((network, index) => (
                        <a href={network.link} target="_blank" rel="noreferrer" key={index}>
                            <CustomLogo src={network.icon} alt={network.label} />
                            <span style={{ minWidth: 80, marginLeft: 10 }}>{network.label}</span>
                        </a>
                    ))}
                </ContainerNetwork>
            </Container>
        </SectionBox>
    );
}
