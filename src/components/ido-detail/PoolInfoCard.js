import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ethers } from 'ethers';
import { PoolInfoBox } from './IDODetailStyled';

const StyledTitleInfo = styled(Typography)(({ theme }) => ({
    fontWeight: 'normal',
    color: 'white',
    fontSize: 18,
    lineHeight: '20px',
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
    fontSize: 18,
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

export const PoolInformationCard = ({ decimals, ratio, symbol, minAllocation, maxAllocation }) => {
    return (
        <PoolInfoBox>
            <StyledStack
                direction="column"
                alignItems="center"
                spacing={3}
                divider={<StyledDivider flexItem />}
            >
                <StyledItemStack>
                    <StyledTitleInfo>Token Distribution</StyledTitleInfo>
                    <StyledInfo>- {symbol}</StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Min. Allocation</StyledTitleInfo>
                    <StyledInfo>
                        {minAllocation ? ethers.utils.formatUnits(minAllocation, decimals) : '-'} {symbol}
                    </StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Max. Allocation</StyledTitleInfo>
                    <StyledInfo>
                        {maxAllocation ? Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(ethers.utils.formatUnits(maxAllocation, decimals)) : '-'} {symbol}
                    </StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Token Price</StyledTitleInfo>
                    <StyledInfo>{ratio} SUI</StyledInfo>
                </StyledItemStack>

                <StyledItemStack>
                    <StyledTitleInfo>Access Type</StyledTitleInfo>
                    <StyledInfo>Publish</StyledInfo>
                </StyledItemStack>
            </StyledStack>
        </PoolInfoBox>
    );
};
