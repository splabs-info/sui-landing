import { Box, Container, Grid, LinearProgress, Typography, styled } from '@mui/material';
import { BorderGradientButton, GradientLoadingButton } from 'components/common/CustomButton';
import Page from 'components/common/Page';
import { SectionBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import { MintingCountdown } from 'components/minting/MintingCountdown';
import useResponsive from 'hooks/useResponsive';
import { useState } from 'react';
import Slider from 'react-slick';


const FreeMintingBox = styled(Box)(({ theme }) => ({
  background:
    'linear-gradient(330.98deg, rgba(24, 161, 220, 0.2) -1.28%, rgba(95, 172, 242, 0.2) -1.27%, rgba(20, 64, 88, 0.14) 49.25%, rgba(49, 173, 243, 0.2) 101.94%)',
  padding: '60px 80px',
  borderRadius: '20px',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  '& div': {
    zIndex: 1,
  },
  '& .MuiTypography-body1': {
    marginTop: '16px',
  },
  '::before': {
    content: "''",
    position: 'absolute',
    background: 'linear-gradient(330.98deg, rgba(24, 161, 220, 0.2) -1.28%, rgba(95, 172, 242, 0.2) -1.27%, rgba(20, 64, 88, 0.14) 49.25%, rgba(49, 173, 243, 0.2) 101.94%)',
    inset: '0px',
    zIndex: 0,
    borderRadius: '20px',
    padding: '1px',
    '-webkit-mask':
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    '-webkit-mask-composite': 'xor',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    background: 'transparent',
    backdropFilter: 'blur(0px)',
    marginBottom: '64px',
    '::before': {
      padding: '0px',
    },
  }
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  background: 'transparent',
  borderRadius: 32,
  height: 24,
  boxShadow: '0px 0px 10px 2px rgba(152, 255, 230, 0.7)',
  marginTop: '24px',
  '& .MuiLinearProgress-bar': {
    background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
    borderRadius: 32,
  },
  position: 'relative',
  '::before': {
    content: "''",
    position: 'absolute',
    background: 'linear-gradient(0deg, #00C5D3 81.61%, #96E0DA 95.07%)',
    inset: '0px',
    zIndex: 1,
    borderRadius: 32,
    padding: '2px',
    '-webkit-mask':
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    '-webkit-mask-composite': 'xor',
  },

  [theme.breakpoints.down('sm')]: {
    height: 16,
    '::before': {
      padding: '1px',
    },
  }
}));


export default function FreeMinting() {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Page title="Free Minting">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/bg-free-minting.jpg')",
        }}
      >
        <Container maxWidth={'xl'}>
          <FreeMintingBox>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Box mb={3}>
                  <Typography variant="h1" fontWeight={700} color={'white'}>
                    Free
                  </Typography>
                  <TypographyGradient variant="h1" fontWeight={700}>
                    Claim NFT
                  </TypographyGradient>
                </Box>
                {/* <Typography variant="h6" fontWeight={700} color={'white'}>
                  Start time:
                </Typography>
                <MintingCountdown
                  endTime={'2023-05-31T00:00:00'}
                /> */}
                <Typography variant="h6" fontWeight={700} color={'white'}>
                  End time:
                </Typography>
                <MintingCountdown
                  endTime={'2023-06-15T00:00:00'}
                />

                <Typography variant="body1" color={'#A0FFF4'} fontStyle={'italic'}>
                  *** Claim schedule: 31st May, 2023
                </Typography>
                <Typography variant="body1" color={'white'}>
                  Click <b>“Claim Now”</b>  button to receive a free YouSUI benefit.<br />
                  (Gas fee is not included)
                </Typography>
                <Typography variant="body1" color={'#A0FFF4'} fontStyle={'italic'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& img': { marginLeft: '10px' },
                  }}
                >
                  Claim available: <img src="/images/icon/icon-check.png" alt="check" />
                </Typography>
                <GradientLoadingButton sx={{ minWidth: isMobile ? '150px' : '200px', marginTop: '32px' }}>
                  Claim Now (5)
                </GradientLoadingButton>
              </Grid>
              <Grid item md={6} xs={12}>
                {/* <Box sx={{
                  height: '100%', padding: { md: '2rem', xs: '1rem' },
                  display: 'flex', flexDirection: 'column', justifyContent: 'center'
                }}>

                </Box>
                <NFTSlider /> */}
                <StyledLinearProgress variant="determinate" component="p" value={62.5} />
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={3} mb={3}>
                  <Typography variant="body1" color={'white'}>
                    1250
                  </Typography>
                  <Typography variant="body1" color={'white'}>
                    TOTAL: 2000
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={isMobile ? 'space-between' : 'center'}
                  gap={isMobile ? 1 : 5}
                >
                  <BorderGradientButton>
                    <img src="/images/icon/icon-twitter-normal.png" alt="twitter" />
                    Share on Twitter
                  </BorderGradientButton>
                  <BorderGradientButton>
                    <img src="/images/icon/icon-global.png" alt="global" />
                    View on Explore
                  </BorderGradientButton>
                </Box>
              </Grid>
            </Grid>
          </FreeMintingBox>
        </Container>
      </SectionBox>
    </Page >
  );
}

const nftImage = [
  {
    src: '/images/nfts/yousui-beta-nft-1.png',
    label: 'NFT 1',
  },
  {
    src: '/images/nfts/yousui-beta-nft-2.png',
    label: 'NFT 2',
  },
  {
    src: '/images/nfts/yousui-beta-nft-3.png',
    label: 'NFT 3',
  },
  {
    src: '/images/nfts/yousui-beta-nft-4.png',
    label: 'NFT 4',
  },
]

export const SliderCustom = styled(Slider)(({ theme }) => ({
  "& .slick-track": {
    width: '100%!important',
  },
  "& .slick-slide": {
    width: ' 100%!important',
    position: 'relative',
    display: 'flex!important',
    justifyContent: 'center',
    transition: "all 0.3s ease-in-out",
    padding: "15px 10px!important",
    opacity: "0.5",
    transform: 'scale(0.8)',
    zIndex: 1,
    "& .puzzles-image": {
      filter: 'blur(5px)',
      minWidth: '300px',
    },
    "&.slick-active.slick-current": {
      transition: "all 0.3s ease-in-out",
      opacity: "1",
      justifyContent: 'center',
      transform: 'scale(1)',
      zIndex: 2,
      "& .puzzles-image": {
        filter: 'blur(5px)',
      },
    },

  },
  "& .slick-slide.slick-active + .slick-slide": {
  },
  "& .slick-arrow.slick-next": {
    right: 0,
    zIndex: 3,

    "&:before": {
      color: 'rgba(0,163,255,.5)',
      fontSize: '24px',
    },
  },
  "& .slick-arrow.slick-prev": {
    left: 0,
    zIndex: 3,
    "&:before": {
      color: 'rgba(0,163,255,.5)',
      fontSize: '24px',
    },
  },

  [theme.breakpoints.down("sm")]: {
    "& .slick-slide": {
      "& .puzzles-image": {
        minWidth: '200px',
      },
    },
  },
}));

function NFTSlider() {
  const [selectedNft, setSelectedNft] = useState(0);
  const nftSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: false,
    arrows: true,
    centerMode: true,
    afterChange: function (index) {
      setSelectedNft(index);
    },
  };
  return (
    <SliderCustom {...nftSliderSettings}>
      {nftImage.map((item, index) => (
        <Box sx={{ position: 'relative' }} key={index}>
          <img
            alt={item.label}
            src={item.src}
          />
        </Box>
      ))}
    </SliderCustom>
  )
}