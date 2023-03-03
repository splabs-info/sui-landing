import { styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const StyledCheckBox = styled(Checkbox)((theme) => ({
    fontWeight: 'normal',
}));

export const CheckboxFiled = ({ label }) => {
    return (
        <FormGroup sx={{ fontSize: 12 }}>
            <FormControlLabel
                control={<StyledCheckBox />}
                label={label}
                sx={{
                    '.MuiFormControlLabel-label': {
                        fontSize: 16,
                    },
                }}
            />
        </FormGroup>
    );
};
