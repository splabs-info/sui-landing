import { Box, Stack, Typography } from '@mui/material';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { UpComingINOCard } from './UpComingINOCard';

const upComingItem = [
    {
        id: '1',
        avatar: '/coming-1.svg',
    },
    {
        id: '2',
        avatar: '/coming-2.svg',
    },
    {
        id: '3',
        avatar: '/coming-3.svg',
    },
    {
        id: '4',
        avatar: '/coming-4.svg',
    },
];

export default function UpComing() {
    const isMobile = useResponsive('down', 'sm');
    const isDesktop = useResponsive('up', 'md');

    return (
        <Box mb={20} mt={10} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Up-Coming</Typography>
                <TypographyGradient>INOs</TypographyGradient>
            </TitleBox>
            <Stack
                direction={{ lg: 'row', md: 'row', sm: 'column' }}
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                sx={{ marginTop: 4 }}
            >
                {upComingItem.map((item) => (
                    <UpComingINOCard avatar={item.avatar} />
                ))}
            </Stack>
        </Box>
    );
}
