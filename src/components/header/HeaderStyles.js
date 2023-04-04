import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    width: '100vw',
    zIndex: '10',
    background: 'linear-gradient(355deg, rgba(105,220,222,0.5) 0%, rgba(107,150,219,0.5) 100%)',
    boxShadow: 'inset 0 0 30px rgb(148,255,236,0.5)',
    minHeight: '4.5rem',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    '&:before': {
        content: '""',
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, #81ECC5 0%, #94CBFF 50%)',
        position: 'absolute',
        bottom: 0,
    },
    [theme.breakpoints.down('md')]: {
        minHeight: '3rem',
    },
}));


export const Navbar = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '.5rem 0 ',
    fontFamily: 'SVN-Gilroy-regular',
    textTransform: 'uppercase',
    '& a': {
        padding: '0 0.5rem',
        margin: '0 0.5em',
        display: 'block',
        fontWeight: 700,
        '&:last-child': {
            marginRight: '0',
        },
    },
    '& a:hover:not(.logo)': {
        background: 'linear-gradient(90deg, #EACCF8 0%, #96E0DA 100%)',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        position: 'relative',
    },
    '& a.logo': {
        padding: '0',
        margin: '0',
    },
    '& .active': {
        background: 'linear-gradient(90deg, #EACCF8 0%, #96E0DA 100%)',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        position: 'relative',
    },
    // '& .active::before': {
    //     content: '" "',
    //     position: 'absolute',
    //     width: '70%',
    //     height: '2px',
    //     textAlign: 'center',
    //     margin: '0 auto',
    //     background: 'linear-gradient(270deg, #EACCF8 0%, #96E0DA 100%)',
    //     bottom: -23,
    //     left: 24,
    // },
    [theme.breakpoints.down('md')]: {
        padding: '10px',
    },
}));

export const WhitePaperButton = styled(Button)(() => ({
    color: 'white',
    lineHeight: '1',
    marginRight: '0rem',
    background: 'transparent',
    fontFamily: 'SVN-Gilroy-regular',
    fontSize: '1rem',
    textTransform: 'uppercase',
    fontWeight: 500,
    '&:hover': {
        borderBottom: '1px solid #1DD7D1',
        borderRadius: '0px',
        color: '#1DD7D1',
        background: 'transparent',
        fontWeight: 700,
    },
}));

export const ApplyButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    // background: 'transparent',
    color: 'white',
    borderRadius: '2rem',
    padding: '0.5rem 1rem',
    margin: '0 1.5rem',
    width: 'fit-content',
    alignSelf: 'center',
    background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.3) 0%, rgba(109, 133, 218, 0.3) 100%)',
    '&::before': {
        content: "''",
        position: 'absolute',
        inset: '0px',
        borderRadius: '2rem',
        padding: '2px',
        background: 'linear-gradient(180deg, rgba(104, 229, 184) 0%, rgba(109, 133, 218) 100%)',
        // border: '1px solid rgba(0, 197, 211, 1)',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: '1',
    },
    '&:hover': {
        background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.6) 0%, rgba(109, 133, 218, 0.6) 100%)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0.25rem 1rem',
        margin: 0
    },
}));

export const AppButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    background: 'transparent',
    color: 'white',
    borderRadius: '2rem',
    padding: '0.5rem 1rem',
    margin: '0 1.5rem',
    width: 'fit-content',
    alignSelf: 'center',
    '&::before': {
        content: "''",
        position: 'absolute',
        inset: '0px',
        borderRadius: '2rem',
        padding: ' 1px',
        background: 'linear-gradient(90deg, #96E0DA 0%, #EACCF8 50%, #937EF3 100%)',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: '1',
    },
    '&:hover': {
        background: 'linear-gradient(90deg, #96E0DA 0%, #EACCF8 50%, #937EF3 100%)',
    },
}));

export const IconLang = styled(Box)(() => ({
    height: '25px',
    paddingRight: '10px',
}));
