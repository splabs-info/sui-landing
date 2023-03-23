import { Grid } from '@mui/material';
import { TitleSection } from 'components/my-profile/TitleSection';
import { PoolInformationCard } from './PoolInfoCard';
import { TokenInformationCard } from './TokenInfoCard';
export const PoolInformation = () => {
    return (
        <Grid container spacing={5} justifyContent="space-between" sx={{ marginBottom: 10 }}>
            <Grid item>
                <TitleSection title="POOL INFORMATION" />
                <PoolInformationCard />
            </Grid>
            <Grid item>
                <TitleSection title="TOKEN INFORMATION" />
                <TokenInformationCard />
            </Grid>
        </Grid>
    );
};
