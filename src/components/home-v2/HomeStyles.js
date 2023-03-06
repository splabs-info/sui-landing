import { alpha, Box, Button, Grid, styled, Typography } from '@mui/material';
import { Background, BoxStyled, Color, FontFamily } from '../../constant/styled';
import { TabList, TabPanel } from '@mui/lab';

export const SectionBox = styled(Box)(({ theme }) => ({
    backgroundSize: { md: '100% 100%', xs: 'cover' },
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 150,
    paddingBottom: 50,
    [theme.breakpoints.down('md')]: {
        backgroundSize: 'cover',
    },
}));

export const CenterBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
export const SpaceBetweenBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

export const TitleBox = styled(Box)(({ theme }) => ({
    padding: '0',
    marginLeft: '5rem',
    zIndex: 2,
    '& .MuiTypography-root': {
        fontFamily: 'SVN-Gilroy-heavy',
        color: 'white',
        fontSize: '3rem',
        textTransform: 'capital',
    },
    [theme.breakpoints.down('md')]: {
        '& .MuiTypography-root': {
            fontSize: '2rem',
        },
    },
}));

export const ImgTitleBox = styled(Box)(({ theme }) => ({
    width: '200px',
    position: 'absolute',
    left: '0rem',
    top: '-3rem',
    zIndex: 0,
}));

export const TypographyGradient = styled(Typography)(({ theme }) => ({
    color: 'white',
    display: 'initial',
    background: 'linear-gradient(to right, #81ECC5 0%, #94CBFF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem!important',
    },
}));
export const TextTypography = styled(Typography)(({ theme }) => ({
    color: Color.text,
}));

export const ButtonTitleBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '1rem',
}));

export const FrameButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'url(/images/background/btn-sui.png)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    width: 220,
    height: 90,
    color: Color.text,
    fontFamily: 'SVN-Gilroy-heavy',
    fontSize: '1rem',
    '&:hover': {
        background: 'url(/images/background/btn-sui.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: Color.primary,
    },
    [theme.breakpoints.down('sm')]: {
        width: 110,
        height: 45,
        fontSize: '0.55rem',
    },
}));

// Network

export const NetworksGrid = styled(Grid)(({ theme }) => ({
    position: 'relative',
    background: '#11132C',
    borderRadius: '2rem',
    margin: '2rem 0',
    padding: '3rem 1rem',
    justifyContent: 'center',
    boxShadow: BoxStyled.boxShadow1,
    '&::before': {
        content: "''",
        position: 'absolute',
        inset: '0px',
        borderRadius: '2rem',
        padding: ' 1px',
        background: 'linear-gradient(90deg, #00C5D3 25%,  #42EECF 100%)',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: '0',
    },
    [theme.breakpoints.down('sm')]: {
        margin: '0',
    },
}));

export const NetworkBox = styled(Box)(({ theme }) => ({
    marginTop: '2rem',
    '& a': {
        background: 'rgba(50,53,96,0.33)',
        // margin: "0.3rem",
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.5rem',
    },
}));

export const ComingPoolsBox = styled(Box)(({ theme }) => ({}));

export const ComingPoolsChildBox = styled(Box)(({ theme }) => ({
    background: Background.gradient45,
    padding: '1rem',
    borderRadius: '1rem',
    marginTop: '1rem',
    transition: '0.25s',
    '& .MuiTypography-body1': {
        fontSize: '0.85rem',
    },
}));

export const CompletedPoolsBox = styled(Box)(({ theme }) => ({
    background: Background.gradient45,
    padding: '0px',
    borderRadius: '1rem',
    position: 'relative',
    marginBottom: '2rem',
    width: '100%',
    '&::before': {
        content: "''",
        position: 'absolute',
        inset: '0px',
        borderRadius: '1rem',
        padding: ' 1px',
        background: Background.gradientBorder,
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: '0',
    },
    '& img': {
        borderRadius: '10px',
        width: '200px',
        transition: '0.25s',
    },
    '& img,p': {
        zIndex: 1,
    },
    '& .CompletedPoolsChild': {
        transition: '0.25s',
    },
    '&:hover': {
        minHeight: 364,
        padding: 8,
        '& .CompletedPoolsChild': {
            padding: 0,
        },
        '& .CompletedPoolsChild-2': {
            padding: '12px 16px',
        },
        '& .ImgBox': {
            width: '60%',
        },
        '& .TextBox': {
            paddingRight: '0.5rem',
        },
        '& img': {
            width: '250px',
            borderRadius: '10px 0 0 10px',
        },
    },

    [theme.breakpoints.down('md')]: {},
}));

export const CompletedPoolsChildBox = styled(Box)(({ theme }) => ({
    background: '#2C2C50',
    padding: '24px',
    display: 'inline-flex',
    borderRadius: '1rem',
    width: '100%',
    height: 250,
}));

export const CustomTabList = styled(TabList)(({ theme }) => ({
    transition: '1s',
    '& button': {
        padding: '1.5rem',
        color: alpha('#fff', 1),
        margin: '8px',
        borderRadius: '8px',
        zIndex: '1',
        boxShadow: '0 0 5px 2px rgba(45,145,200,0.3)',
        '& span': {
            background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
            opacity: '0.3',
            borderRadius: '8px',
        },
        '&::before': {
            content: "''",
            position: 'absolute',
            inset: '0px',
            borderRadius: '8px',
            padding: ' 1px',
            // background: Background.gradientBorder,
            background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
            WebkitMask:
                'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
            WebkitMaskComposite: 'xor',
            zIndex: '0',
        },
    },
    '& .MuiTabs-flexContainer': {
        justifyContent: { md: 'center', xs: 'flex-start' },
        overflowX: { md: 'hidden', xs: 'auto' },
        '::-webkit-scrollbar': {
            display: 'none',
        },
    },
    '& button.Mui-selected': {
        boxShadow: 'none',
        color: alpha('#fff', 1),
        transition: '1s',
        '& span': {
            background:
                'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);ß',
            opacity: '0.8',
            zIndex: '-1',
        },
        '&::before': {
            background: 'transparent',
        },
    },
    '& .MuiTypography-body1': {
        fontSize: '0.95rem',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
    },
    '& .MuiTypography-body2': {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        '& button': {
            padding: '0.5rem 1rem',
        },

        '& .MuiTabs-scrollButtons': {
            color: Color.primary,
        },
        '& .MuiTabs-scrollButtons.Mui-disabled ': {
            opacity: '0.3',
        },
    },
}));

export const CustomTabPanel = styled(TabPanel)(({ theme }) => ({
    padding: '2rem 0',
}));
