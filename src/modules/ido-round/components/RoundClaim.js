import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { CheckboxFiled, InputField } from "components";
import React from "react";
import { BuyTokenButton, ClaimBox, SaleFormBox, UtilityBox } from "./RoundStyled";
import useResponsive from "hooks/useResponsive";
import { useWallet } from "@suiet/wallet-kit";
import { fCurrency } from "utils/format";



const fields = [
    {
        key: 'purchase',
        label: 'Purchased XUI (Expected)',
        format: (e) => <>{e ? fCurrency(e, 0) : '--'} XUI</>,
    },
    {
        key: 'consumed',
        label: 'Consumed SUI',
        format: (e) => <>{e ? fCurrency(e, 0) : '--'} XUI</>,
    },
    {
        key: 'remaining',
        label: ' Remaining SUI',
        format: (e) => <>{e ? fCurrency(e, 0) : '--'} XUI</>,
    },
];
export const RoundClaim = ({ claimInfo }) => {

    return (
        <ClaimBox>
            {fields.map((field) => (
                <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
                    <Typography variant="body2" fontWeight={600}>{field.label}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                        {field.format ? field.format(claimInfo[field.key]) : claimInfo[field.key]}
                    </Typography>
                </Stack>
            ))}
        </ClaimBox>

    );
};
