import { Box } from '@mui/material';
import { ProcessBox } from './ProcessBox';
import { BuyTokenOG } from './BuyTokenOG';
export const OGRound = ({ balances, totalSold, totalSupply, ratio, participants, participantsWallet }) => {
    return (
        <Box>
            <ProcessBox
                totalSold={totalSold}
                totalSupply={totalSupply}
                ratio={ratio}
                participants={participants}
            />
            <BuyTokenOG balances={balances} ratio={ratio} participantsWallet={participantsWallet} />
        </Box>
    );
};
