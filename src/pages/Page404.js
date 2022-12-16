import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography, Container, Box } from '@mui/material';
import { AppButton } from '../components/home/HomeStyles';
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
          background: "url('/images/background/bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#121A27",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          color: 'white'
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
              src="/images/comingsoon/404.png"
              sx={{ width: 'min(550px, 100%)', mx: 'auto', mb: '2rem' }}
            />
            <AppButton
              to="/"
              size="large"
              variant="contained"
              component={RouterLink}

            >
              Go to Home
            </AppButton>
          </ContentStyle>
        </Container>
      </Box>
    </Page>
  );
}
