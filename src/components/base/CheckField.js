import { styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const StyledCheckBox = styled(Checkbox)((theme) => ({
    fontWeight: 'normal',
}));

export const CheckboxFiled = ({ label, handleChecked }) => {
    return (
        <FormGroup
            sx={{
                fontSize: 12,
                '& .MuiFormControlLabel-root ': {
                    marginRight: '4px !important',
                },
            }}
        >
            <FormControlLabel
                control={<StyledCheckBox onChange={handleChecked}/>}
                label={label}
                sx={{
                    '& .MuiFormControlLabel-label': {
                        fontSize: 16,
                        marginRight: 0,
                    },
                    '& svg': {
                        color: '#28A3AB',
                    },
                }}
            />
        </FormGroup>
    );
};
