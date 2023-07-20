import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import { UpComingIDOCard } from './UpComingIDOCard';
import React from 'react';
import moment from 'moment';

const upComingIDOXUI = [
  {
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
  },
  {
    title: 'HooD',
    avatar: '/images/ido/pool-hood.jpg',
    releaseTime: 'Official Launch: Aug 25th',
    startAt: 'Aug 25th, 11:00 UTC',
    status: false,
    link: '',
    startTime: '',
    endTime: '',
    description: [
      <>
        <p>600,000 SUI</p>
        <p>TBA</p>
      </>,
      <>
        <p>0.2 USD</p>
        <p>Price per Token</p>
      </>,
      <>
        <p>Access</p>
        <p>Tier 1~5 </p>
      </>,
    ],
  },
];

const upComingIDOList = [

  {
    title: 'HooD',
    avatar: '/images/ido/pool-hood.jpg',
    releaseTime: 'Official Launch: Aug 25th',
    startAt: 'Aug 25th, 11:00 UTC',
    status: false,
    link: '',
    startTime: '',
    endTime: '',
    description: [
      <>
        <p>600,000 SUI</p>
        <p>TBA</p>
      </>,
      <>
        <p>0.2 USD</p>
        <p>Price per Token</p>
      </>,
      <>
        <p>Access</p>
        <p>Tier 1~5 </p>
      </>,
    ],
  },
];

export default function UpComingPools({ hasInTimeIDOXUI }) {
  const [list, setList] = React.useState([]);
  console.log(hasInTimeIDOXUI);
  React.useEffect(() => {
    if (hasInTimeIDOXUI) {
      setList(upComingIDOList);
    }
    else {
      setList(upComingIDOXUI);
    }
  }, [hasInTimeIDOXUI])

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
