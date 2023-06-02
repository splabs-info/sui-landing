import { Box, InputLabel, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useController } from 'react-hook-form';
import { Error } from './Error';

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
    '& .MuiFormControl-root': {
        margin: 0,
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

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.text['primary'],
    fontSize: 14,
    lineHeight: '20px',
}));

export function InputField({ id, name, control, label, InputProps, inputLabel, sx, onKeyUp, ...inputProps }) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        defaultValue: {
            amount: 20
        },
        control,
    });

    return (
        <Box sx={{ width: '100%', height: 80 }}>
            {inputLabel && (
                <StyledInputLabel shrink htmlFor={inputLabel}>
                    {inputLabel}
                </StyledInputLabel>
            )}
            <CustomInput
                id={id}
                fullWidth
                size="small"
                margin="normal"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                variant="outlined"
                inputRef={ref}
                error={invalid}
                label={label}
                InputProps={InputProps}
                inputProps={inputProps}
                sx={sx}
            />
            <Error error={true}>{error?.message}</Error>
        </Box>
    );
}
