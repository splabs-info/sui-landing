import { Box, Grid } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { AvatarPool } from './AvatarPool';
import { BuyToken } from './BuyToken';
import { PoolName } from './PoolName';
import { ProcessBox } from './ProcessBox';
export const Pool = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <Grid container spacing={2} sx={{ marginTop: 12, marginBottom: 10 }}>
            <Grid md={12} lg={6} item>
                <Box sx={{ display: 'flex', gap: '2rem', flexDirection: isMobile ? 'column' : 'row' }}>
                    <AvatarPool />
                    <PoolName />
                </Box>
            </Grid>

            <Grid width="100%" md={12} lg={6} item>
                <Grid container>
                    <Grid xs={12} item>
                        <ProcessBox />
                    </Grid>
                    <Grid xs={12} item>
                        <Box sx={{ marginTop: '3rem' }}>
                            <BuyToken />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
