import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledInputLabel } from 'components/base/InputField';
import countryList from 'react-select-country-list';
import { useController } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const CustomSelect = styled(Select)(({ theme }) => ({
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
    '& .MuiSelect-select': {
        borderRadius: 10,
        borderColor: `white`,
        color: 'white',
        height: 48,
        padding: '9px',
        backgroundColor: 'rgba(18, 24, 52, 0.5)',
    },
}));

const SelectFieldStyle = {
    padding: 7,
    fontSize: '0.75rem',
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}

export default function MultipleNationalSelect({ control }) {
    const {
        field: { value, onChange, onBlur, ref, getFieldState },
        fieldState: { invalid, error },
    } = useController({
        name: 'national',
        control,
    });
    const theme = useTheme();
    const [personName, setPersonName] = React.useState('');
    const options = React.useMemo(() => countryList().getData(), []);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setPersonName(value);
        onChange(value);
    };

    return (
        <div>
            <StyledInputLabel shrink htmlFor="bootstrap-input">
                Nationality
            </StyledInputLabel>
            <FormControl sx={{ width: 300 }}>
                <CustomSelect
                    size="medium"
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={personName}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    InputLabelProps={{ shrink: false }}
                    SelectProps={{
                        style: SelectFieldStyle,
                    }}
                >
                    {options.map(({ value, label }) => (
                        <MenuItem key={label} value={label} style={getStyles(label, personName, theme)}>
                            {label}
                        </MenuItem>
                    ))}
                </CustomSelect>
            </FormControl>
        </div>
    );
}
