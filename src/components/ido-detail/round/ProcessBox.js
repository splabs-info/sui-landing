import { Box, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ethers, BigNumber } from 'ethers';
import React from 'react';
import { useYouSuiStore } from 'zustand-store/yousui_store';
import { toNumber } from 'lodash';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
const StyledProcessBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    padding: '56px 40px',
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'relative',
    marginTop: 32,
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    
    
    borderRadius: 32,
    height: 24,
    boxShadow: '0px 0px 10px 2px rgba(152, 255, 230, 0.7)',
    '& .MuiLinearProgress-barColorPrimary': {
        background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
        // backgroundColor: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
    }
}));

const StyledExchangeRate = styled(Box)(({ theme }) => ({
    position: 'absolute',
    background:
        'linear-gradient(178.73deg, rgba(32, 123, 191, 1) 2.08%, rgba(74, 148, 203, 1)  32.81%, rgba(92, 186, 242, 1) 100%)',
    color: 'white',
    fontSize: 18,
    borderRadius: 10,
    padding: '7px 18px',
    fontWeight: 'bold',
    top: -20,
    right: 16,
}));
export const ProcessBox = React.memo(({ totalSold, totalSupply, ratio, participants }) => {

    console.log('participants__', participants)
    const [update, setUpdate] = React.useState(false);
    const { soled } = useYouSuiStore((state) => state.sold);

    React.useEffect(() => {
        if (soled) {
            setUpdate(true);
        }
    }, [soled]);

    const progress = React.useMemo(() => {
        if (totalSold && totalSupply) {
            return ethers.utils.formatUnits(totalSold, 9) / ethers.utils.formatUnits(totalSupply, 9);
        }
    }, [totalSold, totalSupply]);

    const currentParticipants = React.useMemo(() => participants, [participants]);
    const formattedTotalSold = React.useMemo(() => {
        if (totalSold) return ethers.utils.formatUnits(totalSold, 9);
    }, [totalSold]);
    const formattedTotalSupply = React.useMemo(() => {
        if (totalSupply) return ethers.utils.formatUnits(totalSupply, 9);
    }, [totalSupply]);
    const exchangeRate = React.useMemo(() => ratio, [ratio]);

    return (
        <StyledProcessBox>
            <StyledExchangeRate>{exchangeRate ? `1 SUA = ${exchangeRate} SUI` : 'Loading'}</StyledExchangeRate>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 1.5,
                }}
            >
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>Process</Typography>
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>
                    {currentParticipants || currentParticipants === 0 ? `Current Participants : ${currentParticipants}` : 'Loading'}
                </Typography>
            </Box>

            <StyledLinearProgress variant="determinate" component="p" value={progress} />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 1.5,
                }}
            >
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>
                    {progress || progress === 0 ? `${progress.toFixed(7)} %` : 'Loading'}
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>
                    {formattedTotalSold && formattedTotalSupply ? `${formattedTotalSold} / ${formattedTotalSupply} ` : 'Loading'}
                </Typography>
            </Box>
        </StyledProcessBox>
    );
});
