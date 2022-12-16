import { Box, Container, } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";

const ContainerPartner = styled(Box)(({ theme }) => ({

  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(5, 1fr)",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

const CustomLogo = styled("img")(() => ({
  transition: "transform 150ms ease-in-out",
  padding: 0,
  display: "block",
  maxHeight: '60px',
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const partners = [
  {
    label: "8_FINANCE",
    link: "https://8.finance/",
  },
  {
    label: "bullperks",
    link: "https://bullperks.com/",
  },
  {
    label: "BITKEEP_P",
    link: "https://bitkeep.com/",
  },
  {
    label: "chaindustry",
    link: "https://www.chaindustry.io/",
  },
  {
    label: "BLOCKWIZ",
    link: "https://blockwiz.com/",
  },




  {
    label: "CHAINLINK",
    link: "https://chain.link/",
  },
  {
    label: "POLYGON",
    link: "https://polygon.technology/",
  },
  {
    label: "POLYGONSTUDIO",
    link: "https://polygonstudios.com/",
  },
  {
    label: "SIGNVM",
    link: "https://www.signvm.io/",
  },
  {
    label: "SOKEN",
    link: "https://soken.io/",
  },




  {
    label: "klaytn",
    link: "https://www.klaytn.foundation/",
  },
  {
    label: "GAMESPAD",
    link: "https://gamespad.io/",
  },
  {
    label: "GAMETREE",
    link: "https://gametree.me/",
  },
  {
    label: "EARNBOX",
    link: "/",
  },
  {
    label: "CLS",
    link: "https://www.cls.global/",
  },



  {
    label: "sotatek",
    link: "https://www.sotatek.com/",
  },
  {
    label: "splabs",
    link: "http://www.splabs.io/",
  },
  {
    label: "nslogo",
    link: "http://www.nsstudio.co.kr/",
  },
  {
    label: "NFTB",
    link: "https://nftb.io/",
  },
  {
    label: "Linx",
    link: "/",
  },
];

export default function Partner() {
  const isDesktop = useResponsive("up", "md");
  const { setting } = useSelector((state) => state);
  const { library } = setting;
  return (
    <Box pt={isDesktop ? 10 : 5} pb={isDesktop ? 20 : 10}>
      <Container>
        <TitleBox>
          <TypographyGradient sx={{
            fontSize: isDesktop ? '3rem' : '2rem',
            fontFamily: "SVN-Gilroy-regular",
          }}>
            OUR <span style={{
              fontFamily: "SVN-Gilroy-heavy",
            }}> PARTNERS</span>
          </TypographyGradient>
        </TitleBox>
        <ContainerPartner mt={4}>
          {partners.map((partner, index) =>
            <a
              href={partner.link}
              target="_blank"
              rel="noreferrer"
              key={index}
              style={{
                background: "url('/images/home/frame-partner.png')",
                backgroundSize: "100% 100%",
                margin: "0.1rem",
                backgroundRepeat: "no-repeat",
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '130px'
              }}
            >
              <CustomLogo
                src={`./images/partners/partner-${index + 1}.png`}
                alt={partner.label}

              />
            </a>
          )}
        </ContainerPartner>
      </Container>
    </Box>
  );
}
