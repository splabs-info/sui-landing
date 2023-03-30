import { Box, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import { useTheme } from '@mui/material/styles';
import { TextTypography } from 'components/home-v2/HomeStyles';
const img = '/images/pools/pools-1.jpg';

const data = [
    {
        img: '/images/pools/pools-1.jpg',
        title: '',
        description:
            '',
    },
    {
        img: '/images/pools/pools-2.jpg',
        title: '',
        description:
            '',
    },
    {
        img: '/images/pools/pools-3.jpg',
        title: '',
        description:
            '',
    },
    {
        img: '/images/pools/pools-4.jpg',
        title: '',
        description:
            '',
    },
];

export default function UpComingPools() {
    const theme = useTheme();

    return (
        <Box my={20} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Upcoming</Typography>
                <TypographyGradient>Pools</TypographyGradient>
            </TitleBox>
            <Grid
                container
                spacing={2}
                sx={{
                    [theme.breakpoints.down(480)]: {
                        flexDirection: 'column',
                    },
                }}
            >
                {data.map((item) => (
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
                            {/* <Box
                                sx={{
                                    position: 'absolute',
                                    top: 4,
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
                            </Box> */}
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
                ))}
            </Grid>
        </Box>
    );
}
