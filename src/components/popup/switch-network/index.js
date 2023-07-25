import { Box, styled } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useWallet } from '@suiet/wallet-kit';
import * as React from 'react';

const SwitchNetworkPopup = styled(Box)(({ theme }) => ({
    zIndex: '9998 !important',
    color: '#fff',
    '& .MuiDialog-paper': {
        background: 'linear-gradient(to bottom, rgba(13, 112, 216, 0.2) 0%, rgba(7, 128, 120, 0.2) 100%)',
    },
    // '.MuiPaper-root': {
    //     background: 'linear-gradient(to bottom, rgba(13, 112, 216, 0.05) 0%, rgba(7, 128, 120, 0.3) 100%)',
    //     backdropFilter: 'blur(10px)',
    //     width: '240 !important',
    //     boxShadow: 'none',
    //     fontFamily: 'Be VietNam Light'
    // },
}));

export const SwitchNetwork = () => {
    const [open, setOpen] = React.useState(false);
    const wallet = useWallet();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (wallet?.connected && wallet?.address) {
            if (wallet?.chain?.name === 'Sui Mainnet') {
                handleClose();
            } else if (wallet?.chain?.name !== 'Sui Mainnet') {
                handleClickOpen();
            }
        }
    }, [wallet?.address, wallet?.chain?.name, wallet?.connected]);

    return (
        <SwitchNetworkPopup>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        background: 'linear-gradient(330.98deg, rgba(95, 172, 242, 0.2) -1.27%, rgba(20, 64, 88, 0.14) 49.25%, rgba(49, 173, 243, 0.2) 101.94%)',
                        
                        color: '#fff',
                        
                    },
                }}
            >
                <DialogContent sx={{ padding: '24px', paddingBottom: 0 }}>
                    <DialogContentText id="alert-dialog-description" sx={{ color: 'white', fontSize: 16 }}>
                        {`You are currently using ${wallet?.chain?.name} please switch to the Sui Mainnet`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" sx={{ fontSize: 16 }}>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        </SwitchNetworkPopup>
    );
};
