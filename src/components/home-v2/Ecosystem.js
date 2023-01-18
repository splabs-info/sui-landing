
import { Box, Container, Grid, Typography, } from "@mui/material";
import { styled } from "@mui/system";
import { ImgTitleBox, NetworkBox, NetworksGrid, TextTypography, TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";

const ContainerNetwork = styled(Box)(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(4, 1fr)",
  marginTop: "2rem",
  "& a": {
    background: "rgba(50,53,96,0.33)",
    margin: "0.3rem",
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.5rem',
    "&:nth-of-type(n + 5)": {
      opacity: '0.7'
    },
    "&:nth-of-type(n + 9)": {
      opacity: '0.5'
    }
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)",

    "& a": {
      "&:nth-of-type(n + 7)": {
        // display: 'none'
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
    icon: '/images/networks/icon-.png',
    label: "network-bnb",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-etherum",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-polygon",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-klaytn",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-fantom",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-kcc-2",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-solana",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-solana",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-solana",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-solana",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-solana",
    link: "/",
  },
  {
    icon: '/images/networks/icon-.png',
    label: "network-solana",
    link: "/",
  },

];

export default function Ecosystem() {
  const isDesktop = useResponsive("up", "md");

  return (
    <Box pt={isDesktop ? 15 : 5} pb={5} >
      <Container>
        <Box mb={5} sx={{ position: 'relative' }}>
          <ImgTitleBox component={'img'} src='/images/home/shape.png' alt="" />
          <TitleBox>
            <Typography> Multi-Chain</Typography>
            <TypographyGradient>
              Ecosystem
            </TypographyGradient >

          </TitleBox>
        </Box>
        <TextTypography variant={'body1'}>
          We’re working together with market, decentralized exchanges,
        </TextTypography>
        <TextTypography variant={'body1'}>
          wallets & bridges to build a unified decentralized financial ecosystem open to everyone in Web 3.0.
        </TextTypography>
        <ContainerNetwork>
          {networks.map((network, index) =>
            <a
              href={network.link}
              target="_blank"
              rel="noreferrer"
              key={index}
            >
              <CustomLogo
                src={`./images/networks/${network.label}.png`}
                alt={network.label}
              />
            </a>
          )}
        </ContainerNetwork>
      </Container>
    </Box>
  );
}
