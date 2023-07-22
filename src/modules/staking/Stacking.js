import { Box, Grid, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useResponsive from 'hooks/useResponsive';
import { SocialFooter } from 'layouts/FooterSection';
import { isEmpty } from 'lodash';
import { transformStakingData } from 'onchain/helpers';
import React from 'react';
import StakingForm from './StakingForm';
import { BoxGradient, BoxGradientOpacity, ImageBox, UtilityBox } from './component/StackingStyles';

const data = {
    symbol: 'XUI',
    description: `$XUI is the utility token of the YouSUI platform, serving various purposes within the ecosystem. It can be utilized in Launchpad, DEX, Cross Chain Swap, Bridge, and NFT Marketplace. Additionally, $XUI holds governance power, allowing token holders to participate in decision-making through voting and governance processes. Staking $XUI enables community members to express their opinions and provide suggestions. Users who stake $XUI are assigned a "Tier," granting them access to participate in IDO and INO Launchpad events. Furthermore, a portion of the revenue generated from activities such as DEX, NFT Marketplace, and Bridge is allocated to $XUI stakers, while the remaining amount is dedicated to the "Burn and Buyback" mechanism.`,
    price: 1.63307,
    holder: 200000,
    marketCap: 4533533,
    title: (
        <>
            $XUI <span style={{ fontWeight: 400 }}>live on</span>
        </>
    ),
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
    ],
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

const VerifyDataField = ({ label, value }) => (
    <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems={'center'}
        className="border"
        pb={1.25}
        pt={1.25}
    >
        <Typography variant="body1" fontWeight={600}>
            {label}
        </Typography>
        <Typography>{label === 'Unstake Fee' ? `${value} XUI` : value}</Typography>
    </Stack>
);
export default function Staking({ staking }) {
    const isMobile = useResponsive('down', 'sm');
    const [loading, setLoading] = React.useState();
    const transformedData = transformStakingData(staking);
    const sortASC = [...transformedData].sort((a, b) => a.time - b.time);
    const [verifyData, setVerifyData] = React.useState({});


    React.useEffect(() => {
        if (isEmpty(staking) || isEmpty(transformedData)) {
            setLoading(true);
        } else {
            setLoading(false);
            if (isEmpty(verifyData)) {
                setVerifyData(sortASC[0]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staking, sortASC, transformedData]);

    return (
        <>
            {loading ? (
                <Box sx={{ margin: '108px auto auto auto', textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={4}>
                    <Grid item md={4} xs={12}>
                        <ImageBox>
                            <img src={'/images/staking/water-seek.jpg'} alt="" />
                            <img src="logo-1.png" alt="" width={200} className="absolute" />
                        </ImageBox>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
                            <Box>
                                <Stack direction={'row'} justifyContent={'space-between'} mb={1}>
                                    <Typography variant="h3">{data.symbol}</Typography>
                                    <SocialFooter sx={{ '& img': { width: '80%' } }} />
                                </Stack>
                                <Typography>{data.description}</Typography>
                            </Box>
                            <Typography variant="h3" mt={2} mb={2}>{data.title}</Typography>
                            <UtilityBox>
                                <Typography variant="h6" mb={1}>
                                    {data.subtitle}
                                </Typography>
                                <ul>
                                    {data.list.map((item, index) => (
                                        <li key={index}>
                                            <img src="/images/staking/icon-staking.png" alt="" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </UtilityBox>
                        </Stack>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <Grid container spacing={2} height={'calc(100% + 16px)'}>
                            {statisticFields.map((field, index) => (
                                <Grid item xs={6} key={index}>
                                    <BoxGradientOpacity>
                                        <Typography>{field.label}</Typography>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                textShadow: '0 0 10px rgb(255, 255, 255, 0.5)',
                                                mt: 1,
                                            }}
                                        >
                                            {/* {field.format ? field.format(data[field.key]) : data[field.key]} */}
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
                                    {verifyData ? verifyData.expectedAPY + '%' : 'Loading...'}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography textAlign="right" variant="h6" fontWeight={400}>
                                    Selected Terms
                                </Typography>
                                <Typography textAlign="right" variant="h3">
                                    {verifyData ? verifyData.time + ' Days' : 'Loading...'}
                                </Typography>
                            </Box>
                        </BoxGradient>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <Stack
                            direction={'column'}
                            justifyContent="space-between"
                            height={'100%'}

                            sx={{ '& .border': { borderBottom: '1px solid rgba(255, 255, 255, 0.1)' } }}
                        >
                            <VerifyDataField label="Expected APR" value={`${verifyData?.expectedAPY} %`} />
                            <VerifyDataField label="Staking Expiration Date" value={verifyData?.subscriptionDate} />
                            <VerifyDataField label="Staking Expiration Date" value={verifyData?.stakingExpirationDate} />
                            <VerifyDataField label="Unstake Fee" value={verifyData?.unstakeFee} />
                            <Box textAlign={'center'} mt={1}>
                                <Typography textAlign={'center'} variant="caption">
                                    Staking Rewards are distributed every 24 hours.
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <StakingForm setVerifyData={(e) => setVerifyData(e)} verifyData={verifyData} sortedData={sortASC} />
                    </Grid>
                </Grid>
            )}
        </>
    );
}
