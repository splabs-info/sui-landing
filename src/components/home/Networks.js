import { BorderRight } from "@mui/icons-material";
import { Box, Container, Grid, Typography, } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { NetworksGrid, TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";

const ContainerNetwork = styled(Box)(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(5, 1fr)",

  "& a": {
    background: "rgba(50,53,96,0.33)",
    margin: "0.3rem",
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.5rem',
    "&:nth-of-type(n + 7)": {
      opacity: '0.7'
    },
    "&:nth-of-type(n + 13)": {
      opacity: '0.5'
    }
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",

    "& a": {
      "&:nth-of-type(n + 7)": {
        display: 'none'
      },

    },

  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

}));

const CustomLogo = styled("img")(() => ({
  transition: "transform 150ms ease-in-out",
  padding: 0,
  display: "block",
  maxHeight: '45px',
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const networks = [
  {
    imgNumber: "1",
    link: "/",
  },
  {
    imgNumber: "2",
    link: "/",
  },
  {
    imgNumber: "5",
    link: "/",
  },
  {
    imgNumber: "3",
    link: "/",
  },
  {
    imgNumber: "6",
    link: "/",
  },

];

const networksNumber = [
  {
    label: "Blockchains",
    amount: "16",
  },
  {
    label: "Total trades",
    amount: "16.5 M+",
  },
  {
    label: "Total active users",
    amount: "700 K+",
  },
  {
    label: "Aggregated sources",
    amount: "185 +",
  },

];

export default function Networks() {
  const isDesktop = useResponsive("up", "md");
  const isMobile = useResponsive("down", "sm");
  const { setting } = useSelector((state) => state);
  const { library } = setting;
  return (
    <Box pt={isDesktop ? 15 : 5} pb={5}>
      <Box id="Network">
      </Box>
      <Container>
        <TitleBox sx={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
          <TypographyGradient sx={{
            fontSize: isDesktop ? '1.75rem' : '1.25rem',
            fontFamily: "SVN-Gilroy-heavy",
            marginBottom: '1rem',
          }}>
            ALL MAIN BLOCKCHAIN NETWORKS
          </TypographyGradient>
          <img alt="gatekeeper" src="/images/home/line.png" width={'30%'} />
        </TitleBox>
        <ContainerNetwork mt={4} mb={isDesktop ? 8 : 6}>
          {networks.map((network, index) =>
            <a
              href={network.link}
              target="_blank"
              rel="noreferrer"
              key={index}
            >
              <CustomLogo
                src={`./images/networks/network-${network.imgNumber}.png`}
                alt={network.label}
              />
            </a>
          )}
        </ContainerNetwork>

        <NetworksGrid container >
          <Grid item md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Box sx={{
              display: 'flex',
              justifyContent: isDesktop ? 'flex-start' : 'center',
            }}>
              <img alt="gatekeeper" src="/images/home/gate-2.png" width={'90%'} />
            </Box>

          </Grid>
          <Grid item md={6} pr={isDesktop && 2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <TypographyGradient
              sx={{
                fontSize: isDesktop ? '2.5rem' : '1.1rem',
                fontFamily: "SVN-Gilroy-semi-bold",
                textTransform: 'inherit',
                textAlign: 'center'
              }}>
              Erase all comments and leave only artificial. Put picture i left on this level
            </TypographyGradient>
            <Grid container sx={{
              borderRadius: '1rem',
              border: '1px solid #416FD9',
              marginTop: '1.5rem',
            }}>
              {networksNumber.map((detail, index) => (
                <Grid item xs={3} key={index}
                  sx={{
                    padding: '0 0.5rem',
                    margin: '0.75rem 0',
                    color: 'white',
                    textAlign: 'center',
                    borderRight: networksNumber.length !== index + 1 ? '1px solid #416FD9 ' : 'none',
                  }}>
                  <Typography variant="h4" fontSize={isDesktop ? '1.75rem' : '1rem'} >{detail.amount}</Typography>
                  <Typography fontSize={'0.75rem'} variant="body2">{detail.label}</Typography>

                </Grid>
              ))}
            </Grid>
          </Grid>
        </NetworksGrid>
      </Container>
    </Box>
  );
}
