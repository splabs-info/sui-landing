import { Typography, Container } from '@mui/material';
import React from 'react';
import { styled } from "@mui/system";

export default function TitleCustom({ label, children, ...other }) {
  const DivCustom = styled("div")(() => ({
    float: "left",
  }));

  return (
    <Container sx={{ padding: "0!important" }}>
      <DivCustom>
        <img style={{ position: "relative", height: "70%", width: "3.4rem", left: "-1rem" }}
          alt=""
          src="/images/line-2.png" />
      </DivCustom>
      <Typography
        variant="h2"
        fontWeight={700}
        color="white"
        fontFamily="SVN-Gilroy-heavy"
        sx={{ padding: "1.5rem 0 0.5rem 0", ...other }}
      >
        {label}
      </Typography>
      {children}
    </Container>
  );
}
