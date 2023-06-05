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

export const PresalesInformation = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box mb={20} mt={10} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>$XUI</Typography>
                <TypographyGradient>Information</TypographyGradient>
            </TitleBox>
            <Stack alignItems={'center'} mb={isMobile ? 2 : 5} mt={isMobile ? 2 : 0}>
                <Box component={'img'} src='/images/whitepaper/tokenomics.png' alt='tokenomics' />
            </Stack>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4.5}>
                    <Typography variant={'h4'} color={'white'} mb={2}>Overview </Typography>
                    <ContentBox className='xui-info'>
                        <Typography lineHeight={'2'}>
                            The XUI Token is the platform's governance token, and by staking it, you get the opportunity to participate in IDO and INO. In addition, you can participate in the governance that determines the direction of the project by using the XUI Token. It can be used as currency in DEX and NFT Marketplace, and liquidity can be supplied along with YouXUI. On social platforms, it can be used when clicking likes or making donations. By staking XUI Tokens, you not only get staking rewards, but also become an early investor in cutting-edge and high-potential projects.
                        </Typography>
                    </ContentBox>
                </Grid>
                <Grid item xs={12} md={7.5}>
                    <Typography variant={'h4'} color={'white'} mb={2}>Token Distribution </Typography>
                    <ContentBox className='xui-info'>
                        {tokenDistribution.map((item, index) => (
                            <SpaceBetweenBox key={index} className='border-bottom'>
                                <Typography>
                                    {item.label}
                                </Typography>
                                <Typography>
                                    {item.value}
                                </Typography>
                            </SpaceBetweenBox>
                        ))}

                    </ContentBox>

                </Grid>
            </Grid>
        </Box>
    );
};

