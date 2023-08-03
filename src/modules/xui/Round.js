import { Box, Grid } from '@mui/material';
import { RoundInfo } from 'modules/ido-round/components/RoundInfo';
import { RoundIntro } from 'modules/ido-round/components/RoundIntro';
import { Chart } from './Chart';
import { Claim } from './Claim';
import { BuyForm } from './Form';

export const Round = ({
    services,
    claimInfo = [],
    decimals,
    endAt,
    whiteList = [],
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
    iconUrl,
    description,
    symbol,
    totalXUILocked,
    fetchClaimInfo,
    tokenName,
    telegram,
    twitter,
    discord,
    medium,
    imageUrl,
}) => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <RoundIntro
                        projectName={projectName}
                        medium={medium}
                        discord={discord}
                        twitter={twitter}
                        startAt={startAt}
                        roundName={roundName}
                        description={description}
                        imageUrl={imageUrl}
                    />
                </Grid>
                <Grid item xs={12} md={8} alignItems={'space-between'}>
                    <Chart
                        symbol={symbol}
                        startAt={startAt}
                        roundName={roundName}
                        projectName={projectName}
                        decimals={decimals}
                        totalSold={totalSold}
                        totalSupply={totalSupply}
                        payments={payments}
                        maxPurchase={maxPurchase}
                        minPurchase={minPurchase}
                    />
                    <BuyForm
                        totalXUILocked={totalXUILocked}
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
                        symbol={symbol}
                        totalSupply={totalSupply}
                        fetchClaimInfo={fetchClaimInfo}
                    />
                    <Claim
                        endAt={endAt}
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
            <RoundInfo
                projectName={projectName}
                roundName={roundName}
                type={type}
                tokenName={tokenName}
                startTime={startAt}
                endTime={endAt}
                symbol={symbol}
            />
        </Box>
    );
};
