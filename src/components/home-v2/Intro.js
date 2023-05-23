import { useTheme } from '@emotion/react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { TypographyGradient } from 'components/home/HomeStyles';
import { Link } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import { ButtonTitleBox, CenterBox, ContractBox, FrameButton, SectionBox, TextTypography, TitleTypography } from './HomeStyles';

const SubTitle = [
  'YouSUI works with projects with a high probability of success',
  'with enhanced Due Diligence and Regulation.',
];

export default function Intro() {
  const isDesktop = useResponsive('up', 'md');
  const isTablet = useResponsive('down', 'md');
  const isMobile = useResponsive('down', 'sm');
  const theme = useTheme();

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
        // minHeight: '100vh',
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
            <Box
              sx={{
                margin: '1.5rem 0',
                [theme.breakpoints.up('lg')]: {
                  margin: '2rem 0',
                },
              }}
            >
              <TextTypography
                variant={'body1'}
                fontSize={isMobile && '0.65rem'}
                fontWeight="500"
                maxWidth={640}
              >
                YouSUI works with projects with a high probability of success with enhanced
                <br /> Due Diligence and Regulation.
              </TextTypography>
            </Box>

            <ButtonTitleBox sx={{ gap: '1rem' }}>
              <Link to={'/ido-launchpad/buy-token'}>
                <FrameButton>Buy XUI</FrameButton>
              </Link>
              <a href="https://1wcod92hu2t.typeform.com/to/yrmuPiG6" target="_blank" rel="noreferrer">
                <FrameButton>Apply for Launchpad</FrameButton>
              </a>
              <Link to={'/whitepaper'}>
                <FrameButton>Whitepaper</FrameButton>
              </Link>
            </ButtonTitleBox>

            <Stack flexDirection={'row'} >
              <Box
                mt={'3rem'}
                sx={{
                  color: 'white',
                  [theme.breakpoints.down(600)]: {
                    marginTop: 4,
                  }
                }}
              >
                <Typography variant="body1" mr={2} fontSize={isMobile && '0.9rem'}>
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
                    }
                  }}
                >
                  {/* <img alt="gatekeeper" src="/images/home/Sui Blockchain.png" height={isMobile ? 40 : 60} />
                <img alt="gatekeeper" src="/images/home/gateio.png" height={isMobile ? 40 : 60} /> */}
                  <img alt="sui" src="/whitelogo.png" width={isMobile ? 60 : 80} />
                </Box>
              </Box>
              <Box
                mt={'3rem'}
                ml={'2rem'}
                sx={{
                  color: 'white',
                  [theme.breakpoints.down(600)]: {
                    marginTop: 4,
                  }
                }}
              >
                <Typography variant="body1" mr={2} fontSize={isMobile && '0.9rem'} display={'flex'} alignItems={'center'}>
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
                    }
                  }}
                >
                  <img alt="sui" src="/images/partners/logo-movebit.png" height={isMobile ? 35 : 46} />
                </Box>
              </Box>
            </Stack>
            <Box
              mt={'3rem'}
              sx={{
                color: 'white',
                [theme.breakpoints.down(600)]: {
                  marginTop: 4,
                }
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
                  gap: '33px',
                }}
              >
                <img alt="sui" src="/images/home/feature1.png" height={isMobile ? 60 : 80} />
                <img alt="sui" src="/images/home/feature2.png" height={isMobile ? 60 : 80} />
                {/* <img alt="sui" src="/bnb-white.png" height={isMobile ? 15 : 30} /> */}
              </Box>
            </Box>
            <Box
              mt={'3rem'}
              sx={{
                color: 'white',
                [theme.breakpoints.down(600)]: {
                  marginTop: 4,
                }
              }}
            >
              <Typography variant="body1" mr={2} fontSize={isMobile && '0.9rem'}>
                {`Contract Address (SUI)`}
              </Typography>
              <ContractBox >
                <Typography variant="body1" mr={2} fontWeight={'bold'} >

                  <TypographyGradient> XUI</TypographyGradient>
                </Typography>
                <Typography variant="body1" mr={2} >
                  0x25Ce5f4tg53rc00ccc6c00D34ew46f0
                </Typography>
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
    </SectionBox>
  );
}
