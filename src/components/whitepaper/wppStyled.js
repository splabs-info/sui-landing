import { Box, Typography, styled } from "@mui/material";


export const WppContentBox = styled(Box)(({ theme }) => ({
  padding: "0",
  marginLeft: '3rem',
  "& ul": {
    paddingLeft: 32
  },
  "& li": {
    color: 'white'
  },
}));
export const TitleText = styled(Typography)(({ theme }) => ({
  color: "white",
  paddingTop: '2rem',
  fontFamily: "SVN-Gilroy-heavy",
  "&:fist-of-type": {
    paddingTop: '1rem',
  },
}));

export const NormalText = styled(Typography)(({ theme }) => ({
  color: "white",
  paddingTop: '0.5rem',
  fontSize: '0.98rem',
  opacity: 0.7,
}));


