// import { Box, Divider, Grid, Typography } from '@mui/material';
// import { Stack } from '@mui/system';
// import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
// import useResponsive from 'hooks/useResponsive';
// import CustomSlider from './CustomSlider';
// const data = [
//   {
//     img: '/images/pools/logo-stepwatch.png',
//     title: "COMING SOON",
//     // title: 'STEPWATCH',
//     // description:
//     //   'StepWatch is a WEB3 fitness and health tracking mobile application that incorporates NFT Move-To-Earn and social networking elements. It is a place where you can get rewards through walking, jogging and gym.',
//   },
//   {
//     img: '/images/pools/logo-infi.png',
//     title: 'INFINITY GAMES',
//     description:
//       'Beyond the first game, Infinity Angel game, we are going to rebrand as Infinity Games 2.0. As a multi-game platform, Infinity Games plans to expand the ecosystem and maximize the utility of the $ING token by launching various games as well as Infinity Angel.',
//   },
//   {
//     img: '/images/pools/logo-airtnt.png',
//     title: 'AIRTNT',
//     description:
//       'AirTnT is a mobile application about travel social network built on WEB3 with the important emphasis on platforms that connect people who need to travel with people who want to share, providing products and services. tourism products (individuals, organizations).',
//   },
// ];

// export default function PreviousPools() {
//   const soldDot = 100;
//   const isMobile = useResponsive('down', 'sm')
//   const isDesktop = useResponsive('up', 'md')
//   return (
//     <Box mt={20} pb={20} position="relative">
//       <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
//       <TitleBox>
//         <Typography>Previous</Typography>
//         <TypographyGradient>Pools</TypographyGradient>
//       </TitleBox>
//       <Grid container spacing={2}>
//         {data.map((item) => (
//           <Grid item md={6} xs={12}>
//             <Box
//               sx={{
//                 p: '1px',
//                 mt: 5,
//                 border: '1px solid #42EECF',
//                 background: 'linear-gradient(323.96deg, #5394CF 0%, #8CE9C7 89.18%)',
//                 borderRadius: '10px',
//               }}
//             >
//               <Box sx={{ background: '#142436', borderRadius: '10px' }} p={2}>
//                 <Grid container spacing={2}>
//                   <Grid item sx={{ position: 'relative' }} xs={12} md={4}>
//                     <Stack justifyContent={'center'} alignItems='center'
//                       sx={{
//                         background: '#110F23',
//                         borderRadius: '10px',
//                         border: '1px solid #48595A',
//                         width: isMobile ? '100%' : 200,
//                         height: 200,
//                       }}>
//                       <img
//                         src={item.img}
//                         alt=""
//                         style={{ width: 'min(80%,200px)' }}
//                       />
//                     </Stack>
//                   </Grid>
//                   <Grid item xs={12} md={8}>
//                     <Stack justifyContent={'center'} alignItems='center' p={2} mb={isMobile && 1}>
//                       <Typography variant='h4' fontWeight={700} width='100%'>
//                         {item.title}
//                       </Typography>
//                       <Box mt={1}>
//                         <Typography variant="body2">{item.description}</Typography>
//                       </Box>
//                     </Stack>
//                   </Grid>
//                 </Grid>
//               </Box>
//               <Box p={4}>
//                 {/* <Grid container justifyContent={'space-between'}>
//                       <Grid item xs={5.5}>
//                           <Typography>Total raise</Typography>
//                           <Typography variant="h5">-- USDT</Typography>
//                       </Grid>
//                       <Divider flexItem orientation="vertical" sx={{ background: '#fff' }} />
//                       <Grid item xs={5.5}>
//                           <Stack direction={'row'} alignItems="center">
//                               <Typography mr={1}>Maximum:</Typography>
//                               <Typography variant="body" fontWeight={700}>
//                                   USDT
//                               </Typography>
//                           </Stack>
//                           <Stack direction={'row'} alignItems="center">
//                               <Typography mr={1}>Access:</Typography>
//                               <Typography variant="body" fontWeight={700}>
//                                   --
//                               </Typography>
//                           </Stack>
//                       </Grid>
//                   </Grid> */}
//               </Box>
//             </Box>
//             <Box mt={3}>
//               <CustomSlider
//                 color="linear-gradient(10deg, rgba(91, 210, 218, 0.8) 17.27%, rgba(128, 255, 217, 0.8) 59.07%, rgba(255, 255, 255, 0.8) 100%)"
//                 disabledBorder={true}
//                 disabledMark={true}
//                 value={Number(100)}
//                 max={Number(100)}
//                 height={14}
//                 sx={{
//                   '&::after': {
//                     left: soldDot > 0 ? `${soldDot}%` : '0',
//                     display: soldDot > 0 ? 'block' : 'none',
//                     marginLeft: soldDot === 100 ? '-1.25rem' : `-${soldDot / 100}rem`,
//                   },
//                   border: '2px solid #C8D4EC',
//                   boxShadow: '0 0 10px 2px rgb(255,255,255,0.7)',
//                 }}
//                 title={
//                   <Stack direction="row" justifyContent="space-between" mb={1}>
//                     <Typography variant="body2">Progress</Typography>
//                     <Typography variant="body2"></Typography>
//                   </Stack>
//                 }
//               />
//               <Stack direction="row" justifyContent="space-between" mt={1}>
//                 <Typography variant="body2">100%</Typography>
//                 <Typography variant="body2"></Typography>
//               </Stack>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

import { Box, Divider, Grid, Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import CustomSlider from './CustomSlider';
const data = [
    {
        img: '/images/ido/sua-sale.jpg',
        title: 'SUA (Test IDO)',
        description:
            'SUA is a token of Meta version. It has no intrinsic value or expectation of financial return. There is no official team or roadmap.',
    },
];
const AvatarBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: 8,
    width: '70%',
    padding: 12,
    background: 'linear-gradient(0deg, rgba(0, 197, 211, 0.12) 38.68%, rgba(66, 238, 207, 0.12) 94.62%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    }
}));


export default function PreviousPools() {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box mt={20} pb={20} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Previous</Typography>
                <TypographyGradient>Pools</TypographyGradient>
            </TitleBox>
            <Grid container spacing={5} mt={1}>
                {data.map((item, index) => (
                    <Grid item md={6} xs={12} key={index}>
                        <Box
                            sx={{
                                p: '1px',
                                border: '1px solid #42EECF',
                                background: 'linear-gradient(323.96deg, #5394CF 0%, #8CE9C7 89.18%)',
                                borderRadius: '10px',
                            }}
                        >
                            <Box
                                sx={{
                                    background: '#142436',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    gap: 3,
                                    alignItems: 'center',
                                    flexDirection: isMobile ? 'column' : 'row',
                                }}
                                p={2}
                            >
                                <AvatarBox>
                                    <img src={item.img} alt='' style={{ margin: 'auto' }} />
                                </AvatarBox>
                                <Box>
                                    <Typography variant="h3" fontWeight={700}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body1" mt={2}>{item.description}</Typography>
                                </Box>
                            </Box>
                            <Box p={3}>
                                {/* <Grid container justifyContent={'space-between'}>
                                    <Grid item xs={5.5}>
                                        <Typography>Total raise</Typography>
                                        <Typography variant="h5">-- USDT</Typography>
                                    </Grid>
                                    <Divider flexItem orientation="vertical" sx={{ background: '#fff' }} />
                                    <Grid item xs={5.5}>
                                        <Stack direction={'row'} alignItems="center">
                                            <Typography mr={1}>Maximum:</Typography>
                                            <Typography variant="body" fontWeight={700}>
                                                USDT
                                            </Typography>
                                        </Stack>
                                        <Stack direction={'row'} alignItems="center">
                                            <Typography mr={1}>Access:</Typography>
                                            <Typography variant="body" fontWeight={700}>
                                                --
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid> */}
                            </Box>
                        </Box>
                        <Box mt={3}>
                            <CustomSlider
                                color="linear-gradient(10deg, rgba(91, 210, 218, 0.8) 17.27%, rgba(128, 255, 217, 0.8) 59.07%, rgba(255, 255, 255, 0.8) 100%)"
                                disabledBorder={true}
                                disabledMark={true}
                                value={Number(100)}
                                max={Number(100)}
                                height={12}
                                sx={{
                                    border: '2px solid #B9E3E7',
                                    boxShadow: '0 0 10px 2px rgb(255,255,255,0.7)',
                                }}
                                title={
                                    <Stack direction="row" justifyContent="space-between" mb={1.5}>
                                        <Typography variant="body1">Progress</Typography>
                                        <Typography variant="body1">Max Participants: 1000</Typography>
                                    </Stack>
                                }
                            />
                            <Stack direction="row" justifyContent="space-between" mt={1.5}>
                                <Typography variant="body1">100%</Typography>
                                <Typography variant="body1">1000/1000 SUA</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
