import { Box, Grid } from '@mui/material';
import { RoundInfo } from 'modules/ido-round/components/RoundInfo';
import { RoundIntro } from 'modules/ido-round/components/RoundIntro';
import { Chart } from './Chart';
import { Claim } from './Claim';
import { BuyForm } from './Form';
export const Round = ({
    services,
    claimInfo,
    decimals,
    endAt,
    whiteList,
    maxPurchase,
    minPurchase,
    payments,
    startAt,
    totalSold,
    totalSupply,
    roundName,
    type,
    purchaseType,
    projectName,
}) => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <RoundIntro />
                </Grid>
                <Grid item xs={12} md={8} alignItems={'space-between'}>
                    <Chart
                        roundName={roundName}
                        decimals={decimals}
                        totalSold={totalSold}
                        totalSupply={totalSupply}
                        payments={payments}
                        maxPurchase={maxPurchase}
                        minPurchase={minPurchase} />
                    <BuyForm
                        whiteList={whiteList}
                        type={type}
                        startAt={startAt}
                        endAt={endAt}
                        purchaseType={purchaseType}
                        roundName={roundName}
                        decimals={decimals}
                        projectName={projectName}
                        payments={payments}
                        maxPurchase={maxPurchase}
                        minPurchase={minPurchase}
                        totalSold={totalSold}
                        totalSupply={totalSupply}
                    />
                    <Claim
                        services={services}
                        decimals={decimals}
                        type={type}
                        claimInfo={claimInfo}
                        payments={payments}
                        projectName={projectName}
                        roundName={roundName}
                    />
                </Grid>
            </Grid>
            <RoundInfo />
        </Box>
    );
};
