import { yupResolver } from '@hookform/resolvers/yup';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Box, IconButton, InputAdornment, Modal, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { InputField, SubmitButton, UploadAvatar } from 'components';
import { LoginSchema } from 'pages/validation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from 'services/auth';

const StyledForm = styled('form')(({ theme }) => ({
    width: '95%',
    margin: '0 auto',
}));

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    border: 'none',
    borderRadius: '4px',
    p: 4,
    backgroundImage: 'linear-gradient(to top, #362361 25%, #014a73 100%)',
    backdropFilter: 'blur(80px)',
};

const Title = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 72,
}));

const UploadBtn = styled(Button)({
    height: 40,
    textTransform: 'none',
    fontWeight: 'bold',
    marginRight: 16,
});

const DeletePhotoBtn = styled(Button)({
    height: 40,
    textTransform: 'none',
    fontWeight: 'bold',
});

const StyledInputUpload = styled('input')(({ theme }) => ({
    opacity: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
}));

export const CreateProfilePopup = ({ open, handleClose }) => {
    const [showPassword, setShowPassword] = React.useState();
    const [files, setFiles] = React.useState([]);
    const { mutateAsync: login } = useLogin({});

    const initialValues = '';

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

    const onDeleteAvatar = React.useCallback(() => {
        setFiles([]);
        // dispatch(updateProfileActions.deleteAvatar());
    }, []);

    const onUploadAvatar = (e) => {
        const banner = e.target.files[0];
        const form = new FormData();
        form.append('avatar', banner);
        // dispatch(updateProfileActions.uploadAvatar(form));
    };

    return (
        <Modal
            open={open}
            onClose={() => handleClose(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                <Box sx={style}>
                    <Title>Create Profile</Title>

                    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                marginBottom: 6,
                            }}
                        >
                            <Box>
                                <Typography sx={{ color: 'white', marginBottom: 2 }}>Profile photo</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <UploadBtn variant="contained" startIcon={<CloudUploadOutlinedIcon />}>
                                        <StyledInputUpload
                                            type="file"
                                            accept="image/jpeg,image/png,image/svg,image/gif"
                                            multiple
                                            onChange={onUploadAvatar}
                                        />
                                        Upload
                                    </UploadBtn>
                                    <DeletePhotoBtn
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={onDeleteAvatar}
                                    >
                                        Change
                                    </DeletePhotoBtn>
                                </Box>
                            </Box>
                            <UploadAvatar avatarUrl="" percent={''} />
                        </Box>
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
                                                {showPassword ? (
                                                    <VisibilityOffOutlinedIcon />
                                                ) : (
                                                    <VisibilityOutlinedIcon />
                                                )}
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
                            {/* <CheckboxFiled label="Remember me" />
                    <ForgotPasswordLink to="/forgot-password">Forgot your password?</ForgotPasswordLink> */}
                        </Box>

                        <SubmitButton disabled={!isValid || isSubmitting} loading={isSubmitting}>
                            &nbsp;Save Changes
                        </SubmitButton>
                    </StyledForm>
                </Box>
            </>
        </Modal>
    );
};
