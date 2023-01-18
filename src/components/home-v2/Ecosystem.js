
import { Box, Container, Grid, Typography, } from "@mui/material";
import { styled } from "@mui/system";
import { ImgTitleBox, NetworkBox, NetworksGrid, TextTypography, TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";
import Slider from "react-slick";
import { networksSliderSettings } from "./SliderSettings";

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
    label: "network-bnb",
    link: "/",
  },
  {
    label: "network-etherum",
    link: "/",
  },
  {
    label: "network-polygon",
    link: "/",
  },
  {
    label: "network-klaytn",
    link: "/",
  },
  {
    label: "network-fantom",
    link: "/",
  },
  {
    label: "network-kcc-2",
    link: "/",
  },
  {
    label: "network-solana",
    link: "/",
  },

];

const networksNumber = [
  {
    label: "Blockchains",
    amount: "18",
  },
  {
    label: "Total Fundraised",
    amount: "$ 2.5M",
  },
  {
    label: "Total Participant",
    amount: "3 K+",
  },
  {
    label: "Projects",
    amount: "3 +",
  },

];

const SliderCustom = styled(Slider)(() => ({
  '&.slick-slide': {
    padding: "10px!important",
  },
  "& .slick-slide": {
    transition: "all 0.3s ease-in-out",
    padding: "10px!important",
    "&.slick-active": {
      opacity: "1",
      color: "red",

    },
    "&.slick-current": {
      opacity: "1",
    },
    "&.slick-center": {
      marginTop: "-3rem",
    },
    "&.slick-prev": {
      height: "3rem",
    },
    "& li.slick-active button::before": {
      color: "red",
    },
    "& li": {
      color: "red",
    },
  },
}));
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
        <SliderCustom {...networksSliderSettings}>
          {networks.map((network, index) =>
            <NetworkBox key={index}>
              <a
                href={network.link}
                target="_blank"
                rel="noreferrer"

              >
                <CustomLogo
                  src={`./images/networks/${network.label}.png`}
                  alt={network.label}
                />
              </a>
            </NetworkBox>
          )}
        </SliderCustom>

      </Container>
    </Box>
  );
}
