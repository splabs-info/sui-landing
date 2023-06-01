import { Box, Button, Container, Grid, Link, styled, Typography } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import StakingForm from 'components/staking/StakingForm';
import useResponsive from 'hooks/useResponsive';
import { fCurrency } from 'utils/format';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import moment from 'moment';
const XUILogo = '/images/coins/XUI-2.png';
const gateUrl = 'https://www.gate.io';
const data = {
    symbol: 'XUI',
    description: `The $XUI token is a utility token of the YouSUI platform and is connected through a
    bridge on BSC and SUI Chain. By staking $XUI, you can participate in IDO Launchpad
    and INO Launchpad, and the more $XUI you stake, the higher tiers you receive. Higher
    tiers are given a chance to obtain more allocations in Launchpad or to
    participate in INO Launchpad at a lower price.`,
    price: 1.63307,
    holder: 200000,
    marketCap: 4533533,
};

const BoxGradientOpacity = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    border: '1px solid #00C5D3',
    borderRadius: '8px',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    textAlign: 'center',
}));

const BoxGradient = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    borderRadius: 10,
    padding: '24px 48px 24px 48px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
}));

const statisticFields = [
    {
        key: 'price',
        label: 'Price',
        // format: (e) => `$${fCurrency(e, 5)}`,
        format: () => '-/-',
    },
    {
        key: 'holder',
        label: 'Holder',
        // format: (e) => `${fCurrency(e, 0)}`,
        format: () => '-/-',
    },
    {
        key: 'marketCap',
        label: 'Marketcap',
        // format: (e) => `${fCurrency(e, 0)}`,
        format: () => '-/-',
    },
];

const packages = [
    {
        time: 7,
        expectedAPY: 4.07,
        subscriptionDate: moment(),
        firstRewardPayment: moment().add(1, 'days'),
        stakingExpirationDate: moment().add(7, 'days'),
        unstakeFee: 1,
    },
    {
        time: 30,
        expectedAPY: 6.18,
        subscriptionDate: moment(),
        firstRewardPayment: moment().add(1, 'days'),
        stakingExpirationDate: moment().add(30, 'days'),
        unstakeFee: 1,
    },
    {
        time: 90,
        expectedAPY: 8.33,
        subscriptionDate: moment(),
        firstRewardPayment: moment().add(1, 'days'),
        stakingExpirationDate: moment().add(90, 'days'),
        unstakeFee: 1,
    },
    {
        time: 180,
        expectedAPY: 16.18,
        subscriptionDate: moment(),
        firstRewardPayment: moment().add(1, 'days'),
        stakingExpirationDate: moment().add(180, 'days'),
        unstakeFee: 1,
    },
];

export default function StakingPage() {
    const isDesktop = useResponsive('up', 'sm');
    const isTablet = useResponsive('down', 'md');
    const theme = useTheme();
    const [verifyData, setVerifyData] = useState(packages[0]);

    return (
        <Page title="Staking">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg6.png')",
                    paddingTop: !isDesktop && 5,
                }}
            >
                <Container maxWidth={'xl'}>
                    <Grid container direction={isTablet ? 'column' : ''} spacing={5}>
                        <Grid item xs={12}>
                            <Grid container spacing={5} mt={5}>
                                <Grid item md={4} xs={12}>
                                    <img
                                        src={XUILogo}
                                        alt=""
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <Box color="white">
                                        <Typography variant="h3">{data.symbol}</Typography>
                                        <Typography>{data.description}</Typography>
                                        <Link
                                            sx={{
                                                textDecoration: 'unset',
                                                display: 'block',
                                                mt: 2,
                                            }}
                                            href={gateUrl}
                                            target="_blank"
                                        >
                                            {/* <Button
                                                sx={{
                                                    background:
                                                        'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
                                                    borderRadius: 90,
                                                    px: 5,
                                                    color: 'white',
                                                }}
                                                size="large"
                                            >
                                                Buy on
                                            </Button> */}
                                        </Link>
                                        <Box my={2}>
                                            <Grid container spacing={2}>
                                                {statisticFields.map((field) => (
                                                    <Grid item xs={4}>
                                                        <BoxGradientOpacity>
                                                            <Typography>{field.label}</Typography>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    textShadow: '0 0 10px rgb(255, 255, 255, 0.5)',
                                                                }}
                                                            >
                                                                {field.format ? field.format(data[field.key]) : data[field.key]}
                                                            </Typography>
                                                        </BoxGradientOpacity>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                        <BoxGradient>
                                            <Box>
                                                <Typography textAlign="left" variant="h6" fontWeight={300}>
                                                    Selected APY
                                                </Typography>
                                                <Typography textAlign={'left'} variant="h3">
                                                    {verifyData.expectedAPY}%
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography textAlign="right" variant="h6" fontWeight={300}>
                                                    Selected Terms
                                                </Typography>
                                                <Typography textAlign="right" variant="h3">
                                                    {verifyData.time} Days
                                                </Typography>
                                            </Box>
                                        </BoxGradient>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <StakingForm setVerifyData={(e) => setVerifyData(e)} verifyData={verifyData} packages={packages} />
                        </Grid>
                    </Grid>
                </Container>
            </SectionBox>
        </Page>
    );
}
