import { Box } from '@mui/material';
import Page from '../components/common/Page';
import WhitepaperContent from '../components/whitepaper';
import useResponsive from '../hooks/useResponsive';

export default function Whitepaper() {
    const isDesktop = useResponsive('up', 'sm');
    return (
        <Page title="Whitepaper">
            <Box
                sx={{
                    background: "url('/images/background/bg3.jpg')",
                    backgroundSize: 'cover',
                }}
            >
                <WhitepaperContent />
            </Box>
        </Page>
    );
}
