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
    // maxAllocation,
    // minAllocation,
    maxPurchase,
    minPurchase,
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
                minPurchase={minPurchase}
                maxPurchase={maxPurchase}
                tokenType={tokenType}
                balances={balances}
                payments={payments}
                decimals={decimals}
                symbol={symbol}
                // minAllocation={minAllocation}
                // maxAllocation={maxAllocation}
                ratio={ratio}
                participantsWallet={participantsWallet}
            />
        </Box>
    );
};
