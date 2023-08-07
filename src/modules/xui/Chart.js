import { Box, Stack, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import { ethers } from 'ethers';
import useResponsive from 'hooks/useResponsive';
import { isEmpty, round, toNumber } from 'lodash';
import { ChartBox, LiveBox, SaleInfoBox } from 'modules/ido-round/components/RoundStyled';
import * as moment from 'moment';
import { RELEAP_PROJECT_NAME, XUI_PROJECT_NAME } from 'onchain/constants';
import React from 'react';
import { fCurrencyV2 } from 'utils/util';
import { includes } from 'lodash';
import { IconCircleCheck } from '@tabler/icons-react';
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
    whiteList,
}) => {
    const isMobile = useResponsive('down', 'sm');

    const wallet = useWallet();

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
                            <Typography variant="body2">TGE Claim Date & Time : 11:00 AM (UTC), 10th August</Typography>{' '}
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
                            <Typography variant="body2">TGE Claim Date & Time : 11:00 AM (UTC), 10th August</Typography>{' '}
                        </li>
                    </>
                );
            }
        }
    }, [projectName, roundName]);

    const renderTotalSupply = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            if (roundName === 'Public_Sale') {
                return (
                    <>
                        {!totalSupply ? '--' : fCurrencyV2(totalSupply)} REAP
                        <Typography variant="body2">30,000 USD</Typography>
                    </>
                );
            } else {
                return (

                    <>
                        {!totalSupply ? '--' : fCurrencyV2(totalSupply)} REAP
                        <Typography variant="body2">70,000 USD</Typography>
                    </>
                )
            }
        }
        if (projectName === XUI_PROJECT_NAME) {
            return <>{!totalSupply ? '--' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 6)} SUI</>;
        }
    }, [formattedRatio, projectName, roundName, totalSupply]);

    const inWhiteList = React.useMemo(() => {
        if (!whiteList || isEmpty(whiteList) || !wallet?.address) return;
        return includes(whiteList, wallet.address);
    }, [wallet?.address, whiteList]);

    const renderMinPurchase = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            if (roundName === 'Public_Sale') {
                return (
                    <>
                        {minPurchase ? `${fCurrencyV2(minPurchase, 6)} ${symbol}` : '0'}
                        <Typography variant="body2">200 SUI</Typography>
                    </>
                );
            } else {
                return (
                    <>
                        {minPurchase ? `${fCurrencyV2(minPurchase)} ${symbol}` : '0'}
                        <Typography variant="body2">100 SUI</Typography>
                    </>
                );
            }
        }
        if (projectName === XUI_PROJECT_NAME) {
            return <>{minPurchase ? fCurrencyV2(minPurchase * toNumber(formattedRatio)) : '0'} SUI</>;
        }
    }, [formattedRatio, minPurchase, projectName, roundName, symbol]);

    const renderMaxPurchase = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            if (roundName === 'Public_Sale') {
                return (
                    <>
                        {maxPurchase ? `${fCurrencyV2(maxPurchase)} ${symbol}` : '0'}
                        {/* {fCurrencyV2(maxPurchase * toNumber(formattedRatio))} SUI */}
                        <Typography variant="body2">1,000 SUI</Typography>
                    </>
                );
            } else {
                return (
                    <>
                        {maxPurchase ? `${fCurrencyV2(maxPurchase)} ${symbol}` : '0'}
                        {/* {fCurrencyV2(maxPurchase * toNumber(formattedRatio))} SUI */}
                        {/* -- REAP */}
                        <Typography variant='body2'>70,000 USD</Typography>
                    </>
                );
            }
        }
        if (projectName === XUI_PROJECT_NAME) {
            return <>{!totalSupply ? '--' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 3)} SUI</>;
        }
    }, [formattedRatio, maxPurchase, projectName, roundName, symbol, totalSupply]);

    const percent = React.useMemo(() => {
        if (!totalSold || !totalSupply) return '0';
        const percent = (totalSold / totalSupply) * 100;
        if (projectName === XUI_PROJECT_NAME && roundName === 'Public_Sale' && percent > 100) return 100;


        if (projectName === RELEAP_PROJECT_NAME) {
            if ((totalSupply - totalSold) < minPurchase) {
                return 100;
            } else {
                return percent;
            }
        }
        if (projectName === XUI_PROJECT_NAME) {
            if (roundName === 'Og_Sale') {
                if ((totalSupply - totalSold) < minPurchase) {
                    return 100;
                } else {
                    return percent
                }
            } else {
                return percent
            }
        }

        // if ((roundName === 'Og_Sale' || projectName === RELEAP_PROJECT_NAME) && (totalSupply - totalSold) < minPurchase){
        //     console.log('vao khong')

        //     return 100;
        // }
        return percent;
    }, [minPurchase, projectName, roundName, totalSold, totalSupply]);


    const renderInfoChart = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return (
                <>
                    {!totalSold ? '0' : <span style={{ color: '#1FD8D1' }}>{fCurrencyV2(totalSold)} </span>}
                    {' / '}
                    {!totalSupply ? '0' : fCurrencyV2(totalSupply)} {symbol}
                </>
            );
        }
        if (projectName === XUI_PROJECT_NAME) {
            return (
                <>
                    {!totalSold ? (
                        '0'
                    ) : (
                        <span style={{ color: '#1FD8D1' }}>{fCurrencyV2(round(totalSold * toNumber(formattedRatio), 6), 6)} </span>
                    )}
                    {' / '}
                    {!totalSupply ? '0' : fCurrencyV2(round(totalSupply * formattedRatio, 6), 6)}
                    {' SUI'}
                </>
            );
        }
    }, [formattedRatio, projectName, symbol, totalSold, totalSupply]);

    const renderPrice = React.useCallback(() => {
        if (projectName === RELEAP_PROJECT_NAME) {
            return (
                <>
                    {/* 1 {symbol} = {formattedRatio} SUI */}
                    {formattedRatio} SUI
                    {/* -- SUI
                    <Typography variant="body2">0.013 USD</Typography>
                     */}
                    <Typography variant="body2">0.013 USD</Typography>
                </>
            );
        }
        if (projectName === XUI_PROJECT_NAME) {
            return (
                <>
                    1 {symbol} = {formattedRatio} SUI
                </>
            );
        }
    }, [formattedRatio, projectName, symbol]);
    return (
        <ChartBox>
            <LiveBox sx={{ justifyContent: 'space-between' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', justifyContent: 'space-between' }}>
                        <Stack direction={'row'} justifyContent={"space-between"} alignItems={"center"} sx={{ width: '100%' }}>
                            <Box sx={{
                                display: 'flex', whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                <img src="/images/icon/icon-lock-2.png" alt="" style={{ marginRight: '8px' }} />
                                <Typography
                                    sx={{ fontSize: 16, lineHeight: '24px', color: '#1FD8D1', fontWeight: 'normal', display: 'flex', }}
                                >
                                    <Typography sx={{ fontWeight: 'bold' }} mr={1}>
                                        Start Time:
                                    </Typography>
                                    {startAt ? `${moment(toNumber(startAt)).format('LLLL')}` : 'Start at: 12:00 UTC 20-07-2023'}
                                </Typography>
                            </Box>
                            {projectName === RELEAP_PROJECT_NAME && roundName === 'Community_Sale' && <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ display: 'flex', color: `${inWhiteList ? '#1FD8D1' : `rgba(145, 158, 171, 0.8)`}`, fontWeight: 'bold' }}>
                                    Whitelist
                                    <IconCircleCheck color={inWhiteList ? '#1FD8D1' : 'rgba(145, 158, 171, 0.8)'} style={{ marginLeft: '8px' }} />
                                </Typography>
                            </Box>}

                        </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}></Box>
                </Stack>
            </LiveBox>
            <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Stack justifyContent={'center'} mb={isMobile ? 2 : 0} alignItems={'center'}>
                    <ProcessCircleBox
                        radius={100}
                        percent={percent}
                        projectName={projectName}
                        totalSold={totalSold}
                        totalSupply={totalSupply}
                        roundName={roundName}
                        minPurchase={minPurchase}
                    />
                    <Typography variant="body1" fontWeight={'bold'} textAlign={'center'}>
                        {renderInfoChart()}
                    </Typography>
                </Stack>
                <Box ml={isMobile ? 0 : 4} gap={2}>
                    <SaleInfoBox
                        sx={{
                            gap: '12px',
                        }}
                    >
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
                                    {renderPrice()}
                                    {/* 1 {symbol} = {formattedRatio} SUI */}
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
                                <Typography variant="body2">{renderMaxPurchase()}</Typography>
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
                            <ul style={{ marginLeft: '64px', minHeight: 72 }}>{renderIdoInfo()}</ul>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </ChartBox>
    );
};
