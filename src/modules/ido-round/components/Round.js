import { Box, Grid } from '@mui/material';
import { RoundInfo } from './RoundInfo';
import { RoundIntro } from './RoundIntro';
import { RoundForm } from './RoundForm';
import { RoundChart } from './RoundChart';
import { RoundClaim } from './RoundClaim';

const roundDetail = [
    {
        number: 0,
        name: 'OG Round',
        address: '0x0000000000000000000000000000000000000000',
        startTime: '00:00 21st June (UTC)',
        endTime: '12:00 21nd June (UTC)',
        totalSale: 800000,
        totalSold: 300000,
        minPurchase: 100,
        maxPurchase: 0,
        price: 0.25,
        vesting: '30% TGE Unlock, Monthly Vesting 10% for 7 Months',
        idoInfo: {
            logic: 'FCFS',
            tgeClaimTime: '13:00 22nd June, 2023 (UTC)'
        },
    },
    {
        number: 1,
        name: 'Public Round',
        address: '0x0000000000000000000000000000000000000000',
        startTime: '12:00 21st June (UTC)',
        endTime: '12:00 22nd June (UTC)',
        totalSale: 800000,
        totalSold: 500000,
        minPurchase: 100,
        maxPurchase: 0,
        price: 0.25,
        vesting: '20% TGE Unlock, Monthly Vesting 10% for 8 Months',
        idoInfo: {
            logic: 'Total paid SUI by Each Investor /Total Paid SUI by All Investors',
            tgeClaimTime: '13:00 22nd June, 2023 (UTC)'
        },
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
                    <RoundChart round={roundDetail[round]} />
                    <RoundForm round={round} />
                    <RoundClaim claimInfo={claimInfo} roundNumber={roundDetail[round].number} />
                </Grid>
            </Grid>
            <RoundInfo
                address={roundDetail[round].address}
                startTime={roundDetail[round].startTime}
                endTime={roundDetail[round].endTime} />
        </Box>
    );
};
