import { Box, Button, Divider, Link, styled, Typography } from '@mui/material';
import { ConnectButton } from '@suiet/wallet-kit';
import { WalletContext } from 'hooks/use-connect';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WalletButton } from './wallet-button';

const InstallButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    width: 80,
    height: 32,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: '#fff !important',
    borderRadius: 50,
    textTransform: 'uppercase!important',
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 1) 0%, rgba(109, 133, 218, 1) 100%)',
    position: 'absolute',
    right: theme.spacing(2),
    minWidth: 'unset!important',
    fontWeight: 'bold',
}));

export const ChooseWalletModal = () => {
    const [isInstalledMetamask, setIsInstalledMetamask] = useState(false);
    const [isInstalledBitKeep, setIsInstalledBitKeep] = useState(false);
    const { connectToWallet, connectBitkeepWallet, error } = useContext(WalletContext);
    const { setting } = useSelector((state) => state);
    const { library } = setting;

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            setIsInstalledMetamask(true);
        }
        if (typeof window.bitkeep !== 'undefined') {
            setIsInstalledBitKeep(true);
        }
    }, []);

    return (
        <Box pl={3} pr={3} mt={2} mb={2} textAlign="center">
            <Typography>No logged in</Typography>
            {/* <AccountCircleIcon sx={{ width: 70, height: 70 }} /> */}
            <Box
                sx={{
                    marginTop: '16px',
                    marginBottom: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img src="/wallet-icon.svg" style={{ width: 72, height: 72, textAlign: 'center' }} />
            </Box>
            <Typography fontWeight={900} mb={2}>
                My Wallet
            </Typography>
            <Divider sx={{ borderBottomWidth: 1 }} />
            <Typography mt={2} pl={3} pr={3} variant="body2">
                Connect with your available or create new wallet to join our marketplace
                {/* {library.MY_WALLET_NOTE_1} */}
            </Typography>
            <Box p={3}>
                <ConnectButton style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Box className="img-box" sx={{background: '#22272d', borderRadius: '50%'}}> */}
                    <img
                        src="/Token-YouSUI.png"
                        alt="logo metamask"
                        style={{ width: 56, height: 56, marginLeft: '4px', marginRight: '16px' }}
                    />
                    {/* </Box> */}
                    SUI Wallet
                </ConnectButton>
                <WalletButton onClick={connectToWallet}>
                    <Box className="img-box">
                        <img src="/images/icon/metamask.png" alt="logo metamask" />
                    </Box>
                    <Typography className="custom-font" fontWeight={900} ml={2} style={{ color: 'white' }}>
                        Metamask
                    </Typography>
                    {error && (
                        <InstallButton component={Link} href="https://metamask.io/download/" target="_blank">
                            {/* <Typography variant="caption">{library.INSTALL}</Typography> */}
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                INSTALL
                            </Typography>
                        </InstallButton>
                    )}
                </WalletButton>
                <WalletButton
                    onClick={
                        isInstalledBitKeep ? (
                            connectBitkeepWallet
                        ) : (
                            <Link href="https://bitkeep.com/download?type=2&theme=light"></Link>
                        )
                    }
                    // onClick={() => {
                    //     if (isInstalledBitKeep) {

                    //         // _connectToMetamaskWallet('bitkeep', _handleUpdateWalletAddress);
                    //     }
                    // }}
                >
                    <Box className="img-box">
                        <img src="/images/icon/bitkeep.png" alt="logo bitkeep" />
                    </Box>
                    <Typography className="custom-font" fontWeight={900} ml={2} sx={{ color: 'white' }}>
                        Bitkeep
                    </Typography>
                    {!isInstalledBitKeep && (
                        <InstallButton
                            component={Link}
                            href="https://bitkeep.com/download?type=2&theme=light"
                            target="_blank"
                        >
                            {/* <Typography variant="caption">{library.INSTALL}</Typography> */}
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: 14 }}
                            >
                                Install
                            </Typography>
                        </InstallButton>
                    )}
                </WalletButton>
            </Box>
            <Box pl={3} pr={3}>
                <Typography variant="body2" className="mt-20">
                    {/* {library.MY_WALLET_NOTE_2} */}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'left', marginBottom: '16px' }}>
                    {/* {library.SEE}{' '} */}
                    <strong>Note:</strong>If you have previously installed SuiWallet extensions, please consider
                    removing them. Doing so may prevent you from being able to connect to Sui wallet on our system, due
                    to technical aspects of the library we are using. We apologize for any inconvenience this may cause
                    and are actively working to resolve the issue
                </Typography>
                <Typography variant="body2">
                    {/* {library.SEE}{' '} */}
                    We do not own private keys and cannot access your funds without your confirmation <br /> See {''}
                    <a
                        href="/docs/Infinity_Angel_NFT_Marketplace_Terms_And_Conditions.docx.pdf"
                        target="_blank"
                        style={{ color: '#2FA4FF', textDecoration: 'underline' }}
                    >
                        {/* {library.TERM_AND_CONDITIONS}. */}
                        Term and conditions
                    </a>
                </Typography>
            </Box>
        </Box>
    );
};
