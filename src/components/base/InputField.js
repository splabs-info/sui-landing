import { Box, InputLabel, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useController } from 'react-hook-form';
import { Error } from './Error';

const CustomInput = styled(TextField)(({ theme }) => ({
    marginTop: 0,
    color: 'white',
    '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
            borderColor: `${theme.palette.primary}`,
        },
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        '& > fieldset': {
            borderColor: `${theme.palette.primary}`,
        },
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: 10,
        borderColor: `white`,
        color: 'white',
        height: 48,
        backgroundColor: 'rgba(18, 24, 52, 0.5)',
    },
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    color: 'white',
}));

export function InputField({ name, control, label, apiError, InputProps, passwordCriteria, onKeyUp, ...inputProps }) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <Box sx={{height: 72}}>
            <StyledInputLabel shrink htmlFor="bootstrap-input">
                {label}
            </StyledInputLabel>
            <CustomInput
                sx={{
                    height: 40,
                }}
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
                inputProps={inputProps}
                InputProps={InputProps}
            />
            <Error error={true}>{error?.message}</Error>
        </Box>
    );
}
