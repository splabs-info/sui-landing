
import { Box, Container, Typography, styled, } from "@mui/material";
import { ImgTitleBox, PlatformBox, SectionBox, TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";
import Slider from "react-slick";
import { platformSliderSettings } from "./SliderSettings";

const platforms = [
  {
    label: "1OneGame - IGO Platform",
    description: "Connect and distribute quality projects to all blockchain users through pre-designed and ready-to-integrate smart contracts.",
    background: '#1F171F',
  },
  {
    label: "Oneverse - venture",
    description: "Surprise for you at the final stage.",
    background: '#04051E',
  },
  {
    label: "OneMarket - NFT Launchpad",
    description: "Build INO and Marketplace create a connected market for projects, Client buy NFT pre-sale or Box NFT with integrated gacha mechanism from projects.",
    background: '#181719',
  },
  {
    label: "OneFarm - Defi System",
    description: "Build a Yield Farming and Staking environment to create the best income for Clients.",
    background: '#1D1717',
  },
  {
    label: "OnePad - IDO Platform",
    description: "OnePad selects and distributes quality Defi projects to users through a fully-featured and ready-to-integrate platform.",
    background: '#061D1A',
  },
];


export default function UpcomingPools() {
  const isDesktop = useResponsive("up", "md");

  return (
    <SectionBox pt={isDesktop ? 10 : 3} pb={isDesktop ? 5 : 3}
      sx={{
        backgroundImage: "url('/images/background/homebg4.jpg')",
      }}>
      <Container>
        <Box mb={5} sx={{ position: 'relative' }}>
          <ImgTitleBox component={'img'} src='/images/home/shape.png' alt="" />
          <TitleBox>
            <Typography> Upcoming</Typography>
            <TypographyGradient>
              Pools
            </TypographyGradient >
          </TitleBox>
        </Box>
      </Container>
    </SectionBox>
  );
}
