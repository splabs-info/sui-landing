import { Close } from '@mui/icons-material';
import { Box, Drawer, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChooseWalletModal, LoggedComponent } from 'components';
import { WalletContext } from 'hooks/use-connect';
import { useContext } from 'react';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
    zIndex: '9998!important',
    ' .MuiDrawer-paperAnchorRight': {
        color: '#fff',
        background:
            'linear-gradient(45deg, rgba(21, 133, 236, 0.3) 0%, rgba(27, 35, 103, 0.3) 48.96%, rgba(15, 40, 68, 0.3) 100%)',
        backdropFilter: 'blur(10px)',
        width: '420px !important',
        boxShadow: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        ' .MuiDrawer-paperAnchorRight': {
            width: '100%!important',
        },
    },
}));

export const WalletDrawer = ({ open, handleClose }) => {
    const { address } = useContext(WalletContext);

    return (
        <CustomDrawer anchor={'right'} open={open} onClose={() => handleClose(!open)}>
            <Box>
                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: 'white',
                    }}
                    onClick={() => handleClose(!open)}
                >
                    <Close color="#fff" />
                </IconButton>
                {address ? <LoggedComponent address={address} _onClose={handleClose} /> : <ChooseWalletModal />}
            </Box>
        </CustomDrawer>
    );
};
