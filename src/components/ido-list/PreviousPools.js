import { Box, Divider, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TextTypography, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import CustomSlider from './CustomSlider';
const data = [
    {
        img: '/images/pools/pools-5.jpg',
        title: 'A Platform',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge… See more',
    },
    {
        img: '/images/pools/pools-6.jpg',
        title: 'A Platform',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge… See more',
    },
    {
        img: '/images/pools/pools-7.jpg',
        title: 'A Platform',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge… See more',
    },
    {
        img: '/images/pools/pools-8.jpg',
        title: 'A Platform',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge… See more',
    },
];

export default function PreviousPools() {
    const soldDot = 100;
    return (
        <Box my={20} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Previous</Typography>
                <TypographyGradient>Pools</TypographyGradient>
            </TitleBox>
            <Grid container spacing={2}>
                {data.map((item) => (
                    <Grid item md={6} xs={12}>
                        <Box
                            sx={{
                                p: '1px',
                                mt: 5,
                                border: '1px solid #42EECF',
                                background: 'linear-gradient(323.96deg, #5394CF 0%, #8CE9C7 89.18%)',
                                borderRadius: '10px',
                            }}
                        >
                            <Box sx={{ background: '#142436', borderRadius: '10px' }} p={2}>
                                <Grid container spacing={2}>
                                    <Grid item sx={{ position: 'relative' }}>
                                        <img
                                            src={item.img}
                                            style={{
                                                borderRadius: '10px',
                                                width: 200,
                                                height: 200,
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
                                                Coming Soon
                                            </TextTypography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography mt={3} fontWeight={700}>
                                            {item.title}
                                        </Typography>
                                        <Box mt={1} mb={3}>
                                            <Typography variant="caption">{item.description}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box p={2}>
                                <Grid container justifyContent={'space-between'}>
                                    <Grid item xs={5.5}>
                                        <Typography>Total raise</Typography>
                                        <Typography variant="h5">237,497.44 USDT</Typography>
                                    </Grid>
                                    <Divider flexItem orientation="vertical" sx={{ background: '#fff' }} />
                                    <Grid item xs={5.5}>
                                        <Stack direction={'row'} alignItems="center">
                                            <Typography mr={1}>Maximum:</Typography>
                                            <Typography variant="body" fontWeight={700}>
                                                1,939.85 USDT
                                            </Typography>
                                        </Stack>
                                        <Stack direction={'row'} alignItems="center">
                                            <Typography mr={1}>Access:</Typography>
                                            <Typography variant="body" fontWeight={700}>
                                                Public
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Box mt={3}>
                            <CustomSlider
                                color="linear-gradient(60.84deg, rgba(91, 210, 218, 0.8) 17.27%, rgba(128, 255, 217, 0.8) 59.07%, rgba(255, 255, 255, 0.8) 100%)"
                                disabledBorder={true}
                                disabledMark={true}
                                value={Number(100)}
                                max={Number(100)}
                                height={14}
                                sx={{
                                    '&::after': {
                                        left: soldDot > 0 ? `${soldDot}%` : '0',
                                        display: soldDot > 0 ? 'block' : 'none',
                                        marginLeft: soldDot === 100 ? '-1.25rem' : `-${soldDot / 100}rem`,
                                    },
                                }}
                                title={
                                    <Stack direction="row" justifyContent="space-between" mb={1}>
                                        <Typography variant="caption">Progress</Typography>
                                        <Typography variant="caption">Max Participants: 4527</Typography>
                                    </Stack>
                                }
                            />
                            <Stack direction="row" justifyContent="space-between" mt={1}>
                                <Typography variant="caption">100%</Typography>
                                <Typography variant="caption">9499897.78/9500000 ATK</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
