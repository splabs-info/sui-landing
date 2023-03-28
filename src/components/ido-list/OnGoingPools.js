import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import { Link } from 'react-router-dom';
import { TextTypography } from 'components/home-v2/HomeStyles';
const img = '/images/pools/pools-4.jpg';

export default function OnGoingPools() {
    return (
        <Box my={20} position="relative">
            <Link to="/pjt">
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
                        borderRadius: '50px',
                        p: 4,
                        mt: 5,
                        '&:hover': {
                            background:
                                'linear-gradient(128.67deg, rgba(104, 230, 184, 1) 10.81%, rgba(109, 133, 218, 1) 75.48%)',
                        },
                    }}
                >
                    <Grid container alignItems={'center'} spacing={5}>
                        <Grid item md={4} xs={12} sx={{ position: 'relative' }}>
                            <img
                                src={img}
                                style={{ borderRadius: '10px', width: '100%', maxHeight: 300, objectFit: 'cover' }}
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
                                    Coming Soon
                                </TextTypography>
                            </Box>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Typography variant="h5">A Platform</Typography>
                            <Typography>
                                A is the easiest and fastest approach for developers who want to experime Web3, enabling
                                the best addition of blockchain features to their games in a few minutes for the future
                                of gaming…
                            </Typography>
                            <Box
                                sx={{
                                    background:
                                        'linear-gradient(302.19deg, rgba(67, 38, 137, 0.3) 19.32%, rgba(16, 67, 96, 0.3) 80.68%);',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '15px',
                                    p: 2,
                                    mt: 2,
                                }}
                            >
                                <Grid container justifyContent="space-between" alignItems={'center'}>
                                    <Grid item xs={8}>
                                        <Stack direction="row" justifyContent={'space-between'}>
                                            <Typography>Min Allocation</Typography>
                                            <Typography>0.01</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent={'space-between'} my={2}>
                                            <Typography>Max</Typography>
                                            <Typography>TBA</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent={'space-between'}>
                                            <Typography>Access</Typography>
                                            <Typography>Public</Typography>
                                        </Stack>
                                    </Grid>
                                    <Divider flexItem orientation="vertical" />
                                    <Grid item xs={3}>
                                        <Button
                                            sx={{
                                                background:
                                                    'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
                                                borderRadius: '50px',
                                                color: 'white',
                                            }}
                                            fullWidth
                                        >
                                            JOIN NOW
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Link>
        </Box>
    );
}
