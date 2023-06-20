import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ApplyButton } from 'components/header/HeaderStyles';
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

export default function Page404() {
    return (
        <Page title="404 Page Not Found">
            <Box
                sx={{
                    background: "url('/images/background/bg1.png')",
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
                    <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                        <Typography variant="h3" paragraph>
                            Sorry, page not found!
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            Sorry, we couldn’t find the page you’re looking for.
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            Perhaps you’ve mistyped the URL? Besure to check your spelling.
                        </Typography>
                        <Box
                            component="img"
                            sx={{ width: 'min(550px, 100%)', mx: 'auto', mb: '2rem' }}
                        />
                        <ApplyButton to="/" size="large" variant="contained" component={RouterLink}>
                            Go to Home
                        </ApplyButton>
                    </ContentStyle>
                </Container>
            </Box>
        </Page>
    );
}
