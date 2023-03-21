import { styled } from '@mui/material/styles';
import { Box, Divider, Typography } from '@mui/material';
import { TitleSection } from './TitleSection';

const StyledIDOParticipatedCard = styled(Box)(({ theme }) => ({
    border: '1px solid #00C5D3',
    borderRadius: '8px',
    padding: '64px 90px',
    display: 'flex',
    justifyContent: 'space-between',
    height: 280,
    alignItems: 'center',
}));

const StyledInfoTitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    height: 200,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    margin: '0 88px',
}));
export const CurrentStakingPool = () => {
    return (
        <Box>
            <TitleSection title="CURRENT STAKING POOL" />
            <StyledIDOParticipatedCard>
                <Box>
                    <StyledInfoTitle sx={{ color: 'white', fontSize: 24 }}>Days</StyledInfoTitle>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: 90,
                            fontWeight: 'bold',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        15
                    </Typography>
                </Box>
                <StyledDivider orientation="vertical" />
                <Box>
                    <StyledInfoTitle sx={{ color: 'white', fontSize: 24 }}>APR</StyledInfoTitle>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: 90,
                            fontWeight: 'bold',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        7%
                    </Typography>
                </Box>
                <StyledDivider orientation="vertical" />
                <Box>
                    <StyledInfoTitle sx={{ color: 'white', fontSize: 24 }}>Left</StyledInfoTitle>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: 90,
                            fontWeight: 'bold',
                            textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        8D
                    </Typography>
                </Box>
            </StyledIDOParticipatedCard>
        </Box>
    );
};
