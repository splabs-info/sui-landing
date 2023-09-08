import { Box, Stack, Typography } from '@mui/material';
import { ProcessCircleBoxV2 } from 'components/common/ProcessCircleBoxV2';
import useResponsive from 'hooks/useResponsive';
import * as moment from 'moment';
import React from 'react';
import { fCurrency } from 'utils/format';
import { ChartBox, LiveBox, SaleInfoBox } from './RoundStyled';

const calculateDuration = eventTime => moment.duration(Math.max(eventTime - (Math.floor(Date.now())), 0), 'milliseconds');

export const RoundChart = ({ round }) => {
    const isMobile = useResponsive('down', 'sm');
    const [duration, setDuration] = React.useState(calculateDuration(1686441600000));
    return (
        <ChartBox>
            <LiveBox>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src='/images/icon/icon-lock-2.png' alt='' />
                        <Typography sx={{ fontSize: 16, lineHeight: '24px', color: '#1FD8D1', fontWeight: 'bold' }}>Time</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        {/* Pool ends in {duration.days()} D: {duration.hours()} H: {duration.minutes()} M: {duration.seconds()} S */}
                        Sold out
                    </Box>
                </Stack>
            </LiveBox>
            <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Stack justifyContent={'center'} mb={isMobile ? 2 : 0} alignItems={'center'}>
                    <ProcessCircleBoxV2
                        radius={100} percent={100}
                    />
                    {/* <Typography variant='body1' fontWeight={'bold'} textAlign={'center'}>
                        {round?.totalSale === 0 ? '--' : <span style={{ color: '#1FD8D1' }}> {fCurrency(round?.totalSold)} </span>}
                        {' / '}
                        {round?.totalSale === 0 ? '--' : fCurrency(round?.totalSale)}
                        {' SUI'}
                    </Typography> */}
                </Stack>
                <Box ml={isMobile ? 0 : 4}>
                    <SaleInfoBox sx={{ gap: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-data.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Total Sale Amount</Typography>
                                <Typography variant='body2'>{fCurrency(1011)} SUA</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-dollar.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Price</Typography>
                                <Typography variant='body2'>0.09 SUI</Typography>
                            </Stack>
                        </Box>

                        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-calendar.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Vesting Schedule</Typography>
                                <Typography variant='body2'>{round?.vesting} </Typography>
                            </Stack>
                        </Box> */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-data.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Min Amount</Typography>
                                <Typography variant='body2'>1 SUA</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-data.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Max Amount</Typography>
                                <Typography variant='body2'>1 SUA</Typography>
                            </Stack>
                        </Box>
                    </SaleInfoBox>
                    <Box pl={4} mt={2}>
                        <Typography variant='h6'> IDO Information</Typography>
                        <ul style={{ marginLeft: '24px' }}>
                            <li><Typography variant='body2'>IDO Launchpad Logic: {round?.idoInfo.logic}</Typography> </li>
                            {/* <li><Typography variant='body2'>TGE Claim Date & Time: {round?.idoInfo.tgeClaimTime}</Typography></li> */}
                            {/* <li><Typography variant='body2'>Unlimited Purchase </Typography></li> */}
                        </ul>
                    </Box>
                </Box>
            </Stack>
        </ChartBox>
    );
};

