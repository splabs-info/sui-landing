import { Box, Stack, Typography } from '@mui/material';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { isEmpty, round, toNumber } from 'lodash';
import { ChartBox, LiveBox, SaleInfoBox } from 'modules/ido-round/components/RoundStyled';
import * as moment from 'moment';
import React from 'react';
import { fCurrencyV2 } from 'utils/util';
import { RELEAP_ROUND_NAME, RELEAP_PROJECT_NAME, XUI_PROJECT_NAME } from 'onchain/constants';
export const Chart = ({
    startAt,
    roundName,
    decimals,
    totalSupply,
    totalSold,
    minPurchase,
    maxPurchase,
    payments,
    symbol,
    projectName,
}) => {
    const isMobile = useResponsive('down', 'sm');

    const formattedRatio = React.useMemo(() => {
        if (!isEmpty(payments)) {
            return ethers.utils.formatUnits(payments[0].ratio_per_token, decimals);
        } else return;
    }, [decimals, payments]);

    const renderRuleVesting = React.useCallback(() => {
        if (projectName === XUI_PROJECT_NAME) {
            if (roundName === 'Public_Sale') {
                return (
                    <>
                        20% TGE Unlock,
                        <br /> Monthly Vesting 10% for 8 Month
                    </>
                );
            } else {
                return (
                    <>
                        30% TGE Unlock,
                        <br /> Monthly Vesting 10% for 7 Month
                    </>
                );
            }
        }
        if (projectName === RELEAP_PROJECT_NAME) {
            if (roundName === 'Public_Sale') {
                return (
                    <>
                        20% TGE,
                        <br /> 90 days cliff, 20% quarterly
                    </>
                );
            }
            if (roundName === 'Community_Sale') {
                return (
                    <>
                        20% TGE,
                        <br /> 90 days cliff, 20% quarterly
                    </>
                );
            }
        } else {
            return '--/--';
        }
    }, [projectName, roundName]);

    const renderIdoInfo = React.useCallback(() => {
        if (projectName === XUI_PROJECT_NAME) {
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
        }
        if (projectName === RELEAP_PROJECT_NAME) {
            if (roundName === 'Public_Sale') {
                return (
                    <>
                        <li>
                            <Typography variant="body2">IDO Launchpad Logic: FCFS</Typography>{' '}
                        </li>
                        <li>
                            <Typography variant="body2">TGE Claim Date & Time : 10th August</Typography>{' '}
                        </li>
                    </>
                );
            }
            if (roundName === 'Community_Sale') {
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
        }
    }, [projectName, roundName]);

    const renderTotalSupply = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return <>{!totalSupply ? '--' : fCurrencyV2(totalSupply)} REAP</>;
        }
        if (projectName === XUI_PROJECT_NAME) {
            return <>{!totalSupply ? '--' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 6)} SUI</>;
        }
    }, [formattedRatio, projectName, totalSupply]);

    const renderMinPurchase = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return (
                <>
                    {minPurchase ? `${fCurrencyV2(minPurchase)} ${symbol}` : '0'} ={' '}
                    {fCurrencyV2(minPurchase * toNumber(formattedRatio))} SUI
                </>
            );
        }
        if (projectName === XUI_PROJECT_NAME) {
            return <>{minPurchase ? fCurrencyV2(minPurchase * toNumber(formattedRatio)) : '0'} SUI</>;
        }
    }, [formattedRatio, minPurchase, projectName, symbol]);


    const renderMaxPurchase = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return <>
                {maxPurchase ? `${fCurrencyV2(maxPurchase)} ${symbol}` : '0'} ={' '}
                {fCurrencyV2(maxPurchase * toNumber(formattedRatio))} SUI
            </>
        }
        if (projectName === XUI_PROJECT_NAME) {
            return <>{!totalSupply ? '--' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 3)} SUI</>
        }
    }, [formattedRatio, maxPurchase, projectName, symbol, totalSupply])

    const percent = React.useMemo(() => {
        if (!totalSold || !totalSupply) return '0';
        const percent = (totalSold / totalSupply) * 100;
        if (roundName === 'Public_Sale' && percent > 100) return 100;
        if ((roundName === 'Og_Sale' || roundName === RELEAP_ROUND_NAME) && totalSupply - totalSold < minPurchase)
            return 100;
        return percent;
    }, [minPurchase, roundName, totalSold, totalSupply]);


    const renderInfoChart = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return <>
                {!totalSold ? '0' : (
                    <span style={{ color: '#1FD8D1' }}>
                        {fCurrencyV2(totalSold)}{' '}
                    </span>
                )}
                {' / '}
                {!totalSupply ? '0' : fCurrencyV2(totalSupply)}{' '}
                {symbol}
            </>
        }
        if (projectName === XUI_PROJECT_NAME) {
            return (

                <>{!totalSold ? (
                    '0'
                ) : (
                    <span style={{ color: '#1FD8D1' }}>
                        {fCurrencyV2(round(totalSold * toNumber(formattedRatio), 6), 6)}{' '}
                    </span>
                )}
                    {' / '}
                    {!totalSupply ? '0' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 6)}
                    {' SUI'}
                </>
            )
        }
    }, [formattedRatio, projectName, symbol, totalSold, totalSupply])

    return (
        <ChartBox>
            <LiveBox>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src="/images/icon/icon-lock-2.png" alt="" />
                        <Typography
                            sx={{ fontSize: 16, lineHeight: '24px', color: '#1FD8D1', fontWeight: 'normal', display: 'flex' }}
                        >
                            <Typography sx={{ fontWeight: 'bold' }} mr={1}>
                                Start Time:
                            </Typography>
                            {startAt ? `${moment(toNumber(startAt)).format('LLLL')}` : 'Start at: 12:00 UTC 20-07-2023'}
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
                        {renderInfoChart()}
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
                                <Typography variant="body2">{renderTotalSupply()}</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="/images/icon/icon-dollar.png" alt="" />
                            <Stack>
                                <Typography variant="body2" fontWeight={'bold'}>
                                    Price
                                </Typography>
                                <Typography variant="body2">
                                    1 {symbol} = {formattedRatio} SUI
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
                                <Typography variant="body2">{renderMinPurchase()}</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="/images/icon/icon-data.png" alt="" />
                            <Stack>
                                <Typography variant="body2" fontWeight={'bold'}>
                                    Max Purchase Amount
                                </Typography>
                                <Typography variant="body2">
                                    {renderMaxPurchase()}
                                </Typography>
                            </Stack>
                        </Box>
                    </SaleInfoBox>
                    <Box pl={3} mt={2} sx={{ minHeight: 76, display: 'flex' }}>
                        <Stack>
                            <Box sx={{ display: 'flex' }}>
                                <img
                                    src="/images/icon/ido-info.svg"
                                    alt="ido-info-icons"
                                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                                />
                                <Typography variant="h6">IDO Information</Typography>
                            </Box>
                            <ul style={{ marginLeft: '64px', minHeight: 72, }}>{renderIdoInfo()}</ul>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </ChartBox>
    );
};
