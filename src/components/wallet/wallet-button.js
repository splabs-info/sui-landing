import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const WalletBtn = styled(Button)(({ theme }) => ({
    borderRadius: '15px',
    background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.15) 0%, rgba(109, 133, 218, 0.15) 100%)',
    boxShadow: '0px 0px 30px 0px rgba(255, 255, 255, 0.25) inset',
    backdropFilter: 'blur(25px)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    position: 'relative',
    WebkitTextStroke: '0.1px #3f484f',
    transition: 'all 0.5s ease-out',
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 16,
    '.img-box': {
        background: '#22272d',
        borderRadius: '50%',
        img: {
            height: theme.spacing(5),
            width: theme.spacing(5),
            borderRadius: '50%',
        },
    },
    '&:hover': {
        background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.5) 0%, rgba(109, 133, 218, 0.5) 100%)',
        boxShadow: '0px 0px 10px 2px rgba(0,0,0 0.25)',

    },
}));

export const WalletButton = ({ children, onClick }) => {
    return <WalletBtn onClick={onClick}>{children}</WalletBtn>;
};
