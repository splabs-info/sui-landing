
import {
    Box,
    Button,
    Menu,
} from "@mui/material";
import { styled } from "@mui/system";

export const Footer = styled(Box)(({ theme }) => ({
    background: "linear-gradient(to right, #41B0A7 0%, #C583E4 50%, #8068EF 100%)",
    padding: "4rem 0 0",
    color: 'white',
    "& a": {
        paddingBottom: '0.25rem'
    },
    "& a:hover": {
        borderBottom: "2px solid #0099CC",
        fontWeight: 700,
    },
}));

export const UlCustom = styled(Box)(({ theme }) => ({
    color: "white",
    "& li": {
        listStyle: 'none',
        paddingBottom: '10px',
        fontSize: '0.9rem',

    },
    [theme.breakpoints.down("sm")]: {
        fontSize: "0.6rem",
    },
}));

export const FooterTitle = styled(Box)(({ theme }) => ({
    color: "white",
    fontSize: '1.25rem',
    paddingBottom: '0.75rem',
    fontFamily: "SVN-Gilroy-semi-bold",
    [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
    },
}));

export const SocialBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    "& img": {
        width: '90%'
    },
    "& a:hover": {
        borderBottom: '0px',
        "& img": {
            width: '100%'
        }
    },
    [theme.breakpoints.down("md")]: {
        justifyContent: 'center',
    },
}));


export const EndBox = styled(Box)(() => ({
    color: "white",
    background: 'rgba(0,0,0,.5)',
    textAlign: 'center',
    padding: '1.5rem 1rem 1rem',
    marginTop: '3rem',
    "& p": {
        fontSize: '0.85rem',
        fontWeight: 500,
        fontFamily: "SVN-Gilroy-regular",
    },
}));



export const MenuCustom = styled(Menu)(() => ({
    "&.MuiPopover-root": {
        border: 'none',
    },
    "& .MuiPaper-root": {
        background: '#0a0a0a!important',
        boxShadow: "none",
        border: "1px solid #98cafe",
        color: "white",
    }
}));

export const WhitePaperButton = styled(Button)(() => ({
    color: "white",
    lineHeight: "1",
    marginRight: "2rem",
    background: 'transparent',
    fontFamily: "SVN-Gilroy-regular",
    fontSize: '1rem',
    fontWeight: 500,
    "&:hover": {
        borderBottom: "1px solid #0099CC",
        borderRadius: '0px',
        color: "#0099CC",
        background: 'transparent',
        fontWeight: 700,
    },
}));