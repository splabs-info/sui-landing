import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { BoxStyled, Color, FontFamily } from "../../constant/styled";



export const SectionBox = styled(Box)(({ theme }) => ({
    backgroundSize: "100% 100%",
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.down("md")]: {
        backgroundSize: "cover",
    },
}));



export const TitleBox = styled(Box)(({ theme }) => ({
    padding: "0",
    marginLeft: '5rem',
    zIndex: 2,
    "& .MuiTypography-root": {
        fontFamily: "SVN-Gilroy-heavy",
        color: 'white',
        fontSize: '3rem',
        textTransform: 'capital',
    }
}));

export const ImgTitleBox = styled(Box)(({ theme }) => ({
    width: '200px',
    position: 'absolute',
    left: '0rem',
    top: '-3rem',
    zIndex: 0
}));

export const TypographyGradient = styled(Typography)(({ theme }) => ({
    color: "white",
    display: "initial",
    background: "linear-gradient(to right, #D0C4FC 0%, #9CEAF0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: '1.3',
}));

// Title

export const TitleTypography = styled(Typography)(({ theme }) => ({
    color: Color.text,
    fontFamily: FontFamily.heavy,
    textTransform: 'uppercase',
    lineHeight: '1.3',
    fontSize: '2.25rem!important',
    '& span': { color: Color.primary },
}));
export const TextTypography = styled(Typography)(({ theme }) => ({
    color: Color.text,
}));


export const ButtonTitleBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
}));

export const FrameButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'url(/images/background/btn.png)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: "100% 100%",
    width: 220,
    height: 90,
    color: Color.text,
    fontFamily: "SVN-Gilroy-heavy",
    fontSize: '1rem',
    "&:hover": {
        background: 'url(/images/background/btn.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: Color.primary,
    },
    [theme.breakpoints.down("sm")]: {
        width: 110,
        height: 45,
        fontSize: '0.55rem',
    },

}));








// Network 

export const NetworksGrid = styled(Grid)(({ theme }) => ({
    position: "relative",
    background: "#11132C",
    borderRadius: "2rem",
    margin: '2rem 0',
    padding: '3rem 1rem',
    justifyContent: 'center',
    boxShadow: BoxStyled.boxShadow1,
    "&::before": {
        content: "''",
        position: "absolute",
        inset: "0px",
        borderRadius: "2rem",
        padding: " 1px",
        background:
            "linear-gradient(90deg, #9162FE 25%,  #00A5FF 100%)",
        WebkitMask:
            "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
        WebkitMaskComposite: "xor",
        zIndex: "0",
    },
    [theme.breakpoints.down("sm")]: {
        margin: '0',
    },

}));

export const NetworkBox = styled(Box)(({ theme }) => ({
    marginTop: '2rem',
    "& a": {
        background: "rgba(50,53,96,0.33)",
        // margin: "0.3rem",
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.5rem',
    },

}));


// Platform

export const ContainerPlatform = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: 'center',
    flexWrap: 'wrap',
}));


export const PlatformBox = styled(Box)(({ theme }) => ({
    background: "#04051E",
    // margin: "1rem",
    padding: '1.5rem',
    display: 'flex!important',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '1rem',
    width: '30%',
    position: 'relative',
    marginBottom: '2rem',
    height: '100%',
    minHeight: '520px',
    "&::before": {
        content: "''",
        position: "absolute",
        inset: "0px",
        borderRadius: "1rem",
        padding: " 1px",
        background:
            "linear-gradient(90deg, #9162FE 25%, #00A5FF 100%)",
        WebkitMask:
            "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
        WebkitMaskComposite: "xor",
        zIndex: "0",
    },
    [theme.breakpoints.down("md")]: {
        width: '45%',
    },
    [theme.breakpoints.down("sm")]: {
        width: '90%',
    },
}));

