import { Box, LinearProgress, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

const StyledProcessBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    padding: '56px 40px',
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'relative',
    marginTop: 32
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
    borderRadius: 32,
    height: 24,
    boxShadow: '0px 0px 10px 2px rgba(152, 255, 230, 0.7)',
}));

const StyledExchangeRate = styled(Box)(({ theme }) => ({
    position: 'absolute',
    background:
        'linear-gradient(178.73deg, rgba(32, 123, 191, 1) 2.08%, rgba(74, 148, 203, 1)  32.81%, rgba(92, 186, 242, 1) 100%)',
    color: 'white',
    fontSize: 18,
    borderRadius: 10,
    padding: '7px 18px',
    fontWeight: 'bold',
    top: -20,
    right: 16,
}));

export const ProcessBox = () => {
    return (
        <StyledProcessBox>
            <StyledExchangeRate>1 XUI = 0.25 SUI</StyledExchangeRate>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1.5 }}>
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>Process</Typography>
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>
                    Max Participants: 4527
                </Typography>
            </Box>

            <StyledLinearProgress variant="determinate" component="p" />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1.5 }}>
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>100.00%</Typography>
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>
                    9499897.78/9500000 ATK
                </Typography>
            </Box>
        </StyledProcessBox>
    );
};

