import { Box, Grid, Typography } from '@mui/material';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { WhyJoinCard } from './WhyJoinCard';

const whyJoinData = [
    {
        id: 1,
        title: 'Early Access',
        caption: 'The best NFT collections, available to you before they grow popular and out of reach.',
        icon: '/images/ino/wallet.svg',
    },
    {
        id: 2,
        title: 'Best Prices',
        caption: 'By buying earlier you secure a low price that will make sure you maximize your returns.',
        icon: '/images/ino/money.svg',
    },
    {
        id: 3,
        title: 'Project Due Diligence',
        caption: 'Only the most solid projects with the best capacity to deliver are able to launch with us.',
        icon: '/images/ino/search.svg',
    },
    {
        id: 4,
        title: 'Exclusive Projects',
        caption: 'Some NFTs will be exclusive to our platform, so that is your only chance to get them.',
        icon: '/images/ino/medal.svg',
    },
];
export default function WhyJoin() {
    const isMobile = useResponsive('down', 'sm');
    const isDesktop = useResponsive('up', 'md');

    return (
        <Box mb={20} mt={10} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Why Join</Typography>
                <TypographyGradient>YouSUI's INOs ?</TypographyGradient>
            </TitleBox>
            <Grid container spacing={3} mt={4}>
                {whyJoinData.map((item) => (
                    <Grid item key={1} md={6} xs={12} minHeight={'100%'}>
                        <WhyJoinCard key={item?.id} icon={item?.icon} title={item?.title} caption={item?.caption} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
