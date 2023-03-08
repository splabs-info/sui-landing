import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import {
    CenterBox,
    CompletedPoolsBox,
    CompletedPoolsChildBox,
    ImgTitleBox,
    SectionBox,
    TextTypography,
    TitleBox,
    TypographyGradient,
} from './HomeStyles';
import useResponsive from '../../hooks/useResponsive';
import { Background } from '../../constant/styled';
import CustomSlider from '../common/CustomSlider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const platforms = [
    {
        label: '07 D',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.',
        minAllocation: '0.01',
        maxAllocation: 'TBA',
        access: 'Public',
        totalRaise: '237,497.44 USDT',
        maximum: '1,939.85 USDT',
    },

    {
        label: 'A Platform',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.',
        minAllocation: '0.01',
        maxAllocation: 'TBA',
        access: 'Public',
        totalRaise: '237,497.44 USDT',
        maximum: '1,939.85 USDT',
    },

    {
        label: 'A Platform',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.',
        minAllocation: '0.01',
        maxAllocation: 'TBA',
        access: 'Public',
        totalRaise: '237,497.44 USDT',
        maximum: '1,939.85 USDT',
    },

    {
        label: 'A Platform',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.',
        minAllocation: '0.01',
        maxAllocation: 'TBA',
        access: 'Public',
        totalRaise: '237,497.44 USDT',
        maximum: '1,939.85 USDT',
    },
];

export default function CompletePools() {
    return (
        <SectionBox
            sx={{
                backgroundImage: "url('/images/background/homebg5.jpg')",
            }}
        >
            <Container maxWidth={'xl'}>
                <Box mb={5} sx={{ position: 'relative' }}>
                    <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                    <TitleBox>
                        <Typography> Previous</Typography>
                        <TypographyGradient>Pools</TypographyGradient>
                    </TitleBox>
                </Box>
                <Grid container spacing={3} mt={4}>
                    <Grid item md={3} xs={6} minHeight={'100%'}>
                        <Box
                            sx={{
                                cursor: 'pointer',
                                background:
                                    'linear-gradient(0deg, rgba(40, 140, 197, 0.15) 49.84%, rgba(93, 213, 230, 0.15) 100.31%)',
                                boxShadow: '0px 1px 9px rgba(0, 0, 0, 0.34)',
                                borderRadius: '20px',
                                padding: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px',
                                '&:hover': {
                                    background:
                                        'linear-gradient(230.44deg, rgba(129, 236, 197, 0.5) 3.99%, rgba(148, 203, 255, 0.5) 48.45%, rgba(133, 150, 255, 0.5) 89.66%)',
                                    boxShadow: '0px 0px 20px rgba(56, 232, 208, 0.5)',
                                },
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        textTransform: 'uppercase',
                                        background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
                                        webkitBackgroundClip: 'text',
                                        webkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        textFillColor: 'transparent',
                                        fontWeight: 800,
                                        fontSize: '2.25rem',
                                    }}
                                >
                                    {' '}
                                    07 Days
                                </Typography>
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}> Previous</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        04%
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}> Lock-up term</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        None
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}>
                                        {' '}
                                        Pool Participants
                                    </Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        -{' '}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    background: 'linear-gradient(98.21deg, #68E6B8 -9.15%, #6D85DA 102.32%)',
                                    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.5)',
                                    borderRadius: '10px',
                                    padding: '16px',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography sx={{ fontSize: '1rem', color: '#000000' }}>Discover</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item md={3} xs={6} minHeight={'100%'}>
                        <Box
                            sx={{
                                cursor: 'pointer',
                                background:
                                    'linear-gradient(0deg, rgba(40, 140, 197, 0.3) 49.84%, rgba(93, 213, 230, 0.3) 100.31%)',
                                boxShadow: '0px 1px 9px rgba(0, 0, 0, 0.34)',
                                borderRadius: '20px',
                                padding: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px',
                                '&:hover': {
                                    background:
                                        'linear-gradient(230.44deg, rgba(129, 236, 197, 0.5) 3.99%, rgba(148, 203, 255, 0.5) 48.45%, rgba(133, 150, 255, 0.5) 89.66%)',
                                    boxShadow: '0px 0px 20px rgba(56, 232, 208, 0.5)',
                                },
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        textTransform: 'uppercase',
                                        background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
                                        webkitBackgroundClip: 'text',
                                        webkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        textFillColor: 'transparent',
                                        fontWeight: 800,
                                        fontSize: '2.25rem',
                                    }}
                                >
                                    {' '}
                                    30 Days
                                </Typography>
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}> Previous</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        06%
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}> Lock-up term</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        None
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}>
                                        {' '}
                                        Pool Participants
                                    </Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        -{' '}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    background: 'linear-gradient(98.21deg, #68E6B8 -9.15%, #6D85DA 102.32%)',
                                    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.5)',
                                    borderRadius: '10px',
                                    padding: '16px',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography sx={{ fontSize: '1rem', color: '#000000' }}>Discover</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item md={3} xs={6} minHeight={'100%'}>
                        <Box
                            sx={{
                                cursor: 'pointer',
                                background:
                                    'linear-gradient(0deg, rgba(40, 140, 197, 0.5) 49.84%, rgba(93, 213, 230, 0.5) 100.31%);',
                                boxShadow: '0px 1px 9px rgba(0, 0, 0, 0.34)',
                                borderRadius: '20px',
                                padding: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px',
                                '&:hover': {
                                    background:
                                        'linear-gradient(230.44deg, rgba(129, 236, 197, 0.5) 3.99%, rgba(148, 203, 255, 0.5) 48.45%, rgba(133, 150, 255, 0.5) 89.66%)',
                                    boxShadow: '0px 0px 20px rgba(56, 232, 208, 0.5)',
                                },
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        textTransform: 'uppercase',
                                        background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
                                        webkitBackgroundClip: 'text',
                                        webkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        textFillColor: 'transparent',
                                        fontWeight: 800,
                                        fontSize: '2.25rem',
                                    }}
                                >
                                    {' '}
                                    90 Days
                                </Typography>
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}> Previous</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        08%
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}> Lock-up term</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        None
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}>
                                        {' '}
                                        Pool Participants
                                    </Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        -{' '}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    background:
                                        'linear-gradient(230.44deg, rgba(129, 236, 197, 0.5) 3.99%, rgba(148, 203, 255, 0.5) 48.45%, rgba(133, 150, 255, 0.5) 89.66%)',
                                    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.5)',
                                    borderRadius: '10px',
                                    padding: '16px',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography sx={{ fontSize: '1rem', color: '#000000' }}>Discover</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item md={3} xs={6} minHeight={'100%'}>
                        <Box
                            sx={{
                                cursor: 'pointer',
                                background:
                                    'linear-gradient(230.44deg, rgba(129, 236, 197, 0.5) 3.99%, rgba(148, 203, 255, 0.5) 48.45%, rgba(133, 150, 255, 0.5) 89.66%)',
                                boxShadow: '0px 1px 9px rgba(0, 0, 0, 0.34)',
                                borderRadius: '20px',
                                padding: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px',
                                '&:hover': {
                                    background:
                                        'linear-gradient(230.44deg, rgba(129, 236, 197, 0.5) 3.99%, rgba(148, 203, 255, 0.5) 48.45%, rgba(133, 150, 255, 0.5) 89.66%)',
                                    boxShadow: '0px 0px 20px rgba(56, 232, 208, 0.5)',
                                },
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        textTransform: 'uppercase',
                                        background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
                                        webkitBackgroundClip: 'text',
                                        webkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        textFillColor: 'transparent',
                                        fontWeight: 800,
                                        fontSize: '2.25rem',
                                    }}
                                >
                                    180 Days
                                </Typography>
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}> Previous</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        15%
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}> Lock-up term</Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        None
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff' }}>
                                        {' '}
                                        Pool Participants
                                    </Typography>
                                    <Typography sx={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                                        {' '}
                                        -{' '}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    background: 'linear-gradient(98.21deg, #68E6B8 -9.15%, #6D85DA 102.32%)',
                                    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.5)',
                                    borderRadius: '10px',
                                    padding: '16px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography sx={{ fontSize: '1rem', color: '#000000' }}>Discover</Typography>
                                <ArrowForwardIosIcon fontSize="15px" />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </SectionBox>
    );
}
