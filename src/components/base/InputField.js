import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useController } from 'react-hook-form';
import { Error } from './Error';

const CustomInput = styled(TextField)(({ theme }) => ({
    marginTop: 0,
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
        borderRadius: 6,
        borderColor: `${theme.palette.primary}`,
    },
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
        <>
            <CustomInput
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
                inputProps={inputProps}
                InputProps={InputProps}
            />
            <Error error={true}>{error?.message}</Error>
        </>
    );
}
