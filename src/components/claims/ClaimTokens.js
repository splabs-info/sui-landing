/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import { Box, Divider, Grid, Hidden, Stack, Typography } from '@mui/material';
import { BorderGradientButton, GradientButton } from 'components/common/CustomButton';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';

const TokenPoolContent = [
    {
        title: 'YouSUI - TXUI- OG ROUND',
        subtitle: 'Community Test Pool',
        token: 'T-XUI',
        startDate: 'June 14th, 2023',
        status: true,
    },
    {
        title: 'YouSUI - XUI',
        subtitle: 'IDO Pool',
        token: 'XUI',
        startDate: 'June 21st, 2023',
        status: false,
    },
]
export default function ClaimTokens() {

    const isMobile = useResponsive('down', 'sm');
    return (
        <Box mb={isMobile ? 5 : 10} mt={20} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography >Claim</Typography>
                <TypographyGradient >your IDO tokens</TypographyGradient>
            </TitleBox>
            <Stack my={isMobile ? 4 : 8}>

            </Stack>
            {TokenPoolContent.map((item, index) => (
                <TokenPool key={index} {...item} />
            ))}
        </Box>
    );
}

const TokenPoolBox = styled(Box)(({ theme }) => ({
    background:
        'linear-gradient(330.98deg, rgba(95, 172, 242, 0.2) -1.27%, rgba(20, 64, 88, 0.14) 49.25%, rgba(49, 173, 243, 0.2) 101.94%)',
    padding: '40px 80px',
    borderRadius: '20px',
    backdropFilter: 'blur(5px)',
    position: 'relative',
    marginBottom: '40px',
    '& div': {
        zIndex: 1,
    },
    '::before': {
        content: "''",
        position: 'absolute',
        background: 'linear-gradient(283.13deg, rgba(202, 242, 255, 0.25) -1.44%, rgba(17, 120, 216, 0.25) 53.5%, rgba(142, 220, 254, 0.25) 102.43%)',
        inset: '0px',
        zIndex: 0,
        borderRadius: '20px',
        padding: '1px',
        '-webkit-mask':
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        '-webkit-mask-composite': 'xor',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '24px',
        marginBottom: '32px',
        '& .MuiTypography-body1': {
            fontSize: '14px',
        }
    },
}))
function TokenPool({ title, subtitle, token, startDate, status = false }) {
    const isMobile = useResponsive('down', 'sm');

    const navigate = useNavigate();
    return (
        <TokenPoolBox>
            <Grid container alignItems={'center'} spacing={isMobile ? 2 : 5}>
                <Grid item md={5} xs={12}
                    sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Box component={'img'} src={`/images/coins/${token}.png`} alt="" width={isMobile ? 50 : 100} />
                    <Box ml={isMobile ? 2 : 5} >
                        <Typography variant={isMobile ? 'h6' : 'h5'} color={'white'} >{title}</Typography>
                        <Typography color={'#999'}>{subtitle}</Typography>
                    </Box>
                </Grid>
                <Hidden mdUp>
                    <Grid item md={0} xs={12} >
                        <Divider flexItem orientation={'horizontal'} sx={{ color: 'white' }} />
                    </Grid>
                </Hidden>
                <Grid item md={4} xs={6}
                    sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box>
                        <Typography color={'#999'}>Claim Start Date</Typography>
                        <Typography color={'white'}>{startDate}</Typography>
                    </Box>
                </Grid>
                <Grid item md={3} xs={6}
                    sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-end' }}>
                    <GradientButton
                        onClick={() => navigate('/claim-tokens/vesting')}
                        sx={{ minWidth: 160 }}
                        disabled={!status}
                    >
                        {status ? 'Available' : 'Unavailable'}
                    </GradientButton>
                </Grid>
            </Grid>
        </TokenPoolBox>
    );
}