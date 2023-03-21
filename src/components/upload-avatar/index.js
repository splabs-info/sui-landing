/* eslint-disable jsx-a11y/alt-text */
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: 270,
    height: 270,
    // marginRight: 24,
    cursor: 'pointer',
    justifyContent: 'center',
};

const focusedStyle = {
    borderColor: '#29b6f6',
};

const acceptStyle = {
    borderColor: '#66bb6a',
};

const rejectStyle = {
    borderColor: '#f44336',
};

const CaptionUpload = styled(Typography)({
    fontSize: 14,
    textAlign: 'center',
});

const StyledAvatarBox = styled('div')(({ theme }) => ({
    width: 128,
    height: 128,
}));

const StyledAvatar = styled('img')(({ theme }) => ({
    width: '100%',
    borderRadius: '50%',
    objectFit: 'contain',
}));

export const UploadAvatar = ({ avatarUrl, percent }) => {
    // const dispatch = useAppDispatch();
    const [files, setFiles] = React.useState([]);

    React.useEffect(() => {
        if (avatarUrl) setFiles([{ avatar: avatarUrl }]);
    }, [avatarUrl]);

    React.useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.avatar));
        },
        [files]
    );

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles?.map((file) =>
                    Object.assign(file, {
                        avatar: URL.createObjectURL(file),
                    })
                )
            );
            const acceptFile = acceptedFiles[0];
            const form = new FormData();
            form.append('avatar', acceptFile);
            // dispatch(updateProfileActions.uploadAvatar(form));
        },
    });

    const style = React.useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    const thumbs = files.map((file) => (
        <StyledAvatarBox key={file?.name}>
            <StyledAvatar src={avatarUrl} alt={file.name} />
        </StyledAvatarBox>
    ));

    const renderPreview = (percent) => {
        return (
            <>
                {percent ? (
                    <div {...getRootProps({ style })}>
                        <CircularProgress size={16} color="primary" />
                    </div>
                ) : (
                    <aside>{thumbs}</aside>
                )}
            </>
        );
    };

    const renderUploadArea = React.useCallback(() => {
        return (
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <img src="/images/default-avatar.png" style={{ borderRadius: '50%', width: 270, height: 270 }} />
                {/* <PersonAddAltIcon /> */}
                {/* <CaptionUpload>Drag 'n' drop your avatar here</CaptionUpload> */}
            </div>
        );
    }, [getInputProps, getRootProps, style]);

    return (
        <Box sx={{ display: 'flex', backgroundColor: 'transparent' }}>
            {files.length > 0 ? renderPreview(percent) : renderUploadArea()}
        </Box>
    );
};
