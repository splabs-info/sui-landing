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
        text: 'Not only with SUI blockchain but expanding to multichain',
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
    position: 'relative',
    '&:hover': {
        background: 'linear-gradient(90deg, rgb(129,236,197,0.9) 0%, rgb(148,203,255,0.9) 50%,rgb(133,150,255,0.9) 100%)',
        boxShadow: ' 0px 1px 9px rgba(0, 0, 0, 0.34)',
        '& div:first-of-type': {
            background: '#000E26',
        },
        '& div> svg> defs > linearGradient > stop:first-of-type': {
            stopColor: '#00C5D3',
        },
        '& div> svg> defs > linearGradient > stop': {
            stopColor: '#42EECF',
        },
        '&:before': {
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            content: 'url("/images/home/arrow.png")'
        }
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
    fontWeight: 800,
    marginBottom: '.5rem',
    textTransform: 'uppercase',
    background: 'linear-gradient(90deg, rgb(129,236,197,0.9) 0%, rgb(148,203,255,0.9) 50%,rgb(133,150,255,0.9) 100%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    [theme.breakpoints.down('md')]: {
        marginBottom: '.25rem',
    },
}));

export default function MultiChain() {
    const isDesktop = useResponsive('up', 'md');
    return (
        <Container maxWidth={'xl'}>
            <Box mb={5} sx={{ position: 'relative' }}>
                <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                <TitleBox>
                    <Typography> Multi-Chain</Typography>
                    <TypographyGradient>Launchpad Platform</TypographyGradient>
                </TitleBox>
                <Grid container spacing={3} mt={4}>
                    {teams.map((item, index) => (
                        <Grid item key={index} md={6} xs={12} minHeight={'100%'}>
                            <CustomBox
                                sx={{
                                    margin: 'auto 0',
                                    '&:hover': {
                                        '& h6': {
                                            color: 'white',
                                            background: 'white',
                                            backgroundClip: 'text',
                                        },
                                    },
                                }}
                            >
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
    );
}
