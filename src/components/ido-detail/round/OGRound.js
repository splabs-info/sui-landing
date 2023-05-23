import { Box } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { ProcessBox } from './ProcessBox';
import { BuyTokenOG } from './BuyTokenOG';
export const OGRound = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box>
            <ProcessBox />
            <BuyTokenOG />
        </Box>
    );
};
