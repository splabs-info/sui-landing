import { Grid, Typography } from '@mui/material';
import { TitleSection } from 'components/my-profile/TitleSection';
import { SocialFooter } from 'layouts/FooterSection';
import { PoolInformationCard } from './PoolInfoCard';
import { TokenInformationCard } from './TokenInfoCard';
export const PoolInformation = ({ tokenAddress, tokenName, decimals, description, ratio, symbol, minAllocation, maxAllocation, totalSupply }) => {

    return (
        <Grid container spacing={5} justifyContent="space-between" sx={{ marginBottom: 10 }}>
            {/* <Grid sx={{ width: '100%', '& a': { marginRight: '16px' } }} xs={12} item>
                <Typography variant="h3" color={'white'} mb={3}>
                    YOUSUI PJT
                </Typography>
                <SocialFooter />
                <Typography variant='body1' color={'white'} mt={3}>
                    {description}
                </Typography>
            </Grid> */}
            <Grid sx={{ width: '100%' }} md={6} sm={12} item>
                <TitleSection title="POOL INFORMATION" />
                <PoolInformationCard decimals={decimals} ratio={ratio} symbol={symbol} minAllocation={minAllocation} maxAllocation={maxAllocation} />
            </Grid>
            <Grid sx={{ width: '100%' }} md={6} sm={12} item>
                <TitleSection title="TOKEN INFORMATION" />
                <TokenInformationCard tokenAddress={tokenAddress} tokenName={tokenName} decimals={decimals} symbol={symbol} totalSupply={totalSupply} />
            </Grid>
        </Grid>
    );
};
