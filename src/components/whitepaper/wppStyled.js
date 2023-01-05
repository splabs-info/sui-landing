import { Typography, styled } from "@mui/material";


export const TitleText = styled(Typography)(({ theme }) => ({
  color: "white",
  lineHeight: '1.3',
  paddingTop: '2rem',
  fontFamily: "SVN-Gilroy-heavy",
}));

export const NormalText = styled(Typography)(({ theme }) => ({
  color: "white",
  lineHeight: '1.3',
  paddingTop: '1rem',
  opacity: 0.7,
}));


