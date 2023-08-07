import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import React from 'react';
import { UpComingIDOCard } from './UpComingIDOCard';

const dataXUI = {
    title: 'YouSUI - XUI',
    avatar: '/images/ido/pool-yousui.jpg',
    releaseTime: 'Official Launch: July 20th ',
    startAt: 'July 20th, 12:00 UTC',
    status: true,
    link: '/ido-launchpad/og-sale',
    startTime: '2023-07-20T12:00:00',
    endTime: '2023-07-20T13:00:00',
    description: [
        <>
            <p>1,000,000 SUI</p>
            <p>TBA</p>
        </>,
        <>
            <p>0.2 USD</p>
            <p>Price per Token</p>
        </>,
        <>
            <p>Access</p>
            <p>OG & PL</p>
        </>,
    ],
};

const data = {
    title: 'HooD',
    avatar: '/images/home/hood.jpg',
    releaseTime: 'Official Launch: Aug 25th',
    startAt: 'Aug 25th, 11:00 UTC',
    status: false,
    link: '',
    startTime: '2023-08-25T12:00:00 Z',
    endTime: '2023-08-27T12:00:00 Z',
    description: [
        <>
            <p>600,000 SUI</p>
            <p>TBA</p>
        </>,
        <>
            <p>20M $</p>
            <p>Valuation</p>
        </>,
        <>
            <p>Access</p>
            <p>Tier 1~5 </p>
        </>,
    ],
};
const publicReleap = {
    title: 'Releap',
    roundName: 'Public Round',
    avatar: '/images/home/releap.jpg',
    releaseTime: 'Official Launch: Aug 8th',
    startAt: 'Aug 8th, 12:30 UTC',
    status: false,
    link: `/ido-launchpad/releap/public-sale`,
    startTime: '2023-08-08T12:30:00 Z',
    endTime: '2023-08-09T12:00:00 Z',
    description: [
        <>
            <p></p>
            <p>30,000 USD</p>
        </>,
        <>
            <p>800,000,000</p>
            <p>Total Supply</p>
        </>,
        <>
            <p>Access</p>
            <p>Any</p>
        </>,
    ],
};

const dataReleap = {
    title: 'Releap',
    roundName: 'Community Round',
    avatar: '/images/home/releap.jpg',
    releaseTime: 'Official Launch: Aug 7th',
    startAt: 'Aug 7th, 12:00 UTC',
    status: false,
    link: `/ido-launchpad/releap/community-sale`,
    startTime: '2023-08-07T12:00:00 Z',
    endTime: '2023-08-08T12:00:00 Z',
    description: [
        <>
            <p></p>
            <p>70,000 USD</p>
        </>,
        <>
            <p>800,000,000</p>
            <p>Total Supply</p>
        </>,
        <>
            <p>Access</p>
            <p>Tier 1~5 </p>
        </>,
    ],
};

export default function UpComingPools({ hasInTimeIDOXUI = false, reLeapInTime }) {
    const [list, setList] = React.useState([]);

    // console.log(hasInTimeIDOXUI);
    React.useEffect(() => {
        if (hasInTimeIDOXUI || reLeapInTime) {
            setList([dataReleap, publicReleap, data]);
        } else setList([data]);
    }, [hasInTimeIDOXUI, reLeapInTime]);

    return (
        <Box my={20} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Upcoming</Typography>
                <TypographyGradient>Pools</TypographyGradient>
            </TitleBox>
            <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2, mt: 3 }}>
                {list?.map((item, index) => (
                    <UpComingIDOCard {...item} key={index} />
                ))}
            </Stack>
        </Box>
    );
}
