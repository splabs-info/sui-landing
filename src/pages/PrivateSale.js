import { Box, Container, Stack, Typography, styled } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import { BuyToken } from 'components/privateSale/BuyToken';
import { XUIUtility } from 'components/privateSale/XUIUtility';
import useResponsive from 'hooks/useResponsive';

const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    '& .linear': {
        display: 'initial',
        background: 'linear-gradient(89.68deg, #81ECC5 0.23%, #94CBFF 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: '1.3',
    },
}));

const Caption = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: 16,
    marginTop: 24,
    maxWidth: '400px',
    [theme.breakpoints.down(900)]: {
        width: '100%',
    },
}));
export default function PrivateSale() {
    const isMobile = useResponsive('down', 'sm');

    return (
        <Page title="Private Sale">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg3456.jpg')",
                    paddingTop: isMobile && 5,
                }}
            >
                <Box
                    component={'img'}
                    src="/images/background/bg-presale2.jpg"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        mixBlendMode: 'screen',
                        top: isMobile ? 120 : 40,
                        zIndex: 0,
                    }}
                />
                <Container maxWidth={'xl'} sx={{ zIndex: 1 }}>
                    <Stack direction={{ lg: 'row' }} sx={{ pt: isMobile ? 15 : 20, mb: isMobile ? 10 : 30 }}>
                        <Box sx={{ position: 'relative', zIndex: 1, color: 'white' }}>
                            <Typography variant="h2" fontWeight={600}>PRIVATE-SALE </Typography>
                            <Title variant="h1">
                                <p className="linear" style={{ fontSize: 72, fontWeight: 'bold' }}>
                                    XUI
                                </p>
                            </Title>
                            <Caption variant='h6'>
                                Get early access to XUI tokens and participate in promising projects directly on YouSUI.
                            </Caption>
                        </Box>
                    </Stack>
                    <BuyToken />
                    <XUIUtility />
                </Container>
            </SectionBox>
        </Page>
    );
}
