import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Button, Divider, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { WalletContext } from 'hooks/use-connect';
import React from 'react';
import { formatAddress } from '../../setting/format';
import CopyComponent from '../common/CopyComponent';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { Link } from 'react-router-dom';
import { useWallet } from '@suiet/wallet-kit';

const WalletOption = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    position: 'relative',
    backgroundImage: 'linear-gradient(to right, #4b565e, #2d343d)',
    WebkitTextStroke: '0.1px #3f484f',
    borderRadius: 8,
    transition: 'all 0.5s ease-out',
    marginBottom: theme.spacing(1),
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
        background: '#22272d',
        boxShadow: 'rgb(63 72 79 / 30%) 0px 0px 8px 0px',
        '.img-box': {
            backgroundImage: 'linear-gradient(to right, #4b565e, #2d343d)',
        },
    },
}));

const MenuItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    cursor: 'pointer',
    opacity: '0.9',
    '&:hover': {
        opacity: 1,
    },
}));

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

export const LoggedComponent = ({ address, handleClose, disconnectSui }) => {
    const { disconnectWallet, disconnectBitkeepWallet } = React.useContext(WalletContext);
    const wallet = useWallet();

    const handleDisconnect = React.useCallback(async () => {
        if (wallet?.address) {
            await wallet.disconnect();
            // Suiet package not really handle disconnect because they don't clear local-storage
            localStorage.removeItem('WK__LAST_CONNECT_WALLET_NAME');
            disconnectSui('');
            return;
        } else {
            if (address) {
                await disconnectWallet();
            }
        }
    }, [wallet, address, disconnectSui, disconnectWallet]);

    return (
        <Box pl={3} pr={3} mt={2} mb={2} textAlign="center">
            <Typography>Logged in</Typography>
            <AccountCircleIcon sx={{ width: 70, height: 70 }} />
            <Typography fontWeight={900}>My wallet</Typography>
            <Box mb={2} mt={1}>
                <CopyComponent content={`${address}`}>{formatAddress(`${address}`, 10)}</CopyComponent>
            </Box>
            <Box sx={{
                background: 'linear-gradient(170deg, #68E5B8 0%, #6D85DA 100%)',
                height: '1px',
                my: 3
            }} />
            {/* <Box p={3}>
                {onChainBalances &&
                    onChainBalances.map(
                        (item, index) =>
                            item.symbol !== CoinList.INC && (
                                <WalletOption key={index}>
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box className="img-box">
                                                        <img
                                                            alt={item.asset}
                                                            src={`/images/coins/${item.symbol}.png`}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1">
                                                        {formatNumberWithDecimal(item.onChainBalance)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="caption" fontWeight={500}>
                                                        {item.symbol}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {index > 0 && (
                                        <InstallButton
                                            onClick={() => {
                                                _addToken({
                                                    tokenAddress: item.address,
                                                    tokenSymbol: item.symbol,
                                                    tokenDecimals: item.decimals ? item.decimals : 18,
                                                    tokenImage: `https://airtnt.io/images/coins/${item.symbol}.png`,
                                                });
                                            }}
                                        >
                                            <Typography variant="body2">{library.ADD}</Typography>
                                        </InstallButton>
                                    )}
                                </WalletOption>
                            )
                    )}
            </Box> */}
            <Box pl={3} pr={3}>
                {/* <MenuItem component={Link} to="/minting-transactions" sx={{ color: '#fff', textDecoration: 'unset' }}> */}
                {/* <IconHistoryToggle /> <Box ml={2}>{library.MINTING_TRANSACTIONS}</Box>
                </MenuItem>
                <MenuItem component={Link} to="/vesting" sx={{ color: '#fff', textDecoration: 'unset' }}>
                    <IconCash /> <Box ml={2}>{library.VESTING_SCHEDULE}</Box>
                </MenuItem> */}
                <MenuItem component={Link} to="my-profile" sx={{ color: 'white', textDecoration: 'unset' }}>
                    <AccountBoxOutlinedIcon /> <Box ml={2}>My profile</Box>
                </MenuItem>
                <MenuItem onClick={handleDisconnect}>
                    <ExitToAppOutlinedIcon /> <Box ml={2}>Disconnect</Box>
                </MenuItem>
            </Box>
        </Box>
    );
};
