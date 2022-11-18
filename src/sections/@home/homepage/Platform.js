
import { Box, Container, } from "@mui/material";
import { useSelector } from "react-redux";
import { ContainerPlatform, PlatformBox, TitleBox, TypographyGradient } from "../../../components/home/HomeStyles";
import useResponsive from "../../../hooks/useResponsive";

const platforms = [
  {
    label: "1OneGame - IGO Platform",
    description: "Connect and distribute quality projects to all blockchain users through pre-designed and ready-to-integrate smart contracts.",
  },
  {
    label: "Oneverse - venture",
    description: "Surprise for you at the final stage.",
  },
  {
    label: "OneMarket - NFT Launchpad",
    description: "Build INO and Marketplace create a connected market for projects, Client buy NFT pre-sale or Box NFT with integrated gacha mechanism from projects.",
  },
  {
    label: "OneFarm - Defi System",
    description: "Build a Yield Farming and Staking environment to create the best income for Clients.",
  },
  {
    label: "OnePad - IDO Platform",
    description: "OnePad selects and distributes quality Defi projects to users through a fully-featured and ready-to-integrate platform.",
  },
];

export default function Platform() {
  const isDesktop = useResponsive("up", "md");
  const { setting } = useSelector((state) => state);
  const { library } = setting;
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
        <ContainerPlatform mt={isDesktop ? 14 : 2}>
          {platforms.map((platform, index) =>
            <PlatformBox key={index}>
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
        </ContainerPlatform>
      </Container>
    </Box>
  );
}
