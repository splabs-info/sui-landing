import { Box, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import { TypographyGradient } from 'components/home/HomeStyles';
import { ButtonTitleBox, CenterBox, FrameButton, SectionBox, TextTypography, TitleTypography } from './HomeStyles';

const Title = [
    <>
        Become{' '}
        <TypographyGradient sx={{ fontSize: '2.25rem', fontWeight: 'bold' }}>an early investor</TypographyGradient>{' '}
    </>,
    <>in the scalable Launchpad</>,
    <>
        to participate in{' '}
        <TypographyGradient sx={{ fontSize: '2.25rem', fontWeight: 'bold' }}>all Games</TypographyGradient> ,
    </>,
    <>
        <TypographyGradient sx={{ fontSize: '2.25rem', fontWeight: 'bold' }}>NFTs and Metaverse</TypographyGradient> in
        the world.
    </>,
];
const SubTitle = [
    'SUI works with projects with a high probability of success',
    'with enhanced Due Diligence and Regulation.',
];

export default function Intro() {
    const isDesktop = useResponsive('up', 'md');
    const isTablet = useResponsive('down', 'md');
    const isMobile = useResponsive('down', 'sm');

    return (
        <SectionBox
            sx={{
                backgroundImage: "url('/images/background/homebg1.jpg')",
                minHeight: '100vh',
                paddingTop: !isDesktop && 5,
            }}
        >
            <Container maxWidth={'xl'}>
                <Grid container sx={{ flexDirection: isMobile && 'column-reverse' }}>
                    <Grid
                        item
                        xs={12}
                        md={8}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center',
                            zIndex: 1,
                            '& .MuiBox-root': {
                                justifyContent: isMobile && 'center',
                                textAlign: isMobile && 'center',
                            },
                        }}
                    >
                        <Box mt={isMobile ? 5 : 12}>
                            {Title.map((item, i) => (
                                <TitleTypography key={i} variant="h1">
                                    {item}
                                    <br />
                                </TitleTypography>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                margin: '2rem 0',
                            }}
                        >
                            <TextTypography
                                variant={'body1'}
                                fontSize={isMobile && '0.9rem'}
                                fontWeight="500"
                                maxWidth={640}
                            >
                                YouSUI works with projects with a high probability of success with enhanced
                                <br /> Due Diligence and Regulation.
                            </TextTypography>
                        </Box>

                        <ButtonTitleBox sx={{ gap: '1rem' }}>
                            <Link to={'/coming-soon'}>
                                <FrameButton>Buy XUI</FrameButton>
                            </Link>
                            <Link to={'/coming-soon'}>
                                <FrameButton>Apply for Launchpad</FrameButton>
                            </Link>
                            <Link to={'/whitepaper'}>
                                <FrameButton>Whitepaper</FrameButton>
                            </Link>
                        </ButtonTitleBox>

                        <Box
                            mt={'3rem'}
                            sx={{
                                color: 'white',
                            }}
                        >
                            <Typography variant="body1" mr={2} fontSize={isMobile && '0.9rem'}>
                                {' '}
                                Powered by{' '}
                            </Typography>
                            <Box
                                mt={1}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: 2,
                                }}
                            >
                                {/* <img alt="gatekeeper" src="/images/home/gatechain.png" height={isMobile ? 40 : 60} />
                <img alt="gatekeeper" src="/images/home/gateio.png" height={isMobile ? 40 : 60} /> */}
                                <img alt="sui" src="/whitelogo.png" width={80} />
                            </Box>
                        </Box>
                        <Box
                            mt={'3rem'}
                            sx={{
                                color: 'white',
                            }}
                        >
                            <Typography variant="body1" mr={2} fontSize={isMobile && '0.9rem'}>
                                {' '}
                                Featured by{' '}
                            </Typography>
                            <Box
                                mt={1}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '33px',
                                }}
                            >
                                <img alt="sui" src="/featuredby1.png" height={isMobile ? 40 : 60} />
                                <img alt="sui" src="/featuredby2.png" height={isMobile ? 80 : 32} />
                                <img alt="sui" src="/bnb-white.png" height={isMobile ? 15 : 30} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={4} mt={isMobile && 5}>
                        {isMobile && (
                            <CenterBox>
                                <img
                                    alt="sui"
                                    src="/images/home/gatekeeper.png"
                                    style={{
                                        width: '60%',
                                        zIndex: 2,
                                    }}
                                />
                                <img
                                    alt="sui"
                                    src="/images/home/base-2.png"
                                    style={{
                                        position: 'absolute',
                                        width: '60%',
                                        top: '250px',
                                        zIndex: 1,
                                    }}
                                />
                            </CenterBox>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <img
                alt="sui"
                src="/images/home/home-bg-coins.png"
                style={{
                    position: 'absolute',
                    width: '40%',
                    right: 0,
                    display: isTablet && 'none',
                }}
            />
            <img
                alt="gatekeeper"
                src="/images/home/home-coins-others.png"
                className={'imgCoins'}
                style={{
                    position: 'absolute',
                    width: '40%',
                    right: 0,
                    display: isTablet && 'none',
                }}
            />
            <img
                alt="gatekeeper"
                src="/Token-YouSUI.png"
                className={'imgGate'}
                style={{
                    position: 'absolute',
                    width: '12%',
                    right: '12.5%',
                    display: isTablet && 'none',
                }}
            />
            <img
                alt=""
                src="/images/home/base-2.png"
                style={{
                    position: 'absolute',
                    width: '40%',
                    right: 0,
                    top: '80%',
                    display: isTablet && 'none',
                }}
            />
        </SectionBox>
    );
}
