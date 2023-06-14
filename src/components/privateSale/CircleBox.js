import { Box, Stack, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import useResponsive from 'hooks/useResponsive';
import { PoolCountdown } from './PoolCountdown';

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


export const CircleBox = () => {
    const isMobile = useResponsive('down', 'sm');
    return (
        <StyledProcessBox>
            <LiveBox>
                <Stack direction={'row'} justifyContent={'space-between'} gap={5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src='/images/icon/icon-live.png' alt='' />
                        <Typography sx={{ fontSize: 14, lineHeight: '24px', color: '#1FD8D1' }}>Live</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0 : 1, flexDirection: isMobile ? 'column' : 'row' }}>
                        <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>Pool ends in </Typography>
                        <PoolCountdown endTime={'2023-06-21T11:00:00'} _handleComplete={() => { }} />
                    </Box>
                </Stack>
            </LiveBox>
            <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-around'} alignItems={'center'}>
                <Stack justifyContent={'center'} mb={isMobile ? 2 : 0} alignItems={'center'}>
                    <ProcessCircleBox
                        radius={75} percent={60}
                    />
                    <Typography variant='body1' fontWeight={'bold'} textAlign={'center'}>
                        <span style={{ color: '#1FD8D1' }}> 300,000 </span>/ 500,000 SUI
                    </Typography>
                </Stack>
                <Stack spacing={isMobile ? 1 : 3} >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img src='/images/icon/icon-package.png' alt='' />
                        <Stack>
                            <Typography variant='body1' fontWeight={'bold'}>Pool's remaining</Typography>
                            <Typography variant='body1'>200,000 SUI</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img src='/images/icon/icon-data.png' alt='' />
                        <Stack>
                            <Typography variant='body1' fontWeight={'bold'}>Amount for Sale</Typography>
                            <Typography variant='body1'>500,000 SUI</Typography>
                        </Stack>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img src='/images/icon/icon-dollar.png' alt='' />
                        <Stack>
                            <Typography variant='body1' fontWeight={'bold'}>Price</Typography>
                            <Typography variant='body1'>0.125 SUI</Typography>
                        </Stack>
                    </Box>

                </Stack>
            </Stack>
        </StyledProcessBox>
    );
};

