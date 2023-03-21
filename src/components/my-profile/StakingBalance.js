import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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
        <Box sx={{ marginBottom: 12 }}>
            <TitleSection title="STAKING BALANCE" />
            <StakingBalanceCard>
                <Box sx={{ margin: 'auto' }}>
                    <Typography sx={{ fontSize: 24, lineHeight: '35px', color: 'white' }}>$XUI Staked</Typography>
                    <Typography
                        sx={{
                            fontSize: 90,
                            color: 'white',
                            fontWeight: 'bold',
                            textShadow: '2px 3px 5px rgb(0,0,0,0.2)',
                            background: 'linear-gradient(to top, #CCCCCC 0%, #FFFFFF 50%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        150.000
                    </Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ height: 240, margin: '0 160px', borderColor: 'rgba(0, 0, 0, 0.3)' }}
                />
                <Box sx={{ margin: 'auto' }}>
                    <Typography sx={{ fontSize: 24, lineHeight: '35px', color: 'white' }}>Holding $XUI</Typography>
                    <Typography
                        sx={{
                            fontSize: 90,
                            color: 'white',
                            fontWeight: 'bold',
                            textShadow: '2px 3px 5px rgb(0,0,0,0.2)',
                            background: 'linear-gradient(to top, #e3e1e1 0%, #FFFFFF 50%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        80.000
                    </Typography>
                </Box>
            </StakingBalanceCard>
        </Box>
    );
};
