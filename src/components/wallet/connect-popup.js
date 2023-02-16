/* eslint-disable jsx-a11y/alt-text */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { WalletContext } from '../../hooks/use-connect';
import { WalletButton } from './wallet-button';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: '#171e2e',
    border: 'none',
    borderRadius: '8px',
    // boxShadow: 1,
    p: 4,
    backgroundImage: 'linear-gradient(to top, #362361 25%, #014a73 100%)',
    backdropFilter: 'blur(120px)',
};

const TitleConnectPopup = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1rem',
}));
const SmallCaption = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    fontSize: 14,
    color: grey['300'],
    opacity: 0.8,
    marginBottom: 32,
}));

export const ConnectPopup = ({ open, handleClose }) => {
    const { connectToWallet, error } = React.useContext(WalletContext);

    return (
        <Modal
            open={open}
            onClose={() => handleClose(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TitleConnectPopup id="modal-modal-title">Connect Wallet</TitleConnectPopup>
                <SmallCaption id="modal-modal-description" sx={{ mt: 2 }}>
                    By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.
                </SmallCaption>
                <WalletButton onClick={connectToWallet}>
                    <Box>
                        <img
                            src="/images/icon/metamask.svg"
                            style={{
                                width: 28,
                                height: 28,
                            }}
                        />
                    </Box>
                    <Typography className="custom-font" fontWeight={900} ml={2} style={{ color: 'white' }}>
                        Metamask
                    </Typography>
                </WalletButton>
                {/* <ConnectMetaMaskBtn
                    onClick={connectToWallet}
                    endIcon={
                        <img
                            src="/images/icon/metamask.svg"
                            style={{
                                width: 28,
                                height: 28,
                            }}
                        />
                    }
                >
                    <Typography sx={{ fontWeight: 'normal' }}>MetaMask</Typography>
                </ConnectMetaMaskBtn> */}
                {error && (
                    <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
                        Please install Metamask plugin in your browser in order to connect wallet.
                    </a>
                )}
            </Box>
        </Modal>
    );
};
