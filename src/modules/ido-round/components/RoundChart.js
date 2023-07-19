import { Box, Stack, Typography } from '@mui/material';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import useResponsive from 'hooks/useResponsive';
import { fCurrency } from 'utils/format';
import { ChartBox, LiveBox, SaleInfoBox } from './RoundStyled';

export const RoundChart = ({ decimals, totalSold, totalSupply, payments, maxPurchase, minPurchase }) => {
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
                        radius={100} percent={totalSold ? totalSold / totalSupply * 100 : 0}
                    />
                    <Typography variant='body1' fontWeight={'bold'} textAlign={'center'}>
                        {totalSupply === 0 ? '--' : <span style={{ color: '#1FD8D1' }}> {fCurrency(totalSold)} </span>}
                        {' / '}
                        {totalSupply === 0 ? '--' : fCurrency(totalSupply)}
                        {' SUI'}
                    </Typography>
                </Stack>
                <Box ml={isMobile ? 0 : 4}>
                    <SaleInfoBox>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-data.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Total Sale Amount</Typography>
                                <Typography variant='body2'>{totalSupply === 0 ? '--/--' : fCurrency(totalSupply)} SUI</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-dollar.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Price</Typography>
                                <Typography variant='body2'>{0.07} SUI = 1 XUI (0.2 USD)</Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-calendar.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Vesting Schedule</Typography>
                                <Typography variant='body2'> -- </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-lock.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Min Purchase Amount</Typography>
                                <Typography variant='body2'>{minPurchase} SUI</Typography>
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
                    <Box pl={4} mt={2} sx={{ minHeight: 76 }}>
                        <Typography variant='h6'> IDO Information</Typography>
                        <ul style={{ marginLeft: '24px' }}>
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

