import { TabContext } from '@mui/lab';
import { Box, Container, styled, Tab, Typography } from '@mui/material';
import Page from 'components/common/Page';
import { ButtonTitleBox, CustomTabList, FrameButton, TextTypography } from 'components/home-v2/HomeStyles';
import OnGoingPools from 'components/ido-list/OnGoingPools';
import PreviousPools from 'components/ido-list/PreviousPools';
import UpComingPools from 'components/ido-list/UpComingPools';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { Link } from 'react-router-dom';

export default function IDOList() {
    const isDesktop = useResponsive('up', 'md');

    return (
        <Page title="IDO list">
            <Background2>
                <Background />
                <Container maxWidth='xl'>
                    <Box sx={{ position: 'relative', zIndex: 1, pt: 30 }}>
                        <Title variant="h2">
                            Enter <p className="linear">the multi chain</p> <br />
                            based Launchpad
                        </Title>
                    </Box>
                    <ButtonTitleBox sx={{ gap: '1rem' }}>
                        <a href="https://1wcod92hu2t.typeform.com/to/yrmuPiG6" target="_blank" rel="noreferrer" >
                            <FrameButton>Apply for Launchpad</FrameButton>
                        </a>
                        <Link to={'/coming-soon'}>
                            <FrameButton>Buy $ XUI</FrameButton>
                        </Link>
                        <Link to={'/whitepaper'}>
                            <FrameButton>Whitepaper</FrameButton>
                        </Link>
                    </ButtonTitleBox>

                    <Questions />
                    <OnGoingPools />
                    <UpComingPools />
                    <PreviousPools />
                </Container>
            </Background2>
        </Page>
    );
}

const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    '& .linear': {
        display: 'initial',
        background: 'linear-gradient(rgba(129, 236, 197, 1), rgba(148, 203, 255, 1), rgba(133, 150, 255, 1))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: '1.3',
    },
}));

const Background = styled(Box)(({ theme }) => ({
    backgroundImage: "url('/images/background/ido-list-header-bg.png')",
    minHeight: '100vh',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    top: '72px',
    position: 'absolute',
    zIndex: 0,
    width: '100%',
}));

const Background2 = styled(Box)(({ theme }) => ({
    backgroundImage: "url('/images/background/ido-list-bg.png')",
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    backgroundPosition: 'top',
}));

const Questions = () => {
    const isDesktop = useResponsive('up', 'md');

    const [tabIndex, setTabIndex] = React.useState('0');

    const handleChange = (event, newValue) => {
        setTabIndex(newValue.toString());
    };

    return (
        <Box mt={20}>
            <TabContext value={tabIndex}>
                <Box>
                    <CustomTabList
                        onChange={handleChange}
                        indicatorColor="none"
                        variant={isDesktop ? 'fullWidth' : 'scrollable'}
                        scrollButtons="auto"
                    >
                        <Tab
                            value="0"
                            label={
                                <div>
                                    <TextTypography variant="body1">How to get started ?</TextTypography>
                                    <TextTypography variant="body2">Learn more</TextTypography>
                                </div>
                            }
                        />
                        <Tab
                            value="1"
                            label={
                                <div>
                                    <TextTypography variant="body1">What is Tier System ?</TextTypography>
                                    <TextTypography variant="body2">Learn more</TextTypography>
                                </div>
                            }
                        />
                        <Tab
                            value="2"
                            label={
                                <div>
                                    <TextTypography variant="body1">How to join IDO ?</TextTypography>
                                    <TextTypography variant="body2">Learn more</TextTypography>
                                </div>
                            }
                        />
                        <Tab
                            value="3"
                            label={
                                <div>
                                    <TextTypography variant="body1">What is YouSUI ?</TextTypography>
                                    <TextTypography variant="body2">Learn more</TextTypography>
                                </div>
                            }
                        />
                    </CustomTabList>
                </Box>
            </TabContext>
        </Box>
    );
};
