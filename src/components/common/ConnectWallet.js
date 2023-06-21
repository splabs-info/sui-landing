import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ErrorCode, StatusList } from '../constant';
import { prefix, provider, _changeChain, _checkLogin } from '../onchain';
import {
    _addPartnerRef,
    _addRef,
    _getBalance,
    _getInformationByAddress,
    _getMyItems,
    _getNewProfile,
    _getOnchainBalance,
    _getWalletLogout,
    _handleLogout,
    _handleProfileLogout,
    _removeWalletSignature,
    _setWalletAddress,
    _setWalletName,
} from '../store/user/userActions';
import { UserConstant, UserEndpoint } from 'store/user/userConstants';
import { post } from '../utils/api';
import { logout, setAccessToken } from '../utils/auth';
import ConfirmChangeChain from './header/ConfirmChangeChain';
import LoggedProfile from './header/LoggedProfile';
import LoginPopup from './header/LoginPopup';
import MyWallet from './header/MyWallet';
import SignPopup from './header/SignPopup';

export default function ConnectWallet({ notShowLogin = false, isBorderButton = false }) {
    const { userStore, setting } = useSelector((state) => state);
    const { walletAddress, walletName, walletSignature, information } = userStore;
    const dispatch = useDispatch();
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const { config, applicationConfig } = setting;
    const [accountNotFound, setAccountNotFound] = useState(false);
    const [showSignPopup, setShowSignPopup] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (walletName) {
            _checkLogin(
                walletName,
                (address) => {
                    dispatch(_setWalletAddress(address));
                    dispatch(_setWalletName(walletName));
                },
                () => {
                    dispatch(_getWalletLogout());
                }
            );
        } else {
            logout();
            dispatch(_handleLogout());
        }
    }, [dispatch, walletName]);

    useEffect(() => {
        if (applicationConfig && walletAddress) {
            dispatch(_getInformationByAddress(walletAddress));
            dispatch(_getOnchainBalance(applicationConfig?.networkConfig?.currencies, walletAddress, provider));
        }
    }, [applicationConfig, config, dispatch, walletAddress]);

    useEffect(() => {
        if (walletAddress && applicationConfig) {
            if (Number(prefix.networkVersion) !== applicationConfig?.networkConfig?.chainId) {
                setShowModalConfirm(true);
            }
            prefix.on('accountsChanged', (address) => {
                if (address[0]) {
                    dispatch(_handleProfileLogout());
                    dispatch(_setWalletAddress(address[0]));
                } else {
                    dispatch(_getWalletLogout());
                    dispatch(_handleLogout());
                    logout();
                }
            });
            prefix.on('chainChanged', (newNetwork) => {
                if (Number(newNetwork) !== applicationConfig?.networkConfig?.chainId) {
                    setShowModalConfirm(true);
                }
            });
        }
    }, [applicationConfig, dispatch, walletAddress]);

    const _closeModalConfirm = () => {
        setShowModalConfirm(false);
        dispatch(_getWalletLogout());
    };

    const _onAccept = () => {
        _changeChain(applicationConfig?.networkConfig?.info, () => {
            setShowModalConfirm(false);
        });
    };

    useEffect(() => {
        dispatch(_addRef());
        dispatch(_addPartnerRef());
    }, [dispatch, walletAddress]);

    useEffect(() => {
        if (walletAddress && walletSignature && walletSignature !== StatusList.UNKNOWN && applicationConfig) {
            _loginBySignature(walletSignature);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationConfig, walletSignature, walletAddress]);

    useEffect(() => {
        if (walletSignature === StatusList.UNKNOWN) {
            setLoading(false);
            dispatch({
                type: UserConstant.SET_USER_PROFILE_LOADING,
                payload: false,
            });
        }
    }, [dispatch, walletSignature]);

    useEffect(() => {
        if (information) {
            setLoading(false);
        }
    }, [information]);

    const _loginBySignature = async (signature) => {
        setLoading(true);
        post(
            UserEndpoint.ENDPOINT_USER_LOGIN_WITH_SIGNATURE,
            {
                signature,
                message: applicationConfig?.ARR_SIGN_MESSAGE?.HUMAN,
                address: walletAddress,
            },
            (data) => {
                setAccessToken(data.accessToken);
                dispatch(_getNewProfile());
                dispatch(_getMyItems());
                dispatch(_getBalance());
            },
            (error) => {
                setLoading(false);
                if (error.code === ErrorCode.ACCOUNT_NOTFOUND) {
                    setAccountNotFound(true);
                } else {
                    toast.error(error.msg);
                    dispatch(_removeWalletSignature());
                }
            }
        );
    };

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item display="flex" alignItems="center" justifyContent="center">
                    {!notShowLogin ? (
                        <LoggedProfile _handleSignClick={() => setShowSignPopup(true)} loading={loading} />
                    ) : null}
                    <MyWallet isBorderButton={isBorderButton} />
                </Grid>
            </Grid>
            <LoginPopup open={accountNotFound} _handleClose={() => setAccountNotFound(false)} />
            <SignPopup open={showSignPopup} _onClose={() => setShowSignPopup(false)} />
            <ConfirmChangeChain open={showModalConfirm} _onClose={_closeModalConfirm} _onAccept={_onAccept} />
        </Box>
    );
}
