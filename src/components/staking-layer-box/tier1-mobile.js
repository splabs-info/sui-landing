import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const Tier1Wrapper = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.55) 0%, rgba(109, 133, 218, 0.55) 100%)',
    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
    // dropShadow: '0px 0px 20px rgba(140, 255, 227, 0.5)',
    backdropFilter: 'blur(50px)',
    borderRadius: '15px',
    padding: 32,
    [theme.breakpoints.down(1400)]: {
        width: '60%',
    },
    [theme.breakpoints.down(1200)]: {
        width: '80%',
    },
    [theme.breakpoints.down(900)]: {
        width: '100%',
    },
}));

const Tier1Title = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 48,
    fontWeight: 700,
    marginBottom: 16,
    [theme.breakpoints.down(600)]: {
        fontSize: 32,
    },
    [theme.breakpoints.down(456)]: {
        fontSize: 40,
    },
}));

const CaptionStaking = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 10px rgb(255,255,255,0.3)',
    [theme.breakpoints.down(600)]: {
        fontSize: 20,
    },
    [theme.breakpoints.down(456)]: {
        fontSize: 24,
    },
}));

const StakingAmount = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    fontSize: 26,
    fontWeight: 700,
    [theme.breakpoints.down(600)]: {
        fontSize: 20,
    },
    [theme.breakpoints.down(456)]: {
        fontSize: 26,
    },
}));

const Lottery = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 24,
    display: 'flex',
    alignItems: 'end',
    marginBottom: 10,
    marginRight: 24,
    [theme.breakpoints.down(600)]: {
        fontSize: 18,
        marginRight: 0,
    },
    [theme.breakpoints.down(456)]: {
        fontSize: 24,
    },
}));

export const Tier1Mobile = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(600));
    return (
        <Tier1Wrapper>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    [theme.breakpoints.down(456)]: {
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginRight: '48px',
                        [theme.breakpoints.down(456)]: {
                            textAlign: 'center',
                            marginRight: 0,
                        },
                    }}
                >
                    <Tier1Title>Tier 1</Tier1Title>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'end',
                            [theme.breakpoints.down(456)]: {
                                textAlign: 'center',
                                marginRight: 0,
                            },
                        }}
                    >
                        <CaptionStaking>STAKING</CaptionStaking>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StakingAmount>120.000</StakingAmount>
                            <img
                                src="/images/home/YouSUI-token.png"
                                alt="token"
                                style={{
                                    width: isMobile ? 40 : 56,
                                    height: isMobile ? 40 : 56,
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Lottery>LOTTERY</Lottery>
                <img
                    src="/images/staking/tier-1.png"
                    alt="tier-1"
                    style={{
                        width: isMobile ? 180 : 240,
                        height: isMobile ? 180 : 240,
                    }}
                />
            </Box>
        </Tier1Wrapper>
    );
};
