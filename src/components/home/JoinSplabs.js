
import { Box, Container, Divider, Grid, Typography, } from "@mui/material";
import { TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";
import LogoSPlabs from "../common/LogoSPlabs";

const Mints = [
  {
    label: "Mint",
    description: "Mint functions easily create and customize your own cryptocurrencies for free without spending too much money on testing and developing the code.",
  },
  {
    label: "Mint",
    description: "Mint functions easily create and customize your own cryptocurrencies for free without spending too much money on testing and developing the code.",
  },
  {
    label: "Mint",
    description: "Mint functions easily create and customize your own cryptocurrencies for free without spending too much money on testing and developing the code.",
  },

];

export default function JoinSplabs() {
  const isDesktop = useResponsive("up", "md");
  const isMobile = useResponsive("down", "sm");
  return (
    <Box pb={10} pt={10}
      sx={{
        background: "url('/images/home/bg-shape.png')",
        backgroundSize: isDesktop ? "85% 100%" : 'cover',
        backgroundPosition: isMobile && '-500px',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container sx={{ maxWidth: isDesktop ? '70%!important' : 'auto' }} >
        <TitleBox
          sx={{
            textAlign: isMobile && 'center',
            marginBottom: "2rem",
            "& .MuiTypography-root": {
              fontSize: isDesktop ? '3rem' : '2rem',
              fontFamily: "SVN-Gilroy-semi-bold",
              color: 'white',
              textTransform: 'capitalize',
              lineHeight: '1.3',
              "& span": {
                fontFamily: "SVN-Gilroy-heavy"
              }
            }
          }}
        >
          <Typography>
            Join your journey <br />
          </Typography>
          <Typography>with <LogoSPlabs />
            {/* <TypographyGradient variant="span">Splabs Mark</TypographyGradient> */}
          </Typography>
        </TitleBox>
        {Mints.map((mint, index) => (
          <Box pr={isDesktop ? '20%' : 0} key={index}>
            <Grid container
              alignItems='center'
              sx={{
                "& .MuiGrid-item": {
                  padding: isDesktop ? '1.5rem 1.5rem 1.5rem 0rem' : '1.25rem',
                  color: 'white',
                }
              }}
            >
              <Grid item xs={6} md={3} sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: !isDesktop && 'flex-end',

              }}>
                <Typography sx={{
                  position: 'absolute',
                  top: '1rem',
                  right: '-1.25rem',
                  opacity: '0.25',
                }}>
                  0{index + 1}
                </Typography>
                <img src={`/images/mint/mint-0${index + 1}.png`} alt="" width={100} />
              </Grid>
              <Grid item md={2} xs={6} >

                <Typography sx={{
                  textTransform: 'uppercase',
                  fontFamily: "SVN-Gilroy-heavy",
                  fontSize: '1.25rem',
                }}>
                  {mint.label}
                </Typography>
              </Grid>
              <Grid item md={6} xs={10} sx={{
                paddingTop: isMobile && '0!important'
              }}>
                <Typography sx={{
                  fontSize: '0.875rem',
                }}>
                  {mint.description}
                </Typography>
              </Grid>
              <Grid item md={1} xs={2}>
                <img src={`/images/mint/icon-button.png`} alt="" width={50} />
              </Grid>
            </Grid>
            {index + 1 !== Mints.length ? <Divider sx={{ marginLeft: '22%' }} /> : ''}
          </Box>
        ))}
      </Container>
    </Box>
  );
}
