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
        background: 'linear-gradient(to bottom, rgba(13, 112, 216, 0.05) 0%, rgba(7, 128, 120, 0.3) 100%)',
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
