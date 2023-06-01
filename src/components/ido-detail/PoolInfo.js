import { Grid, Typography } from '@mui/material';
import { TitleSection } from 'components/my-profile/TitleSection';
import { SocialFooter } from 'layouts/Footer-v2';
import { PoolInformationCard } from './PoolInfoCard';
import { TokenInformationCard } from './TokenInfoCard';
export const PoolInformation = ({ ratio, minPurchase, maxPerUser }) => {
    return (
        <Grid container spacing={5} justifyContent="space-between" sx={{ marginBottom: 10 }}>
            <Grid sx={{ width: '100%', '& a': { marginRight: '16px' } }} xs={12} item>
                <Typography variant="h3" color={'white'} mb={3}>
                    YOUSUI PJT
                </Typography>
                {/* <Typography variant="body1" color={'white'} mb={3}>
                    A is the easiest and fastest way to approach for developers who want to experime
                    Web3, enabling the best addition of blockchain features to their games in a few
                    minutes for the future of gaming…
                </Typography> */}
                <SocialFooter />
                <Typography variant='body1' color={'white'} mt={3}>
                    SUA is a token of Meta version. It has no intrinsic value or expectation of financial return.
                    There is no official team or roadmap.
                </Typography>

            </Grid>
            <Grid sx={{ width: '100%' }} md={6} sm={12} item>
                <TitleSection title="POOL INFORMATION" />
                <PoolInformationCard ratio={ratio} minPurchase={minPurchase} maxPerUser={maxPerUser} />
            </Grid>
            <Grid sx={{ width: '100%' }} md={6} sm={12} item>
                <TitleSection title="TOKEN INFORMATION" />
                <TokenInformationCard />
            </Grid>
        </Grid>
    );
};
