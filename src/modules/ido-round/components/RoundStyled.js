const { styled, Box, Button } = require("@mui/material");


export const UtilityBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.1) -8.02%, rgba(109, 133, 218, 0.1) 98.69%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '15px',
    backdropFilter: 'blur(15px)',
    padding: '24px 36px 16px',
    '& ul': {
        listStyle: 'none',
        '& li': {
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1),
            marginBottom: theme.spacing(2),
        }
    },
    '& .border':
    {
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: 14,
        marginBottom: 12,
    },
    '& .border:last-of-type':
    {
        borderBottom: 'none',
        paddingBottom: 0,
    },
    [theme.breakpoints.down('sm')]: {

    }
}));
export const TokenBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(138.08deg, rgba(13, 33, 49, 0) -20.65%, rgba(55, 79, 164, 0.1) 1.97%, rgba(109, 146, 218, 0.2) 46.59%, rgba(72, 204, 188, 0.5) 100%)',
    borderRadius: '15px',
    backdropFilter: 'blur(15px)',
    padding: '24px 36px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(286.83deg, rgba(255, 255, 255, 0) 0%, rgba(0, 172, 226, 0.596875) 99.99%, rgba(15, 162, 153, 0.6) 100%)',
        borderRadius: 15,
        padding: '1px',
        inset: '0px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 0,
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: theme.spacing(2),
    }
}));

export const RoundInfoBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.07) -8.02%, rgba(109, 133, 218, 0.07) 98.69%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    padding: '24px',
    height: '100%',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(0deg, rgba(0, 197, 211, 0.1) -0.09%, rgba(66, 238, 207, 0.1) 100.63%)',
        borderRadius: 15,
        padding: '1px',
        inset: '0px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 0,
    },
}));
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


export const SaveButton = styled(Button)(({ them }) => ({
    background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
    color: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    padding: '8px 32px',
    borderRadius: 30,
}));

export const BuyTokenButton = styled(Button)(({ them }) => ({
    background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
    color: 'white',
    borderRadius: 30,
    padding: '8px 16px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
}));