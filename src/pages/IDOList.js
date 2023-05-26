import { Box, Container, Stack, styled, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
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
} from 'components/home-v2/HomeStyles';
import { questionsList } from 'components/home-v2/Questions';
import OnGoingPools from 'components/ido-list/OnGoingPools';
import PreviousPools from 'components/ido-list/PreviousPools';
import UpComingPools from 'components/ido-list/UpComingPools';
import useResponsive from 'hooks/useResponsive';
import { Link } from 'react-router-dom';
import { WalletDrawer } from 'components/drawer';
import React from 'react';

export default function IDOList() {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');
  const [openWalletDrawer, setOpenWalletDrawer] = React.useState();

  const wallet = useWallet();

  // const handleConnect = () => {

  // }
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
            {/* {!wallet?.connected || wallet?.status === 'disconnected' ? (
                            <FrameButton onClick={() => setOpenWalletDrawer(!openWalletDrawer)}>Buy $ XUI</FrameButton>
                        ) : ( */}
            <Link to={'/ido-launchpad/buy-token'}>
              <FrameButton>Buy $ XUI</FrameButton>
            </Link>
            {/* )} */}
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
          <OnGoingPools />
          <UpComingPools />
          <PreviousPools />
        </Container>
      </SectionBox>
      {/* 
            {wallet?.status === 'disconnected' &&
                (!wallet?.connected && (
                    <WalletDrawer
                        address={wallet?.address}
                        open={openWalletDrawer}
                        handleClose={setOpenWalletDrawer}
                        disconnectSui={wallet?.disconnectSui}
                    />
                ))} */}
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
