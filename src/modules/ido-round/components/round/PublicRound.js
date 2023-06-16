
import { Box } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { BuyTokenPublic } from './BuyTokenPublic';
import { CircleBox } from './CircleBox';
export const PublicRound = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box>
            <CircleBox />
            <BuyTokenPublic />
        </Box>
    );
};
