import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const WalletBtn = styled(Button)(({ theme }) => ({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    position: 'relative',
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    WebkitTextStroke: '0.1px #3f484f',
    borderRadius: 8,
    transition: 'all 0.5s ease-out',
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 16,
    '.img-box': {
        padding: theme.spacing(1),
        background: '#22272d',
        borderRadius: '50%',
        img: {
            height: theme.spacing(4),
            width: theme.spacing(4),
            borderRadius: '50%',
        },
    },
    '&:hover': {
        background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 1) 0%, rgba(109, 133, 218, 1) 100%)',
        boxShadow: 'rgb(63 72 79 / 30%) 0px 0px 8px 0px',
        '.img-box': {
            backgroundImage: 'linear-gradient(to right, #4b565e, #2d343d)',
        },
    },
}));

export const WalletButton = ({ children, onClick }) => {
    return <WalletBtn onClick={onClick}>{children}</WalletBtn>;
};
