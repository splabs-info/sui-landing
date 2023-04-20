import { Box } from '@mui/material';
import Page from '../components/common/Page';
import {
    FeaturedBy,
    JoinSplabs,
    MultiChain,
    Networks,
    Platform,
    Projects,
    Roadmap,
    TitleMain,
    Tokenomics
} from '../components/home';
import useResponsive from '../hooks/useResponsive';

export default function Homepage() {
    const isDesktop = useResponsive('up', 'sm');
    return (
        <Page title="Home">
            <TitleMain />
            <Box
                sx={{
                    background: "url('/images/background/bg1.png')",
                    backgroundSize: isDesktop ? '100% 100%' : 'cover',
                }}
            >
                <Networks />
            </Box>
            <Box
                sx={{
                    background: 'transparent',
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
            </Box>
        </Page>
    );
}
