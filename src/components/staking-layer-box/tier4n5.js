import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Tier1Wrapper = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(90deg, rgba(40, 140, 197, 0.15) 0%, rgba(93, 213, 229, 0.15) 100%)',
    boxShadow: 'inset 0px 0px 20px rgba(255, 255, 255, 0.3)',
    // dropShadow: '0px 0px 20px rgba(140, 255, 227, 0.5)',
    backdropFilter: 'blur(50px)',
    borderRadius: '15px',
    padding: 24,
}));

const Tier1Title = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 38,
    fontWeight: 700,
    marginBottom: 16,
}));

const CaptionStaking = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 10px rgb(255,255,255,0.3)',
}));

const StakingAmount = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    fontSize: 24,
    fontWeight: 700,
}));

const Lottery = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
    display: 'flex',
    alignItems: 'end',
    marginBottom: 10,
    marginRight: 24,
}));

export const Tier4n5 = ({ tier, stakingAmount }) => {
    return (
        <Tier1Wrapper>
            <Box sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginRight: '48px',
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
                                    width: 56,
                                    height: 56,
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Lottery>LOTTERY</Lottery>
                <img
                    src="Tier-1.png"
                    alt="tier-1"
                    style={{
                        width: 220,
                        height: 220,
                        margin: 'auto',
                    }}
                />
            </Box>
        </Tier1Wrapper>
    );
};
