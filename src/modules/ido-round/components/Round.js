import { Box, Grid } from '@mui/material';
import { RoundInfo } from './RoundInfo';
import { RoundIntro } from './RoundIntro';
import { RoundForm } from './RoundForm';
import { BuyTokenPublic } from './round/BuyTokenPublic';
import { BuyTokenOG } from './round/BuyTokenOG';
import { CircleBox } from './round/CircleBox';

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
    }
]
export const Round = ({ round }) => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <RoundIntro />
                </Grid>
                <Grid item xs={12} md={7}>
                    <RoundForm round={round} />
                    <CircleBox />
                    <BuyTokenOG />
                </Grid>
            </Grid>
            <RoundInfo address='' startTime='' endTime='' />
        </Box>
    );
};
