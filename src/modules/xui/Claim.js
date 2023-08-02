import { Stack, Typography } from '@mui/material';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { ethers } from 'ethers';
import { find, get, isEmpty, toNumber } from 'lodash';
import { BuyTokenButton, ClaimBox } from 'modules/ido-round/components/RoundStyled';
import * as moment from 'moment';
import { CLOCK, LAUNCHPAD_STORAGE, PACKAGE_UPGRADE } from 'onchain/constants';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { toast } from 'react-toastify';
import { fCurrencyV2 } from 'utils/util';
import { RELEAP_ROUND_NAME } from 'onchain/constants';
export const Claim = ({ decimals, services, claimInfo, type, payments, projectName, roundName, endAt }) => {
    const [loading, setLoading] = React.useState();
    const [claimSuccessful, setClaimSuccessful] = React.useState(false);
    const [isClaim, setIsClaim] = React.useState(false);
    const [canRefund, setCanRefund] = React.useState(false);
    const { provider } = React.useContext(SuiContext);
    const wallet = useWallet();

    const { fetchData } = React.useContext(SuiContext)
    const findServicePreregister = React.useCallback(() => {
        if (!services || isEmpty(services)) return;
        return find(services, (service) => get(service, 'name.value') === 'service_preregister');
    }, [services]);

    const findRefund = React.useCallback(() => {
        if (!services || isEmpty(services)) return;
        return find(services, (service) => get(service, 'name.value') === 'service_refund');
    }, [services])

    const formattedPurchased = React.useMemo(() => {
        if (!claimInfo || claimInfo?.total_accumulate_token === undefined) return;
        if (claimInfo.final_accumulate_token !== null)
            return ethers.utils.formatUnits(claimInfo?.total_accumulate_token, decimals);
        else {
            return ethers.utils.formatUnits(claimInfo?.total_accumulate_token, decimals);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimInfo, claimSuccessful]);

    const formattedRatio = React.useMemo(() => {
        if (!isEmpty(payments)) {
            return ethers.utils.formatUnits(payments[0].ratio_per_token, decimals);
        } else return;
    }, [decimals, payments]);

    const formattedConsumed = React.useMemo(() => {
        if (!claimInfo?.final_accumulate_token) return;
        if (claimInfo?.final_accumulate_token === null) return '--';
        const consumed = ethers.utils.formatUnits(claimInfo?.final_accumulate_token, decimals);
        return consumed * formattedRatio;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimInfo?.final_accumulate_token, decimals, formattedRatio, claimSuccessful]);

    const formattedRemaining = React.useMemo(() => {
        if (!formattedConsumed && !formattedPurchased) return;
        return formattedPurchased * formattedRatio - formattedConsumed;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formattedConsumed, formattedPurchased, formattedRatio, claimSuccessful]);


    const fetchCanClaim = React.useCallback(async () => {
        const currentTime = moment();
        const pre_register = findServicePreregister();
        try {
            if ((!pre_register || !services || isEmpty(pre_register)) && !claimInfo?.final_accumulate_token) return;
            const dynamicFields = await provider.getDynamicFieldObject({
                parentId: pre_register?.parent_id,
                name: pre_register?.name,
            });
            if (
                currentTime.isAfter(moment(toNumber(endAt))) &&
                dynamicFields?.data?.content?.fields?.is_open_claim_refund === true &&
                claimInfo?.final_accumulate_token === null
            ) {
                setIsClaim(true);
            } else {
                setIsClaim(false);
            }
        } catch (error) {
            console.log('error_fetchCanClaim', error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimInfo?.final_accumulate_token, endAt, findServicePreregister, services]);

    const handleClaim = React.useCallback(async () => {
        setLoading(true);
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${PACKAGE_UPGRADE}::launchpad::claim_refund_preregister`,
            typeArguments: [`0x${payments[0]?.method_type}`],
            arguments: [tx.object(CLOCK), tx.object(LAUNCHPAD_STORAGE), tx.pure(projectName), tx.pure('Public_Sale')],
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            if (result) {
                setLoading(false);
                setClaimSuccessful(!claimSuccessful);
                toast.success('Claim success');
            } else {
                setLoading(false);
                toast.error('Transaction rejected');
            }
        } catch (e) {
            setLoading(false);
            toast.error('Transaction rejected');
        }
    }, [claimSuccessful, payments, projectName, wallet]);

    const handleRefund = React.useCallback(async () => {
        if (!canRefund) return;

        setLoading(true);
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${PACKAGE_UPGRADE}::launchpad::claim_refund`,
            typeArguments: [`0x${payments[0]?.method_type}`],
            arguments: [tx.object(CLOCK), tx.object(LAUNCHPAD_STORAGE), tx.pure(projectName), tx.pure(roundName)],
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            if (result) {
                setLoading(false);
                // findRefund();
                // fetchRefund();
                fetchData();
                toast.success('Claim success');
            } else {
                setLoading(false);
                toast.error('Transaction rejected');
            }
        } catch (e) {
            setLoading(false);
            console.log('error__Hand refund', e)
            toast.error('Transaction rejected');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canRefund])

    const renderClaimInfo = React.useCallback(() => {
        if (roundName === RELEAP_ROUND_NAME) {
            return (
                <>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: 16 }}>
                            Purchased REAP
                        </Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: 16 }}>
                            {formattedPurchased ? formattedPurchased : '--'} REAP
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                        <Typography variant="body2" fontWeight={500} sx={{ width: '32%' }}>
                            You can request a refund within <strong>48 hours</strong> from the time of listing the $REAP token.
                        </Typography>
                        <BuyTokenButton loading={loading} disabled={!canRefund} onClick={handleRefund}>REFUND REQUEST</BuyTokenButton>
                    </Stack>
                </>
            );
        } else {
            return (
                <>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                        <Typography variant="body2" fontWeight={600}>
                            Purchased XUI {roundName === 'Og_Sale' ? <></> : <>{`(Expected)`}</>}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {formattedPurchased ? fCurrencyV2(formattedPurchased, 3) : '--'} XUI
                        </Typography>
                    </Stack>
                    {roundName === 'Og_Sale' ? (
                        <></>
                    ) : (
                        <>
                            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                                <Typography variant="body2" fontWeight={600}>
                                    Consumed SUI
                                </Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    {!isNaN(formattedConsumed) ? fCurrencyV2(formattedConsumed) : '--'} SUI
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                                <Typography variant="body2" fontWeight={600}>
                                    Remaining SUI
                                </Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    {!isNaN(formattedRemaining) ? fCurrencyV2(formattedRemaining) : '--'} SUI
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} className="border">
                                <Typography variant="body2" fontWeight={600}>
                                    Redeem SUI and IDO token allocation
                                </Typography>

                                <BuyTokenButton disabled={!isClaim} onClick={handleClaim} loading={loading}>
                                    CLAIM
                                </BuyTokenButton>
                            </Stack>
                        </>
                    )}
                </>
            );
        }
    }, [canRefund, formattedConsumed, formattedPurchased, formattedRemaining, handleClaim, handleRefund, isClaim, loading, roundName]);


    const fetchRefund = React.useCallback(async () => {
        const currentTime = moment();
        const dynamicFields = findRefund();
        try {
            const info = await provider.getDynamicFieldObject({
                parentId: dynamicFields?.parent_id,
                name: dynamicFields?.name,
            });
            const startRefundTime = moment(toNumber(info?.data?.content?.fields.start_refund_time))
            const refundRangeTime = moment(toNumber(info?.data?.content?.fields.refund_range_time))

            if (currentTime.isAfter(startRefundTime) && currentTime.isBefore(startRefundTime + refundRangeTime)) return setCanRefund(true)
            if (currentTime.isBefore(moment(startRefundTime).add(refundRangeTime, 'milliseconds'))) setCanRefund(false);

            else setCanRefund(false)
        } catch (error) {
            console.log('error_fetchRefund', error);
        }
    }, [findRefund, provider])

    React.useEffect(() => {
        if (roundName !== 'Public_Sale') return;
        fetchCanClaim();
    }, [fetchCanClaim, fetchRefund, roundName]);

    React.useEffect(() => {
        if (roundName === RELEAP_ROUND_NAME) {
            fetchRefund();
        }
    }, [fetchRefund, roundName])

    return <ClaimBox>{renderClaimInfo()}</ClaimBox>;
};
