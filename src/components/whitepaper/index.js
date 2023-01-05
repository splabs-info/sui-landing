
import { Box, Container, Divider } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import { wppContent } from "./wppContent";
import { NormalText, TitleText } from "./wppStyled";
import { PlatformBox, TitleBox, TypographyGradient } from "../home/HomeStyles";

export default function WhitepaperContent() {
  const isDesktop = useResponsive("up", "md");

  return (
    <Box pt={isDesktop ? 15 : 10} pb={isDesktop ? 15 : 10}>
      <Container>
        <TitleBox>
          <TypographyGradient sx={{
            fontSize: isDesktop ? '3rem' : '2rem',
            fontFamily: "SVN-Gilroy-regular",
          }}>About
            <span style={{
              fontFamily: "SVN-Gilroy-heavy",
            }}> GATEKEEPER
            </span>
          </TypographyGradient>
        </TitleBox>

        {wppContent.map((item, i) =>
          <Box key={i} mt={2}>
            <TitleText variant="h3" >
              {item.label}
            </TitleText>
            <Divider sx={{ borderColor: 'deepskyblue', opacity: 0.7, mb: 2, mt: 1 }} />
            {item.description.map((text, j) =>
              <NormalText variant={'body1'} key={j}>
                {text}
              </NormalText>
            )}

          </Box>
        )}

      </Container>
    </Box>
  );
}
