
import { Stack, Typography } from '@mui/material';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { ethers } from 'ethers';
import { find, get, isEmpty } from 'lodash';
import { BuyTokenButton, ClaimBox } from 'modules/ido-round/components/RoundStyled';
import { CLOCK, LAUNCHPAD_STORAGE, PACKAGE_UPGRADE } from 'onchain/constants';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { toast } from 'react-toastify';
import { fCurrencyV2 } from 'utils/util';

export const Claim = ({ decimals, services, claimInfo, type, payments, projectName, roundName }) => {
    const [loading, setLoading] = React.useState();
    const [claimSuccessful, setClaimSuccessful] = React.useState(false);
    const [isClaim, setIsClaim] = React.useState(false);
    const { provider } = React.useContext(SuiContext)

    const findServicePreregister = React.useCallback(() => {
        if (!services || isEmpty(services)) return;
        return find(
            services,
            (service) =>
                get(service, 'name.value') === 'service_preregister'
        )
    }, [services])

    const formattedPurchased = React.useMemo(() => {
        if (!claimInfo || claimInfo?.total_accumulate_token === undefined) return;
        return ethers.utils.formatUnits(claimInfo?.total_accumulate_token, decimals)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimInfo, claimSuccessful]);


    const formattedRatio = React.useMemo(() => {
        if (!isEmpty(payments)) {
            return ethers.utils.formatUnits(payments[0].ratio_per_token, decimals)
        } else return;
    }, [decimals, payments])

    const formattedConsumed = React.useMemo(() => {
        if (!claimInfo?.final_accumulate_token) return;
        if (claimInfo?.final_accumulate_token === null) return '--';
        const consumed = ethers.utils.formatUnits(claimInfo?.final_accumulate_token, decimals)
        return consumed * formattedRatio
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimInfo?.final_accumulate_token, decimals, formattedRatio, claimSuccessful])


    const formattedRemaining = React.useMemo(() => {
        if (!formattedConsumed && !formattedPurchased) return;
        return (formattedPurchased * formattedRatio) - formattedConsumed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formattedConsumed, formattedPurchased, formattedRatio, claimSuccessful])


    const wallet = useWallet();

    const fetchCanClaim = React.useCallback(async () => {
        const pre_register = findServicePreregister();
        console.log('pre_register__', pre_register)
        if (!pre_register || !services || isEmpty(pre_register)) return;
        const dynamicFields = await provider.getDynamicFieldObject({
            parentId: pre_register?.parent_id,
            name: pre_register?.name
        })
        setIsClaim(dynamicFields?.data?.content?.fields?.is_open_claim_refund || false)

        return dynamicFields?.data?.content?.fields?.is_open_claim_refund || false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [findServicePreregister, services])

    const handleClaim = async () => {
        setLoading(true)
        const tx = new TransactionBlock()

        tx.moveCall({
            target: `${PACKAGE_UPGRADE}::launchpad::claim_refund_preregister`,
            typeArguments: [`0x${payments[0]?.method_type}`],
            arguments: [
                tx.object(CLOCK),
                tx.object(LAUNCHPAD_STORAGE),
                tx.pure(projectName),
                tx.pure('Public_Sale'),
            ],
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            })

            if (result) {
                setLoading(false)
                setClaimSuccessful(!claimSuccessful);
                toast.success('Claim success')
            } else {
                setLoading(false)
                toast.error('Transaction rejected')
            }
        } catch (e) {
            setLoading(false)
            toast.error('Transaction rejected')
        }
    }

    React.useEffect(() => {
        if (!services || isEmpty(services)) return;
        fetchCanClaim()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [services])


    return (
        <ClaimBox>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
                <Typography variant="body2" fontWeight={600}>Purchased XUI (Expected)</Typography>
                <Typography variant="body2" fontWeight={600}>
                    {formattedPurchased ? fCurrencyV2(formattedPurchased, 3) : '--'} XUI
                </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
                <Typography variant="body2" fontWeight={600}>Consumed SUI</Typography>
                <Typography variant="body2" fontWeight={600}>
                    {!isNaN(formattedConsumed) ? fCurrencyV2(formattedConsumed) : '--'} SUI
                </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
                <Typography variant="body2" fontWeight={600}>Remaining SUI</Typography>
                <Typography variant="body2" fontWeight={600}>
                    {!isNaN(formattedRemaining) ? fCurrencyV2(formattedRemaining) : '--'} SUI
                </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className='border'>
                <Typography variant="body2" fontWeight={600}>Redeem SUI and IDO token allocation</Typography>
                {roundName === 'Og_Sale' ? <></> : <BuyTokenButton disabled={!isClaim} onClick={handleClaim} loading={loading}>CLAIM</BuyTokenButton>}
            </Stack>
        </ClaimBox>
    );
}