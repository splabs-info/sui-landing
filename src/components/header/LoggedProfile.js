import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, Box, Divider, Grid, Popover, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { _getMyItems, _handleLogout, _removeWalletSignature } from '../../store/user/userActions';
import { logout } from '../../utils/auth';
import { CustomButton } from '../common/CustomButton';

const LoginMethod = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    textAlign: 'center',
    width: 100,
    padding: theme.spacing(1),
    borderRadius: 4,
    ' &:hover': {
        background: 'rgba(145, 158, 171, 0.08)',
    },
}));

export default function LoggedProfile({ loading, _handleSignClick }) {
    const { userStore, setting } = useSelector((state) => state);
    const { information } = userStore;
    const { library } = setting;
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const _handleClick = (event) => {
        setAnchorEl(anchorEl === null ? event.currentTarget : null);
    };
    const _handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const _logout = () => {
        logout();
        _handleClose();
        dispatch(_handleLogout());
        dispatch(_removeWalletSignature());
    };

    const _handleSync = () => {
        _handleClose();
        dispatch(
            _getMyItems(() => {
                toast.success('Sync data success');
            })
        );
    };

    return (
        <Box mr={1}>
            {!loading ? (
                information ? (
                    <Avatar onClick={_handleClick}>H</Avatar>
                ) : (
                    <LoginMethods _handleSignClick={_handleSignClick} />
                )
            ) : null}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={_handleClose}
                onBlur={_handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    mt: 3,
                }}
            >
                <Box
                    pt={3}
                    pb={3}
                    pr={2}
                    pl={2}
                    sx={{
                        background: '#1b1c1d',
                    }}
                >
                    <Box>
                        <Box mt={1} mb={2}>
                            <Divider />
                        </Box>
                        <Box onClick={_handleSync} sx={{ cursor: 'pointer' }}>
                            <Typography variant="body1" className="custom-font" fontWeight={300} sx={{ mb: 1 }}>
                                Sync data
                            </Typography>
                        </Box>
                        <Box onClick={_logout} sx={{ cursor: 'pointer' }}>
                            <Typography variant="body1" className="custom-font" fontWeight={300}>
                                {library.LOGOUT}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
}

const LoginMethods = ({ _handleSignClick }) => {
    const { userStore } = useSelector((state) => state);
    const { walletAddress } = userStore;
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const _handleClick = (event) => {
        setAnchorEl(anchorEl === null ? event.currentTarget : null);
    };
    const _handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const _loginWithWallet = () => {
        if (walletAddress) {
            _handleSignClick();
        } else {
            toast.error('Please connect wallet');
        }
    };

    return (
        <>
            <CustomButton onClick={_handleClick}>Login</CustomButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={_handleClose}
                onBlur={_handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    mt: 1,
                }}
            >
                <Box>
                    <Typography p={2} fontWeight={500}>
                        Select login with
                    </Typography>
                    <Divider />
                    <Box p={2}>
                        <Grid container spacing={2} display="flex">
                            <Grid item xs={6}>
                                <LoginMethod onClick={() => navigate('/auth/login')}>
                                    <EmailIcon fontSize="large" />
                                    <Typography variant="body2" className="custom-font" fontWeight={300} sx={{ mb: 1 }}>
                                        Email
                                    </Typography>
                                </LoginMethod>
                            </Grid>
                            <Grid item xs={6}>
                                <LoginMethod onClick={_loginWithWallet}>
                                    <AccountBalanceWalletIcon fontSize="large" />
                                    <Typography variant="body2" className="custom-font" fontWeight={300} sx={{ mb: 1 }}>
                                        Wallet
                                    </Typography>
                                </LoginMethod>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};
