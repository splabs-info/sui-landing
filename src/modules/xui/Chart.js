import { Box, Stack, Typography } from '@mui/material';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { isEmpty, round, toNumber } from 'lodash';
import { ChartBox, LiveBox, SaleInfoBox } from 'modules/ido-round/components/RoundStyled';
import * as moment from 'moment';
import React from 'react';
import { fCurrencyV2 } from 'utils/util';
import { RELEAP_ROUND_NAME } from 'onchain/constants'
export const Chart = ({ startAt, roundName, decimals, totalSupply, totalSold, minPurchase, payments, symbol }) => {
    const isMobile = useResponsive('down', 'sm');

    console.log('minPurchase', minPurchase)
    const formattedRatio = React.useMemo(() => {
        if (!isEmpty(payments)) {
            return ethers.utils.formatUnits(payments[0].ratio_per_token, decimals);
        } else return;
    }, [decimals, payments]);

    const renderRuleVesting = React.useCallback(() => {
        if (roundName === 'Public_Sale') {
            return (
                <>
                    20% TGE Unlock,
                    <br /> Monthly Vesting 10% for 8 Month
                </>
            );
        }
        if (roundName === 'Og_Sale') {
            return (
                <>
                    30% TGE Unlock,
                    <br /> Monthly Vesting 10% for 7 Month
                </>
            );
        }
        if (roundName === RELEAP_ROUND_NAME) {
            return (
                <>
                    20% TGE,
                    <br /> 90 days cliff, 20% quarterly
                </>
            );
        } else {
            return '--/--';
        }
    }, [roundName]);

    const renderIdoInfo = React.useCallback(() => {
        if (roundName === 'Public_Sale') {
            return (
                <>
                    {' '}
                    <li>
                        <Typography variant="body2">
                            IDO Launchpad Logic: <br /> Total paid SUI by Each Investor / Total Paid SUI by All Investors
                        </Typography>
                    </li>
                </>
            );
        }
        if (roundName === 'Og_Sale') {
            return (
                <>
                    <li>
                        <Typography variant="body2">IDO Launchpad Logic: FCFS</Typography>{' '}
                    </li>
                </>
            );
        }
        if (roundName === RELEAP_ROUND_NAME) {
            return (
                <>
                    <li>
                        <Typography variant="body2">IDO Launchpad Logic: FCFS</Typography>{' '}
                    </li>
                    <li>
                        <Typography variant="body2">XUI staking snapshot: 5th August 04:00 (UTC)</Typography>{' '}
                    </li>
                    <li>
                        <Typography variant="body2">TGE Claim Date & Time : 10th August</Typography>{' '}
                    </li>
                </>
            );
        }
    }, [roundName]);

    const percent = React.useMemo(() => {
        if (!totalSold || !totalSupply) return '0';
        const percent = (totalSold / totalSupply) * 100;
        if (roundName === 'Public_Sale' && percent > 100) return 100;
        if ((roundName === 'Og_Sale' || roundName === RELEAP_ROUND_NAME) && totalSupply - totalSold < minPurchase) return 100;
        return percent;
    }, [minPurchase, roundName, totalSold, totalSupply]);

    console.log('minPurchase * toNumber(formattedRatio)', minPurchase * toNumber(formattedRatio))
    return (
        <ChartBox>
            <LiveBox>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src="/images/icon/icon-lock-2.png" alt="" />
                        <Typography sx={{ fontSize: 16, lineHeight: '24px', color: '#1FD8D1', fontWeight: 'normal', display: 'flex' }}>
                            <Typography sx={{ fontWeight: 'bold' }} mr={1}>Start Time:</Typography>{startAt ? `${moment(toNumber(startAt)).format('LLLL')}` : 'Start at: 12:00 UTC 20-07-2023'}
                            {/* {moment(toNumber(startAt)).format('LLLL')} */}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}></Box>
                </Stack>
            </LiveBox>
            <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Stack justifyContent={'center'} mb={isMobile ? 2 : 0} alignItems={'center'}>
                    <ProcessCircleBox
                        radius={100}
                        percent={percent}
                        totalSold={totalSold}
                        totalSupply={totalSupply}
                        roundName={roundName}
                        minPurchase={minPurchase}
                    />
                    <Typography variant="body1" fontWeight={'bold'} textAlign={'center'}>
                        {!totalSold ? (
                            '0'
                        ) : (
                            <span style={{ color: '#1FD8D1' }}>
                                {fCurrencyV2(round(totalSold * toNumber(formattedRatio), 6), 6)}{' '}
                            </span>
                        )}
                        {' / '}
                        {!totalSupply ? '0' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 6)}
                        {' SUI'}
                    </Typography>
                </Stack>
                <Box ml={isMobile ? 0 : 4}>
                    <SaleInfoBox>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="/images/icon/icon-data.png" alt="" />
                            <Stack>
                                <Typography variant="body2" fontWeight={'bold'}>
                                    Total Sale Amount
                                </Typography>
                                <Typography variant="body2">
                                    {!totalSupply ? '--' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 6)} SUI
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="/images/icon/icon-dollar.png" alt="" />
                            <Stack>
                                <Typography variant="body2" fontWeight={'bold'}>
                                    Price
                                </Typography>
                                <Typography variant="body2">
                                    {formattedRatio} SUI = 1 {symbol}
                                </Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="/images/icon/icon-calendar.png" alt="" />
                            <Stack>
                                <Typography variant="body2" fontWeight={'bold'}>
                                    Vesting Schedule
                                </Typography>
                                <Typography variant="body2">{renderRuleVesting()}</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="/images/icon/icon-lock.png" alt="" />
                            <Stack>
                                <Typography variant="body2" fontWeight={'bold'}>
                                    Min Purchase Amount
                                </Typography>
                                <Typography variant="body2">
                                    {minPurchase ? fCurrencyV2(minPurchase * toNumber(formattedRatio)) : '0'} SUI
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="/images/icon/icon-data.png" alt="" />
                            <Stack>
                                <Typography variant="body2" fontWeight={'bold'}>
                                    Max Purchase Amount
                                </Typography>
                                <Typography variant="body2">
                                    {!totalSupply ? '--' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 3)} SUI
                                </Typography>
                            </Stack>
                        </Box>
                    </SaleInfoBox>
                    <Box pl={3} mt={2} sx={{ minHeight: 76, display: 'flex' }}>

                        <Stack>
                            <Box sx={{ display: 'flex' }}>
                                <img src="/images/icon/ido-info.svg" alt="ido-info-icons" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                <Typography variant="h6"> IDO Information</Typography>
                            </Box>
                            <ul style={{ marginLeft: '64px' }}>
                                {renderIdoInfo()}
                            </ul>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </ChartBox>
    );
};
