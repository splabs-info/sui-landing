import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { ComingSoonIDOCard } from './ComingSoon';
// const data = [
//     {
//         img: '/images/pools/pools-1.jpg',
//         title: 'Coming soon',
//         description: '',
//     },
//     {
//         img: '/images/pools/pools-2.jpg',

//         title: 'Coming soon',
//         description: '',
//     },
//     {
//         img: '/images/pools/pools-3.jpg',

//         title: 'Coming soon',
//         description: '',
//     },
//     {
//         img: '/images/pools/pools-4.jpg',

//         title: 'Coming soon',
//         description: '',
//     },
// ];
// const dataComing = [
//     {
//         img: '/images/comingsoon/coming-2.png',
//     },
//     {
//         img: '/images/comingsoon/coming-2.png',
//     },
//     {
//         img: '/images/comingsoon/coming-2.png',
//     },
//     {
//         img: '/images/comingsoon/coming-2.png',
//     },
// ];

export default function UpComingPools() {
    const isDesktop = useResponsive('up', 'md');
    const theme = useTheme();
    return (
        <Box my={20} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Upcoming</Typography>
                <TypographyGradient>Pools</TypographyGradient>
            </TitleBox>
            <Stack
                direction={{ lg: 'row', md: 'row', sm: 'column' }}
                justifyContent={{ lg: 'space-between', md: 'center' }}
                alignItems="center"
                flexWrap="wrap"
                sx={{
                    marginTop: 4,
                    // background:
                    //     'linear-gradient(0deg, rgba(234, 204, 248, 0.15) 0%, rgba(150, 224, 218, 0.15) 100%)',
                    // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
                    borderRadius: '16px',
                    // padding: '32px 64px',
                    [theme.breakpoints.down(1400)]: {
                        justifyContent: 'center',
                    },
                }}
            >
                <Box
                    sx={{
                        [theme.breakpoints.down(1400)]: {
                            marginBottom: '64px',
                        },
                    }}
                >
                    <img src="images/ido/up-coming.svg" alt="" />
                </Box>
                <ComingSoonIDOCard avatar="images/ido/coming-soon.svg" />
                <ComingSoonIDOCard avatar="images/ido/coming-soon.svg" />
                {/* <Box
                    sx={{
                        [theme.breakpoints.down(1400)]: {
                            marginBottom: '64px',
                        },
                    }}
                >
                    <img src="images/ino/upcoming-1.svg" alt="" />
                </Box> */}
            </Stack>
            {/* <Grid
        container
        spacing={2}
        mt={5}
      >
        {dataComing.map((item) => (
          <Grid
            item
            md={3}
            xs={6}
          >
            <Box
              sx={{
                p: 3.5,
                mt: isDesktop && 5,
                border: '1px solid #42EECF',
                background: 'rgba(20, 36, 54, 0.6)',
                borderRadius: '10px',
              }}
            >
              <Stack justifyContent={'center'} alignItems={'center'}
                minHeight={isDesktop ? '500px' : '200px'}>
                <img
                  src={item.img}
                  style={{ width: 'min(90%,200px)' }}
                  alt=""
                />
              </Stack>
            </Box>
          </Grid> */}
            {/* ))} */}
            {/* {data.map((item) => (
          <Grid
            item
            md={3}
            xs={6}
            sx={{
              [theme.breakpoints.down(480)]: {
                maxWidth: '100%',
              },
            }}
          >
            <Box
              sx={{
                p: 3.5,
                mt: 5,
                border: '1px solid #42EECF',
                background: 'rgba(20, 36, 54, 0.6)',
                borderRadius: '10px',
                position: 'relative',
                [theme.breakpoints.down(480)]: {
                  width: '100%',
                },
              }}
            >
              <Box position={'relative'}>
                <img
                  src={item.img}
                  style={{
                    borderRadius: '10px',
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'cover',
                  }}
                  alt=""
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    padding: '4px 16px ',
                    borderRadius: '9px',
                    background:
                      'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 48.78%, #5CBAF2 79.27%)',
                  }}
                >
                  <TextTypography variant="body1" fontSize={'0.9rem'}>
                    TBA
                  </TextTypography>
                </Box>
              </Box>
              <Typography mt={3} fontWeight={700}>
                {item.title}
              </Typography>
              <Box mt={1} mb={3}>
                <Typography variant="caption">{item.description}</Typography>
              </Box>
              <Box
                sx={{
                  background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
                  borderRadius: '10px',
                  mt: 2,
                  p: 2,
                }}
              >
                <Stack direction="row" justifyContent={'space-between'}>
                  <Typography>Min Allocation</Typography>
                  <Typography>--</Typography>
                </Stack>
                <Stack direction="row" justifyContent={'space-between'}>
                  <Typography>Max</Typography>
                  <Typography>--</Typography>
                </Stack>
                <Stack direction="row" justifyContent={'space-between'}>
                  <Typography>Access</Typography>
                  <Typography>--</Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
        ))} */}
            {/* </Grid> */}
        </Box>
    );
}
