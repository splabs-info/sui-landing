import { Close } from '@mui/icons-material';
import { Box, Drawer, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChooseWalletModal, LoggedComponent } from 'components';
import { WalletContext } from 'hooks/use-connect';
import { useContext } from 'react';
import { useWallet } from '@suiet/wallet-kit';
const CustomDrawer = styled(Drawer)(({ theme }) => ({
    zIndex: '9998!important',
    ' .MuiDrawer-paperAnchorRight': {
        color: '#fff',
        // background: 'linear-gradient(to bottom, rgba(13, 112, 216, 0.05) 0%, rgba(7, 128, 120, 0.3) 100%)',
        backgroundImage: 'url(/images/background/bg-wallet.jpg)',
        backdropFilter: 'blur(10px)',
        width: '420px !important',
        boxShadow: 'none',
        paddingTop: '32px',
    },
    [theme.breakpoints.down('sm')]: {
        ' .MuiDrawer-paperAnchorRight': {
            width: '100%!important',
        },
    },
}));

export const WalletDrawer = ({ open, handleClose, disconnectSui }) => {
    const { address } = useContext(WalletContext);
    const wallet = useWallet();


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
                {address || wallet?.address ? (
                    <LoggedComponent address={address || wallet?.address} _onClose={handleClose} disconnectSui={disconnectSui} />
                ) : (
                    <ChooseWalletModal />
                )}
            </Box>
        </CustomDrawer>
    );
};
