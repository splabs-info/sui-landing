import { Box } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { BuyTokenPublic } from './BuyTokenPublic';
import { CircleBox } from './CircleBox';
export const PublicRound = ({
    roundId,
    balances,
    decimals,
    endAt,
    totalSold,
    totalSupply,
    symbol,
    name,
    ratio,
    tokenType,
    minPurchase,
    participants,
    participantsWallet,
}) => {
    const isMobile = useResponsive('down', 'sm');


    return (
        <Box>
            <CircleBox
                endAt={endAt}
                totalSold={totalSold}
                totalSupply={totalSupply}
                ratio={ratio}
                decimals={decimals}
                symbol={symbol}
                participants={participants}
            />
            <BuyTokenPublic
                roundId={roundId}
                tokenType={tokenType}
                minPurchase={minPurchase}
                balances={balances}
                decimals={decimals}
                symbol={symbol}
                ratio={ratio}
                name={name}
                participantsWallet={participantsWallet} />
        </Box>
    );
};
