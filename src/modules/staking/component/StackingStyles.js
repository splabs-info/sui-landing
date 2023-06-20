import { Box, Button, TextField, styled } from "@mui/material";

export const ImageBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    '& img': {
        borderRadius: 15,
    },
    '& .absolute': {
        position: 'absolute',
        bottom: -20,
        left: 0,
        maxWidth: '50%',
    }
}));


export const UtilityBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.1) -8.02%, rgba(109, 133, 218, 0.1) 98.69%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '15px',
    backdropFilter: 'blur(15px)',
    padding: '16px 36px',
    '& ul': {
        display: 'grid',
        gap: theme.spacing(1),
        gridAutoFlow: 'column',
        gridTemplateRows: 'repeat(5, 1fr)',
        listStyle: 'none',
        '& li': {
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1),
            marginBottom: theme.spacing(1),
        }
    },
    [theme.breakpoints.down('sm')]: {
        '& ul': {
            display: 'grid',
            gap: theme.spacing(1),
            gridAutoFlow: 'row',
            gridTemplateRows: 'repeat(1, 1fr)',
            listStyle: 'none',
            '& li': {
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(1),
                marginBottom: theme.spacing(1),
            }
        },
    }
}));

export const BoxGradientOpacity = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    borderRadius: 12,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    textAlign: 'center',
    position: 'relative',
    height: '100%',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(0deg, #00C5D3 0%, #42EECF 100%)',
        borderRadius: 12,
        padding: '1px',
        inset: '0px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 1,
    }
}));

export const BoxGradient = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    borderRadius: 12,
    padding: '24px 48px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
        padding: '12px 24px',
        '& .MuiTypography-h6': {
            fontSize: 14,
        }
    }
}));

export const FormBox = styled(Box)(({ theme }) => ({
    padding: '2rem',
    borderRadius: '1rem',
    textAlign: 'flex-start',
    borderTopWidth: '80%',
    background: 'linear-gradient(0deg, rgba(234, 204, 248, 0.15) 0%, rgba(150, 224, 218, 0.15) 100%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    color: 'white',
}));
export const StackingButton = styled(Button)(({ theme }) => ({
    background:
        'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
    boxShadow: '0px 0px 8px #4191C9',
    borderRadius: 50,
    padding: '12px 32px',
    color: 'white',
    '&:hover': {
        background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
    },
}));
export const PackageButton = styled(Button)(({ theme }) => ({
    color: 'white',
    borderRadius: 15,
    padding: '12px 20px',
    width: '23%',
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    boxShadow: 'inset 3px 5px 10px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(0deg, #00C5D3 0%, #42EECF 100%)',
        borderRadius: 15,
        padding: '1px',
        inset: '0px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 1,
    },
    '&.active': {
        background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
        boxShadow: '0px 0px 8px #4191C9',
        '&:before': {
            padding: '0px',
        },
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%',
    }
}));
export const CustomInput = styled(TextField)(({ theme }) => ({
    width: '100%',
    color: '#28A3AB',
    marginTop: '0.5rem',
    background: 'rgba(104, 229, 184, 0.1)',
    '& .MuiSelect-select': {
        display: 'inline-flex',
    },
    '& label.Mui-focused': {
        color: '#28A3AB',
    },
    '& .MuiOutlinedInput-input': {
        padding: '0px 14px',
    },
    '& .MuiOutlinedInput-root': {
        color: '#28A3AB',
        '& fieldset': {
            borderColor: '#28A3AB',
        },
        '&:hover fieldset': {
            borderColor: '#28A3AB',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#28A3AB',
        },
    },
    '& > label': {
        color: '28A3AB !important',
    },
    '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
            color: '28A3AB',
            boxShadow: '#28A3AB 0 0 10px',
        },
    },
    '& .MuiButtonBase-root': {
        padding: theme.spacing(1.5),
        background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
        width: 80,
    },
    '& .MuiTypography-root': {
        whiteSpace: 'nowrap',
        marginRight: theme.spacing(2),
        color: 'white',
    },
}));