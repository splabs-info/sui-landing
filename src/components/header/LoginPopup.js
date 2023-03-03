import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN_KEY, AppConfig, SCOPES_KEY } from '../../setting';
import { checkEmail } from '../../setting/validates';
import { _getNewProfile, _getWalletLogout } from '../../store/user/userActions';
import { UserEndpoint } from '../../store/user/userConstants';
import { post, put } from '../../utils/api';
import { setAccessToken } from '../../utils/auth';
import { CustomButton } from '../common/CustomButton';
import CustomModal from '../common/CustomModal';

export default function LoginPopup({ open, _handleClose }) {
    const { setting, userStore } = useSelector((state) => state);
    const { library, applicationConfig } = setting;
    const { walletAddress, walletSignature } = userStore;
    const dispatch = useDispatch();
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [disableResendOtp, setDisableResendOtp] = useState(false);

    const _updateAddress = () => {
        put(
            UserEndpoint.USER_UPDATE_ADDRESS,
            {
                signature: walletSignature,
                message: applicationConfig.ARR_SIGN_MESSAGE.HUMAN,
                address: walletAddress,
            },
            (data) => {
                setAccessToken(data.accessToken);
                dispatch(_getNewProfile());
                _handleClose();
            },
            (error) => {
                toast.error(`${error.msg}`);
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(SCOPES_KEY);
            }
        );
    };

    const _handleRegisterByGoogle = (e) => {
        const referral = localStorage.getItem('referral');
        const param = {
            googleAccessToken: e.accessToken,
            otp: '',
            referralId: referral ? parseFloat(referral) : null,
        };
        post(
            UserEndpoint.ENDPOINT_LOGIN_WITH_GOOGLE,
            param,
            (data) => {
                setAccessToken(data.accessToken);
                _updateAddress();
            },
            (error) => {
                console.log(error.code);
                toast.error(error.msg);
            }
        );
    };

    const _close = () => {
        dispatch(_getWalletLogout());
        _handleClose();
    };

    const _handleSendOTP = () => {
        if (!email) {
            toast.error('Please enter your email');
        } else if (checkEmail(email)) {
            toast.error('Email is incorrect');
        } else {
            const referral = localStorage.getItem('referral');
            post(
                UserEndpoint.ENDPOINT_POST_USER_REGISTER_OTP,
                {
                    email,
                    referralId: referral ? parseFloat(referral) : null,
                    address: walletAddress,
                },
                () => setShowOTP(true),
                (error) => {
                    toast.error(error.msg);
                }
            );
        }
    };

    const _handleLoginByOtp = () => {
        if (otp) {
            post(
                UserEndpoint.ENDPOINT_POST_USER_LOGIN,
                {
                    email,
                    otp,
                },
                (data) => {
                    setAccessToken(data.accessToken);
                    _updateAddress();
                },
                (error) => {
                    console.log(error.code);
                    toast.error(error.msg);
                }
            );
        } else {
            toast.error('Please enter your OTP');
        }
    };

    const _handleResendOtp = () => {
        setDisableResendOtp(true);
        setTimeout(() => {
            setDisableResendOtp(false);
        }, 10000);
    };

    return (
        <CustomModal open={open} _close={_close} isShowCloseButton={true}>
            <Grid container spacing={3} align="left">
                <Grid item xs={12}>
                    <GoogleLogin
                        clientId={AppConfig.GOOGLE_SIGN_IN_CLIENT_KEY}
                        render={(renderProps) => (
                            <CustomButton
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                sx={{
                                    mb: 3,
                                    mt: 3,
                                    p: '0px!important',
                                }}
                                fullWidth
                            >
                                <Box display="flex" pr={2} alignItems="center" width="100%">
                                    <Box
                                        p={1}
                                        sx={{
                                            borderRadius: 1,
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        <img
                                            src="/images/google-logo.png"
                                            alt=""
                                            width={40}
                                            style={{
                                                backgroundColor: '#fff',
                                            }}
                                        />
                                    </Box>
                                    <Typography align="left" ml={2} variant="body2">
                                        {library.REGISTER_WITH_GOOGLE}
                                    </Typography>
                                </Box>
                            </CustomButton>
                        )}
                        buttonText="Login"
                        onSuccess={_handleRegisterByGoogle}
                        onFailure={(e) => console.log(e)}
                        cookiePolicy={'single_host_origin'}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{ mb: 3 }} />
            </Grid>
            <Grid container spacing={3} align="left">
                <Grid item xs={12}>
                    <Typography align="left" variant="body2" sx={{ textTransform: 'uppercase' }}>
                        OR {library.REGISTER_WITH_EMAIL}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={library.EMAIL}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                    />
                </Grid>
                {showOTP && (
                    <>
                        <Grid item xs={12}>
                            <TextField
                                label={'OTP'}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="OTP"
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box textAlign="right">
                                <Typography
                                    variant="caption"
                                    color="primary"
                                    sx={{
                                        cursor: disableResendOtp ? 'default' : 'pointer',
                                        opacity: disableResendOtp ? 0.6 : 1,
                                    }}
                                    onClick={() => {
                                        if (!disableResendOtp) {
                                            _handleSendOTP();
                                            _handleResendOtp();
                                        }
                                    }}
                                >
                                    Resend OTP
                                </Typography>
                            </Box>
                        </Grid>
                    </>
                )}
                <Grid item xs={12}>
                    {showOTP ? (
                        <CustomButton
                            disabled={!showOTP}
                            onClick={_handleLoginByOtp}
                            sx={{
                                m: 'auto',
                                mb: 3,
                                minWidth: '200px!important',
                                maxWidth: 300,
                            }}
                        >
                            {library.SUBMIT}
                        </CustomButton>
                    ) : (
                        <CustomButton
                            disabled={!email}
                            onClick={_handleSendOTP}
                            sx={{
                                m: 'auto',
                                mb: 3,
                                minWidth: '200px!important',
                                maxWidth: 300,
                            }}
                        >
                            {library.SEND_OTP}
                        </CustomButton>
                    )}
                </Grid>
            </Grid>
        </CustomModal>
    );
}
