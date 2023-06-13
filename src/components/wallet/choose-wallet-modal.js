import { Box, Button, Divider, Link, styled, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
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
    const [isInstalledOkx, setIsInstallOkx] = useState(false);
    const { connectToWallet, connectBitkeepWallet, error, connectOkxWallet } = useContext(WalletContext);
    const { setting } = useSelector((state) => state);
    const { library } = setting;
    const {
        select, // select
        configuredWallets, // default wallets
        detectedWallets, // Sui-standard wallets detected from browser env
        // allAvailableWallets, // all the installed Sui-standard wallets
    } = useWallet();

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            setIsInstalledMetamask(true);
        }
        if (typeof window.bitkeep !== 'undefined') {
            setIsInstalledBitKeep(true);
        }
        if (typeof window.okxwallet !== 'undefined') {
            setIsInstallOkx(true);
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
                <img src="/images/icon/wallet-icon.svg" style={{ width: 72, height: 72, textAlign: 'center' }} alt="" />
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
                {[...configuredWallets, ...detectedWallets].map((wallet) => (
                    <WalletButton
                        onClick={() => {
                            if (!wallet.installed) {
                                return;
                            }
                            try {
                                select(wallet.name);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        <Box className="img-box">
                            <img src={wallet.iconUrl} alt="logo metamask" />
                        </Box>
                        <Typography className="custom-font" fontWeight={900} ml={2} style={{ color: 'white' }}>
                            {wallet.name}
                        </Typography>
                        {!wallet.installed && (
                            <InstallButton component={Link} href={wallet.downloadUrl.browserExtension} target="_blank">
                                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                    INSTALL
                                </Typography>
                            </InstallButton>
                        )}
                    </WalletButton>
                ))}

                {!isInstalledBitKeep ? (
                    <WalletButton>
                        <Box className="img-box">
                            <img src="/images/icon/bitkeep.png" alt="logo bitkeep" />
                        </Box>
                        <Typography className="custom-font" fontWeight={900} ml={2} sx={{ color: 'white' }}>
                            BitKeep Wallet
                        </Typography>
                        <InstallButton component={Link} href="https://bitkeep.com/download?type=2&theme=light" target="_blank">
                            <Typography variant="caption">{library.INSTALL}</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: 14 }}>
                                Install
                            </Typography>
                        </InstallButton>
                    </WalletButton>
                ) : (
                    <></>
                )}
                {!isInstalledOkx ? (
                    <WalletButton>
                        <Box className="img-box">
                            <img src="/images/icon/okx-wallet.png" alt="logo okx" />
                        </Box>
                        <Typography className="custom-font" fontWeight={900} ml={2} sx={{ color: 'white' }}>
                            OKX Wallet
                        </Typography>
                        <InstallButton
                            component={Link}
                            href="https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge"
                            target="_blank"
                        >
                            <Typography variant="caption">{library.INSTALL}</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: 14 }}>
                                Install
                            </Typography>
                        </InstallButton>
                    </WalletButton>
                ) : (
                    <></>
                )}
            </Box>
            <Box pl={3} pr={3}>
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
