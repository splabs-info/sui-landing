/* eslint-disable jsx-a11y/alt-text */
import { Box, Stack, Typography } from '@mui/material';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';
import { UpComingINOCard } from './UpComingINOCard';
const upComingINOList = [
    {
        title: 'Free Minting',
        avatar: '/images/ino/ino-upcoming-1.jpg',
        hardCap: '2000',
        access: 'WL',
        releaseTime: 'Official Launch: June 10th',
    },
    {
        title: 'HooD',
        avatar: '/images/ino/ino-upcoming-2.jpg',
        hardCap: '2000',
        access: 'Tier 1-5',
        releaseTime: 'Official Launch: July 25th',
    },
    {
        title: 'Vibe Fi',
        avatar: '/images/ino/ino-upcoming-3.jpg',
        hardCap: '2000',
        access: '',
        releaseTime: 'Upcoming',
    },
    {
        title: 'Galactic',
        avatar: '/images/ino/ino-upcoming-4.jpg',
        hardCap: '2000',
        access: '',
        releaseTime: 'Upcoming',
    },
    {
        title: 'Stellar Sagas',
        avatar: '/images/ino/ino-upcoming-5.jpg',
        hardCap: '2000',
        access: '',
        releaseTime: 'Upcoming',
    },
]

export default function UpComing() {
    const isMobile = useResponsive('down', 'sm');

    return (
        <Box mb={20} mt={10} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Up-Coming</Typography>
                <TypographyGradient>INOs</TypographyGradient>
            </TitleBox>
            <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2, m: 3, }}>
                {upComingINOList?.map((item, index) => (
                    <UpComingINOCard
                        {...item}
                    />
                ))}
            </Stack>
        </Box>
    );
}
