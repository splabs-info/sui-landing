import { Box, Grid } from '@mui/material';
import { RoundInfo } from './RoundInfo';
import { RoundIntro } from './RoundIntro';
import { RoundForm } from './RoundForm';
import { BuyTokenOG } from './round/BuyTokenOG';
import { RoundChart } from './RoundChart';
import { RoundClaim } from './RoundClaim';

const roundDetail = [
    {
        number: '0',
        name: 'OG Round',
        address: '0x0000000000000000000000000000000000000000',
        startTime: null,
        endTime: null,
        totalSale: 0,
        minPurchase: 0,
        maxPurchase: 0,
        price: 0,
        vesting: 0,
    },
    {
        number: '1',
        name: 'Public Round',
        address: '0x0000000000000000000000000000000000000000',
        startTime: null,
        endTime: null,
        totalSale: 0,
        minPurchase: 0,
        maxPurchase: 0,
        price: 0,
        vesting: 0,
    }
]
const claimInfo =
{
    purchase: 0,
    consumed: 0,
    remaining: 0,
}

export const Round = ({ round }) => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <RoundIntro />
                </Grid>
                <Grid item xs={12} md={8}>
                    <RoundChart round={round} />
                    <RoundForm round={round} />
                    <RoundClaim claimInfo={claimInfo} />
                </Grid>
            </Grid>
            <RoundInfo address='' startTime='' endTime='' />
        </Box>
    );
};
