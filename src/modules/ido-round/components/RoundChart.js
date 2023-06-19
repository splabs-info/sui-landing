import { Box, Stack, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import useResponsive from 'hooks/useResponsive';
import { SaleInfoBox } from './RoundStyled';

const StyledProcessBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.1) 0%, rgba(109, 133, 218, 0.1) 100%)',
    padding: "64px 40px 40px 40px ",
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    [theme.breakpoints.down('sm')]: {
        padding: "64px 24px 40px 24px",
    }
}));
const LiveBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    padding: '16px 36px',
    [theme.breakpoints.down('sm')]: {
        padding: "8px 24px",
    }
}));


export const RoundChart = ({ round }) => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <StyledProcessBox>
            <LiveBox>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src='/images/icon/icon-live.png' alt='' />
                        <Typography sx={{ fontSize: 14, lineHeight: '24px', color: '#1FD8D1' }}>Live</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>Pool ends in 00D: 00H: 50M: 13S</Typography>
                    </Box>
                </Stack>
            </LiveBox>
            <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Stack justifyContent={'center'} mb={isMobile ? 2 : 0} alignItems={'center'}>
                    <ProcessCircleBox
                        radius={100} percent={66}
                    />
                    <Typography variant='body1' fontWeight={'bold'} textAlign={'center'}>
                        <span style={{ color: '#1FD8D1' }}> 84,196,454,0019 </span>/ 800,000 SUI
                    </Typography>
                </Stack>
                <Box ml={4}>
                    <SaleInfoBox>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-data.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Total Sale Amount</Typography>
                                <Typography variant='body2'>800,000 SUI</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-dollar.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Price</Typography>
                                <Typography variant='body2'>0.25 XUI</Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-calendar.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Vesting Schedule</Typography>
                                <Typography variant='body2'>20% TGE Unlock, Monthly Vesting 10% for 8 Months</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-lock.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Max Purchase Amount</Typography>
                                <Typography variant='body2'>100 SUI</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src='/images/icon/icon-data.png' alt='' />
                            <Stack>
                                <Typography variant='body2' fontWeight={'bold'}>Min Purchase Amount</Typography>
                                <Typography variant='body2'>Unlimited</Typography>
                            </Stack>
                        </Box>
                    </SaleInfoBox>
                    <Box pl={4} mt={1}>
                        <Typography variant='h6'> IDO Information</Typography>
                        <ul style={{ marginLeft: '24px' }}>
                            <li><Typography variant='body2'>IDO Launchpad Logic:</Typography> </li>
                            <li><Typography variant='body2'>TGE Claim Date & Time: </Typography></li>
                            <li><Typography variant='body2'>Unlimited Purchase </Typography></li>
                        </ul>
                    </Box>
                </Box>
            </Stack>
        </StyledProcessBox>
    );
};

