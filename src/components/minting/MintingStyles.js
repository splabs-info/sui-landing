import {
  Box,
  Button,
  Card,
  Container,
  Stepper,
  styled,
  Typography,
} from "@mui/material";

export const CustomContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: "10px !important",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0px !important",
  },
}));

export const MintingBox = styled(Box)(({ theme }) => ({
  background: "url('/images/background/bg-minting.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  paddingTop: "250px",
  paddingBottom: "100px",
  overflowX: "clip",
  [theme.breakpoints.down("md")]: {
    paddingTop: "80px",
    paddingBottom: "50px",
  },
}));

export const CustomCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "100%",
  minHeight: "50vh",
  background: "rgba(20,36,59,0.5)",
  boxShadow: "none",
  padding: "5rem 2rem 3rem",
  position: "relative",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid #499EE7",
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    padding: "2rem 1.5rem 2rem",
  },
  "&:before": {
    content: '""',
    width: "2px",
    height: "90%",
    background: "#1F5486",
    position: "absolute",
    top: 0,
    left: "5.5rem",
    boxShadow: " rgb(73 158 231 / 80%) 0 0 20px 0px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export const CustomStep = styled(Stepper)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginLeft: "-1rem",
    "& .MuiStepContent-root": {
      position: "relative",
      paddingBottom: "2rem",
    },
  },
  "& .MuiStepConnector-root": {
    height: "100px",
    [theme.breakpoints.down("md")]: {
      borderRadius: "20px",
      background: "#1F5486",
      boxShadow: " rgb(73 158 231 / 80%) 0 0 20px 0px",
      height: "2px",
      marginBottom: "4rem",
      marginTop: "3rem",
    },
  },

  "& .MuiStepLabel-iconContainer svg": {
    width: "50px",
    height: "50px",
    color: "#5C7596",
    position: "relative",
    zIndex: 100,
    border: "2px solid white",
    boxShadow: "rgba(255,255,255,0.6) 0px 0px 15px 0px",
    borderRadius: "100px",
    "& text": {
      fill: "#fff",
      fontWeight: "bold",
    },
  },
  "& .MuiStepConnector-line": {
    opacity: 0,
  },
  "& .MuiStepLabel-labelContainer": {
    paddingLeft: "1rem",
  },
  "& .MuiStepContent-root": {
    paddingLeft: "6rem",
    borderLeft: "none",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "0px",
    },
  },
  "& .MuiStepLabel-root": {
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
    },
  },
  "& .MuiStepLabel-iconContainer": {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export const NoticeBox = styled(Box)(({ theme }) => ({
  background: "rgba(164,139,221,0.1)",
  borderRadius: "10px",
  padding: "2.5rem 1rem 1rem 8rem",
  margin: "10rem 2rem 3rem 7rem",
  color: "#fff",
  minHeight: "200px",
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    inset: "0px",
    borderRadius: "16px",
    padding: " 1px",
    background: "linear-gradient(90.22deg, #9FE2DC,#9A84F4)",
    WebkitMask:
      "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
    WebkitMaskComposite: "xor",
    zIndex: "1",
  },
  "& ul": {
    margin: "1rem",
  },
  "& li": {
    listStyle: "none",
    paddingBottom: "15px",
    "&::before": {
      content: '""',
      width: "10px",
      height: "10px",
      padding: "5px",
      background: "white",
      borderRadius: "50%",
      position: "absolute",
      marginTop: "0.5rem",
      left: "7rem",
      boxShadow: "rgba(255,255,255,0.6) 0px 0px 15px 0px",
      zIndex: 100,
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: "2rem 1rem 1rem",
    margin: "1rem 0rem",
    "& img": {
      display: "none",
    },
    "& li": {
      listStyle: "none",
      paddingBottom: "15px",
      "&::before": {
        left: "1rem",
        width: "5px",
        height: "5px",
      },
    },
  },
}));

export const BuyOnButton = styled(Button)(({ theme }) => ({
  background: "rgba(255,255,255,0.2)",
  borderRadius: "1.5rem",
  marginLeft: "1.5rem",
  padding: "0 1.5rem 0 .5rem",
  color: "#fff",
  "&:hover": {
    color: "#fc935f",
  },
  "& img": {
    width: "50px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.5rem",
  },
}));

export const TypographyNFT = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "white",
  fontFamily: "SVN-Gilroy-heavy",
  display: "initial",
  background: "linear-gradient(to right, #fc935f 0%, #FEAD4C 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

export const RoundName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "white",
  fontFamily: "SVN-Gilroy-heavy",
  display: "initial",
  textAlign: "left",
  width: "fit-content",
}));

export const InfoBox = styled(Box)(({ theme }) => ({
  color: "white",
  display: "flex",
  alignItems: "end",
  marginTop: "1rem",
  "& span": {
    minWidth: "100px",
    marginRight: "1rem",
  },
  "& h5": {
    fontWeight: 700,
    fontFamily: "SVN-Gilroy-heavy",
  },
}));

export const BuyButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #fc935f 0%, #FEAD4C 100%)",
  fontSize: "1.25rem",
  borderRadius: "1rem",
  padding: "0.3rem 2rem",
  marginTop: "1rem",
  color: "#fff",
  fontWeight: 700,
  fontFamily: "SVN-Gilroy-heavy",
  "&:hover": {
    background: "linear-gradient(to right,  #FEAD4C 0%, #fc935f 100%)",
  },
}));
