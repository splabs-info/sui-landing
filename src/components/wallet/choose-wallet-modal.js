import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, Divider, Link, styled, Typography } from '@mui/material';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { WalletContext } from 'hooks/use-connect';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WalletButton } from './wallet-button';

const InstallButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: '#fff !important',
    borderRadius: 8,
    textTransform: 'uppercase!important',
    background: '#22272d',
    position: 'absolute',
    right: theme.spacing(2),
    minWidth: 'unset!important',
    border: '1px solid #869ba5',
}));

export const ChooseWalletModal = () => {
    const [isInstalledMetamask, setIsInstalledMetamask] = useState(false);
    const [isInstalledBitKeep, setIsInstalledBitKeep] = useState(false);
    const { connectToWallet, connectBitkeepWallet, error } = useContext(WalletContext);
    const { setting } = useSelector((state) => state);
    const { library } = setting;
    const wallet = useWallet();

    // console.log('wallet status', wallet.status);
    // console.log('connected wallet name', wallet.name);
    // console.log('connected account info', wallet.account.address);
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
            <AccountCircleIcon sx={{ width: 70, height: 70 }} />
            <Typography fontWeight={900} mb={2}>
                My Wallet
            </Typography>
            <Divider sx={{ borderBottomWidth: 1 }} />
            <Typography mt={2} pl={3} pr={3} variant="body2">
                Connect with your available or create new wallet to join our marketplace
                {/* {library.MY_WALLET_NOTE_1} */}
            </Typography>
            <Box p={3}>
                <ConnectButton />
                {/* <WalletButton onClick={SUIContext}>
                    <Box className="img-box">
                        <img src="/images/icon/metamask.png" alt="logo metamask" />
                    </Box>
                    <Typography className="custom-font" fontWeight={900} ml={2} style={{ color: 'white' }}>
                        SUI
                    </Typography>
                    {error && (
                        <InstallButton component={Link} href="https://metamask.io/download/" target="_blank">
                            <Typography variant="caption">INSTALL</Typography>
                        </InstallButton>
                    )}
                </WalletButton> */}
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
                            <Typography variant="caption">INSTALL</Typography>
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
                            <Typography variant="caption">INSTALL</Typography>
                        </InstallButton>
                    )}
                </WalletButton>
            </Box>
            <Box pl={3} pr={3}>
                <Typography variant="body2" className="mt-20">
                    {/* {library.MY_WALLET_NOTE_2} */}
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
