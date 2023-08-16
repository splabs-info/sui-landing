import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useWallet } from '@suiet/wallet-kit';
import { WalletContext } from 'hooks/use-connect';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from 'services/auth';
import { useYouSuiStore } from 'zustand-store/yousui_store';
import { formatAddress } from '../../setting/format';
import CopyComponent from '../common/CopyComponent';
import { setAccessToken, logout } from 'utils/auth'
// const WalletOption = styled(Box)(({ theme }) => ({
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     paddingTop: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2),
//     position: 'relative',
//     backgroundImage: 'linear-gradient(to right, #4b565e, #2d343d)',
//     WebkitTextStroke: '0.1px #3f484f',
//     borderRadius: 8,
//     transition: 'all 0.5s ease-out',
//     marginBottom: theme.spacing(1),
//     '.img-box': {
//         padding: theme.spacing(1),
//         background: '#22272d',
//         borderRadius: '50%',
//         img: {
//             height: theme.spacing(4),
//             width: theme.spacing(4),
//             borderRadius: '50%',
//         },
//     },
//     '&:hover': {
//         background: '#22272d',
//         boxShadow: 'rgb(63 72 79 / 30%) 0px 0px 8px 0px',
//         '.img-box': {
//             backgroundImage: 'linear-gradient(to right, #4b565e, #2d343d)',
//         },
//     },
// }));

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

export const LoggedComponent = ({ address, handleClose, disconnectSui }) => {
    const { disconnectWallet } = React.useContext(WalletContext);
    const wallet = useWallet();
    const { mutateAsync: login } = useLogin();
    const { storageUser, clearUser } = useYouSuiStore();

    const handleDisconnect = React.useCallback(async () => {
        if (wallet?.address) {
            await wallet.disconnect();
            // Suiet package not really handle disconnect because they don't clear local-storage
            localStorage.removeItem('WK__LAST_CONNECT_WALLET_NAME');
            clearUser();
            disconnectSui('');
            logout();
            return;
        } else {
            if (address) {
                await disconnectWallet();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, address, disconnectWallet]);

    React.useEffect(() => {
        if (!wallet?.address || !wallet?.connected) return;
        login({ address: wallet?.address }).then((result) => {
            storageUser(result)
            setAccessToken(result?.token)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address, wallet?.connected])

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
