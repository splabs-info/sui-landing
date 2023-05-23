import { Grid } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { AvatarPool } from './AvatarPool';
import { OGRound } from './round/OGRound';
export const Pool = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Grid container spacing={2} sx={{ marginTop: 12, marginBottom: 10 }}>
            <Grid xs={12} md={6} item>
                <AvatarPool />
            </Grid>
            <Grid width="100%" xs={12} md={6} item>
                <OGRound />
            </Grid>
        </Grid>
    );
};
