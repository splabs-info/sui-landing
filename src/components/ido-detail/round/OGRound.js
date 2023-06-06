import { Box } from '@mui/material';
import { BuyTokenOG } from './BuyTokenOG';
import { ProcessBox } from './ProcessBox';
export const OGRound = ({
    balances,
    decimals,
    payments,
    totalSold,
    totalSupply,
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
