import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomInput = styled(TextField)(({ theme }) => ({
    color: 'white',
    '& .MuiTextField-root': {
        marginTop: 0,
        color: 'white',
    },
    '& .MuiInputBase-input': {
        textAlign: 'right',
        fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
            borderColor: `${theme.palette.primary}`,
        },
    },
    '& .MuiInputBase-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        '& > fieldset': {
            borderColor: `${theme.palette.primary}`,
        },
    },
    '& .MuiOutlinedInput-root': {
        height: 48,
        borderRadius: 12,
        borderColor: `white`,
    },
    '& input:valid + fieldset': {
        color: 'white',
    },

    '& .MuiFormLabel-root': {
        fontSize: '14px',
    },
    '&:focus .MuiFormLabel-root': {
        color: theme.palette.primary.main + ' !important',
    },
}));

export function NormalInputField({ ...props }) {
    return (
        <Box sx={{ width: '100%' }}>
            <CustomInput {...props} variant="outlined" fullWidth size="small" margin="normal" />
        </Box>
    );
}
