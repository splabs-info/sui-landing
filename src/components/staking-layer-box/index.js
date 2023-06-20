import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { Tier1Mobile } from './tier1-mobile';
const Tier1Wrapper = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.55) 0%, rgba(109, 133, 218, 0.55) 100%)',
    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
    // dropShadow: '0px 0px 20px rgba(140, 255, 227, 0.5)',
    backdropFilter: 'blur(50px)',
    borderRadius: '15px',
    padding: 38,
    width: 320,
}));

const Tier1Title = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 10px rgb(255,255,255,0.7)',
    fontSize: 48,
    fontWeight: 700,
    marginBottom: 16,
}));

const CaptionStaking = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 10px rgb(255,255,255,0.3)',
}));

const StakingAmount = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
    fontSize: 32,
    fontWeight: 700,
}));

const Lottery = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 26,
    marginBottom: 16,
}));

export const Tier1 = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.down(1400));

    return (
        <>
            {isDesktop ? (
                <Tier1Mobile />
            ) : (
                <Tier1Wrapper>
                    <Tier1Title>Tier 1</Tier1Title>
                    <CaptionStaking>STAKING</CaptionStaking>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                        <StakingAmount>120.000</StakingAmount>
                        <img
                            src="/images/home/YouSUI-token.png"
                            alt="token"
                            style={{
                                width: 56,
                                height: 56,
                            }}
                        />
                    </Box>
                    <Box>
                        <Lottery>LOTTERY</Lottery>
                        <img
                            src="/images/staking/tier-1.png"
                            alt="tier-1"
                            style={{
                                width: 240,
                                height: 240,
                                margin: 'auto',
                            }}
                        />
                    </Box>
                </Tier1Wrapper>
            )}
        </>
    );
};
