import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Stack,
    Typography
} from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { CustomInput, FormBox, PackageButton, StackingButton } from './component/StackingStyles';


export default function StakingForm({ verifyData, setVerifyData, packages }) {
    const [amount, setAmount] = React.useState(0);
    const [isAgree, setIsAgree] = React.useState(false);
    const isMobile = useResponsive('down', 'sm');



    return (
        <FormBox>
            <Stack direction={'row'} justifyContent="space-between">
                <Typography>Amount</Typography>
                <Typography>0 XUI</Typography>
            </Stack>
            <CustomInput
                id="amount"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <Stack direction={'row'} alignItems="center" mr={'-14px'}>
                            <Typography>XUI</Typography>
                            <Button variant="contained">ALL</Button>
                        </Stack>
                    ),
                    onWheel: (e) => e.target.blur(),
                }}
                type="number"
                onKeyDown={(e) => {
                    if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) {
                        e.preventDefault();
                    }
                    if (e.target.value.length === 0 && e.key === '.') {
                        e.preventDefault();
                    }
                }}
                min={0}
                onChange={(e) => {
                    setAmount(e.target.value);
                }}
                fullWidth
            />
            <Typography mt={1}>
                Minimum: <strong>3,000 XUI</strong>
            </Typography>
            <Stack direction={'row'} justifyContent={'space-between'} gap={1} mt={2} flexWrap={'wrap'}>
                {packages.map((p, index) => (
                    <PackageButton
                        className={p.time === verifyData.time ? 'active' : ''}
                        onClick={() => setVerifyData(p)}
                    >
                        {p.time} days
                    </PackageButton>
                ))}
            </Stack>
            <Stack
                direction={isMobile ? 'column' : 'row'}
                justifyContent={'space-between'}
                alignItems="center"
                mt={2}
            >
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={isAgree} onChange={(e) => setIsAgree(e.target.checked)} />}
                        label={<CheckBoxLabel />}
                        sx={{
                            margin: '1rem 0',
                            '& svg': {
                                color: '#28A3AB',
                            },
                        }}
                    />
                </FormGroup>
                <StackingButton
                    type="submit"
                >
                    Staking now
                </StackingButton>
            </Stack>
        </FormBox>
    );
}

const CheckBoxLabel = () => {
    return (
        <Typography
            sx={{
                color: 'white',
                '& a': { textDecorationColor: '#28A3AB', color: 'white', fontWeight: 700 },
            }}
            variant="body2"
        >
            I have read and agree to the
            <a
                href="https://docs.google.com/document/d/1JzcDYZby0DkeSJFM2uyqRMlf6UMY2GKuO7wXaIH6NXQ/"
                target="_blank"
                rel="noreferrer"
            >
                {' '}
                YouSUI Staking Service Agreement.
            </a>
        </Typography>
    );
};
