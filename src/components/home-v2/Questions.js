
import { Box, Container, Typography, } from "@mui/material";
import { ImgTitleBox, PlatformBox, TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";

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


export default function Questions() {
  const isDesktop = useResponsive("up", "md");

  return (
    <Box pt={isDesktop ? 10 : 3} pb={isDesktop ? 5 : 3}
      sx={{
        background: "url('/images/background/homebg6.jpg')",
        backgroundSize: isDesktop ? "100% 100%" : "cover",
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}>
      <Container>
        <Box mb={5} sx={{ position: 'relative' }}>
          <ImgTitleBox component={'img'} src='/images/home/shape.png' alt="" />
          <TitleBox>
            <TypographyGradient>
              Questions
            </TypographyGradient >
          </TitleBox>
        </Box>
      </Container>
    </Box>
  );
}
