import { Box, Container, Typography, Grid, styled } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from "./HomeStyles";

const teams = [
  {
    title: "Self-sustaining ecosystem",
    photoUrl: "/images/multi-chain/Expansion_01.png",
    text: "Blockchain with everybody able to Supply & Demand",
  },
  {
    title: "Expand with us",
    photoUrl: "/images/multi-chain/Expansion_02.png",
    text: "With Blockchain and Web3 experts everything would be possible",
  },
  {
    title: "Must be verified",
    photoUrl: "/images/multi-chain/Expansion_03.png",
    text: "We integrate with only potential and passionate projects",
  },
  {
    title: "Multi-Chain",
    photoUrl: "/images/multi-chain/Expansion_04.png",
    text: "Not only with Gate-chain but expanding to various chain"
  },
];



const CustomBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  border: "1px solid #98cafe",
  borderRadius: "1rem",
  background: "rgba(46, 48, 83, 0.4);",
  borderTopWidth: "80%",
  boxShadow: " 0px 1px 9px rgba(0, 0, 0, 0.34)",
  display: 'inline-flex',
  width: '100%',
  '&:hover': {
    background: "linear-gradient(336.08deg, #9F8CCC 10.7%, #2D91C8 97.43%)",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "unset",
    padding: "2rem",
  },
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontFamily: "SVN-Gilroy-semi-bold",
  marginBottom: '.5rem',
  textTransform: "uppercase",
  background: "linear-gradient(90deg, #D0C4FC 4.98%, #9CEAF0 100%), #FFFFFF",
  backgroundClip: "text",
  textFillColor: "transparent",
  [theme.breakpoints.down("md")]: {
    marginBottom: '1rem',
  },
}));

export default function MultiChain() {
  const isDesktop = useResponsive("up", "md");
  return (
    <SectionBox pt={isDesktop ? 30 : 15} pb={isDesktop ? 20 : 5}
      sx={{
        backgroundImage: "url('/images/background/homebg3.jpg')",
      }}>
      <Box component={'img'} src='/images/home/blur.png' alt=""
        sx={{
          width: isDesktop ? '450px' : '200px',
          position: 'absolute',
          right: isDesktop ? '-9rem' : '-5rem',
          top: isDesktop ? '0rem' : '2rem',
          zIndex: 0
        }} />
      <Container>
        <Box mb={5} sx={{ position: 'relative' }}>
          <ImgTitleBox component={'img'} src='/images/home/shape.png' alt="" />
          <TitleBox >
            <Typography > Multi-Chain</Typography>
            <TypographyGradient>
              Launchpad
            </TypographyGradient >
            <Typography variant="span"> Platform</Typography>
          </TitleBox>
          <Grid container spacing={3} mt={4}>
            {teams.map((item, index) => (
              <Grid item key={index} md={6} xs={12}>
                <CustomBox>
                  <Box>
                    <img style={{ width: "min(100%,70px)" }} src={item.photoUrl} alt="" />
                  </Box>
                  <Box>
                    <TypographyTitle
                      variant="h6"
                    >
                      {item.title}
                    </TypographyTitle>
                    <Typography
                      variant="body2"
                      className="content"
                      sx={{
                        lineHeight: 'unset',
                        color: "white",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </CustomBox>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </SectionBox>
  );
}
