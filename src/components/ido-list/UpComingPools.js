import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import { UpComingIDOCard } from './UpComingIDOCard';

const upComingIDOList = [
  {
    title: 'TXUI (BETA IDO)',
    avatar: '/images/ido/ido-upcoming-1.jpg',
    releaseTime: 'Official Launch: June 10th',
    salePeriod: 'TBA',
    status: false,
    link: '',
    description: [
      <>
        <p>TBA</p>
        <p>Valuation</p>
      </>,
      <>
        <p>TBA</p>
        <p>Ticket Size</p>
      </>,
    ]

  },
  {
    title: 'YouSUI - XUI',
    avatar: '/images/ido/ido-upcoming-2.jpg',
    releaseTime: 'Official Launch: June 21st',
    startAt: '21st June 12:00 UTC',
    status: true,
    link: '',
    description: [
      <>
        <p>1,000,000 SUI</p>
        <p>Total Raise</p>
      </>,
      <>
        <p>25M $</p>
        <p>Valuation</p>
      </>,
      <>
        <p>Access</p>
        <p>OG & PL</p>
      </>,
    ]
  },
  {
    title: 'HooD',
    avatar: '/images/ido/ido-upcoming-3.jpg',
    releaseTime: 'Official Launch: July 25th',
    startAt: '25th July 11:00 UTC',
    status: false,
    link: '',
    description: [
      <>
        <p>600,000 SUI</p>
        <p>Total Raise</p>
      </>,
      <>
        <p>20M $</p>
        <p>Valuation</p>
      </>,
      <>
        <p>Access</p>
        <p>Tier 1~5 </p>
      </>,
    ]
  },
]

export default function UpComingPools() {
  return (
    <Box my={20} position="relative">
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
      <TitleBox>
        <Typography>Upcoming</Typography>
        <TypographyGradient>Pools</TypographyGradient>
      </TitleBox>
      <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2, mt: 3, }}>
        {upComingIDOList?.map((item, index) => (
          <UpComingIDOCard
            {...item}
          />
        ))}
      </Stack>
    </Box>
  );
}
