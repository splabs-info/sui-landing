import { Grid, Stack } from '@mui/material';
import { BuyTokenForm } from './BuyTokenForm';
import { CircleBox } from './CircleBox';
import { RefLink } from './RefLink';
import { SaleInfo } from './SaleInfo';

export const BuyToken = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <SaleInfo />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack height={'100%'} justifyContent={'flex-end'}>
          <RefLink />
        </Stack>
      </Grid>
      <Grid item xs={12} my={2} />
      <Grid item xs={12} md={6}>
        <CircleBox />
      </Grid>
      <Grid item xs={12} md={6}>
        <BuyTokenForm />
      </Grid>
    </Grid>
  );
};
