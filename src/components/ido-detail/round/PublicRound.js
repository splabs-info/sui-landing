
import { Box } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { ProcessBox } from './ProcessBox';
import { BuyToken } from './BuyToken';
export const PublicRound = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box>
            <BuyToken />
        </Box>
    );
};
