import { yupResolver } from '@hookform/resolvers/yup';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from 'services/auth';
import { CheckboxFiled, InputField, SubmitButton } from '../components';
import { SSO } from '../layouts/Sso';
import { LoginSchema } from './validation';

const ForgotPasswordLink = styled(Link)({
    fontWeight: 'normal',
    color: 'black',
    fontSize: 16,
    textDecoration: 'underline',
});

const StyledEmailIcon = styled(EmailOutlinedIcon)({
    width: 20,
    height: 20,
    opacity: 0.6,
});

const StyledPasswordIcon = styled(VpnKeyOutlinedIcon)({
    width: 20,
    height: 20,
    opacity: 0.6,
});

const StyledForm = styled('form')(({ theme }) => ({
    width: '90%',
    margin: '0 auto',
}));

const StyledCreateOneArea = styled(Box)(({ theme }) => ({
    textAlign: 'center',
}));

const StyledCreateOneCaption = styled(Typography)(({ theme }) => ({
    fontWeight: 'normal',
    fontSize: 16,
}));

const StyledCreateOneBtn = styled(Link)(({ theme }) => ({
    fontSize: 16,
    textDecoration: 'underline',
    color: 'rgba(5, 6, 15, 0.8)',
}));

const LoginPage = ({ initialValues, onSubmit }) => {
    const [showPassword, setShowPassword] = React.useState();
    const { mutateAsync: login } = useLogin({});

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: yupResolver(LoginSchema),
    });

    const handleClickShowPassword = () => {
        setShowPassword((showPassword) => !showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = async (formValues) => {
        try {
            await login(formValues);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <SSO title="Welcome">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
                    <Box>
                        <InputField
                            id="email-address"
                            name="email"
                            control={control}
                            label="Email address"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <StyledEmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <InputField
                            id="password"
                            name="password"
                            control={control}
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <StyledPasswordIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 2,
                        }}
                    >
                        <CheckboxFiled label="Remember me" />
                        <ForgotPasswordLink to="/forgot-password">Forgot your password?</ForgotPasswordLink>
                    </Box>
                    <SubmitButton disabled={!isValid || isSubmitting} loading={isSubmitting}>
                        &nbsp;Login
                    </SubmitButton>
                    <StyledCreateOneArea>
                        <StyledCreateOneCaption>Don't have an account yet?</StyledCreateOneCaption>
                        <StyledCreateOneBtn to="/register">Create one today</StyledCreateOneBtn>
                    </StyledCreateOneArea>
                </StyledForm>
            </Box>
        </SSO>
    );
};

export default LoginPage;
