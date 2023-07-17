import { Stack, Typography } from "@mui/material";
import { fCurrency } from "utils/format";
import { BuyTokenButton, ClaimBox } from "./RoundStyled";



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
export const RoundClaim = ({ claimInfo, roundNumber }) => {

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
            {roundNumber === 1 && <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
                <Typography variant="body2" fontWeight={600}>Redeem SUI and IDO token allocation</Typography>
                <BuyTokenButton disabled> CLAIM</BuyTokenButton>
            </Stack>}
        </ClaimBox>

    );
};
