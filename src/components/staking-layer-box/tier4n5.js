import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
const Tier1Wrapper = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(90deg, rgba(40, 140, 197, 0.15) 0%, rgba(93, 213, 229, 0.15) 100%)',
    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(50px)',
    borderRadius: '15px',
    padding: 28,
}));

const Tier1Title = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 38,
    fontWeight: 700,
    marginBottom: 16,
    [theme.breakpoints.down(600)]: {
        fontSize: 30,
    },
    [theme.breakpoints.down(456)]: {
        fontSize: 36,
    },
}));

const CaptionStaking = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 10px rgb(255,255,255,0.3)',
    [theme.breakpoints.down(600)]: {
        fontSize: 18,
    },
    [theme.breakpoints.down(456)]: {
        fontSize: 20,
    },
}));

const StakingAmount = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    fontSize: 24,
    fontWeight: 700,
    [theme.breakpoints.down(600)]: {
        fontSize: 20,
    },
    [theme.breakpoints.down(456)]: {
        fontSize: 24,
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

export const Tier4n5 = ({ tier, stakingAmount, logo, ...props }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.down(1400));
    const isMobile = useMediaQuery(theme.breakpoints.down(600));

    return (
        <Tier1Wrapper {...props}>
            <Box
                sx={{
                    display: 'flex',
                    [theme.breakpoints.down(1400)]: {
                        justifyContent: 'space-between',
                    },
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
                    <Tier1Title>{tier}</Tier1Title>

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                        <CaptionStaking>STAKING</CaptionStaking>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StakingAmount>{stakingAmount}</StakingAmount>
                            <img
                                src="/YouSUI-token.png"
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
                    src={logo}
                    alt="tier-1"
                    style={{
                        width: isMobile ? 180 : 220,
                        height: isMobile ? 180 : 220,
                        margin: isDesktop ? '0' : 'auto',
                    }}
                />
            </Box>
        </Tier1Wrapper>
    );
};
