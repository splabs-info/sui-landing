import { Box, Container, Grid, Typography } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { ApplyButton, ButtonTitleBox, TypographyGradient } from './HomeStyles';

const Title = [
    'Become an early investor in the scalable',
    'Launchpad to participate in all Games,',
    'NFTs and Metaverse in the world.',
];
const SubTitle = [
    'YouSUI works with projects with a high probability of success with enhanced',
    'Due Diligence and Regulation.',
];

export default function TitleMain() {
    const isDesktop = useResponsive('up', 'sm');
    const isMaxDesktop = useResponsive('up', 'lg');
    const isTablet = useResponsive('down', 'md');
    const isMobile = useResponsive('down', 'sm');

    return (
        <Box
            sx={{
                background: "url('/images/background/homebg1.png')",
                backgroundSize: isDesktop ? '100% 100%' : 'cover',
                backgroundPosition: 'center',
                minHeight: isTablet ? 'unset' : '110vh',
            }}
            pt={isDesktop ? 10 : 5}
            pb={isDesktop ? 6 : 3}
        >
            <Container maxWidth={'lg'}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box mt={isDesktop ? 5 : 10} textAlign={'center'}>
                            {Title.map((item) => (
                                <TypographyGradient
                                    key={item}
                                    fontSize={isDesktop ? '2rem' : '1.5rem'}
                                    fontFamily="SVN-Gilroy-semi-bold"
                                >
                                    {item}
                                    <br />
                                </TypographyGradient>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                margin: '1rem 0',
                            }}
                        >
                            {SubTitle.map((item) => (
                                <Box
                                    key={item}
                                    component={'p'}
                                    sx={{
                                        color: 'white',
                                        fontSize: isMobile && '14px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {item}
                                </Box>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            mt={-4}
                        >
                            {/* <img alt="gatekeeper" src="/images/home/gatekeeper-rotate.gif" width={'30%'} /> */}
                        </Box>
                        <ButtonTitleBox>
                            <ApplyButton>Buy XUI</ApplyButton>
                            <ApplyButton>
                                <a href="https://1wcod92hu2t.typeform.com/to/yrmuPiG6" target="_blank">Apply for Launchpad</a>
                            </ApplyButton>
                            <ApplyButton>Whitepaper</ApplyButton>
                        </ButtonTitleBox>
                        <Box
                            mt={3}
                            sx={{
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="body1" mr={2}>
                                {' '}
                                Backed by{' '}
                            </Typography>
                            <img alt="sui" src="/images/whitelogo.png" width={120} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
