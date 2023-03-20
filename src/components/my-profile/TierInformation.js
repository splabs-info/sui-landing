/* eslint-disable jsx-a11y/alt-text */
import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TierBox = styled(Box)(({ theme }) => ({
    padding: '2rem',
    borderRadius: '1rem',
    background: 'rgba(49, 72, 99, 0.3)',
    textAlign: 'flex-start',
    borderTopWidth: '80%',
    minHeight: '330px',
    [theme.breakpoints.down('md')]: {
        minHeight: 'unset',
        padding: '2rem',
    },
}));

const InfoWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 24
}));

const StyledTitleTierInfo = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    lineHeight: '29px',
    fontWeight: 'bold',
    color: 'white'
}));

const Info = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    lineHeight: '29px',
    color: 'white'
}));
export const TierInformation = ({ tierMedal, level, idoApp }) => {
    return (
        <TierBox sx={{ display: 'flex' }}>
            <Box sx={{ marginRight: 5 }}>
                <img src={tierMedal} alt={level} style={{ width: 198, height: 198, marginBottom: '4px' }} />
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        lineHeight: '29px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        textAlign: 'center',
                    }}
                >
                    {level}
                </Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ height: 240, marginRight: 5 }} />
            <Box>
                <InfoWrapper>
                    <StyledTitleTierInfo>IDO Application</StyledTitleTierInfo>
                    <Info>{idoApp}</Info>
                </InfoWrapper>
                <InfoWrapper>
                    <StyledTitleTierInfo>$XUI Required</StyledTitleTierInfo>
                    <Info>{idoApp}</Info>
                </InfoWrapper>
                <InfoWrapper>
                    <StyledTitleTierInfo>Free Airdrop Allocation</StyledTitleTierInfo>
                    <Info>{idoApp}</Info>
                </InfoWrapper>
                <InfoWrapper>
                    <StyledTitleTierInfo>INO Allocation</StyledTitleTierInfo>
                    <Info></Info>
                </InfoWrapper>
                <InfoWrapper>
                    <StyledTitleTierInfo>INO Discount</StyledTitleTierInfo>
                    <Info></Info>
                </InfoWrapper>
            </Box>
        </TierBox>
    );
};
