import { Box, Divider, styled, Typography } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { TitleSection } from './TitleSection';

const StyledMyIDOBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    padding: '30px 75px',
    display: 'flex',
    justifyContent: 'space-between',
    // border: '1px solid #00C5D3',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '24px 48px',
    },
}));

const StyledTitleInfo = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    lineHeight: '23px',
    textAlign: 'center',
    color: 'white',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    height: 80,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 12,
        marginBottom: 16,
    },
}));

const StyledInfoBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export const MyINOArea = () => {
    const tablet = useResponsive('down', 'md');
    return (
        <Box sx={{ marginBottom: 12 }}>
            <TitleSection title="MY INO PARTICIPATED" />
            <StyledMyIDOBox>
                <StyledInfoBox>
                    <StyledTitleInfo>Time</StyledTitleInfo>
                    <StyledInfo>22.0721:12:22 25/12/2022.2022</StyledInfo>
                </StyledInfoBox>

                <StyledDivider orientation={tablet ? '' : 'vertical'} />

                <StyledInfoBox>
                    <StyledTitleInfo>IDO Pool</StyledTitleInfo>
                    <StyledInfo>ADK Project</StyledInfo>
                </StyledInfoBox>
                <StyledDivider orientation={tablet ? '' : 'vertical'} />
                <StyledInfoBox>
                    <StyledTitleInfo>Amount</StyledTitleInfo>
                    <StyledInfo>30,000 ADK</StyledInfo>
                </StyledInfoBox>

                <StyledDivider orientation={tablet ? '' : 'vertical'} />

                <StyledInfoBox>
                    <StyledTitleInfo>USDT</StyledTitleInfo>
                    <StyledInfo>~ 12,000 USDT</StyledInfo>
                </StyledInfoBox>

                <StyledDivider orientation={tablet ? '' : 'vertical'} />

                <StyledInfoBox>
                    <StyledTitleInfo>Status</StyledTitleInfo>
                    <StyledInfo>Completed</StyledInfo>
                </StyledInfoBox>
            </StyledMyIDOBox>
        </Box>
    );
};
