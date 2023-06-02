import { Box } from '@mui/material';
import { BuyTokenOG } from './BuyTokenOG';
import { ProcessBox } from './ProcessBox';
export const OGRound = ({
    balances,
    decimals,
    totalSold,
    totalSupply,
    symbol,
    ratio,
    maxPerUser,
    participants,
    participantsWallet,
}) => {
    return (
        <Box>
            <ProcessBox
                totalSold={totalSold}
                totalSupply={totalSupply}
                ratio={ratio}
                symbol={symbol}
                participants={participants}
            />
            <BuyTokenOG
                balances={balances}
                decimals={decimals}
                symbol={symbol}
                maxPerUser={maxPerUser}
                ratio={ratio}
                participantsWallet={participantsWallet}
            />
        </Box>
    );
};
