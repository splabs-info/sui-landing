import { Box, Stack, Typography } from '@mui/material';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { isEmpty } from 'lodash';
import { ChartBox, LiveBox, SaleInfoBox } from 'modules/ido-round/components/RoundStyled';
import React from 'react';
import { fCurrencyV2 } from 'utils/util';
import { round, toNumber } from 'lodash'
import moment from 'moment';
export const Chart = ({ startAt, roundName, decimals, totalSupply, totalSold, minPurchase, payments }) => {
    const isMobile = useResponsive('down', 'sm');

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
    }, [roundName]);


    const percent = React.useMemo(() => {
        if (!totalSold || !totalSupply) return '0';
        const percent = (totalSold / totalSupply) * 100;
        if (percent > 100) return 100;
        return percent;
    }, [totalSold, totalSupply])

    return (
        <ChartBox>
            <LiveBox>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src="/images/icon/icon-lock-2.png" alt="" />
                        <Typography sx={{ fontSize: 16, lineHeight: '24px', color: '#1FD8D1', fontWeight: 'bold' }}>
                            Start at: 12:00 UTC 20-07-2023
                            {/* {moment(toNumber(startAt)).format('LLLL')} */}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}></Box>
                </Stack>
            </LiveBox>
            <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Stack justifyContent={'center'} mb={isMobile ? 2 : 0} alignItems={'center'}>
                    <ProcessCircleBox radius={100} percent={percent} totalSold={totalSold} totalSupply={totalSupply} />
                    <Typography variant="body1" fontWeight={'bold'} textAlign={'center'}>
                        {!totalSold ? '0' : <span style={{ color: '#1FD8D1' }}>{fCurrencyV2(round(totalSold * toNumber(formattedRatio), 6), 6)} </span>}
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
                                <Typography variant="body2">{formattedRatio} SUI = 1 XUI ($0.2)</Typography>
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
                                <Typography variant="body2">{minPurchase ? fCurrencyV2(round(minPurchase * toNumber(formattedRatio)), 3) : '0'} SUI</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="/images/icon/icon-data.png" alt="" />
                            <Stack>
                                <Typography variant="body2" fontWeight={'bold'}>
                                    Max Purchase Amount
                                </Typography>
                                <Typography variant="body2">{!totalSupply ? '--' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 3)} SUI</Typography>
                            </Stack>
                        </Box>
                    </SaleInfoBox>
                    <Box pl={4} mt={2} sx={{ minHeight: 76 }}>
                        <Typography variant="h6"> IDO Information</Typography>
                        <ul style={{ marginLeft: '24px' }}>
                            {renderIdoInfo()}
                            {/* <li><Typography variant='body2'>IDO Launchpad Logic: {idoInfo.logic}</Typography> </li> */}
                            {/* <li><Typography variant='body2'>TGE Claim Date & Time: {idoInfo.tgeClaimTime}</Typography></li> */}
                            {/* <li><Typography variant='body2'>Unlimited Purchase </Typography></li> */}
                        </ul>
                    </Box>
                </Box>
            </Stack>
        </ChartBox>
    );
};
