import { LoadingButton } from "@mui/lab";

const { styled, Box, Typography, Button, Select, Stack, Switch } = require("@mui/material");

export const SwapBox = styled(Box)(({ theme }) => ({
    marginBottom: 64,
    marginTop: 24,
    padding: '32px 64px',
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.07) -10%, rgba(109, 133, 218, 0.07) 100%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(0deg, rgba(0, 197, 211, 0.1) 0%, rgba(66, 238, 207, 0.1) 100%)',
        borderRadius: '15px',
        inset: '0px',
        padding: '1px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 0,
    },
    [theme.breakpoints.down('sm')]: {
        padding: '16px',
    }

}))
export const PriceTypography = styled(Typography)(({ theme }) => ({
    color: '#fff',
    textShadow: '0px 0px 5px rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 16,
}))
export const SwapButton = styled(LoadingButton)(({ theme }) => ({
    color: '#fff',
    boxShadow: 'inset 0px 0px 10px rgba(255, 255, 255, 0.25)',
    background: 'linear-gradient(254.77deg, #207BBF 18.51%, #4A94CB 51.55%, #5CBAF2 87.9%)',
    borderRadius: '10px',
    padding: '12px 32px',
}))
export const ConnectButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    boxShadow: 'inset 0px 0px 10px rgba(255, 255, 255, 0.25)',
    background: 'linear-gradient(254.77deg, #207BBF 18.51%, #4A94CB 51.55%, #5CBAF2 87.9%)',
    borderRadius: '10px',
    padding: '12px 32px',
    marginTop: 8,
    width: '100%',
}))


export const AmountBox = styled(Box)(({ theme }) => ({
    marginBottom: 16,
    marginTop: 16,
    padding: '16px 24px',
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.15) -10%, rgba(109, 133, 218, 0.15) 100%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(0deg, rgba(0, 197, 211, 0.3) 0%, rgba(66, 238, 207, 0.3) 100%)',
        borderRadius: '15px',
        inset: '0px',
        padding: '1px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 0,
    },
    [theme.breakpoints.down('sm')]: {
        padding: '16px',
    }
}))

export const SelectToken = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        fontWeight: 600,
        background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.25) -10%, rgba(109, 133, 218, 0.25) 100%)',
        boxShadow: 'inset 0px 0px 30px rgba(125, 255, 224, 0.25)',
        backdropFilter: 'blur(25px)',
        borderRadius: '10px',
        minWidth: '100px',
    },
    '& svg': {
        color: '#fff',
    },
    '& img': {
        width: '32px',
        marginRight: 8
    },
    [theme.breakpoints.down('sm')]: {
        '& img': {
            width: '24px',
            marginRight: 4
        },
        '& .MuiSelect-select': {
            minWidth: '80px',
            padding: '8px 16px 8px 8px',
            fontSize: '14px',
            fontWeight: 400,
        },
    }
}))
export const AmountStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: 'white',
    '& .MuiTypography-body1': {
        color: '#14E3BE',
    },
    '& img': {
        marginRight: 8,
    },
}))
export const SettingBox = styled(Box)(({ theme }) => ({
    background: 'rgba(9, 23, 43, 0.6)',
    borderRadius: '15px',
    backdropFilter: 'blur(25px)',
    padding: 32,
    transition: 'all 0.3s',
}))
export const SlippageBox = styled(Box)(({ theme }) => ({
    background: 'rgba(11, 30, 40, 0.7)',
    borderRadius: '10px',
    padding: 8,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'space-between',
    '& p': {
        padding: '12px 40px'
    },
    '& .active': {
        '& p': {
            background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.7) -10%, rgba(109, 133, 218, 0.7) 100%)',
            boxShadow: 'inset 0px 0px 30px rgba(125, 255, 224, 0.25)',
            backdropFilter: 'blur(25px)',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 700,
        }
    }
}))


export const SlippageSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#68E5B8',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#6489A4',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));