import { Box, Container, Stack, Typography } from '@mui/material';
import { ImgTitleBox, QuestionsButton, TextTypography, TitleBox, TypographyGradient } from './HomeStyles';

export const questionsList = [
  {
    title: 'How to get started ?',
    link: 'https://medium.com/@YouSUI/procedure-and-how-to-participate-inyousui-ino-21ac9882b486',
  },
  {
    title: 'What is Tier System ?',
    link: 'https://medium.com/@YouSUI/introducing-yousuis-staking-tiers-5538e6c4619',
  },
  {
    title: 'How to join IDO ?',
    link: 'https://medium.com/@YouSUI/procedure-and-how-to-participate-in-yousui-ido-4e266397e61e',
  },
  {
    title: 'What is YouSUI ?',
    link: 'https://medium.com/@YouSUI/introducing-yousui-your-all-in-one-web3-platform-b5f5fda9d210',
  },
];

export default function Questions() {
  return (
    <Container maxWidth={'xl'}>
      <Box mb={5} sx={{ position: 'relative' }}>
        <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
        <TitleBox>
          <Typography>Join and Understand</Typography>
          <TypographyGradient>YouSUI</TypographyGradient>
        </TitleBox>
      </Box>
      <Stack flexDirection="row" flexWrap={'wrap'} justifyContent="space-between">
        {questionsList.map((item, index) => (
          <QuestionsButton sx={{ width: '23%' }} key={index} href={item.link} target={'_blank'}>
            <div>
              <TextTypography variant="body1" fontWeight={900}>
                {item.title}{' '}
              </TextTypography>
              <TextTypography variant="body2">Learn more</TextTypography>
            </div>
          </QuestionsButton>
        ))}
      </Stack>
    </Container>
  );
}
