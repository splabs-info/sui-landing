/* eslint-disable jsx-a11y/alt-text */
import { Box, Stack, Typography } from '@mui/material';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import { UpComingINOCard } from './UpComingINOCard';
const upComingINOList = [
  {
    title: 'Free Minting',
    avatar: '/images/ino/ino-upcoming-1.jpg',
    hardCap: '2000',
    access: 'WL',
    // releaseTime: 'Official Launch: June 10th',
    releaseTime: "SOLD OUT",
    status: false,
    link: '/ino-launchpad/free-minting-nft',

  },
  //   {
  //     title: 'HooD',
  //     avatar: '/images/ino/ino-upcoming-2.jpg',
  //     hardCap: '2000',
  //     access: 'Tier 1-5',
  //     releaseTime: 'Official Launch: July 25th',
  //     status: false,
  //     link: '',
  //   },
  // {
  //   title: 'Vibe Fi',
  //   avatar: '/images/ino/ino-upcoming-3.jpg',
  //   hardCap: '2000',
  //   access: '',
  //   releaseTime: '',
  //   status: false,
  //   link: '',
  // },
  // {
  //   title: 'Galactic',
  //   avatar: '/images/ino/ino-upcoming-4.jpg',
  //   hardCap: '2000',
  //   access: '',
  //   releaseTime: '',
  //   status: false,
  //   link: '',
  // },
  // {
  //   title: 'Stellar Sagas',
  //   avatar: '/images/ino/ino-upcoming-5.jpg',
  //   hardCap: '2000',
  //   access: '',
  //   releaseTime: '',
  //   status: false,
  //   link: '',
  // },
]

export default function PreviousINOs() {
  return (
    <Box mb={20} mt={10} position="relative">
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
      <TitleBox>
        <Typography>Previous</Typography>
        <TypographyGradient>INOs</TypographyGradient>
      </TitleBox>
      <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2, m: 3, }}>
        {upComingINOList?.map((item, index) => (
          <UpComingINOCard
            {...item}
          />
        ))}
      </Stack>
    </Box>
  );
}