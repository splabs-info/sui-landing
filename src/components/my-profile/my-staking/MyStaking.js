import { Box, Button, Grid, Stack, TextField, Typography, styled } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { GradientLoadingButton } from 'components/common/CustomButton';
import { STAKING_STORAGE, XUI_TYPE } from 'onchain/constants';
import { formatEther, handleKeyType } from 'onchain/helpers';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { fCurrencyV2 } from 'utils/util';
const BallanceBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.20) 0%, rgba(109, 133, 218, 0.20) 100%)',
    borderRadius: '15px',
    padding: '56px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
    '::before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        background: 'linear-gradient(0deg, rgb(66,238,207,0.5)0% , rgb(0,197,211,0.5)30% )',
        borderRadius: '15px',
        inset: '0px',
        padding: '1px',
        WebkitMask:
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        WebkitMaskComposite: 'xor',
        zIndex: 0,
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));
const TypographyShadow = styled(Typography)(({ theme }) => ({
    color: 'white',
    textShadow: '0 0 10px rgb(255,255,255,0.7)',
}));

const SaveButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(255.34deg, #207BBF 21.95%, #4A94CB 39.94%, #5CBAF2 79.27%)',
    color: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    padding: '8px 32px',
    borderRadius: 30,
    minWidth: '150px',
}));

const SubmitBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
}));

const AboutBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(180deg, rgba(104, 229, 184, 0.1) 0%, rgba(109, 133, 218, 0.1) 100%)',
    borderRadius: '15px',
    padding: '32px ',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    height: '100%',
    width: '100%',
    border: '1px solid rgb(255, 255, 255,0.3)',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: '24px ',
    },
}));

export default function MyStaking({ totalXUILocked }) {
    // const [totalXUILocked, setTotalXUILocked] = React.useState(0);

    // const wallet = useWallet();

    // const { provider } = React.useContext(SuiContext);


    return (
        <Box>
            <Grid container spacing={4}>
                <Grid item sm={6} xs={12}>
                    <BallanceBox>
                        <img src="/images/icon/icon-wallet.png" alt="" style={{ width: 'min(50px,100%)' }} />
                        <TypographyShadow variant="h5" textAlign={'center'}>
                            {' '}
                            Staking Balance
                        </TypographyShadow>
                        <Stack direction={'row'} justifyContent={'center'} alignItems="center" gap={1}>
                            <TypographyShadow variant="h3" textAlign={'center'}>
                                {totalXUILocked ? fCurrencyV2(totalXUILocked) : '--'}
                            </TypographyShadow>
                            <img src="/images/coins/XUI.png" alt="" style={{ width: 'min(45px,100%)' }} />
                        </Stack>
                    </BallanceBox>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <BallanceBox>
                        <img src="/images/icon/icon-wallet.png" alt="" style={{ width: 'min(50px,100%)' }} />
                        <TypographyShadow variant="h5" textAlign={'center'}>
                            {' '}
                            Total XUI Staking Points
                        </TypographyShadow>
                        <TypographyShadow variant="h3" textAlign={'center'}>
                            {totalXUILocked ? fCurrencyV2(totalXUILocked) : '--'}
                        </TypographyShadow>
                    </BallanceBox>
                </Grid>
                <Grid item xs={12}>
                    <SubmitBox>
                        <TextField
                            placeholder="Input Object ID of TIER NFT"
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                                color: '#fff',
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                    fontSize: 14,
                                },
                            }}
                        />
                        <SaveButton disabled>Submit</SaveButton>
                    </SubmitBox>
                </Grid>
                <Grid item xs={12}>
                    <AboutBox>
                        <Stack gap={1}>
                            <TypographyShadow variant="h6">About XUI Staking</TypographyShadow>
                            <Typography color={'white'} variant="body1">
                                Earn the tokens from our Incubations Projects only by holding and staking/farming your XUI.
                                <br />
                                Each XUI = 1 XUI Staking Point Daily.
                            </Typography>
                        </Stack>
                        <GradientLoadingButton sx={{ whiteSpace: 'nowrap', minWidth: '120px' }}>Know More</GradientLoadingButton>
                    </AboutBox>
                </Grid>
            </Grid>
        </Box>
    );
}
