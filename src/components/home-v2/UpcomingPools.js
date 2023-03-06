import { Box, Container, Grid, Typography } from '@mui/material';
import {
    ImgTitleBox,
    ComingPoolsBox,
    SectionBox,
    TextTypography,
    TitleBox,
    TypographyGradient,
    ComingPoolsChildBox,
    SpaceBetweenBox,
} from './HomeStyles';
import useResponsive from '../../hooks/useResponsive';
import { Background } from '../../constant/styled';
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
    return (
        <SectionBox
            pt={isDesktop ? 10 : 3}
            pb={isDesktop ? 5 : 3}
            sx={{
                backgroundImage: "url('/images/background/homebg4.jpg')",
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
                <Grid container spacing={3} mt={4}>
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
                                        src={`./images/pools/pools-${index + 1}.jpg`}
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
                </Grid>
            </Container>
        </SectionBox>
    );
}
