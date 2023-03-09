import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TitleBox, TypographyGradient, ImgTitleBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
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
                    <ContentStyle>
                        <Box mb={8} sx={{ position: 'relative', margin: '0 auto' }}>
                            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                            <TitleBox>
                                <Typography>Coming</Typography>
                                <TypographyGradient>Soon</TypographyGradient>
                            </TitleBox>
                        </Box>
                    </ContentStyle>
                </Container>
            </Box>
        </Page>
    );
}
