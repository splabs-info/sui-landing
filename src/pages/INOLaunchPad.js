import { Box, Container, styled, Typography } from '@mui/material';
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
    width: '35%',
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
            <SectionBox sx={{ backgroundImage: "url('/images/background/ido-list-header-bg.png')" }}>
                <Container maxWidth="xl">
                    <Box sx={{ position: 'relative', zIndex: 1, pt: isDesktop ? 20 : 15, color: 'white' }}>
                        <Title variant="h1">
                            <p className="linear" style={{ fontSize: 72, fontWeight: 'bold' }}>
                                INO
                            </p>{' '}
                            <br />
                        </Title>
                        <Launchpad>Launchpad</Launchpad>

                        <Caption>
                            Don't miss the opportunity to buy NFTs at even cheaper prices by staking XUI. YouSUI
                            promises that only high-value NFTs will be sold through strong DD Regulation.
                        </Caption>
                    </Box>
                    <ButtonTitleBox sx={{ gap: '1rem' }}>
                        <Link to={'/coming-soon'}>
                            <FrameButton>Stake $XUI</FrameButton>
                        </Link>
                        <Link to={'/coming-soon'}>
                            <FrameButton>KYC Checklist</FrameButton>
                        </Link>
                    </ButtonTitleBox>
                </Container>
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/bg-ido.png')", color: 'white', paddingTop: 0 }}>
                <Container maxWidth="xl">
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
