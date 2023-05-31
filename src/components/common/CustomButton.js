import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

export const CustomBorderButton = styled(Button)(({ theme }) => ({
  minHeight: "40px",
  display: "flex",
  padding: " 0px 20px",
  color: "#fff!important",
  borderRadius: "7px !important",
  background: "rgba(46, 48, 83, 0.4)!important",
  border: "1px solid #98cafe",
  "&:hover": {
    background:
      "linear-gradient(336.08deg, #9F8CCC 10.7%, #2D91C8 97.43%) !important",
  },
  "&:disabled": {
    opacity: 0.6,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    width: "100%",
  },
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  display: "flex",
  color: "#fff!important",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    width: "100%",
  },
}));

export const GradientLoadingButton = styled(LoadingButton)(({ theme }) => ({
  background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
  boxShadow: ' 0px 0px 7px #4191C9',
  borderRadius: '50px',
  padding: '12px 24px',
  color: "#fff",
  [theme.breakpoints.down("sm")]: {
    padding: '8px 16px',
    fontSize: '14px',
  },
}));

export const BorderGradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.3) 0%, rgba(109, 133, 218, 0.3) 100%)',
  borderRadius: '50px',
  color: "#fff",
  padding: '12px 24px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  '& img': {
    width: '32px',
    paddingRight: '10px',
  },

  '::before': {
    content: "''",
    position: 'absolute',
    background: 'linear-gradient(180deg, rgba(104, 229, 184, 1) 0%, rgba(109, 133, 218, 1) 100%)',
    inset: '0px',
    zIndex: 0,
    borderRadius: '50px',
    padding: '2px',
    '-webkit-mask':
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    '-webkit-mask-composite': 'xor',
  },
  [theme.breakpoints.down("sm")]: {
    padding: '8px 16px',
    fontSize: '12px',
    '& img': {
      width: '18px',
      paddingRight: '4px',
    },
    '::before': {
      padding: '1px',
    },
  },
}));
