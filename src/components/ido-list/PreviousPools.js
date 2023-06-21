
import { Box, Grid, Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
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
                                // cursor: 'pointer',
                            }}
                        // onClick={() => {
                        //     navigate('/ido-launchpad/sua')
                        // }}
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
