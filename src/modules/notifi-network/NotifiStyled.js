import { LoadingButton } from "@mui/lab";
import { Box, Switch, styled } from "@mui/material";

export const WalletAddressBox = styled(Box)(({ theme }) => ({
    background: 'rgba(0, 0, 0, 0.5);',
    borderRadius: '12px',
    padding: '16px 24px',
    margin: '8px 0 16px',
    [theme.breakpoints.down('sm')]: {
        padding: '8px 16px',
        margin: '8px 0 24px',
    }
}));
export const OptionBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(105.89deg, rgba(72, 204, 188, 0.5) 0%, rgba(109, 146, 218, 0.2) 38.09%, rgba(55, 79, 164, 0.1) 67.53%, rgba(13, 33, 49, 0) 100%)',
    borderRadius: '12px',
    padding: '16px 24px',
    margin: '8px 0 24px',
    position: 'relative',
    '& .option-detail:not(:last-of-type)': {
        marginBottom: 16,
    },
    "& :before": {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(100.65deg, rgba(255, 255, 255, 0) 7.97%, rgba(51, 127, 170, 0.596875) 37.79%, rgba(115, 255, 255, 0.596875) 92.15%)',
        borderRadius: '12px',
        inset: '0px',
        padding: '1px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 0,
    },
    [theme.breakpoints.down('sm')]: {
        padding: '8px 16px',
    }
}));

export const BlueLoadingButton = styled(LoadingButton)(({ theme }) => ({
    background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
    color: 'white',
    borderRadius: 10,
    padding: '12px 36px',
    width: '100%',
    boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    '&.Mui-disabled': {
        background: 'linear-gradient(178.73deg, rgba(240, 240, 240, 0.3) -8.02%, rgba(25, 25, 26, 0.3) 98.69%)',
    }
}));

export const SubscribeSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    zIndex: 999,
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
            color: theme.palette.grey[100],
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