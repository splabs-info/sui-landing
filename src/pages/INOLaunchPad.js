import { Box, Container, styled, Typography } from '@mui/material';
import Page from 'components/common/Page';
import { ButtonTitleBox, FrameButton, SectionBox } from 'components/home-v2/HomeStyles';
import JoinAnIDO from 'components/ino/JoinAnIDO';
import UpComing from 'components/ino/UpComing';
import WhyJoin from 'components/ino/WhyJoin';
import useResponsive from 'hooks/useResponsive';
import { Link } from 'react-router-dom';

const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    textShadow: '0 0 7px rgb(255,255,255,0.5)',
    fontSize: 80,
    '& .linear': {
        display: 'initial',
        background: 'linear-gradient(rgba(129, 236, 197, 1), rgba(148, 203, 255, 1), rgba(133, 150, 255, 1))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: '1.3',
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
                            <p className="linear">INO</p> <br />
                        </Title>
                        <Typography>Launchpad</Typography>

                        <Typography>
                            Don't miss the opportunity to buy NFTs at even cheaper prices by staking XUI. YouSUI
                            promises that only high-value NFTs will be sold through strong DD Regulation.
                        </Typography>
                    </Box>
                    <ButtonTitleBox sx={{ gap: '1rem' }}>
                        <a href="https://1wcod92hu2t.typeform.com/to/yrmuPiG6" target="_blank" rel="noreferrer">
                            <FrameButton>Apply for Launchpad</FrameButton>
                        </a>
                        <Link to={'/coming-soon'}>
                            <FrameButton>Buy $ XUI</FrameButton>
                        </Link>
                        <Link to={'/whitepaper'}>
                            <FrameButton>Whitepaper</FrameButton>
                        </Link>
                    </ButtonTitleBox>
                </Container>
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/bg-ido.png')", color: 'white', paddingTop: 0 }}>
                <Container maxWidth="xl">
                    <UpComing />
                    <JoinAnIDO />
                    <WhyJoin />
                </Container>
            </SectionBox>
        </Page>
    );
};

export default INOLaunchPad;
