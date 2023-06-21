/* eslint-disable jsx-a11y/alt-text */
import { Box, Stack, Typography } from '@mui/material';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import { INOCard } from './INOCard';

export default function UpComing({ projects }) {
  return (
    <Box mb={20} mt={10} position="relative">
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
      <TitleBox>
        <Typography>Up-Coming</Typography>
        <TypographyGradient>INOs</TypographyGradient>
      </TitleBox>
      <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2, m: 3, }}>
        {projects?.map((item, index) => (
          <INOCard
            {...item}
            key={index}
          />
        ))}
      </Stack>
    </Box>
  );
}
