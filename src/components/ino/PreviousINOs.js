/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import { PreviousCard } from './PreviousCard';

export default function PreviousINOs({ projects }) {
  return (
    <Box mb={20} mt={10} position="relative">
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
      <TitleBox>
        <Typography>Previous</Typography>
        <TypographyGradient>INOs</TypographyGradient>
      </TitleBox>
      <Grid container spacing={5} mt={2}>
        {projects?.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <PreviousCard
              {...item}
              key={index}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
