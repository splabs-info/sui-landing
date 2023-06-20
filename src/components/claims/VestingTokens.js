/* eslint-disable jsx-a11y/alt-text */
import { Box, Divider, Grid, Hidden, Typography } from '@mui/material';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { BorderGradientButton } from 'components/common/CustomButton';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import { TXUI_CLOCK, TXUI_PACKAGE } from 'constant';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { SocialFooter } from 'layouts/Footer-v2';
import { toNumber } from 'lodash';
import * as moment from 'moment';
import React from 'react';
import { useLocation, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { canClaimVesting } from 'utils/util';
import { TokenPoolBox } from './ClaimTokens';
export default function VestingTokens({ tokenType, periodList, totalLockMount, totalUnlockAmount }) {
    const isMobile = useResponsive('down', 'sm');

    return (
        <Box position="relative">
            <Grid container spacing={4} mb={isMobile ? 1 : 4}>
                <Grid xs={12} md={4} item>
                    <Box position={'relative'}>
                        <Box
                            component={'img'}
                            src="https://kts3.s3.ap-northeast-1.amazonaws.com/T-XUI.png"
                            sx={{
                                width: '100%',
                                borderRadius: '10px',
                            }}
                        />
                        <Box
                            sx={{
                                background: 'linear-gradient(255deg, #207BBF 0%, #5CBAF2 100%)',
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                borderRadius: '10px',
                                padding: '8px 24px',
                            }}
                        >
                            <Typography color={'white'} fontWeight={'bold'}>
                                TBA
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid sx={{ width: '100%', '& a': { marginRight: '8px' } }} xs={12} md={8} item>
                    <Typography variant="h3" color={'white'}>
                        T-XUI Tokens
                    </Typography>
                    <Typography variant="body1" color={'white'} my={isMobile ? 2 : 4}>
                        A is the easiest and fastest way to approach for developers who want to experime Web3, enabling the best
                        addition of blockchain features to their games in a few minutes for the future of gaming…
                    </Typography>
                    <SocialFooter />
                    <TokenPoolBox sx={{ padding: '20px 48px', marginTop: isMobile ? '24px' : '40px' }}>
                        <ProcessBarBox
                            percent={(totalUnlockAmount / totalLockMount) * 100}
                            title={
                                <>
                                    <Typography>UNLOCKED AMOUNT</Typography>
                                    <Typography>TOTAL AMOUNT</Typography>
                                </>
                            }
                            subtitle={
                                <>
                                    <Typography>
                                        {totalUnlockAmount
                                            ? Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
                                                ethers.utils.formatUnits(totalUnlockAmount, 9)
                                            )
                                            : 'Loading'}
                                        {' '}XUI
                                    </Typography>
                                    <Typography>
                                        {totalLockMount
                                            ? Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
                                                ethers.utils.formatUnits(totalLockMount, 9)
                                            )
                                            : 'Loading'}
                                        {' '}XUI
                                    </Typography>
                                </>
                            }
                        />
                    </TokenPoolBox>
                </Grid>
            </Grid>
            {periodList || periodList?.length >= 0 ? (
                <>
                    {periodList.map((item, index) => (
                        <VestingList
                            key={index}
                            tokenType={tokenType}
                            periodId={item?.fields.period_id}
                            id={item?.fields.period_id}
                            indexVesting={index}
                            isWithdrawal={item?.fields.is_withdrawal}
                            releaseTime={item?.fields?.release_time}
                            unlockAmount={item?.fields?.unlock_amount}
                        />
                    ))}
                </>
            ) : (
                <Typography sx={{ textAlign: 'center', color: 'white' }}>
                    You don't have any vesting tokens. Please contact the project owner to get more information.
                </Typography>
            )}
        </Box>
    );
}

function VestingList({ id, periodId, tokenType, isWithdrawal, indexVesting, releaseTime, unlockAmount }) {
    const isMobile = useResponsive('down', 'sm');

    const withdrawal = React.useMemo(() => isWithdrawal, [isWithdrawal]);
    const wallet = useWallet();
    const [loading, setLoading] = React.useState(false);

    const { projectId } = useParams();
    const decodedProjectId = decodeURIComponent(projectId);

    const location = useLocation();

    const event = location.state?.eventName;
    const canClaim = canClaimVesting(releaseTime)


    const handleClaim = async () => {
        setLoading(true)
        const tx = new TransactionBlock();

        console.log('indexVesting', indexVesting)
        tx.moveCall({
            target: `${TXUI_PACKAGE}::launchpad_presale::claim_vesting`,
            typeArguments: [`0x${tokenType}`],
            arguments: [tx.object(TXUI_CLOCK), tx.object(decodedProjectId), tx.pure(event), tx.pure([indexVesting])],
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            if (result) {
                setLoading(false);
                toast.success('Claim success');
            } else {
                setLoading(false);
                toast.error('Transaction rejected');
            }
        } catch (e) {
            setLoading(false);
            toast.error('Transaction error');
        }
    }

    return (
        <TokenPoolBox isWithdrawal={withdrawal}>
            <Grid container alignItems={'center'} spacing={isMobile ? 2 : 5}>
                <Grid item md={1} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant={isMobile ? 'h5' : 'h3'}>{toNumber(id) + 1}</Typography>
                </Grid>
                <Grid
                    item
                    md={2.5}
                    sm={3.5}
                    xs={5}
                    sx={{
                        lineHeight: '24px',
                        textAlign: 'right',
                        '& .MuiTypography-body1': {
                            display: 'flex',
                            justifyContent: 'flex-end',
                        },
                    }}
                >
                    <Typography
                        sx={{
                            height: isMobile ? '42px' : '48px',
                            mt: isMobile ? '16px' : '0',
                            alignItems: isMobile ? 'flex-start' : 'flex-end',
                        }}
                    >
                        Schedule (release time):
                    </Typography>
                    <Typography sx={{ height: isMobile ? '67px' : '56px', mt: isMobile ? '16px' : '8px' }}>
                        Unlock amount:{' '}
                    </Typography>
                </Grid>
                <Grid item md={6} sm={8.5} xs={7}>
                    <Typography
                        variant={isMobile ? 'body1' : 'h6'}
                        sx={{
                            fontWeight: isMobile && 700,
                            height: isMobile ? '42px' : '48px',
                            display: 'flex',
                            alignItems: isMobile ? 'flex-start' : 'flex-end',
                        }}
                    >
                        {releaseTime ? moment(toNumber(releaseTime)).format('LLLL') : 'Loading'}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            height: isMobile ? '67px' : '56px',
                        }}
                    >
                        <Typography
                            variant={isMobile ? 'body1' : 'h6'}
                            sx={{
                                display: 'flex',
                                gap: 0.5,
                                flexWrap: 'wrap',
                                mt: isMobile ? '16px' : '4px',
                                fontWeight: isMobile && 700,
                            }}
                        >
                            {unlockAmount
                                ? Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
                                    ethers.utils.formatUnits(unlockAmount, 9)) + ' ' + 'TXUI'
                                : 'Loading'}
                        </Typography>
                    </Box>
                </Grid>
                <Hidden mdUp>
                    <Grid item md={0} xs={12}>
                        <Divider flexItem orientation={'horizontal'} sx={{ color: 'white' }} />
                    </Grid>
                </Hidden>
                <Grid
                    item
                    md={2.5}
                    xs={12}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isMobile ? 'center' : 'flex-end',
                    }}
                >
                    <BorderGradientButton sx={{ minWidth: 160 }} disabled={!canClaim || isWithdrawal} onClick={handleClaim} loading={loading}>
                        {isWithdrawal ? 'Claimed' : 'Claim'}
                    </BorderGradientButton>
                </Grid>
            </Grid>
        </TokenPoolBox>
    );
}
