import { Box, Divider, Hidden, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import useResponsive from "../../hooks/useResponsive";

export default function Title({
  title = "",
  subTitle = "",
  content = "",
  titleColor = "#000",
  subTitleColor = "#000",
  contentColor = "#000",
  pointColor = "#fff",
}) {
  const isMobile = useResponsive("down", "sm");
  const isTablet = useResponsive("down", "md");
  // let titleSize = "h1";
  let subTitleSize = "h4";
  let contentSize = "h5";
  if (isMobile) {
    // titleSize = "h3";
    subTitleSize = "h6";
    contentSize = "body2";
  }
  if (isTablet) {
    // titleSize = "h2";
    contentSize = "body1";
  }

  return (
    <Box pt={10} pb={5}>
      <Container>
        <Box>
          {subTitle && (
            <Typography
              variant={subTitleSize}
              color={subTitleColor}
              sx={{
                fontFamily: "SVN-Gilroy-heavy",
              }}
            >
              {subTitle}
            </Typography>
          )}
          <Stack alignItems="center">
            <Typography
              variant="h2"
              fontFamily="SVN-Gilroy-heavy"
              color={titleColor}
              textTransform="uppercase"
            >
              {title}
            </Typography>
            <Divider
              width="100px"
              sx={{ borderWidth: "2px", borderColor: "#fa8962" }}
            />
          </Stack>
          <Hidden smDown>
            <Container maxWidth="md" margin="auto">
              <Typography
                variant={contentSize}
                textAlign={isMobile ? "left" : "center"}
                color={contentColor}
                mt={isMobile ? 0 : 3}
                fontWeight={300}
              >
                {content}&nbsp;
              </Typography>
            </Container>
          </Hidden>
        </Box>
      </Container>
    </Box>
  );
}
