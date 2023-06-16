import { Box, Grid, Stack, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import { ContentBox, SpaceBetweenBox } from 'components/common/CustomBox';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
const tokenDistribution = [
    {
        label: 'Token Details',
        value: 'Based on Total Supply at Genesis'
    },
    {
        label: 'Ticker',
        value: 'XUI'
    },
    {
        label: 'Standard',
        value: 'Sui Blockchain Based'
    },
    {
        label: 'Max Supply & Total Supply',
        value: '100,000,000 XUI'
    },
    {
        label: 'Initial Circulating Supply On Day 1 ',
        value: '1,100,000 XUI'
    },
    {
        label: 'Public Launch Allocation (%)',
        value: '1,000,000 XUI (1%)'
    },
    {
        label: 'Public Launch price',
        value: '$0.25'
    },
]
const utilityList = [
    'Stake XUI-X LP Token to obtain Swap fee Shares',
    'Stake XUI and Get Tier',
    'Stake XUI and have the right to join IDO / INO Launchpad',
    'Pay XUI to make your own NFT collection',
    'Pay XUI to Mint your own NFTs on SUI Network',
    'Stake XUI and Get the discount of Swap Fee',
    'Stake XUI and Get the discount of NFT Trade fee',
    'Pay XUI to use of Non-EVM Bridge',
    'Donate XUI on YouSUI Social Platform',
    'Governance',
]


export const XUIUtility = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box mb={10} mt={20} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>$XUI</Typography>
                <TypographyGradient>Utility</TypographyGradient>
            </TitleBox>

            <Grid container spacing={3} mt={4}>
                <Grid item xs={12} md={4.5}>
                    <ContentBox className='xui-info' >
                        <ul>
                            {utilityList.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </ContentBox>
                </Grid>
                <Grid item xs={12} md={7.5}>
                    <Stack alignItems={'center'} mt={isMobile ? 2 : -25}>
                        <Box component={'img'} src='/images/whitepaper/tokenomics.png' alt='tokenomics' />
                    </Stack>


                </Grid>
            </Grid>
        </Box>
    );
};

