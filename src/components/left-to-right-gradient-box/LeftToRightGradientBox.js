import { Card, styled } from '@mui/material';

export const StyledLeftToRightGradientBox = styled(Card)(({ theme }) => ({
    background: 'transparent',
    color: 'white',
    transition: 'all 0.1s ease-in-out',
    boxShadow: 'unset',
    borderRadius: '16px',
    position: 'relative',
    minHeight: '100%',

    '&::before': {
        content: "''",
        position: 'absolute',
        inset: '0px',
        borderRadius: '50px',
        padding: ' 1px',
        background: 'linear-gradient(rgba(232, 204, 245, 0.9) 0%, rgba(55, 176, 244, 0.93)  100%)',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
    },
}));

export const StyledLeftToRightGradientBoxV2 = styled(Card)(({ theme }) => ({
    color: 'white',
    transition: 'all 0.1s ease-in-out',
    position: 'relative',
    minHeight: '100%',
    background: 'linear-gradient(178.73deg, #68E5B8 0%, #6D85DA 100%)',
    boxShadow: '0px 0px 7px rgba(255, 255, 255, 0.7), inset 0px 0px 15px rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50px',
}));

export const LeftToRightGradientBox = ({ children, ...props }) => {
    return <StyledLeftToRightGradientBox {...props}>{children}</StyledLeftToRightGradientBox>;
};

export const LeftToRightGradientBoxV2 = ({ children, ...props }) => {
    return <StyledLeftToRightGradientBoxV2 {...props}>{children}</StyledLeftToRightGradientBoxV2>;
};
