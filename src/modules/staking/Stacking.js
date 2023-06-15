
import { Box, Grid, Stack, Typography } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { SocialFooter } from 'layouts/FooterSection';
import moment from 'moment';
import { useState } from 'react';
import { BoxGradient, BoxGradientOpacity, ImageBox, UtilityBox } from './component/StackingStyles';
import StakingForm from './StakingForm';
import { fCurrency } from 'utils/format';

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
    title: <>$XUI <span style={{ fontWeight: 400 }}>live on</span></>,
    subtitle: 'Token Utility',
    list: [
        'Stake XUI-X LP Token to obtain Swap fee Shares',
        'Stake XUI and Get Tier',
        'Stake XUI and have the right to join IDO / INO Launchpad',
        'Pay XUI to make your own NFT collection',
        'Governance',
        'Pay XUI to Mint your own NFTs on SUI Network',
        'Stake XUI and Get the discount of Swap Fee',
        'Stake XUI and Get the discount of NFT Trade fee',
        'Pay XUI to use of Non-EVM Bridge',
        'Donate XUI on YouSUI Social Platform',
    ]
};

const statisticFields = [
    {
        key: 'price',
        label: 'Price',
        // format: (e) => `$${fCurrency(e, 5)}`,
        format: () => '-/-',
    },
    {
        key: 'locked',
        label: 'Total Locked XUI',
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

const fields = [
    {
        key: 'expectedAPY',
        label: 'Expected APY',
        format: (e) => `${e}%/daily`
    },
    {
        key: 'subscriptionDate',
        label: 'Subscript Date',
        format: (e) => e.format('YYYY-MM-DD'),
    },
    {
        key: 'firstRewardPayment',
        label: 'First Reward Payment',
        format: (e) => e.format('YYYY-MM-DD'),
    },
    {
        key: 'stakingExpirationDate',
        label: 'Staking Expiration Date',
        format: (e) => e.format('YYYY-MM-DD'),
    },
    {
        key: 'unstakeFee',
        label: 'Unstake fee',
        format: (e) => `${e}%`,
    },
];


export default function Staking() {
    const isMobile = useResponsive('down', 'sm');
    const [verifyData, setVerifyData] = useState(packages[0]);

    return (
        <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
                <ImageBox>
                    <img
                        src={'/images/staking/water-seek.jpg'}
                        alt=""
                    />
                    <img src='logo-1.png' alt='' width={200} className='absolute' />
                </ImageBox>
            </Grid>
            <Grid item md={8} xs={12}>
                <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
                    <Box>
                        <Stack direction={'row'} justifyContent={'space-between'} mb={2}>
                            <Typography variant="h3">{data.symbol}</Typography>
                            <SocialFooter sx={{ '& img': { width: '80%' } }} />
                        </Stack>
                        <Typography>{data.description}</Typography>
                    </Box>
                    {/* <Typography variant="h3" mt={2} mb={2}>{data.title}</Typography> */}
                    <UtilityBox>
                        <Typography variant="h6" mb={1}>{data.subtitle}</Typography>
                        <ul>
                            {data.list.map((item, index) => (
                                <li key={index}>
                                    <img src='/images/staking/icon-staking.png' alt='' />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </UtilityBox>
                </Stack>
            </Grid>

            <Grid item md={4} xs={12}>
                <Grid container spacing={2} height={'calc(100% + 16px)'}>
                    {statisticFields.map((field) => (
                        <Grid item xs={6}>
                            <BoxGradientOpacity>
                                <Typography>{field.label}</Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        textShadow: '0 0 10px rgb(255, 255, 255, 0.5)',
                                        mt: 1
                                    }}
                                >
                                    {field.format ? field.format(data[field.key]) : data[field.key]}
                                </Typography>
                            </BoxGradientOpacity>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item md={8} xs={12}>
                <BoxGradient>
                    <Box>
                        <Typography textAlign="left" variant="h6" fontWeight={400}>
                            Selected APR
                        </Typography>
                        <Typography textAlign={'left'} variant="h3">
                            {verifyData.expectedAPY}%
                        </Typography>
                    </Box>
                    <Box>
                        <Typography textAlign="right" variant="h6" fontWeight={400}>
                            Selected Terms
                        </Typography>
                        <Typography textAlign="right" variant="h3">
                            {verifyData.time} Days
                        </Typography>
                    </Box>
                </BoxGradient>
            </Grid>

            <Grid item md={4} xs={12}>
                <Stack direction={'column'} justifyContent="space-between" height={'100%'}
                    sx={{ '& .border': { borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 2, mb: 1 } }}
                >
                    {fields.map((field) => (
                        <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
                            <Typography variant="body1" fontWeight={600}>{field.label}</Typography>
                            <Typography>
                                {field.format ? field.format(verifyData[field.key]) : verifyData[field.key]}
                            </Typography>
                        </Stack>
                    ))}
                    <Box textAlign={'center'} mt={1}>
                        <Typography textAlign={'center'} variant="caption">
                            Staking Rewards are distributed every 24 hours.
                        </Typography>
                    </Box>
                </Stack>
            </Grid>
            <Grid item md={8} xs={12}>
                <StakingForm setVerifyData={(e) => setVerifyData(e)} verifyData={verifyData} packages={packages} />
            </Grid>
        </Grid>
    );
}
