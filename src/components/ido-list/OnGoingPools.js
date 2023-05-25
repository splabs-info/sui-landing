import { Box, Button, Divider, Grid, Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
const img = '/images/ido/sua-sale.jpg';

const AvatarBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: 24,
    padding: 24,
    background: 'linear-gradient(0deg, rgba(0, 197, 211, 0.12) 38.68%, rgba(66, 238, 207, 0.12) 94.62%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
}));

export default function OnGoingPools() {
    const isMobile = useResponsive('down', 'sm')
    const isDesktop = useResponsive('up', 'md')
    return (
        <Box mb={20} mt={10} position="relative">
            {/* <Link to="/"> */}
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>On-going</Typography>
                <TypographyGradient>Pools</TypographyGradient>
            </TitleBox>
            <Box
                sx={{
                    background:
                        'linear-gradient(128.67deg, rgba(104, 230, 184, 0.2) 10.81%, rgba(109, 133, 218, 0.2) 75.48%)',
                    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(25px)',
                    borderRadius: isMobile ? '20px' : '30px',
                    p: 4,
                    mt: 5,
                    '&:hover': {
                        background:
                            'linear-gradient(128.67deg, rgba(104, 230, 184, 0.5) 10.81%, rgba(109, 133, 218, 0.5) 75.48%)',
                    },
                }}
            >
                <Grid container alignItems={'center'} spacing={5}>
                    <Grid item md={4} xs={12} sx={{ position: 'relative' }}>
                        <AvatarBox>
                            <img
                                src={img}
                                style={{ width: '100%', height: '100%', }}
                                alt=""
                            />
                        </AvatarBox>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Typography variant="h4">PUBLIC ROUND (Beta)</Typography>
                        <ProcessBarBox
                            title={<>
                                <Typography>Progress</Typography>
                                <Typography>Participants: 4527</Typography>
                            </>}
                            percent={50}
                            subtitle={<>
                                <Typography>100% X</Typography>
                                <Typography>9499897.78/9500000 XUI</Typography>
                            </>}
                            sx={{ margin: isMobile ? '24px 0px' : '0px' }}
                        />
                        <Box
                            sx={{
                                background:
                                    'linear-gradient(98.21deg, rgba(104, 230, 184, 0.1) -9.15%, rgba(109, 133, 218, 0.1) 102.32%)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '15px',
                                p: 2,
                                mt: 2,
                            }}
                        >
                            <Grid container justifyContent="space-between" alignItems={'center'}>
                                <Grid item xs={12} sm={8}>
                                    <Stack spacing={1.5} sx={{ '& .MuiTypography-body1': { fontSize: isMobile ? '13px' : '16px' } }}>
                                        <Stack direction="row" justifyContent={'space-between'}>
                                            <Typography>
                                                Condition:
                                            </Typography>
                                            <Typography>
                                                --
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent={'space-between'}>
                                            <Typography>
                                                Minimum Purchase:
                                            </Typography>
                                            <Typography fontWeight={'bold'}>
                                                1,000 SUA
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent={'space-between'}>
                                            <Typography>
                                                Start at:
                                            </Typography>
                                            <Typography fontWeight={'bold'}>
                                                2023/04/20 17:00 (UTC +9)
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent={'space-between'}>
                                            <Typography>
                                                End at:
                                            </Typography>
                                            <Typography fontWeight={'bold'}>
                                                2023/04/20 17:00 (UTC +9)
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </Grid>
                                <Divider flexItem orientation={isMobile ? "horizontal" : "vertical"} />
                                <Grid item xs={12} sm={3}>
                                    <Stack spacing={1.5} alignItems={'center'} sx={{ marginTop: isMobile ? '24px' : '0px' }}>
                                        <Typography fontWeight={'bold'}>
                                            07D 12:31:12
                                        </Typography>
                                        <Button
                                            sx={{
                                                background:
                                                    'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
                                                borderRadius: '50px',
                                                color: 'white',
                                                padding: '12px 36px'
                                            }}
                                        >
                                            JOIN NOW
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* </Link> */}
        </Box>
    );
}
