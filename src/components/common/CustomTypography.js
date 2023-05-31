import styled from "@emotion/styled";
import { Typography } from "@mui/material";


export const GradientShadowTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(323.96deg, #2D7EC8 0%, #B5FFD3 89.18%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  textShadow: '0px 0px 5px rgba(255,255,255,0.15)',
  [theme.breakpoints.down("sm")]: {
  },
}));

export const ShadowTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  textShadow: '0px 0px 5px rgba(255,255,255,0.5)',
  [theme.breakpoints.down("sm")]: {

  },
}));
