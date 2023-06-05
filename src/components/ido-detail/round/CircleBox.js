import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { ProcessCircleBox } from 'components/common/ProcessCircleBox';
import useResponsive from 'hooks/useResponsive';
import { ethers } from 'ethers'
import { symbol } from 'prop-types';
import { ConstructionOutlined } from '@mui/icons-material';
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


export const CircleBox = ({ endAt, totalSold, totalSupply, decimals, ratio, participants, symbol }) => {
    const isMobile = useResponsive('down', 'sm');

    const progress = React.useMemo(() => {
        if (totalSold && totalSupply) {
            return ethers.utils.formatUnits(totalSold, decimals) / ethers.utils.formatUnits(totalSupply, decimals);
        }
    }, [decimals, totalSold, totalSupply]);

    const currentParticipants = React.useMemo(() => participants, [participants]);
    const formattedTotalSold = React.useMemo(() => {
        if (totalSold) return ethers.utils.formatUnits(totalSold, decimals);
    }, [decimals, totalSold]);
    const formattedTotalSupply = React.useMemo(() => {
        if (totalSupply) return ethers.utils.formatUnits(totalSupply, decimals);
    }, [decimals, totalSupply]);
    const exchangeRate = React.useMemo(() => ratio, [ratio]);

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
                        radius={75} percent={progress * 100}
                    />
                    <Typography variant='body1' fontWeight={'bold'} textAlign={'center'}>
                        <span style={{ color: '#1FD8D1' }}> {formattedTotalSold} </span>/ {formattedTotalSupply}
                    </Typography>
                </Stack>
                <Stack spacing={isMobile ? 1 : 3} >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img src='/images/icon/icon-package.png' alt='' />
                        <Stack>
                            <Typography variant='body1' fontWeight={'bold'}>Hard Cap</Typography>
                            <Typography variant='body1'>{Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(formattedTotalSupply)} {symbol}</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img src='/images/icon/icon-data.png' alt='' />
                        <Stack>
                            <Typography variant='body1' fontWeight={'bold'}>Amount for Sale</Typography>
                            <Typography variant='body1'>{(formattedTotalSupply * exchangeRate).toFixed(3)}</Typography>
                        </Stack>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img src='/images/icon/icon-dollar.png' alt='' />
                        <Stack>
                            <Typography variant='body1' fontWeight={'bold'}>Price</Typography>
                            <Typography variant='body1'>{exchangeRate} SUI</Typography>
                        </Stack>
                    </Box>

                </Stack>
            </Stack>
        </StyledProcessBox>
    );
};

