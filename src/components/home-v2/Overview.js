import { Box, Container, Grid, Typography } from '@mui/material';
import { ImgTitleBox, NetworksGrid, SectionBox, TitleBox, TypographyGradient } from './HomeStyles';
import useResponsive from '../../hooks/useResponsive';
import Ecosystem from './Ecosystem';

const networksNumber = [
    {
        src: '/images/icon/icon-overview-1.png',
        label: 'Blockchains',
        amount: '18',
    },
    {
        src: '/images/icon/icon-overview-2.png',
        label: 'Total Fundraised',
        amount: '$ 2.5M',
    },
    {
        src: '/images/icon/icon-overview-3.png',
        label: 'Total Participant',
        amount: '3 K+',
    },
    {
        src: '/images/icon/icon-overview-4.png',
        label: 'Projects',
        amount: '3 +',
    },
];
export default function Overview() {
    const isMobile = useResponsive('down', 'sm');
    return (
            <Box
                sx={{
                    backgroundImage: "url('/images/background/homebg2.png')",
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                }}
            >
            <SectionBox>
                <Container maxWidth={'xl'}>
                    <Box mb={5} sx={{ position: 'relative' }}>
                        <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                        <TitleBox>
                            <Typography>YouSUI</Typography>
                            <TypographyGradient>Overview</TypographyGradient>
                        </TitleBox>
                    </Box>
                    <NetworksGrid>
                        <Grid container>
                            {networksNumber.map((detail, index) => (
                                <Grid
                                    item
                                    xs={6}
                                    sm={3}
                                    key={index}
                                    sx={{
                                        padding: '0 0.5rem',
                                        margin: '0.75rem 0',
                                        color: 'white',
                                        textAlign: 'center',
                                        borderRight: isMobile
                                            ? index % 2 === 0
                                                ? '1px solid rgba(45,145,200,0.3)'
                                                : 'none'
                                            : networksNumber.length !== index + 1
                                            ? '1px solid rgba(45,145,200,0.3)'
                                            : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <img src={detail.src} alt={detail.label} width={'50%'} />
                                    <Typography variant="h3">{detail.amount}</Typography>
                                    <Typography variant="body1">{detail.label}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </NetworksGrid>
                </Container>
            </SectionBox>
            <Ecosystem />
        </Box>
    );
}
