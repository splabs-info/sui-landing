import { Box, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from './HomeStyles';
const platforms = [
    {
        label: 'A Platform',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.',
        minAllocation: '0.01',
        maxAllocation: 'TBA',
        access: 'Public',
    },

    {
        label: 'A Platform',
        description:
            'A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.',
        minAllocation: '0.01',
        maxAllocation: 'TBA',
        access: 'Public',
    },
];
export default function UpcomingPools() {
    const isDesktop = useResponsive('up', 'md');
    const theme = useTheme();
    return (
        <SectionBox
            pt={isDesktop ? 10 : 3}
            pb={isDesktop ? 5 : 3}
            sx={{
                backgroundImage: "url('/images/background/homebg5.png')",
                backgroundSize: isDesktop ? '100% 100%' : 'cover',
            }}
        >
            <Container maxWidth={'xl'}>
                <Box mb={5} sx={{ position: 'relative' }}>
                    <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                    <TitleBox>
                        <Typography> Upcoming</Typography>
                        <TypographyGradient>Pools</TypographyGradient>
                    </TitleBox>
                </Box>
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
                    <img src="images/ino/upcoming.svg" alt=''/>
                </Box>
                <Box
                    sx={{
                        [theme.breakpoints.down(1400)]: {
                            marginBottom: '64px',
                        },
                    }}
                >
                    <img src="images/ino/upcoming-1.svg" />
                </Box>
                <Box>
                    <img src="images/ino/upcoming-1.svg" />
                </Box>
                </Stack>
                {/* <Grid container spacing={3} mt={4}>
                    {platforms.map((platform, index) => (
                        <Grid item key={index} md={6} sm={6} xs={12} minHeight={'100%'}>
                            <Box
                                sx={{
                                    maxHeight: '390px',
                                    background: 'linear-gradient(0deg, #00C5D3 81.61%, #42EECF 94.62%);',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    padding: '2px',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        height: '100%',
                                        maxHeight: '387px',
                                        overflow: 'hidden',
                                        borderRadius: '15px',
                                    }}
                                >
                                    <img
                                        src={`./images/pools/pools-sui-${index + 1}.png`}
                                        alt={platform.label}
                                        width={'100%'}
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
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid> */}
            </Container>
        </SectionBox>
    );
}
