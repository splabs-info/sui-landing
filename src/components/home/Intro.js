import { useTheme } from '@emotion/react';
import { Box, Container, Grid, Stack, Typography, styled } from '@mui/material';
import CopyComponent from 'components/common/CopyComponent';
import { TypographyGradient } from 'components/home/HomeStyles';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatAddress } from 'setting/format';
import useResponsive from '../../hooks/useResponsive';
import { ButtonTitleBox, ContractBox, FrameButton, SectionBox, TextTypography, TitleTypography } from './HomeStyles';

// const SubTitle = [
//   'YouSUI works with projects with a high probability of success',
//   'with enhanced Due Diligence and Regulation.',
// ];

export default function Intro() {
  const isDesktop = useResponsive('up', 'md');
  const isTablet = useResponsive('down', 'md');
  const isMobile = useResponsive('down', 'sm');
  const theme = useTheme();
  const [hasInTimeIDO, setHasInTimeIDO] = React.useState(false);

  const Title = [
    <>
      Become{' '}
      <TypographyGradient
        sx={{
          fontSize: isMobile ? '1.25rem' : '2.25rem',
          fontWeight: 'bold',
        }}
      >
        an early investor
      </TypographyGradient>{' '}
    </>,
    <>in the scalable Launchpad</>,
    <>
      to participate in{' '}
      <TypographyGradient sx={{ fontSize: isMobile ? '1.25rem' : '2.25rem', fontWeight: 'bold' }}>
        all Games
      </TypographyGradient>{' '}
      ,
    </>,
    <>
      <TypographyGradient sx={{ fontSize: isMobile ? '1.25rem' : '2.25rem', fontWeight: 'bold' }}>
        NFTs and Metaverse
      </TypographyGradient>{' '}
      in the world.
    </>,
  ];

  return (
    <SectionBox
      sx={{
        backgroundImage: "url('/images/background/homebg1.png')",
        minHeight: '100vh',
      }}
    >
      <Container maxWidth={'xl'}>
        <Grid container sx={{ flexDirection: isMobile && 'column-reverse' }}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              zIndex: 1,
              '& .MuiBox-root': {
                justifyContent: isMobile && 'center',
                textAlign: isMobile && 'center',
              },
            }}
          >
            <Box
              mt={isMobile ? 5 : 8}
              sx={{
                [theme.breakpoints.down(600)]: {
                  marginTop: 10,
                },
              }}
            >
              {Title.map((item, i) => (
                <TitleTypography
                  key={i}
                  variant="h1"
                  sx={{
                    fontSize: isMobile ? '1.55rem' : '2.25rem',
                  }}
                >
                  {item}
                  <br />
                </TitleTypography>
              ))}
            </Box>

            {/* xui ido */}
            {/* <Hidden lgUp>
              <CountDownBox2>
                <IDOCountdown endTime={'2023-07-20T12:00:00'} _handleComplete={() => setHasInTimeIDO(true)} />
                {hasInTimeIDO ? <Link to="/ido-launchpad/og-sale">
                  <Stack direction={'column'} mt={1} color="#00112C" alignItems={'center'} >
                    <Typography variant="h6">
                      $XUI IDO IS LIVE
                    </Typography>
                    <Stack direction={'row'} justifyContent={'flex-end'} color="#00112C" alignItems={'center'}>
                      <Typography variant="body1" fontWeight={600}>Join now</Typography>
                      <IconArrowRight />
                    </Stack>
                  </Stack>
                </Link> :
                  <Link to="/ido-launchpad/og-sale">
                    <Stack direction={'row'} justifyContent={'flex-start'}>
                      <Typography mt={1} fontWeight={600} color="#00112C" variant="caption">
                        12:00 (UTC) JULY 20th
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'flex-end'} mt={1} color="#00112C" alignItems={'center'}>
                      <Typography variant="h6" fontWeight={0} mr={0.5}>
                        Go to
                      </Typography>
                      <Typography variant="h6">XUI IDO</Typography>
                      <IconArrowRight />
                    </Stack>
                  </Link>}
              </CountDownBox2>
            </Hidden> */}
            <Box
              sx={{
                margin: '1.5rem 0',
                [theme.breakpoints.up('lg')]: {
                  margin: '2rem 0',
                },
              }}
            >
              <TextTypography variant={'body1'} fontSize={isMobile && '0.65rem'} fontWeight="500" maxWidth={640}>
                YouSUI works with projects with a high probability of success with enhanced
                <br /> Due Diligence and Regulation.
              </TextTypography>
            </Box>

            <ButtonTitleBox sx={{ gap: '1rem' }}>
              <Link to={'/ido-launchpad/og-sale'}>
                <FrameButton>Buy $XUI</FrameButton>
              </Link>
              <a href="https://1wcod92hu2t.typeform.com/to/yrmuPiG6" target="_blank" rel="noreferrer">
                <FrameButton>Apply for Launchpad</FrameButton>
              </a>
              <Link to={'/whitepaper'}>
                <FrameButton>Whitepaper</FrameButton>
              </Link>
            </ButtonTitleBox>

            <Stack flexDirection={'row'}
              gap={isMobile ? 3 : 5}
              mt={6}
              flexWrap={isMobile ? 'wrap' : 'nowrap'}
              justifyContent={isMobile && 'center'}
              sx={{ color: 'white' }}
            >
              <Box >
                <Typography variant="body1" fontSize={isMobile && '0.9rem'}>
                  {' '}
                  Powered by{' '}
                </Typography>
                <Box
                  mt={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 2,
                    [theme.breakpoints.down(600)]: {
                      marginBottom: 1,
                    },
                  }}
                >
                  <img alt="sui" src="/images/partners/sui.png" width={isMobile ? 60 : 80} />
                </Box>
              </Box>

              <Box >
                <Typography
                  variant="body1"
                  mr={2}
                  fontSize={isMobile && '0.9rem'}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <img alt="sui" src="/images/icon/icon-shield.png" style={{ marginRight: '0.5rem' }} /> Audited by{' '}
                </Typography>
                <Box
                  mt={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 2,
                    [theme.breakpoints.down(600)]: {
                      marginBottom: 1,
                    },
                  }}
                >
                  <img alt="sui" src="/images/partners/logo-movebit.png" height={isMobile ? 35 : 46} />
                </Box>
              </Box>
              <Box >
                <Typography
                  variant="body1"
                  mr={2}
                  fontSize={isMobile && '0.9rem'}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <img alt="sui" src="/images/icon/token.gif" width={24} style={{ marginRight: '0.5rem' }} /> $XUI live on{' '}
                </Typography>
                <Box
                  mt={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '16px',
                    marginBottom: 2,
                    [theme.breakpoints.down(600)]: {
                      marginBottom: 1,
                    },
                  }}
                >
                  <a href="https://www.mexc.com/exchange/XUI_USDT" target="_blank" rel="noreferrer">
                    <img alt="sui" src="/images/partners/mexc.png" height={isMobile ? 35 : 46} />
                  </a>
                  <a href="https://www.bitget.com/spot/XUIUSDT?type=spot" target="_blank" rel="noreferrer">
                    <img alt="sui" src="/images/partners/bitget.png" height={isMobile ? 35 : 46} />
                  </a>
                </Box>
              </Box>
            </Stack>
            <Box
              mt={'3rem'}
              sx={{
                color: 'white',
                [theme.breakpoints.down(600)]: {
                  marginTop: 4,
                },
              }}
            >
              <Typography variant="body1" mr={2} fontSize={isMobile && '0.9rem'}>
                {' '}
                Featured by{' '}
              </Typography>
              <Box
                mt={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <img alt="sui" src="/images/home/feature1.png" height={isMobile ? 50 : 80} />
                <img alt="sui" src="/images/home/feature2.png" height={isMobile ? 50 : 80} />
              </Box>
            </Box>
            <Box
              mt={'3rem'}
              sx={{
                color: 'white',
                [theme.breakpoints.down(600)]: {
                  marginTop: 4,
                },
              }}
            >
              <TypographyGradient fontWeight={'bold'} fontSize={isMobile && '0.9rem'}>
                {' '}
                View XUI on explorer
              </TypographyGradient>

              <ContractBox>
                <a
                  href="https://suiexplorer.com/object/0x5b6851a16da9e44c137c95527ba1233601dbca0ef5f7f89ca3d184ace27d744c?network=mainnet"
                  target="_blank"
                  rel="noreferrer"
                >
                  {!isDesktop
                    ? formatAddress('0x3cbae4efb916a6ff23eb4724f6fb5d37c5a342b689a6f308fa10acc944799f84::xui::XUI', 14)
                    : '0x3cbae4efb916a6ff23eb4724f6fb5d37c5a342b689a6f308fa10acc944799f84::xui::XUI'}
                </a>
                <CopyComponent content={`0x3cbae4efb916a6ff23eb4724f6fb5d37c5a342b689a6f308fa10acc944799f84::xui::XUI`} />
              </ContractBox>
            </Box>
          </Grid>
          {/* <Grid item md={4} mt={isMobile && 2} mb={isMobile && 2}>
            {isMobile && (
              <CenterBox>
                <img
                  alt="sui"
                  src="/images/home/yousui.png"
                  style={{
                    width: '80%',
                    zIndex: 2,
                  }}
                />
                <img
                  alt="sui"
                  src="/images/home/base-2.png"
                  style={{
                    position: 'absolute',
                    width: '60%',
                    top: '250px',
                    zIndex: 1,
                  }}
                />
              </CenterBox>
            )}
          </Grid> */}
        </Grid>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          width: '40%',
          right: '3%',
          top: '10%',
          zIndex: 1,
          display: isTablet && 'none',
        }}
      >
        <img
          alt="sui"
          src="/images/home/home-bg-coins.png"
          style={{
            position: 'absolute',
          }}
        />
        <img
          alt="gatekeeper"
          src="/images/home/home-coins-others.png"
          className={'imgCoins'}
          style={{
            position: 'absolute',
          }}
        />
        <img
          alt="yousui"
          src="/images/home/home-coin-yousui.png"
          className={'imgSui'}
          style={{
            position: 'absolute',
            // width: '20%',
            // top: 'max(256px, 70%)',
            // right: 215,
          }}
        />
      </Box>
      <img
        alt=""
        src="/images/home/base-2.png"
        style={{
          position: 'absolute',
          width: '40%',
          right: '1%',
          top: 'max(100px,70%)',
          zIndex: 0,
          display: isTablet && 'none',
        }}
      />

      {/* xui ido */}
      {/* <Hidden lgDown>
        <Box
          sx={{
            position: 'absolute',
            width: '40%',
            right: '5%',
            top: '15%',
            zIndex: 0,
            display: isTablet && 'none',
            textAlign: 'center',
          }}
        >
          <img alt="" src="/images/Homepage-XUIIDO.png" style={{ display: 'unset' }} />
          <CountDownBox>
            <IDOCountdown endTime={'2023-07-20T12:00:00'} _handleComplete={() => setHasInTimeIDO(true)} />
            {hasInTimeIDO ? <Link to="/ido-launchpad/og-sale">
              <Stack direction={'column'} mt={1} color="#00112C" alignItems={'center'} >
                <Typography variant="h6">
                  $XUI IDO IS LIVE
                </Typography>
                <Stack direction={'row'} justifyContent={'flex-end'} color="#00112C" alignItems={'center'}>
                  <Typography variant="body1" fontWeight={600}>Join now</Typography>
                  <IconArrowRight />
                </Stack>
              </Stack>
            </Link> :
              <Link to="/ido-launchpad/og-sale">
                <Stack direction={'row'} justifyContent={'flex-end'} mt={1} color="#00112C" alignItems={'center'}>
                  <Typography variant="h6" fontWeight={0} mr={0.5}>
                    Go to
                  </Typography>
                  <Typography variant="h6">XUI IDO</Typography>
                  <IconArrowRight />
                </Stack>
              </Link>}
          </CountDownBox>
        </Box>
      </Hidden> */}
    </SectionBox>
  );
}

const CountDownBox = styled(Box)(({ theme }) => ({
  bottom: '-150px',
  width: 'fit-content',
  backgroundImage: "url('/images/Homepage-countdown-bg.png')",
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  paddingTop: 15,
  paddingBottom: 25,
  paddingLeft: 30,
  paddingRight: 30,
  margin: 'auto',
}));

const CountDownBox2 = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  backgroundImage: "url('/images/Homepage-countdown-bg.png')",
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  paddingTop: 20,
  paddingBottom: 30,
  paddingLeft: 20,
  paddingRight: 20,
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.down('md')]: {},
  [theme.breakpoints.down('sm')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));
