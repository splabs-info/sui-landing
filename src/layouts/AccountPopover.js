import { alpha, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// @mui
import { Avatar, Box, Divider, Fab, ListItemIcon, ListItemText, MenuItem, Stack, Typography } from '@mui/material';
// components
import CopyContent from '../components/CopyContent';
import MenuPopover from '../components/MenuPopover';
// utils
import { _getNewProfile, _handleProfileLogout } from '../store/user/userActions';
import { isLoggedIn, logout } from '../utils/auth';

// icon
import { IconLogout, IconUser } from '@tabler/icons';

const MenuButton = styled(Fab)(({ theme }) => ({
    background: 'none',
    color: '#fff',
    boxShadow: 'none',
}));

const AccountBox = styled(Stack)(() => ({
    '& a': {
        textDecoration: 'none',
        color: '#fff',
        fontWeight: 500,
        fontFamily: 'SVN-Gilroy-heavy',
        display: 'initial',
        '&:hover': {
            background: 'linear-gradient(to right, #fc935f 0%, #FEAD4C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
    },
}));
// ----------------------------------------------------------------------

export default function AccountPopover({ lightMode, ...other }) {
    const dispatch = useDispatch();
    const logged = isLoggedIn();
    const { userStore, setting } = useSelector((state) => state);
    const { library } = setting;
    const [checkUser, setCheckUser] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { information } = userStore;

    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setCheckUser(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCheckUser(false);
    };

    const handleGetProfile = () => {
        dispatch(_getNewProfile());
    };

    useEffect(() => {
        if (logged) handleGetProfile();
    }, [checkUser]);

    return (
        <Box {...other}>
            {logged ? (
                <>
                    <MenuButton
                        onClick={handleOpen}
                        sx={{
                            '&:hover': {
                                background: lightMode ? alpha('#8BA0B1', 0.1) : 'rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        <Avatar
                            src={userStore ? userStore.avatar : ''}
                            sx={{
                                background: 'none',
                                color: lightMode ? '#8BA0B1' : '',
                            }}
                        >
                            <IconUser size={'1.8rem'} />
                        </Avatar>
                    </MenuButton>

                    <MenuPopover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        sx={{
                            p: 0,
                            mt: 1.5,
                            ml: 0.75,
                            minWidth: '300px',
                            '& .MuiMenuItem-root': {
                                typography: 'body2',
                                borderRadius: 0.75,
                            },
                        }}
                    >
                        <Box sx={{ my: 1.5, px: 2.5 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                Email: {information?.email}
                            </Typography>
                        </Box>
                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <Box sx={{ my: 1.5, px: 2.5 }}>
                            <Stack sx={{ fontSize: '0.9rem', color: '#637381' }}>
                                <Typography fontSize={'0.9rem'} sx={{ marginBottom: '-10px' }}>
                                    Invitation link:
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ my: 1.5, px: 2.5 }}>
                            <CopyContent
                                text={`${window.location.origin}/auth/register?invitation-code=${information?.linkRef}`}
                                length={10}
                            />
                        </Box>

                        <Divider sx={{ borderStyle: 'dashed' }} />
                        <MenuItem
                            onClick={() => {
                                dispatch(_handleProfileLogout());
                                logout();
                            }}
                            sx={{ m: 1 }}
                        >
                            <ListItemIcon>
                                <IconLogout stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText>{library.LOGOUT}</ListItemText>
                        </MenuItem>
                    </MenuPopover>
                </>
            ) : (
                <AccountBox direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                    <Link to={'auth/login'}>{library.LOGIN}</Link>
                    <Divider orientation="vertical" sx={{ height: '20px' }} />
                    <Link to={'auth/register'}>{library.REGISTER}</Link>
                </AccountBox>
            )}
        </Box>
    );
}
