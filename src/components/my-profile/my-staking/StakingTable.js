import { Box, Stack, Typography, styled } from '@mui/material';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { IconLineDashed } from '@tabler/icons';
import { GradientButton } from 'components/common/CustomButton';
import CustomTable from 'components/common/CustomTable';
import { isEmpty, isNull, sumBy, toInteger, toNumber, uniqBy } from 'lodash';
import * as moment from 'moment';
import { STAKING_PACKAGE_BASE } from 'onchain/constants';
import { formatEther, transformCerInfo, transformClaimInfo } from 'onchain/helpers';
import { SuiContext } from 'provider/SuiProviderV2';
import React, { useState } from 'react';
import { fCurrencyV2 } from 'utils/util';

import { CLOCK, STAKING_PACKAGE_UPGRADE, STAKING_STORAGE } from 'onchain/constants';
import { toast } from 'react-toastify';
import ClaimAvailableTable from './ClaimAvailableTable';

const TableBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(0deg, rgba(104, 229, 184, 0.20) 0%, rgba(109, 133, 218, 0.20) 100%)',
    borderRadius: '15px',
    padding: '24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
    '::before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(180deg, rgb(66,238,207,0.5) , rgb(0,197,211,0.5) )',
        borderRadius: '15px',
        inset: '0px',
        padding: '1px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 0,
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));
const ClaimBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));
const TypographyShadow = styled(Typography)(({ theme }) => ({
    color: 'white',
    textShadow: '0 0 10px rgb(255,255,255,0.7)',
}));

let config = [
    {
        key: 'creationDate',
        label: 'Time',
        render: (e) => e,
    },
    {
        key: 'type',
        label: 'Type',
    },
    {
        key: 'amount',
        label: 'Amount',
        render: (e) => (e ? <>{e} XUI</> : <IconLineDashed color="gray" />),
    },
    {
        key: 'terms',
        label: 'Selected Terms',
        render: (e) => (e ? e : <IconLineDashed color="gray" />),
    },
    {
        key: 'endTime',
        label: 'End Time',
        render: (e) => (e ? e : <IconLineDashed color="gray" />),
    },
    {
        key: 'status',
        label: '',
        render: (e) => e?.status,
    },
];

export default function StakingTable() {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(12);
    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const [claimList, setClaimList] = React.useState([]);
    const [totalClaim, setTotalClaim] = React.useState(0);
    const [isClaimSuccessful, setIsClaimSuccessful] = React.useState(false);
    const { provider } = React.useContext(SuiContext);
    const wallet = useWallet();
    const claims = [];

    const isCanClaim = (latest_claim_date, stake_date, apr_at_moment, stake_amount) => {
        let date;
        const temp = ((apr_at_moment / 100) * stake_amount) / 365;
        if (isNull(latest_claim_date)) {
            // Change when to merge prod
            date = toInteger((moment() - stake_date) / 86400000);
        } else {
            date = toInteger((moment() - latest_claim_date) / 86400000);
        }

        return temp * date;
    };

    const fetchStakingCer = async () => {
        console.log('syncData => fetchStakingCer');
        if (!wallet?.address || !wallet.connected) return;
        let totalClaim;
        const filter = {
            MatchAll: [
                {
                    StructType: `${STAKING_PACKAGE_BASE}::certificate::InvestmentCertificate`,
                },
                {
                    AddressOwner: wallet?.address,
                },
            ],
        };

        const myStakingCer = await provider.getOwnedObjects({
            owner: wallet?.address,
            filter: filter,
            options: { showContent: true },
        });

        if (!myStakingCer) return console.log('myStakingCer invalid');

        const infoStakingPromise = myStakingCer?.data.map(async (cer) => {
            const info = await provider.getDynamicFieldObject({
                parentId: cer?.data?.objectId,
                name: { type: '0x1::string::String', value: 'info' },
            });

            const formatInfo = {
                ...cer?.data?.content?.fields,
                ...info?.data?.content?.fields?.value?.fields,
                apr_at_moment: formatEther(info?.data?.content?.fields?.value?.fields?.apr_at_moment, 9),
                issue_date: moment(toNumber(cer?.data?.content?.fields?.issue_date)).format('LLLL'),
                stake_amount: formatEther(info?.data?.content?.fields?.value?.fields?.stake_amount, 9),
                profit_claimed_amount: formatEther(info?.data?.content?.fields?.value?.fields?.profit_claimed_amount, 9),
                id: cer?.data?.content?.fields?.id?.id,
            };

            const infoClaim = isCanClaim(
                formatInfo?.latest_claim_date,
                formatInfo?.stake_date,
                formatInfo?.apr_at_moment,
                formatInfo?.stake_amount
            );

            const formatInfoClaim = {
                ...formatInfo,
                can_claim_amount: infoClaim,
            };

            claims.push(formatInfoClaim);

            return formatInfo;
        });

        const info = await Promise.all(infoStakingPromise);

        if (isEmpty(info) || !info) return console.error('fetchStakingCer___is empty');

        const formatted = transformCerInfo(info);

        if (!isEmpty(claims)) {
            const formattedClaim = transformClaimInfo(claims);

            const uniqueClaims = uniqBy(formattedClaim, 'id');
            totalClaim = sumBy(uniqueClaims, 'can_claim_amount');
            setTotalClaim(totalClaim);
            setClaimList(uniqueClaims);
        }
        setData(formatted);
        if (!myStakingCer || isEmpty(myStakingCer)) return;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const handleTotalClaim = async () => {
        const tx = new TransactionBlock();
        setLoading(true);
        const filterClaimList = claimList.filter((i) => i?.can_claim_amount !== 0);

        filterClaimList.forEach((i) => {
            tx.moveCall({
                target: `${STAKING_PACKAGE_UPGRADE}::staking::claim`,
                typeArguments: [`0x${i?.stake_token}`],
                arguments: [tx.object(CLOCK), tx.object(STAKING_STORAGE), tx.object(i?.id)],
            });
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            if (result) {
                setLoading(false);
                setIsClaimSuccessful(true);
                toast.success('Claim successful');
            } else {
                setLoading(false);
                toast.error('Transaction rejected');
            }
        } catch (e) {
            setLoading(false);
            console.log('handleClaim__error', e);
            toast.error('Transaction rejected');
        }
    };

    React.useEffect(() => {
        fetchStakingCer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address, wallet.connected]);


    console.log({ data });

    return (
        <Stack gap={3}>
            <TableBox>
                <CustomTable
                    data={data}
                    config={config}
                    loading={!data}
                    page={0}
                    setPage={(e) => setPage(e)}
                    callback={fetchStakingCer}
                />
            </TableBox>
            <TableBox>
                <ClaimBox>
                    <TypographyShadow variant="h6">Claim available amount:</TypographyShadow>
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <TypographyShadow variant="h4">{totalClaim ? fCurrencyV2(totalClaim, 6) : 0} XUI </TypographyShadow>
                        <GradientButton onClick={handleTotalClaim} loading={loading} disabled={totalClaim === 0}>
                            Claim
                        </GradientButton>
                    </Stack>
                </ClaimBox>
            </TableBox>
            <TableBox>
                {isEmpty(claimList) ? (
                    <Typography>No any claim available</Typography>
                ) : (
                    // <CustomTable data={claimList} config={config} loading={!data} page={0} setPage={(e) => setPage(e)} />
                    <ClaimAvailableTable data={claimList} callback={fetchStakingCer} />
                )}
            </TableBox>
        </Stack>
    );
}
