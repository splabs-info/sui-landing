import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container, Box } from '@mui/material';
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

export default function ComingSoon() {
  return (
    <Page title="Coming Soon">
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
            <Box
              component="img"
              src="/images/comingsoon/coming-soon.png"
              sx={{ width: 'min(800px, 100%)', mx: 'auto', mb: '2rem' }}
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
