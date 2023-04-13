import { yupResolver } from '@hookform/resolvers/yup';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputField, SubmitButton, UploadAvatar } from 'components';
import { LeftToRightGradientBoxV2 } from 'components/left-to-right-gradient-box/LeftToRightGradientBox';
import { UploadAvatarV2 } from 'components/upload-avatar/AvatarV2';
import { LoginSchema } from 'pages/validation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from 'services/auth';
import MultipleNationalSelect from './nationality';
import { put } from 'utils/api';
import { toast } from 'react-toastify';
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
    maxHeight: '100%',
    overflow: 'auto',
};

const Title = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    margin: '14px auto',
    textShadow: '0px 0px 5px rgba(255, 255, 255, 0.5)',
}));

export const UploadBtn = styled(Button)({
    height: 40,
    textTransform: 'none',
    fontWeight: 'bold',
    marginRight: 16,
    background: 'linear-gradient(178.73deg, #68E5B8 0%, #6D85DA 100%)',
    boxShadow: 'inset 0px 0px 10px rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
});

export const ButtonBtn = styled(Button)({
    height: 40,
    textTransform: 'none',
    fontWeight: 'bold',
    marginRight: 16,
    background: 'rgba(42, 78, 171, 0.12)',
    background: 'linear-gradient(178.73deg, #68E5B8 0%, #6D85DA 100%)',
    borderRadius: '10px',
    color: '#ffffff',
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

export const CreateProfilePopup = ({ open, handleClose, data }) => {
    const [files, setFiles] = React.useState([]);
    const [isFemale, setIsFemale] = React.useState(false);
    // const { mutateAsync: login } = useLogin({});

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema),
    });

    const handleFormSubmit = async (formValues) => {
        console.log(data);
        console.log('formValues', { ...formValues, isFemale });

        try {
            put(
                `/account/email/${data.account_id}`,
                { email: formValues.email_address },
                () => {
                    // toast.success('Email updated');
                    put(
                        `/account/profile/${data.account_id}`,
                        {
                            Gender: isFemale ? 2 : 1,
                            // Nationality_code: 'VN',
                            Nationality: formValues.national,
                            Dob: formValues.date_of_birth,
                        },
                        () => window.location.reload(),
                        () => toast.error('Profile fail')
                    );
                },
                () => toast.error('Email fail')
            );
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

    const handleClickSex = (type) => {
        setIsFemale(type === 'Female');
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
                                paddingBottom: 0,
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

                            <UploadAvatarV2 avatarUrl="" percent={''} />
                        </Box>
                        <Divider sx={{ background: 'rgba(255, 255, 255, 0.12)', marginBottom: 3 }} />
                        <Box sx={{ padding: 6, paddingTop: 0 }}>
                            {/* <InputField
                                id="username"
                                name="username"
                                control={control}
                                label="User name"
                                placeholder="User name"
                            /> */}
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
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        control={control}
                                        label="Date of birth"
                                        placeholder="Date of birth"
                                    />
                                </Box>

                                <Box sx={{ flexShrink: 0, display: 'flex' }}>
                                    <ButtonBtn
                                        onClick={() => handleClickSex('Male')}
                                        sx={{
                                            width: '123px',
                                            background: !isFemale
                                                ? 'linear-gradient(178.73deg, #68E5B8 0%, #6D85DA 100%)'
                                                : 'rgba(42, 78, 171, 0.12)',
                                        }}
                                        variant={isFemale ? 'outlined' : 'contained'}
                                    >
                                        Male
                                    </ButtonBtn>
                                    <ButtonBtn
                                        onClick={() => handleClickSex('Female')}
                                        sx={{
                                            width: '123px',
                                            background: isFemale
                                                ? 'linear-gradient(178.73deg, #68E5B8 0%, #6D85DA 100%)'
                                                : 'rgba(42, 78, 171, 0.12)',
                                        }}
                                        variant={!isFemale ? 'outlined' : 'contained'}
                                    >
                                        Female
                                    </ButtonBtn>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                                <Box sx={{ flexBasis: '100%' }}>
                                    <InputField
                                        id="email_address"
                                        name="email_address"
                                        control={control}
                                        label="Email Address"
                                        placeholder="Email address"
                                    />
                                </Box>

                                {/* <UploadBtn sx={{ width: '150px', margin: 0, flexShrink: 0 }} variant="contained">
                                    Send OTP
                                </UploadBtn> */}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                {/* <InputField id="otp" name="otp" control={control} placeholder="OTP code" label="OTP" /> */}
                                <MultipleNationalSelect control={control} />
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
