import { TabList } from '@mui/lab';
import { styled } from '@mui/material/styles';

export const SpecialTabList = styled(TabList)(({ theme }) => ({
    transition: '1s',
    background: 'linear-gradient(360deg, rgba(40, 140, 197, 0.15) 50%, rgba(93, 213, 230, 0.15) 100.31%)',
    borderRadius: '15px',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
        borderRadius: 15,
        padding: '2px',
        inset: '0px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 0,
    },
    '& button': {
        padding: '8px 24px',
        color: '#AAA',
        borderRadius: '15px',
        zIndex: '1',
        minWidth: 180,
        '& span': {
            transition: '0.5s',
            background: 'transparent',
            borderRadius: '12px',
        },
        position: 'relative',
    },
    '& button.Mui-selected': {
        color: '#fff',
        transition: '1s',
        borderColor: 'white',
        boxShadow: ' 0px 0px 8px #4191C9',
        '& span': {
            transition: '0.5s',
            background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
            opacity: '0.9',
            zIndex: '-1',
            borderRadius: '15px',
        },
        position: 'relative',
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            background: 'linear-gradient(178.73deg, #68E6B8 -8.02%, #6D85DA 98.69%)',
            borderRadius: 15,
            padding: '2px',
            inset: '0px',
            WebkitMask:
                'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
            WebkitMaskComposite: 'xor',
            zIndex: 0,
        },
    },
    [theme.breakpoints.down('sm')]: {
        '& button': {
            padding: '4px 16px',
            minWidth: 150,
        },
    }
}));