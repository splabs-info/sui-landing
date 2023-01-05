import React from "react";
import { Box } from "@mui/material";
import useResponsive from "../hooks/useResponsive";
import Page from "../components/common/Page";
import WhitepaperContent from "../components/whitepaper";

export default function Whitepaper() {

  const isDesktop = useResponsive("up", "sm");
  return (
    <Page title="Whitepaper">
      <Box
        sx={{
          background: "url('/images/background/bg1.jpg')",
          backgroundSize: isDesktop ? "100% 100%" : "cover",
        }}
      >
        <WhitepaperContent />
      </Box>
    </Page>
  );
}
