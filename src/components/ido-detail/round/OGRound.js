import { Box } from '@mui/material';
import { BuyTokenOG } from './BuyTokenOG';
import { ProcessBox } from './ProcessBox';
export const OGRound = ({
    balances,
    name,
    decimals,
    payments,
    totalSold,
    totalSupply,
    tokenType,
    symbol,
    ratio,
    maxAllocation,
    participants,
    participantsWallet,
}) => {

    return (
        <Box>
            <ProcessBox
                decimals={decimals}
                totalSold={totalSold}
                totalSupply={totalSupply}
                ratio={ratio}
                symbol={symbol}
                participants={participants}
            />
            <BuyTokenOG
                name={name}
                tokenType={tokenType}
                balances={balances}
                payments={payments}
                decimals={decimals}
                symbol={symbol}
                maxAllocation={maxAllocation}
                ratio={ratio}
                participantsWallet={participantsWallet}
            />
        </Box>
    );
};
