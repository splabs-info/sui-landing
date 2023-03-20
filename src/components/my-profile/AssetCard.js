import { Box, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

const StyledAssetCard = styled(Box)(({ theme }) => ({
    width: 320,
    height: 160,
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    borderRadius: 10,
    padding: '24px 48px 24px 48px',
    textAlign: 'center'
}));

const StyledBalance = styled(Typography)(({ theme }) => ({
    fontSize: 42,
}));

const StyledCurrencies = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    color: '#fff',
}));

export const AssetCard = ({ balance, currency }) => {
    return (
        <StyledAssetCard>
            <StyledBalance>{balance}</StyledBalance>
            <StyledCurrencies>{currency}</StyledCurrencies>
        </StyledAssetCard>
    );
};
