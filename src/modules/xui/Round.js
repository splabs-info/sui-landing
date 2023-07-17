import { Box, Grid } from '@mui/material';
import { BuyForm } from './Form';
import { Claim } from './Claim'
export const Round = ({
    decimals,
    endAt,
    maxPurchase,
    minPurchase,
    payments,
    startAt,
    totalSold,
    totalSupply,
    roundName,
    type,
    projectName,
}) => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    {/* <RoundIntro /> */}
                </Grid>
                <Grid item xs={12} md={8} alignItems={'space-between'}>
                    <BuyForm
                        type={type}
                        roundName={roundName}
                        decimals={decimals}
                        projectName={projectName}
                        payments={payments}
                        maxPurchase={maxPurchase}
                        minPurchase={minPurchase}
                        totalSold={totalSold}
                        totalSupply={totalSupply}
                    />
                    <Claim />
                    {/* <RoundChart round={roundDetail[round]} />
                    <RoundForm round={round} />
                    <RoundClaim claimInfo={claimInfo} roundNumber={roundDetail[round].number} /> */}
                </Grid>
            </Grid>
            {/* <RoundInfo
                address={roundDetail[round].address}
                startTime={roundDetail[round].startTime}
                endTime={roundDetail[round].endTime} /> */}
        </Box>
    );
};
