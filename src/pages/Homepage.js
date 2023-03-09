import React from 'react';
import {
    TitleMain,
    MultiChain,
    Tokenomics,
    Partner,
    Networks,
    Projects,
    Platform,
    JoinSplabs,
    Roadmap,
    FeaturedBy,
} from '../components/home';
import { Box } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Page from '../components/common/Page';

export default function Homepage() {
    const isDesktop = useResponsive('up', 'sm');
    return (
        <Page title="Home">
            <TitleMain />
            <Box
                sx={{
                    background: "url('/images/background/bg1.jpg')",
                    backgroundSize: isDesktop ? '100% 100%' : 'cover',
                }}
            >
                <Networks />
            </Box>
            <Box
                sx={{
                    background: "url('/images/background/bg2.jpg')",
                    backgroundSize: isDesktop ? '100% 100%' : 'cover',
                }}
            >
                <Platform />
            </Box>
            <Box
                sx={{
                    background: "url('/images/background/bg3.png')",
                    backgroundSize: isDesktop ? '100% 100%' : 'cover',
                }}
            >
                <JoinSplabs />
                <MultiChain />
                <Roadmap />
            </Box>
            <Box
                sx={{
                    background: "url('/images/background/bg4.jpg')",
                    backgroundSize: isDesktop ? '100% 100%' : 'cover',
                }}
            >
                <Tokenomics />
            </Box>
            <Box
                sx={{
                    background: "url('/images/background/bg5.jpg')",
                    backgroundSize: isDesktop ? '100% 100%' : 'cover',
                }}
            >
                <Projects />
                <FeaturedBy />
                <Partner />
            </Box>
        </Page>
    );
}
