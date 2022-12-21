import { Box, Button, Grid, styled, Typography } from "@mui/material";

export const TitleBox = styled(Box)(({ theme }) => ({
    padding: "0",
}));

export const TypographyGradient = styled(Typography)(({ theme }) => ({
    color: "white",
    display: "initial",
    background: "linear-gradient(to right, #D0C4FC 0%, #9CEAF0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textTransform: 'uppercase',
    lineHeight: '1.3',
}));

// Title


export const ButtonTitleBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    '& button': {
        borderRadius: "2rem",
        padding: "1rem 2rem",
        marginRight: "1.5rem",
        width: "fit-content",
        alignSelf: "center",
        fontFamily: "SVN-Gilroy-heavy",
        minWidth: '230px',
        fontSize: '1rem',
    },
    [theme.breakpoints.down("lg")]: {
        marginTop: '1rem',
        '& button': {
            minWidth: '200px',
        }
    },
    [theme.breakpoints.down("md")]: {
        '& button': {
            minWidth: 'unset',
            fontSize: '0.85rem',
            marginRight: "0.5rem",
            padding: "0.5rem 1.25rem",
        }
    },
    [theme.breakpoints.down("sm")]: {
        display: 'flex',
        justifyContent: 'center',
    },

}));


export const ApplyButton = styled(Button)(({ theme }) => ({
    position: "relative",
    background: "transparent",
    color: 'white',

    "&::before": {
        content: "''",
        position: "absolute",
        inset: "0px",
        borderRadius: "2rem",
        padding: " 1px",
        background:
            "linear-gradient(90deg, #96E0DA 0%, #EACCF8 50%, #937EF3 100%)",
        WebkitMask:
            "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
        WebkitMaskComposite: "xor",
        zIndex: "1",
    },
    "&:hover": {
        background:
            "linear-gradient(90deg, #96E0DA 0%, #EACCF8 50%, #937EF3 100%)",

        color: 'black',
    },
    [theme.breakpoints.down("lg")]: {

        minWidth: '200px',
    },
    [theme.breakpoints.down("md")]: {

        minWidth: '200px',
    },
    [theme.breakpoints.down("sm")]: {

    },

}));

export const AppButton = styled(Button)(({ theme }) => ({
    position: "relative",
    color: 'black',
    background:
        "linear-gradient(90deg, #96E0DA 0%, #EACCF8 50%, #937EF3 100%)",
    "&:hover": {
        background:
            "linear-gradient(90deg, #937EF3 0%, #EACCF8 50%, #96E0DA 100%)",

    },
}));

// Network 

export const NetworksGrid = styled(Grid)(({ theme }) => ({
    position: "relative",
    background: "transparent",
    margin: '2rem 0',
    padding: '1rem',
    justifyContent: 'center',
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


// Project

export const ContainerProject = styled(Box)(({ theme }) => ({

    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
    },
}));

// RoadMap

export const RoadmapBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    color: 'white',
    '& .Roadmap-Content': {
        borderRadius: '1rem',
        background: '#2E3053',
        marginBottom: '-3rem',
        marginTop: '-3rem',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    '&:nth-of-type(2n+1)': {
        flexDirection: 'row-reverse',
    },
    '&:nth-of-type(2n+1) img': {
        transform: 'rotate(180deg)',
    },
    [theme.breakpoints.down("md")]: {
        '& .Roadmap-Content': {

            marginBottom: '1rem',
            marginTop: '1rem',
        },
    },

}));

export const RoadmapTitle = styled(Typography)(({ theme }) => ({
    fontFamily: "SVN-Gilroy-semi-bold",
    fontSize: '1.75rem',
    borderRadius: '1rem',
    padding: '1rem 2rem',
    textShadow: 'rgba(0,0,0,0.25) 0 0 4px ',
    background: 'linear-gradient(90deg, #96E0DA 0%, #EACCF8 50%, #937EF3 100%)',
    display: 'inline-flex',
    alignItems: 'center',
}));

export const RoadmapList = styled('ul')(({ theme }) => ({
    padding: '2rem',
    marginLeft: '3rem',
}));







export const ProjectBox = styled(Box)(({ theme }) => ({
    background: "#04051E",
    margin: "1rem",
    padding: '2rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '1rem',
    position: 'relative',
    "&::before": {
        content: "''",
        position: "absolute",
        inset: "0px",
        borderRadius: "1rem",
        padding: " 1px",
        background:
            "linear-gradient(90deg, #96E0DA 0%, #EACCF8 50%, #937EF3 100%)",
        WebkitMask:
            "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
        WebkitMaskComposite: "xor",
        zIndex: "0",
    },
}));

export const SeeMoreButton = styled(Button)(({ theme }) => ({
    position: "relative",
    color: 'black',
    borderRadius: "2rem",
    padding: "0.4rem 1.5rem",
    fontFamily: "SVN-Gilroy-regular",
    fontSize: '0.75rem',
    marginBottom: '1rem',
    width: "fit-content",
    alignSelf: "center",
    background:
        "linear-gradient(90deg, #96E0DA 0%, #EACCF8 50%, #937EF3 100%)",
    "&:hover": {
        background:
            "linear-gradient(90deg, #937EF3 0%, #EACCF8 50%, #96E0DA 100%)",
        fontWeight: 'bolder',
    },
}));


