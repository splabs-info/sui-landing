import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import { UpComingIDOCard } from './UpComingIDOCard';

const upComingIDOList = [
  // {
  //   title: 'TXUI (BETA IDO)',
  //   avatar: '/images/ido/ido-upcoming-1.jpg',
  //   releaseTime: 'Coming Soon',
  //   salePeriod: 'TBA',
  //   status: false,
  //   link: '',
  //   description: [
  //     <>
  //       <p>TBA</p>
  //       <p>Valuation</p>
  //     </>,
  //     <>
  //       <p>TBA</p>
  //       <p>Ticket Size</p>
  //     </>,
  //   ]

  // },
  {
    title: 'YouSUI - XUI',
    avatar: '/images/ido/pool-yousui.jpg',
    releaseTime: 'Official Launch: July 20th ',
    startAt: 'July 20th, 12:00 UTC',
    status: true,
    link: '/ido-launchpad/round',
    description: [
      <>
        <p>1,000,000 SUI</p>
        <p>TBA</p>
      </>,
      <>
        <p>0.25 USD</p>
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
    releaseTime: 'Official Launch: July 25th',
    startAt: 'July 25th, 11:00 UTC',
    status: false,
    link: '',
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

export default function UpComingPools() {
  return (
    <Box my={20} position="relative">
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
      <TitleBox>
        <Typography>Upcoming</Typography>
        <TypographyGradient>Pools</TypographyGradient>
      </TitleBox>
      <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2, mt: 3 }}>
        {upComingIDOList?.map((item, index) => (
          <UpComingIDOCard {...item} key={index} />
        ))}
      </Stack>
    </Box>
  );
}
