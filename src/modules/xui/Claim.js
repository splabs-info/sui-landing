
import { Stack, Typography } from '@mui/material';
import { TransactionBlock } from '@mysten/sui.js';
import { BuyTokenButton, ClaimBox } from 'modules/ido-round/components/RoundStyled';
import { CLOCK, LAUNCHPAD_STORAGE, PACKAGE_UPGRADE } from 'onchain/constants';
export const Claim = () => {

    const handleClaim = ({ type, payments, projectName, roundName }) => {
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${PACKAGE_UPGRADE}::launchpad::purchase_nor`,
            typeArguments: [`0x${type}`, `0x${payments[0]?.method_type}`],
            arguments: [
                tx.object(CLOCK),
                tx.object(LAUNCHPAD_STORAGE),
                tx.pure(projectName),
                tx.pure(roundName),
            ],
        });
    }

    return (
        <ClaimBox>
            {/* {fields.map((field) => (
                <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
                    <Typography variant="body2" fontWeight={600}>{field.label}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                        {field.format ? field.format(claimInfo[field.key]) : claimInfo[field.key]}
                    </Typography>
                </Stack>
            ))} */}
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
                <Typography variant="body2" fontWeight={600}>Redeem SUI and IDO token allocation</Typography>
                <BuyTokenButton disabled>CLAIM</BuyTokenButton>
            </Stack>
        </ClaimBox>

    );
}