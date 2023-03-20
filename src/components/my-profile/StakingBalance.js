import { styled } from '@mui/material/styles';
import { Box, Typography, Divider } from '@mui/material';

import { TitleSection } from './TitleSection';
const StakingBalanceCard = styled(Box)(({ theme }) => ({
    width: '100%',
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    borderRadius: 10,
    padding: '24px 48px 24px 48px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
}));
export const StakingBalance = () => {
    return (
        <Box sx={{ padding: 10 }}>
            <TitleSection title="STAKING BALANCE" />
            <StakingBalanceCard>
                <Box sx={{ margin: 'auto' }}>
                    <Typography sx={{ fontSize: 24, lineHeight: '35px', color: 'white' }}>$XUI Staked</Typography>
                    <Typography sx={{ fontSize: 90, color: 'white', fontWeight: 'bold' }}>150.000</Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ height: 240, margin: '0 160px', borderColor: 'rgba(0, 0, 0, 0.3)' }}
                />
                <Box sx={{ margin: 'auto' }}>
                    <Typography sx={{ fontSize: 24, lineHeight: '35px', color: 'white' }}>Holding $XUI</Typography>
                    <Typography sx={{ fontSize: 90, color: 'white', fontWeight: 'bold' }}>80.000</Typography>
                </Box>
            </StakingBalanceCard>
        </Box>
    );
};
