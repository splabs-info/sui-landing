import { Box, LinearProgress, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

const StyledProcessBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    padding: 40,
    color: 'white',
    width: 1200,
    borderRadius: 10,
    boxShadow: 'rgba(0, 0, 0, 0.25)',
    position: 'relative',
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(0, 197, 211, 1) 0%, rgba(66, 238, 207, 1) 100%)',
    borderRadius: 32,
    height: 32,
}));

export const ProcessBox = () => {
    return (
        <StyledProcessBox>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                <Typography sx={{ fontSize: 16, lineHeight: '24px', color: 'white' }}>Process</Typography>
                <Typography sx={{ fontSize: 16, lineHeight: '24px', color: 'white' }}>
                    Max Participants: 4527
                </Typography>
            </Box>

            <StyledLinearProgress variant="determinate" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                <Typography sx={{ fontSize: 16, lineHeight: '24px', color: 'white' }}>100.00%</Typography>
                <Typography sx={{ fontSize: 16, lineHeight: '24px', color: 'white' }}>
                    9499897.78/9500000 ATK
                </Typography>
            </Box>
        </StyledProcessBox>
    );
};
