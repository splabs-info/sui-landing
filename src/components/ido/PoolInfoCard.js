import { Box, Divider, Stack, Typography, Item } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPoolCard = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(0, 197, 211, 0.12) 0%, rgba(66, 238, 207, 0.12) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '24px',
    padding: 40,
    height: 380,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
}));

const StyledTitleInfo = styled(Typography)(({ theme }) => ({
    fontWeight: 'normal',
    color: 'white',
    fontSize: 20,
    lineHeight: '20px',
    textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    lineHeight: '20px',
    color: 'white',
    fontWeight: 'bold',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.2)',
}));

const StyledStack = styled(Stack)(({ theme }) => ({
    width: '100%',
    marginBottom: 16,
}));

const StyledItemStack = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const PoolInformationCard = () => {
    return (
        <StyledPoolCard>
            <StyledStack direction="column" alignItems="center" spacing={3} divider={<StyledDivider flexItem />}>
                <StyledItemStack>
                    <StyledTitleInfo>Token Distribution</StyledTitleInfo>
                    <StyledInfo>Date UTC</StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Min. Allocation</StyledTitleInfo>
                    <StyledInfo>0.01 BUSD</StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Max. Allocation</StyledTitleInfo>
                    <StyledInfo>1939.85 BUSD</StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Token Price</StyledTitleInfo>
                    <StyledInfo>1 BUSD = 40 AZY</StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Access Type</StyledTitleInfo>
                    <StyledInfo>Public</StyledInfo>
                </StyledItemStack>
            </StyledStack>
        </StyledPoolCard>
    );
};
