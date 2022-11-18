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
  // minHeight: "40px",
  display: "flex",
  // padding: " 0px 20px",
  color: "#fff!important",
  // borderRadius: "7px !important",
  // background: "rgba(46, 48, 83, 0.4)!important",
  // border: "1px solid #98cafe",
  // "&:hover": {
  //   background:
  //     "linear-gradient(336.08deg, #9F8CCC 10.7%, #2D91C8 97.43%) !important",
  // },
  // "&:disabled": {
  //   opacity: 0.6,
  // },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    width: "100%",
  },
}));

export const CustomLoadingButton = styled(LoadingButton)(({ theme }) => ({
  minHeight: "45px",
  display: "flex",
  padding: " 0px 40px",
  color: "#fff!important",
  borderRadius: "7px !important",
  background: "rgba(255, 255, 255, 0.1) !important",
  fontFamily: "Orbitron !important",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2) !important",
  },
  "&:disabled": {
    opacity: 0.6,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    width: "100%",
  },
}));
