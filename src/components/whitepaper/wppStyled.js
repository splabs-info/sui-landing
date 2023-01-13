import { Box, Typography, alpha, styled } from "@mui/material";


export const WppContentBox = styled(Box)(({ theme }) => ({
  padding: "0",
  marginLeft: '3rem',
  "& ul": {
    paddingLeft: 32
  },
  "& li": {
    color: 'white'
  },
  "& a": {
    color: '#00bfff'
  },
  "& .CheckList": {
    listStyle: 'none',
    paddingLeft: '1rem',
  },
  "& .icon-tabler-square-check path": {
    color: '#00ffff'
  },
  "& .icon-tabler-square-check rect": {
    color: '#00ffff'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '0',
  }
}));
export const TitleText = styled(Typography)(({ theme }) => ({
  color: 'white',
  paddingTop: '2rem',
  fontFamily: "SVN-Gilroy-heavy",
  "&:fist-of-type": {
    paddingTop: '1rem',
  },
}));

export const NormalText = styled(Typography)(({ theme }) => ({
  // textIndent: '1rem',
  color: alpha('#fff', 0.7),
  paddingTop: '0.5rem',
  fontSize: '0.98rem',
  "& img": {
    paddingBottom: 32,
    paddingTop: 16,
  },
  "& b": {
    color: alpha('#fff', 0.85)
  },
  "& highline": {
    color: alpha('#00bfff', 0.85),
    fontStyle: 'italic'
  },
}));

export const NormalTextList = styled(Typography)(({ theme }) => ({
  color: alpha('#fff', 0.7),
  paddingTop: '0.5rem',
  fontSize: '0.98rem',
  display: 'flex',
  "& .icon": {
    marginRight: '0.5rem'
  },

}));


