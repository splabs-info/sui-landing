import { yupResolver } from '@hookform/resolvers/yup';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Box, Button, CircularProgress, Divider, Modal, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputField, SubmitButton } from 'components';
import { LeftToRightGradientBoxV2 } from 'components/left-to-right-gradient-box/LeftToRightGradientBox';
import { UploadAvatarV2 } from 'components/upload-avatar/AvatarV2';
import moment from 'moment';
import { UpdateProfileSchema } from 'pages/validation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateEmailById, useUpdateInfo, useUploadAvatar } from 'services/auth';
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
    maxHeight: '100%',
    overflow: 'inherit',
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

const loading = {
    background: 'transparent',
    position: 'absolute',
    top: '50%',
    left: '50%',
};

export const CreateProfilePopup = ({ open, handleClose, data, id, handleRefresh, setDefaultInfo }) => {
    const [isFemale, setIsFemale] = React.useState(data?.gender !== 2);
    const [dataImageUpload, setDataImageUpload] = React.useState(null);
    const { mutateAsync: updateEmail, isLoading } = useUpdateEmailById({
        onSuccess: () => {
            handleClose(true);
        },
    });
    const { mutateAsync: updateInfo, isLoading: isLoadingInfo } = useUpdateInfo({
        onSuccess: () => {
            handleClose(true);
        },
    });
    const { mutateAsync: uploadAvatar, isLoading: isLoadingAvt } = useUploadAvatar();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
        reset,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email_address: data?.email || '',
            // date_of_birth: moment(data?.dob).format('DD-MM-YYYY') || '01-01-2000',
            nationality: data?.nationality || 'Viet Nam',
        },
        resolver: yupResolver(UpdateProfileSchema),
    });

    useEffect(() => {
        if (!open) {
            setDataImageUpload(null);
        }
    }, [open]);

    useEffect(() => {
        reset({
            email_address: data?.email || '',
            date_of_birth: moment(data?.dob).format('DD-MM-YYYY') || '01-01-2000',
            nationality: data?.nationality || 'Viet Nam',
        });
    }, [data?.dob, data?.email, data?.nationality, reset]);

    const handleFormSubmitV2 = async (formValues) => {
        if (formValues.email_address !== data?.email) {
            updateEmail({
                id,
                email: formValues.email_address,
            }).then(() => {
                handleClose(false);
            });
        }

        await updateInfo({
            id,
            Gender: isFemale ? 2 : 1,
            Nationality: formValues.nationality,
            // Dob: moment(formValues.date_of_birth),
        });

        setDefaultInfo &&
            setDefaultInfo((preState) => {
                return {
                    ...preState,
                    // dob: moment(formValues.date_of_birth).format('DD-MM-YYYY'),
                    email: formValues.email_address,
                    nationality: formValues.nationality,
                    gender: isFemale ? 2 : 1,
                };
            });
        if (dataImageUpload.form) {
            await uploadAvatar({ form: dataImageUpload.form, id }).then((result) => {
                setDefaultInfo &&
                    setDefaultInfo((preState) => {
                        return {
                            ...preState,
                            avatar: result.avatar,
                        };
                    });
            });
            handleClose(false);
        }

        setDataImageUpload(null);
        handleClose(false);
        handleRefresh();
    };

    const onUploadAvatar = (e) => {
        const banner = e.target.files[0];
        const urlPreview = URL.createObjectURL(banner);

        const form = new FormData();
        form.append('upload', banner);
        setDataImageUpload({ form, urlPreview });
    };

    const handleClickSex = (type) => {
        setIsFemale(type === 'Female');
    };

    return (
        <Modal
            open={open}
            onClose={() => handleClose(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                <Box sx={isLoading || isLoadingInfo || isLoadingAvt ? loading : style}>
                    {isLoading || isLoadingInfo || isLoadingAvt ? (
                        <Box
                            sx={{
                                textAlign: 'center',
                                background: 'transparent',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Box
                                onClick={() => handleClose(false)}
                                sx={{
                                    position: 'absolute',
                                    top: '17px',
                                    right: '17px',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                }}
                            >
                                X
                            </Box>
                            <Title sx={{ textShadow: '0px 0px 5px rgba(255, 255, 255, 0.5)' }}>Create Profile</Title>
                            <Divider sx={{ background: 'rgba(255, 255, 255, 0.12)' }} />

                            <StyledForm onSubmit={handleSubmit(handleFormSubmitV2)}>
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
                                                    Upload
                                                </UploadBtn>
                                                {/* <DeletePhotoBtn
                                                    variant="outlined"
                                                    startIcon={<DeleteIcon />}
                                                    // onClick={onDeleteAvatar}
                                                >
                                                    Change
                                                </DeletePhotoBtn> */}
                                            </Box>
                                        </Box>
                                    </Box>

                                    <UploadAvatarV2
                                        avatarUrl={
                                            dataImageUpload?.urlPreview ? dataImageUpload?.urlPreview : data?.avatar
                                        }
                                        percent={''}
                                        id={id}
                                    />
                                </Box>
                                <Divider sx={{ background: 'rgba(255, 255, 255, 0.12)', marginBottom: 3 }} />
                                <Box sx={{ padding: 6, paddingTop: 0 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '12px',
                                        }}
                                    >
                                        {/* <Box sx={{ flexShrink: 1, flexBasis: '100%', display: 'none' }}>
                                            <InputField
                                                id="date_of_birth"
                                                name="date_of_birth"
                                                control={control}
                                                label="Date of birth"
                                                placeholder="Date of birth"
                                            />
                                        </Box> */}

                                        <Box sx={{ flexShrink: 0, display: 'flex', marginBottom: 5, width: '100%' }}>
                                            <ButtonBtn
                                                onClick={() => handleClickSex('Male')}
                                                sx={{
                                                    width: '123px',
                                                    background: !isFemale
                                                        ? 'linear-gradient(178.73deg, #68E5B8 0%, #6D85DA 100%)'
                                                        : 'rgba(42, 78, 171, 0.12)',
                                                    '&:hover': {
                                                        background:
                                                            'linear-gradient(178.73deg, #6D85DA 0%, #68E5B8 100%)',
                                                    },
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
                                                    '&:hover': {
                                                        background:
                                                            'linear-gradient(178.73deg, #6D85DA 0%, #68E5B8 100%)',
                                                    },
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
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                                        <MultipleNationalSelect control={control} />
                                    </Box>
                                    <SubmitButton>&nbsp;Save Changes</SubmitButton>
                                </Box>
                            </StyledForm>
                        </>
                    )}
                </Box>
            </>
        </Modal>
    );
};
