import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useResponsive from 'hooks/useResponsive';
import { TitleSection } from './TitleSection';

const StyledIDOParticipatedCard = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    border: '1px solid #00C5D3',
    borderRadius: '8px',
    padding: '64px 90px',
    display: 'flex',
    justifyContent: 'space-between',
    height: 280,
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        padding: '15px',
        height: 'auto',
    },
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
    [theme.breakpoints.down('md')]: {
        margin: '0 10px',
        height: 150,
    },
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontSize: 90,
    fontWeight: 'bold',
    textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
    [theme.breakpoints.down('md')]: {
        fontSize: '4rem',
    },
}));

export const CurrentStakingPool = () => {
    const isTablet = useResponsive('down', 'lg');

    return (
        <Box sx={{ flexBasis: isTablet ? '100%' : 'auto' }}>
            <TitleSection title="CURRENT STAKING POOL" />
            <StyledIDOParticipatedCard>
                <Box>
                    <StyledInfoTitle sx={{ color: 'white', fontSize: 24 }}>Days</StyledInfoTitle>
                    <StyledInfo>15</StyledInfo>
                </Box>
                <StyledDivider orientation="vertical" />
                <Box>
                    <StyledInfoTitle sx={{ color: 'white', fontSize: 24 }}>APR</StyledInfoTitle>
                    <StyledInfo>7%</StyledInfo>
                </Box>
                <StyledDivider orientation="vertical" />
                <Box>
                    <StyledInfoTitle sx={{ color: 'white', fontSize: 24 }}>Left</StyledInfoTitle>
                    <StyledInfo>8D</StyledInfo>
                </Box>
            </StyledIDOParticipatedCard>
        </Box>
    );
};
