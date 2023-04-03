import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ImgTitleBox } from 'components/home-v2/HomeStyles';
import { AppButton } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/common/Page';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: '800px',
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
}));
// ----------------------------------------------------------------------

export default function ComingSoon() {
    const isDesktop = useResponsive('up', 'md');
    return (
        <Page title="Coming Soon">
            <Box
                sx={{
                    background: "url('/images/comingsoon/bg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#121A27',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                    color: 'white',
                }}
            >
                <Container>
                    <ContentStyle>
                        <Box mb={8} sx={{ position: 'relative', margin: '0 auto', width: '100%' }}>
                            <ImgTitleBox
                                component={'img'}
                                src="/images/home/shape.png"
                                alt=""
                                sx={{ width: '260px !important', margin: 'auto', textAlign: 'center' }}
                            />
                            <img src="/images/comingsoon/coming-soon.png" alt="" style={{ width: '100%', margin: '0 auto' }} />

                        </Box>
                        <AppButton
                            to="/"
                            size="large"
                            variant="contained"
                            component={RouterLink}
                            sx={{ margin: '24px auto 0 auto', width: 148 }}
                        >
                            Go to Home
                        </AppButton>
                    </ContentStyle>
                </Container>
            </Box>
        </Page>
    );
}
