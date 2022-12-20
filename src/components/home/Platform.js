
import { Box, Container, styled, } from "@mui/material";
import { ContainerPlatform, PlatformBox, TitleBox, TypographyGradient } from "./HomeStyles";
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
export default function Platform() {
  const isDesktop = useResponsive("up", "md");

  return (
    <Box pt={isDesktop ? 10 : 3} pb={isDesktop ? 5 : 3}>
      <Container>
        <TitleBox>
          <TypographyGradient sx={{
            fontSize: isDesktop ? '3rem' : '2rem',
            fontFamily: "SVN-Gilroy-regular",
          }}>OUR
            <span style={{
              fontFamily: "SVN-Gilroy-heavy",
            }}> PLATFORM</span>
          </TypographyGradient>
          <Box component={'h3'} sx={{ color: 'white', marginBottom: '2rem', textShadow: 'rgba(255,255,255,0.25) 0 0 4px' }}>
            Buy, Trade, and Track your Favorite Crypto!
          </Box>
          <Box component={'p'} sx={{ color: 'white', }}>
            Gatekeeper allows you to start your own product through the technology the platform provides to kickstart your cherished ideas on Gatekeeper.

          </Box>
          <Box component={'p'} sx={{ color: 'white', paddingBottom: isDesktop ? '4rem' : '1rem' }}>
            Through analysis and reviews from many third parties, these products will be maximized to bring the highest efficiency to everyone.
          </Box>

        </TitleBox>

        {/* <ContainerPlatform mt={isDesktop ? 14 : 2}> */}
        <SliderCustom {...platformSliderSettings}>
          {platforms.map((platform, index) =>
            <PlatformBox key={index} sx={{ background: platform.background }}>
              <img
                src={`./images/platform/step-${index + 1}.png`}
                alt={platform.label}
              />
              <TypographyGradient
                sx={{
                  fontSize: '1.2rem',
                  fontFamily: "SVN-Gilroy-heavy",
                  margin: '1.5rem 0',
                  textAlign: 'center',
                }}
              >
                {platform.label}
              </TypographyGradient>
              <Box component={'p'} sx={{ color: 'white', textAlign: 'center' }}>
                {platform.description}
              </Box>
            </PlatformBox>
          )}
        </SliderCustom>
        {/* </ContainerPlatform> */}
      </Container>
    </Box>
  );
}
