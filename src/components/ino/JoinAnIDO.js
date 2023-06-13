import { Box, Grid, Hidden, Stack, Typography } from '@mui/material';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { HowToJoinCard } from './HowToJoinCard';

const howToJoinData = [
    {
        id: 1,
        icon: '/wallet-ino.svg',
        title: 'Purchase XUI Token ',
        caption:
            "XUI is YouSUI's ecosystem token that will empower its holders to join IGOs and INOs and enjoy tremendous advantages through Staking/Farming",
        direction: true,
        btnDirection: 'Buy XUI',
    },
    {
        id: 2,
        icon: '/currency.svg',
        title: 'Stake or Farm your XUI',
        caption:
            'By staking a large amount of XUI, you can qualify for a higher tier and participate in INO at a slightly more reasonable price.',
        direction: true,
        btnDirection: 'Start Now',
    },
    {
        id: 3,
        icon: '/ticket.svg',
        title: 'Only Whitelisted Country',
        caption:
            'Complete the Pre-KYC process before participating in INO. There must be countries that cannot participate in INO through the Pre-KYC system.',
        direction: false,
        btnDirection: '',
    },

    {
        id: 4,
        icon: '/check.svg',
        title: "You're all set!",
        caption:
            'Now you just need to wait for the release of the whitelist to purchase your favorite NFT at the best price',
        direction: false,
        btnDirection: '',
    },
];
export default function JoinAnIDO() {
    const isMobile = useResponsive('down', 1440);

    return (
        <Box mb={20} mt={10} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>How to</Typography>
                <TypographyGradient>Join INO Launchpad</TypographyGradient>
            </TitleBox>
            <Stack
                direction={{ xs: 'column', lg: 'row' }}
                spacing={{ md: 2, lg: 1 }}
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                sx={{ paddingLeft: 3 }}
            >
                <Grid container spacing={2} mt={4} sx={{ width: isMobile ? '100%' : '50%' }}>
                    {howToJoinData.map((item) => (
                        <Grid item key={1} md={6} xs={12}>
                            <HowToJoinCard
                                key={item?.id}
                                icon={item?.icon}
                                title={item?.title}
                                caption={item?.caption}
                                direction={item?.direction}
                                btnDirection={item?.btnDirection}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Hidden smDown> <img
                    src="/how-join.svg"
                    alt=""
                    style={{
                        width: 720,
                        height: 560,
                        margin: isMobile ? 'auto' : '',
                    }}
                /></Hidden>
            </Stack>
        </Box>
    );
}
