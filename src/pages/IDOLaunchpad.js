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
import OnGoingPools from 'components/ido-list/OnGoingPools';
import PreviousPools from 'components/ido-list/PreviousPools';
import UpComingPools from 'components/ido-list/UpComingPools';
import useResponsive from 'hooks/useResponsive';
import moment from 'moment';

import React from 'react';
import { Link } from 'react-router-dom';

export default function IDOLaunchpad() {
  // Tiep o day
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');
  const [hasInTimeIDOXUI, setHasInTimeIDOXUI] = React.useState(false);
  const [hasOutTimeIDOXUI, setHasOutTimeIDOXUI] = React.useState(false);

  

  React.useEffect(() => {
    if (moment().isAfter('2023-07-22T12:00:00 Z')) {
      setHasOutTimeIDOXUI(true);
    }
    if (moment().isAfter('2023-07-20T12:00:00 Z')) {
      setHasInTimeIDOXUI(true);
    }
  }, [])
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
            <Link to={'/ido-launchpad/og-sale'}>
              <FrameButton>Buy $XUI</FrameButton>
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
        {/* <OnGoingPools /> */}
          {hasInTimeIDOXUI && !hasOutTimeIDOXUI && <OnGoingPools />}
          <UpComingPools hasInTimeIDOXUI={hasInTimeIDOXUI} />
          <PreviousPools hasOutTimeIDOXUI={hasInTimeIDOXUI && hasOutTimeIDOXUI} />
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
