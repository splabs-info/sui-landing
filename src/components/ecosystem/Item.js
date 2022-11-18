import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Title from "./Title";

export default function Item({ title, ...props }) {
  return (
    <Box
      sx={{
        position: "relative",
        marginTop: -1,
        background: `url(${`/images/social/${title
          .replace(" ", "-")
          .toLowerCase()}-bg.png`})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
      pb={10}
    >
      <Container>
        <Box>
          <Title {...props} title={title} />
          <Container>
            <img
              src={`/images/social/${title
                .replace(" ", "-")
                .toLowerCase()}.png`}
              alt=""
              style={{
                width: "100%",
              }}
            />
          </Container>
        </Box>
      </Container>
    </Box>
  );
}
