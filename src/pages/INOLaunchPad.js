import { Box, Container, Stack, Typography, styled } from '@mui/material';
import Page from 'components/common/Page';
import { ButtonTitleBox, FrameButton, SectionBox } from 'components/home-v2/HomeStyles';
import ApplyAsProject from 'components/ino/ApplyAsPorject';
import JoinAnIDO from 'components/ino/JoinAnIDO';
import UpComing from 'components/ino/UpComing';
import WhyJoin from 'components/ino/WhyJoin';
import useResponsive from 'hooks/useResponsive';
import { Link } from 'react-router-dom';

const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    textShadow: '0 0 7px rgb(255,255,255,0.5)',
    '& .linear': {
        display: 'initial',
        background: 'linear-gradient(89.68deg, #81ECC5 0.23%, #94CBFF 49.95%, #8596FF 96.05%)',
        // background: 'linear-gradient(rgba(129, 236, 197, 1), rgba(148, 203, 255, 1), rgba(133, 150, 255, 1))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: '1.3',
    },
}));

const Launchpad = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
    fontSize: 32,
    lineHeight: '32px',
    fontWeight: 'bold',
    marginBottom: '32px',
}));

const Caption = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: 16,
    width: '70%',
    marginBottom: '32px',
    [theme.breakpoints.down(900)]: {
        width: '100%',
    },
}));

const INOLaunchPad = () => {
    const isDesktop = useResponsive('up', 'md');
    const isMobile = useResponsive('down', 'sm');

    return (
        <Page title="INO">
            <SectionBox
                sx={{
                    backgroundImage: "url('/full-ino.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                    color: 'white',
                }}
            >
                <Container maxWidth="xl" sx={{ paddingBottom: '108px' }}>
                    <Stack direction={{ lg: 'row' }} sx={{ pt: isDesktop ? 20 : 15 }}>
                        <Box sx={{ position: 'relative', zIndex: 1, color: 'white' }}>
                            <Title variant="h1">
                                <p className="linear" style={{ fontSize: 72, fontWeight: 'bold' }}>
                                    INO
                                </p>{' '}
                                <br />
                            </Title>
                            <Launchpad>Launchpad</Launchpad>

                            <Caption>
                                Don't miss out the opportunity to buy Special NFT at even cheaper prices Through INO
                                Launchpad. YouSUI promises that only High-Value NFTs will be on sale throught String DD
                                Regulation and Screening System.
                            </Caption>

                            <ButtonTitleBox sx={{ gap: '1rem', marginBottom: isDesktop ? 20 : 10 }}>
                                <Link to={'/staking'}>
                                    <FrameButton>Stake $XUI</FrameButton>
                                </Link>
                                <Link to={'/my-profile'}>
                                    <FrameButton>My Page</FrameButton>
                                </Link>
                            </ButtonTitleBox>
                        </Box>
                        <img
                            src="/ino-banner.png"
                            alt=""
                            style={{
                                width: '60%',
                                height: '60%',
                                margin: 'auto',
                                objectFit: 'cover',
                                marginBottom: isDesktop ? '48px' : '',
                            }}
                        />
                    </Stack>
                    <UpComing />
                    <JoinAnIDO />
                    <WhyJoin />
                    <ApplyAsProject />
                </Container>
            </SectionBox>
        </Page>
    );
};

export default INOLaunchPad;
