import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ethers } from 'ethers';
import { PoolInfoBox } from './IDODetailStyled';

const StyledTitleInfo = styled(Typography)(({ theme }) => ({
    fontWeight: 'normal',
    color: 'white',
    fontSize: 18,
    lineHeight: '20px',
    // textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
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

export const PoolInformationCard = ({ ratio, minPurchase, maxPerUser }) => {
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
                    <StyledInfo>5,000,000 SUA</StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Min. Purchase</StyledTitleInfo>
                    <StyledInfo>
                        {minPurchase ? ethers.utils.formatUnits(minPurchase, 9) : 'Loading'} SUA
                    </StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Max. Purchase</StyledTitleInfo>
                    <StyledInfo>
                        {maxPerUser ? ethers.utils.formatUnits(maxPerUser, 9) : 'Loading'} SUA
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
