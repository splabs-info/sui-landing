import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useResponsive from 'hooks/useResponsive';
import { TitleSection } from './TitleSection';
const StakingBalanceCard = styled(Box)(({ theme }) => ({
    width: '100%',
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    borderRadius: 10,
    padding: '24px 48px 24px 48px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('816')]: {
        flexDirection: 'column',
        padding: '24px',
    },
}));

const StyledStakingBalanceInfo = styled(Typography)(({ theme }) => ({
    fontSize: 90,
    color: 'white',
    fontWeight: 'bold',
    textShadow: '2px 3px 5px rgb(0,0,0,0.2)',
    background: 'linear-gradient(to top, #CCCCCC 0%, #FFFFFF 50%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    [theme.breakpoints.down('xl')]: {
        fontSize: 80,
    },
    [theme.breakpoints.down('md')]: {
        fontSize: 72,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 48,
    },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    height: 240,
    margin: '0 160px',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('xl')]: {
        margin: '0 120px',
    },
    [theme.breakpoints.down('md')]: {
        margin: '0 80px',
    },
    [theme.breakpoints.down('816')]: {
        height: 16,
        marginTop: 32,
        marginBottom: 32,
    },
}));
export const StakingBalance = () => {
    const tablet = useResponsive('down', 'md');
    // const theme = useTheme();
    // const tablet = theme.breakpoints.down('md');
    console.log('tablet', tablet);
    return (
        <Box sx={{ marginBottom: 12 }}>
            <TitleSection title="STAKING BALANCE" />
            <StakingBalanceCard>
                <Box sx={{ margin: 'auto' }}>
                    <Typography sx={{ fontSize: 24, lineHeight: '35px', color: 'white' }}>$XUI Staked</Typography>
                    <StyledStakingBalanceInfo>0</StyledStakingBalanceInfo>
                </Box>
                <StyledDivider orientation={tablet ? '' : 'vertical'} variant="middle" flexItem />
                {/* <StyledDivider orientation="vertical" variant="middle" flexItem /> */}
                <Box sx={{ margin: 'auto' }}>
                    <Typography sx={{ fontSize: 24, lineHeight: '35px', color: 'white' }}>Holding $XUI</Typography>
                    <StyledStakingBalanceInfo>0</StyledStakingBalanceInfo>
                </Box>
            </StakingBalanceCard>
        </Box>
    );
};
