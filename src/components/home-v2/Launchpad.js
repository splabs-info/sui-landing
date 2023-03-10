import { Box, Container, Typography, Grid, styled } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from './HomeStyles';
import { Color } from '../../constant/styled';
import IcReact from 'components/asset/icon/IcReact';
import IcMultiChain from 'components/asset/icon/IcMultiChain';
import IcVerified from 'components/asset/icon/IcVerified';
import IcFrame from 'components/asset/icon/IcFrame';

const teams = [
    {
        title: 'Self-sustaining ecosystem',
        photoUrl: <IcReact />,
        text: 'Blockchain with everybody able to Supply & Demand',
    },
    {
        title: 'Expand with us',
        photoUrl: <IcFrame />,
        text: 'With Blockchain and Web3 experts everything would be possible',
    },
    {
        title: 'Must be verified',
        photoUrl: <IcVerified />,
        text: 'We integrate with only potential and passionate projects',
    },
    {
        title: 'Multi-Chain',
        photoUrl: <IcMultiChain />,
        text: 'Not only with YouSUI blockchain but expanding to multichain',
    },
];

const CustomBox = styled(Box)(({ theme }) => ({
    padding: '1rem',
    borderRadius: '1rem',
    border: '1px solid rgba(46, 48, 83, 0.4)',
    background: Color.background,
    borderTopWidth: '80%',
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    '&:hover': {
        background: 'linear-gradient(90deg, #D0C4FC 4.98%, #9CEAF0 100%)',
        border: '1px solid #98cafe',
        boxShadow: ' 0px 1px 9px rgba(0, 0, 0, 0.34)',
        '& div:first-child': {
            background: '#000E26',
        },
        '& div> svg> defs > linearGradient > stop:first-child': {
            stopColor: '#00C5D3',
        },
        '& div> svg> defs > linearGradient > stop': {
            stopColor: '#42EECF',
        },
    },
    '& div> svg> defs > linearGradient > stop': {
        stopColor: '#000F28',
    },

    [theme.breakpoints.down('md')]: {
        minHeight: 'unset',
        padding: '1rem',
        '& .TextBox': {
            width: '95%',
        },
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
    '&:hover': {
        color: 'white',
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: '.25rem',
    },

}));

export default function MultiChain() {
    const isDesktop = useResponsive('up', 'md');
    return (
        <SectionBox sx={{ backgroundImage: "url('/images/background/homebg3.png')", backgroundSize: 'cover' }}>
            {/* <Box
                component={'img'}
                src="/images/home/blur.png"
                alt=""
                sx={{
                    width: isDesktop ? '450px' : '200px',
                    position: 'absolute',
                    right: isDesktop ? '-9rem' : '-5rem',
                    top: isDesktop ? '0rem' : '2rem',
                    zIndex: 0,
                    b
                }}
            /> */}
            <Container maxWidth={'xl'}>
                <Box mb={5} sx={{ position: 'relative' }}>
                    <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                    <TitleBox>
                        <Typography> Multi-Chain</Typography>
                        <TypographyGradient>Launchpad</TypographyGradient>
                        <Typography variant="span"> Platform</Typography>
                    </TitleBox>
                    <Grid container spacing={3} mt={4}>
                        {teams.map((item, index) => (
                            <Grid item key={index} md={6} xs={12} minHeight={'100%'}>
                                <CustomBox>
                                    <Box
                                        sx={{
                                            width: 86,
                                            height: 86,
                                            background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
                                            borderRadius: '16px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 3,
                                        }}
                                    >
                                        {item.photoUrl}
                                    </Box>
                                    <Box pl={1} className="TextBox" sx={{ margin: 'auto 0' }}>
                                        <TypographyTitle variant="h6">{item.title}</TypographyTitle>
                                        <Typography
                                            variant="body2"
                                            className="content"
                                            sx={{
                                                lineHeight: 'unset',
                                                color: 'white',
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </Box>
                                </CustomBox>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </SectionBox>
    );
}
