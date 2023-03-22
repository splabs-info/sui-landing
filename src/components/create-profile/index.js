import { yupResolver } from '@hookform/resolvers/yup';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputField, SubmitButton, UploadAvatar } from 'components';
import { LeftToRightGradientBoxV2 } from 'components/left-to-right-gradient-box/LeftToRightGradientBox';
import { LoginSchema } from 'pages/validation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from 'services/auth';
import MultipleNationalSelect from './nationality';
const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    margin: '0 auto',
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    border: 'none',
    borderRadius: '15px',
    background: 'linear-gradient(314.02deg, rgba(153, 171, 238, 0.25) -5.63%, rgba(33, 93, 137, 0.25) 88.83%)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2), inset 0px 0px 25px rgba(158, 214, 255, 0.25)',
    maxHeight: '90%',
    overflow: 'auto',
};

const Title = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    margin: '24px auto',
    textShadow: '0px 0px 5px rgba(255, 255, 255, 0.5)',
}));

export const UploadBtn = styled(Button)({
    height: 40,
    textTransform: 'none',
    fontWeight: 'bold',
    marginRight: 16,
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) 0%, rgba(109, 133, 218, 0.3) 100%)',
    boxShadow: 'inset 0px 0px 10px rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
});

const DeletePhotoBtn = styled(Button)({
    height: 40,
    textTransform: 'none',
    fontWeight: 'bold',
    background: 'rgba(42, 78, 171, 0.12)',
    borderRadius: '10px',
    color: 'white',
});

export const StyledInputUpload = styled('input')(({ theme }) => ({
    opacity: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
}));

export const CreateProfilePopup = ({ open, handleClose }) => {
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
                    <Box
                        onClick={() => handleClose(!open)}
                        sx={{ position: 'absolute', top: '17px', right: '17px', color: '#ffffff', cursor: 'pointer' }}
                    >
                        X
                    </Box>
                    <Title sx={{ textShadow: '0px 0px 5px rgba(255, 255, 255, 0.5)' }}>Create Profile</Title>
                    <Divider sx={{ background: 'rgba(255, 255, 255, 0.12)' }} />

                    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
                        <Box
                            sx={{
                                marginTop: '27px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                padding: 6,
                                paddingTop: 0,
                                flexWrap: 'wrap',
                            }}
                        >
                            <LeftToRightGradientBoxV2
                                sx={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    color: 'white',
                                    width: '100%',
                                    margin: '0 auto',
                                    height: 40,
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    marginBottom: 2,
                                }}
                            >
                                Personal Info
                            </LeftToRightGradientBoxV2>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box>
                                    <Typography sx={{ color: 'white', marginBottom: 2, fontWeight: 'bold' }}>
                                        Profile photo
                                    </Typography>

                                    <Box sx={{ display: 'flex' }}>
                                        <UploadBtn variant="contained" startIcon={<CloudUploadOutlinedIcon />}>
                                            <StyledInputUpload
                                                type="file"
                                                accept="image/jpeg,image/png,image/svg,image/gif"
                                                multiple
                                                onChange={onUploadAvatar}
                                            />
                                            Login
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
                            </Box>

                            <UploadAvatar avatarUrl="" percent={''} />
                        </Box>

                        <Divider sx={{ background: 'rgba(255, 255, 255, 0.12)', marginBottom: 3 }} />
                        <Box sx={{ padding: 6, paddingTop: 0 }}>
                            <InputField
                                id="username"
                                name="username"
                                control={control}
                                label="User name"
                                placeholder="User name"
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <Box sx={{ flexShrink: 1, flexBasis: '100%' }}>
                                    <InputField
                                        id="date-of-birth"
                                        name="date-of-birth"
                                        control={control}
                                        label="Date of birth"
                                        placeholder="Date of birth"
                                    />
                                </Box>

                                <Box sx={{ flexShrink: 0, display: 'flex' }}>
                                    <UploadBtn sx={{ width: '123px' }} variant="contained">
                                        Male
                                    </UploadBtn>
                                    <DeletePhotoBtn sx={{ width: '123px' }} variant="outlined">
                                        Female
                                    </DeletePhotoBtn>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                                <Box sx={{ flexBasis: '100%' }}>
                                    <InputField
                                        id="date-of-birth"
                                        name="date-of-birth"
                                        control={control}
                                        label="Email Address"
                                        placeholder="Email address"
                                    />
                                </Box>

                                <UploadBtn sx={{ width: '150px', margin: 0, flexShrink: 0 }} variant="contained">
                                    Send OTP
                                </UploadBtn>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <InputField id="otp" name="otp" control={control} placeholder="OTP code" label="OTP" />
                                <MultipleNationalSelect />
                            </Box>

                            <SubmitButton disabled={!isValid || isSubmitting} loading={isSubmitting}>
                                &nbsp;Save Changes
                            </SubmitButton>
                        </Box>
                    </StyledForm>
                </Box>
            </>
        </Modal>
    );
};
