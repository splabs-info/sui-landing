import { Box, Container, Stack, styled, Typography } from '@mui/material';
import Page from 'components/common/Page';
import {
  ButtonTitleBox,
  FrameButton,
  ImgTitleBox,
  QuestionsButton,
  SectionBox,
  TextTypography,
  TitleBox,
  TypographyGradient,
} from 'components/home/HomeStyles';
import { questionsList } from 'components/home/Questions';
import PreviousPools from 'components/ido-list/PreviousPools';
import UpComingPools from 'components/ido-list/UpComingPools';
import useResponsive from 'hooks/useResponsive';
import { Link } from 'react-router-dom';

const idoProjects = [
  {
    title: 'Free Minting',
    link: '/ido-launchpad',
    avatar: '/images/ino/ino-upcoming-1.jpg',
    access: 'WL',
    hardCap: '2000',
    releaseTime: "Official Launch: July 10th",
    status: false,
    startTime: '2023-06-10T11:00:00',
    endTime: '2023-06-10T12:00:00',
  },

  {
    title: 'HooD',
    avatar: '/images/ino/ino-upcoming-2.jpg',
    hardCap: '2000',
    access: 'Tier 1-5',
    releaseTime: 'Official Launch: July 25th',
    status: true,
    link: '',
    startTime: '2023-06-25T11:00:00',
    endTime: '2023-06-25T12:00:00',
  },
]
export default function IDOLaunchpad() {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');
  return (
    <Page title="IDO list">
      <SectionBox sx={{ backgroundImage: "url('/images/background/ido-list-header-bg.png')" }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              pt: isDesktop ? 20 : 15,
              color: 'white',
            }}
          >
            <Title variant="h2">
              Enter {isMobile && <br />} <p className="linear">the multi chain</p> <br />
              based Launchpad
            </Title>
          </Box>
          <ButtonTitleBox sx={{ gap: '1rem' }}>
            <a href="https://1wcod92hu2t.typeform.com/to/yrmuPiG6" target="_blank" rel="noreferrer">
              <FrameButton>Apply for Launchpad</FrameButton>
            </a>
            <Link to={'/ido-launchpad'}>
              <FrameButton>Buy $ XUI</FrameButton>
            </Link>
            <Link to={'/whitepaper'}>
              <FrameButton>Whitepaper</FrameButton>
            </Link>
          </ButtonTitleBox>
          <Questions />
        </Container>
      </SectionBox>
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/bg-ido.png')",
          color: 'white',
          paddingTop: 0,
        }}
      >
        <Container maxWidth="xl">
          <UpComingPools />
          <PreviousPools />
        </Container>
      </SectionBox>
    </Page>
  );
}

const Title = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  '& .linear': {
    display: 'initial',
    background: 'linear-gradient(rgba(129, 236, 197, 1), rgba(148, 203, 255, 1), rgba(133, 150, 255, 1))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.3',
  },
}));

const Questions = () => {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Box mt={isMobile ? 15 : 20}>
      <Box mb={5} sx={{ position: 'relative' }}>
        <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
        <TitleBox>
          <Typography>Join and Understand</Typography>
          <TypographyGradient>YouSUI</TypographyGradient>
        </TitleBox>
      </Box>
      <Stack flexDirection="row" flexWrap={'wrap'} justifyContent="space-between">
        {questionsList.map((item, index) => (
          <QuestionsButton key={index} href={item.link} target={'_blank'}>
            <div>
              <TextTypography variant="body1" fontWeight={900}>
                {item.title}{' '}
              </TextTypography>
              <TextTypography variant="body2">Learn more</TextTypography>
            </div>
          </QuestionsButton>
        ))}
      </Stack>
    </Box>
  );
};
