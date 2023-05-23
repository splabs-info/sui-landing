import { Box } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { ProcessBox } from './ProcessBox';
import { BuyToken } from './BuyToken';
export const OGRound = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box>
            <ProcessBox />
            <BuyToken />
        </Box>
    );
};
