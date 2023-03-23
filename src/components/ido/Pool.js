import { Grid } from '@mui/material';
import { AvatarPool } from './AvatarPool';
import { PoolName } from './PoolName';
import { ProcessBox } from './ProcessBox';
export const Pool = () => {
    return (
        <Grid container rowSpacing={1}>
            <Grid item>
                <AvatarPool />
            </Grid>
            <Grid item>
                <PoolName />
            </Grid>
            <Grid item>
                <ProcessBox />
            </Grid>
        </Grid>
    );
};
