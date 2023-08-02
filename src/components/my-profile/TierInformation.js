/* eslint-disable jsx-a11y/alt-text */
import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useResponsive from 'hooks/useResponsive';

const TierBox = styled(Box)(({ theme }) => ({
    padding: '2rem',
    borderRadius: '1rem',
    textAlign: 'flex-start',
    borderTopWidth: '80%',
    minHeight: '330px',
    background: 'linear-gradient(0deg, rgba(234, 204, 248, 0.15) 0%, rgba(150, 224, 218, 0.15) 100%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    [theme.breakpoints.down('md')]: {
        minHeight: 'unset',
        padding: '2rem',
    },

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

const InfoWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 24,
}));

const StyledTitleTierInfo = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    lineHeight: '29px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '0 0 7px rgb(255,255,255,0.5)',
}));

const Info = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    lineHeight: '29px',
    color: 'white',
}));

export const TierInformation = ({ tierMedal, level, xuiReq, allocation, ino, discount, freeAir }) => {
    const isTablet = useResponsive('down', 'md');

    return (
        <TierBox sx={{ display: 'flex' }}>
            <Box sx={{ marginRight: 5 }}>
                <img src={tierMedal} alt={level} style={{ width: 300, marginBottom: '4px' }} />
                <Typography variant='h4'
                    sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0 0 7px rgb(255,255,255,0.5)',
                        textAlign: 'center',
                    }}
                >
                    {level}
                </Typography>
            </Box>
            <Divider
                orientation={isTablet ? 'horizontal' : 'vertical'}
                variant="middle"
                flexItem
                sx={{ height: isTablet ? 20 : 240, marginRight: isTablet ? 0 : 5, marginBottom: isTablet ? 3 : 0 }}
            />
            <Box width={'100%'}>
                <InfoWrapper>
                    <StyledTitleTierInfo>IDO Allocation</StyledTitleTierInfo>
                    <Info>{allocation}</Info>
                </InfoWrapper>
                <InfoWrapper>
                    <StyledTitleTierInfo>$XUI Required</StyledTitleTierInfo>
                    <Info>{xuiReq}</Info>
                </InfoWrapper>
                <InfoWrapper>
                    <StyledTitleTierInfo>Free Airdrop Allocation</StyledTitleTierInfo>
                    <Info>{freeAir}</Info>
                </InfoWrapper>
                <InfoWrapper>
                    <StyledTitleTierInfo>INO Allocation</StyledTitleTierInfo>
                    <Info>{ino}</Info>
                </InfoWrapper>
                <InfoWrapper>
                    <StyledTitleTierInfo>INO Discount</StyledTitleTierInfo>
                    <Info>{discount}</Info>
                </InfoWrapper>
            </Box>
        </TierBox>
    );
};
