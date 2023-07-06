import { Box, Stack, Typography } from '@mui/material';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import useResponsive from 'hooks/useResponsive';
import { ChartBox, LiveBox, SaleInfoBox } from './RoundStyled';
import { fCurrency } from 'utils/format';
import { IDOCountdown } from 'components/countdown/IDOCountdown';

export const RoundChart = ({ round }) => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <ChartBox>
            <LiveBox>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src='/images/icon/icon-lock-2.png' alt='' />
                        <Typography sx={{ fontSize: 16, lineHeight: '24px', color: '#1FD8D1', fontWeight: 'bold' }}>
                            Start at: 12:00 UTC 20-07-2023
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>

                    </Box>
                </Stack>
            </LiveBox>
            <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Stack justifyContent={'center'} mb={isMobile ? 2 : 0} alignItems={'center'}>
                    <ProcessCircleBox
                        radius={100} percent={round?.totalSold ? round?.totalSold / round?.totalSale * 100 : 0}
                    />
                    <Typography variant='body1' fontWeight={'bold'} textAlign={'center'}>
                        {round?.totalSale === 0 ? '--' : <span style={{ color: '#1FD8D1' }}> {fCurrency(round?.totalSold)} </span>}
                        {' / '}
                        {round?.totalSale === 0 ? '--' : fCurrency(round?.totalSale)}
                        {' SUI'}
                    </Typography>
                </Stack>
                <Box ml={isMobile ? 0 : 4}>
                    <SaleInfoBox>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-data.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Total Sale Amount</Typography>
                                <Typography variant='body2'>{round?.totalSale === 0 ? '--/--' : fCurrency(round?.totalSale)} SUI</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-dollar.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Price</Typography>
                                <Typography variant='body2'>{round?.price} USD</Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-calendar.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Vesting Schedule</Typography>
                                <Typography variant='body2'>{round?.vesting} </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-lock.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Min Purchase Amount</Typography>
                                <Typography variant='body2'>{round?.minPurchase} SUI</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-data.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Max Purchase Amount</Typography>
                                <Typography variant='body2'>--/--</Typography>
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

