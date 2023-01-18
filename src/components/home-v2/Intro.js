import { Box, Container, Grid, Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import { ButtonTitleBox, FrameButton, TitleTypography, TextTypography, SectionBox } from "./HomeStyles";


const Title = [
  <>Become <span>an early investor</span> </>,
  <>in the scalable Launchpad</>,
  <>to participate in <span>all Games</span>,</>,
  <><span>NFTs and Metaverse</span> in the world.</>
]
const SubTitle = [
  'Gatekeeper works with projects with a high probability of success',
  'with enhanced Due Diligence and Regulation.',
]


export default function Intro() {
  const isDesktop = useResponsive("up", "sm");
  const isMobile = useResponsive("down", "sm");

  return (
    <SectionBox
      sx={{ backgroundImage: "url('/images/background/homebg1.jpg')", minHeight: '100vh' }}
      py={isDesktop ? 10 : 5}
    >
      <Container maxWidth={'lg'}>
        <Grid container>
          <Grid item
            xs={12}
            md={7}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              zIndex: 1
            }}>
            <Box mt={isDesktop ? 5 : 10}>
              {Title.map((item, i) => (
                <TitleTypography key={i}
                  variant="h1"
                >
                  {item}<br />
                </TitleTypography>
              ))}

            </Box>
            <Box sx={{
              margin: "1rem 0"
            }}>
              {SubTitle.map((item, i) => (
                <TextTypography key={i}
                  variant={'body1'}
                  fontWeight='bold'>
                  {item}
                </TextTypography>
              ))}
            </Box>

            <ButtonTitleBox>
              <FrameButton>
                Buy Gatekeeper
              </FrameButton>
              <FrameButton>
                Apply for Launchpad
              </FrameButton>
              <FrameButton>
                Whitepaper
              </FrameButton>
            </ButtonTitleBox>

            <Box mt={4}
              sx={{
                color: 'white',
              }}>
              <Typography variant="body1" mr={2}> Backed by </Typography>
              <Box mt={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',

                }}>
                <img alt="gatekeeper" src="/images/home/gatechain.png" height={isMobile ? 40 : 60} />
                <img alt="gatekeeper" src="/images/home/gateio.png" height={isMobile ? 40 : 60} />
              </Box>
            </Box>
          </Grid>
          <Grid item md={5}></Grid>
        </Grid>
      </Container>
      <img alt="gatekeeper" src="/images/home/home-bg-coins.png"
        style={{
          position: 'absolute',
          width: '40%',
          right: 0
        }} />
      <img alt="gatekeeper" src="/images/home/home-coins.png"
        style={{
          position: 'absolute',
          width: '40%',
          right: 0
        }} />
      <img alt="gatekeeper" src="/images/home/base.png"
        style={{
          position: 'absolute',
          width: '40%',
          right: 0,
          top: '75%',
        }} />
    </SectionBox >
  );
}
