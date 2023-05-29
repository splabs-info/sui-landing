import { Box, Container, Grid, Hidden, LinearProgress, Typography, styled } from '@mui/material';
import { BorderGradientButton, GradientLoadingButton } from 'components/common/CustomButton';
import Page from 'components/common/Page';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
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
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Box mb={3}>
                  <Typography variant="h1" fontWeight={700} color={'white'} fontSize={!isMobile ? '88px!important' : '48px'}>
                    Free
                  </Typography>
                  <TypographyGradient variant="h1" fontWeight={700} fontSize={!isMobile ? '88px!important' : '48px'}>
                    NFT Claim
                  </TypographyGradient>
                </Box>
                <Hidden smUp>
                  <Box>
                    <NFTSlider />
                  </Box>
                  <ProcessBarBox
                    percent={62.5}
                    subtitle={<>
                      <Typography variant="body1" color={'white'}>
                        1250
                      </Typography>
                      <Typography variant="body1" color={'white'}>
                        TOTAL: 2000
                      </Typography>
                    </>}
                    sx={{ margin: '16px 0' }}
                  />
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={isMobile ? 'space-between' : 'center'}
                    gap={isMobile ? 1 : 5}
                    mb={2}
                  >
                    <BorderGradientButton>
                      <img src="/images/icon/logo-discord.svg" alt="discord" />
                      Join Discord
                    </BorderGradientButton>
                    <BorderGradientButton>
                      {/* <img src="/images/icon/icon-global.png" alt="global" /> */}
                      Crew3
                    </BorderGradientButton>
                  </Box>
                </Hidden>
                <Typography variant="h6" fontWeight={700} color={'white'}>
                  Start time:
                </Typography>
                <MintingCountdown
                  endTime={'2023-05-31T00:00:00'}
                />
                {/* <Typography variant="h6" fontWeight={700} color={'white'}>
                  End time:
                </Typography>
                <MintingCountdown
                  endTime={'2023-06-15T00:00:00'}
                /> */}

                <Typography variant="body1" color={'#A0FFF4'} fontStyle={'italic'} mt={2}>
                  *** Claim schedule: 31st May, 2023
                </Typography>
                <Typography variant="body1" color={'white'} mt={2}>
                  Click <b>“Claim Now”</b> to Receive Free YouSUI NFTs.<br />
                  (Ready for Next Move, Check you own SUI on wallet)
                </Typography>
                <Typography variant="body1" color={'#A0FFF4'} fontStyle={'italic'} mt={2}
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
                <Hidden smDown>
                  <Box>
                    <NFTSlider />
                  </Box>
                  <ProcessBarBox
                    percent={62.5}
                    subtitle={<>
                      <Typography variant="body1" color={'white'}>
                        1250
                      </Typography>
                      <Typography variant="body1" color={'white'}>
                        TOTAL: 2000
                      </Typography>
                    </>}
                    sx={{ margin: '24px 0' }}
                  />
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={isMobile ? 'space-between' : 'center'}
                    gap={isMobile ? 1 : 5}
                  >
                    <BorderGradientButton>
                      {/* <img src="/images/icon/icon-twitter-normal.png" alt="twitter" /> */}
                      Join Discord
                    </BorderGradientButton>
                    <BorderGradientButton>
                      {/* <img src="/images/icon/icon-global.png" alt="global" /> */}
                      Crew3
                    </BorderGradientButton>
                  </Box>
                </Hidden>
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
    marginLeft: '-100%'
  },
  "& .slick-slide": {
    display: 'flex!important',
    justifyContent: 'center',
    position: 'relative',
    "& img": {
      width: 'min(100%,300px)',
    },
    "&.slick-active.slick-current": {
      transform: 'scale(0.75) translateX(100%)',
      transition: 'all 0.25s',
      filter: 'blur(3px)',
      opacity: 0.8,
      zIndex: 1
    },
    "&.slick-active.slick-current + .slick-slide": {
      transform: 'scale(1)',
      opacity: '1!important',
      zIndex: 2,
      transition: 'all 0.5s',
      "& img": {
        background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.4) -8.02%, rgba(109, 133, 218, 0.4) 98.69%)',
        backdropFilter: 'blur(15spx)',
        borderRadius: '10px',
      },
    },
    "&.slick-active.slick-current + .slick-slide + .slick-slide": {
      transform: 'scale(0.75) translateX(-100%)',
      filter: 'blur(3px)',
      opacity: 0.8,
      zIndex: 1,
      transition: 'all 0.25s',
    },
  },
  "& .slick-arrow.slick-next": {
    right: 0,
    zIndex: 3,
    width: '36px',
    height: '36px',
    "&:after": {
      content: "''",
      inset: '0px',
      position: 'absolute',
      borderRadius: '50%',
      background: '#041224',
      WebkitMask:
        'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
      zIndex: '0',
      border: '1px solid #22DAD1',
    },
    "&:before": {
      color: '#22DAD1',
      fontSize: '24px',
      content: "'\\276F'",
      zIndex: 1,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -60%)',
    },
    "&:hover": {
      "&:before": {
        color: '#041224',
      },
      "&:after": {
        background: 'linear-gradient(0deg, #00C5D3 81.61%, #42EECF 94.62%)',
      },
    },
  },
  "& .slick-arrow.slick-prev": {
    left: 0,
    zIndex: 3,
    width: '36px',
    height: '36px',
    "&:before": {
      color: '#22DAD1',
      fontSize: '24px',
      content: "'\\276E'",
      zIndex: 1,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -60%)',
    },
    "&:after": {
      content: "''",
      inset: '0px',
      position: 'absolute',
      borderRadius: '50%',
      background: '#041224',
      WebkitMask:
        'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
      zIndex: '0',
      border: '1px solid #22DAD1',
    },
    "&:hover": {
      "&:before": {
        color: '#041224',
      },
      "&:after": {
        background: 'linear-gradient(0deg, #00C5D3 81.61%, #42EECF 94.62%)',
      },
    },

  },

  [theme.breakpoints.down("sm")]: {
    // marginTop: 32,
    "& .slick-slide": {
      "& img": {
        width: 'min(100%,200px)',
      },
      "&.slick-active.slick-current": {
        transform: 'scale(0.65) translateX(110%)',
      },
      "&.slick-active.slick-current + .slick-slide": {
        transform: 'scale(1)',
      },
      "&.slick-active.slick-current + .slick-slide + .slick-slide": {
        transform: 'scale(0.65) translateX(-110%)',
      },
    },
  }

}));

function NFTSlider() {
  const [selectedNft, setSelectedNft] = useState(0);
  const nftSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    autoplay: true,
    arrows: true,
    afterChange: function (index) {
      setSelectedNft(index);
    },
  };
  return (
    <SliderCustom {...nftSliderSettings}>
      {nftImage.map((item, index) => (
        <Box sx={{ position: 'relative', display: 'flex!important', justifyContent: 'center' }} key={index}>
          <img
            alt={item.label}
            src={item.src}
          />
        </Box>
      ))}
    </SliderCustom>
  )
}