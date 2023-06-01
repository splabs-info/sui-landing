/* eslint-disable jsx-a11y/alt-text */
import { Box, Divider, Grid, Hidden, Typography, styled } from '@mui/material';
import { BorderGradientButton, GradientButton } from 'components/common/CustomButton';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import useResponsive from 'hooks/useResponsive';
import { SocialFooter } from 'layouts/Footer-v2';
import { useNavigate, useParams } from 'react-router-dom';
import { formatAmount } from 'setting/format';
import { TokenPoolBox } from './ClaimTokens';

const VestingListContent = [
    {
        token: 'T-XUI',
        amount: '2500000',
        releaseTime: '09:00 AM 25/12/2023 (UTC +9)',
        status: false,
    },
    {
        token: 'T-XUI',
        amount: '2500000',
        releaseTime: '09:00 AM 25/12/2023 (UTC +9)',
        status: true,
    },
    {
        token: 'T-XUI',
        amount: '2500000',
        releaseTime: '09:00 AM 25/12/2023 (UTC +9)',
        status: true,
    },
]

export default function VestingTokens() {
    const isMobile = useResponsive('down', 'sm');
    const { sub } = useParams();
    // console.log(sub);
    return (
        <Box position="relative">
            <Grid container spacing={4} mb={isMobile ? 1 : 4}>
                <Grid xs={12} md={4} item>
                    <Box position={'relative'}>
                        <Box component={'img'} src='/images/claims/claim-yousui.jpg' sx={{
                            width: '100%',
                            borderRadius: '10px',
                        }} />
                        <Box
                            sx={{
                                background: 'linear-gradient(255deg, #207BBF 0%, #5CBAF2 100%)',
                                position: 'absolute', bottom: 0, right: 0,
                                borderRadius: '10px', padding: '8px 24px'
                            }}
                        >
                            <Typography color={'white'} fontWeight={'bold'}>TBA</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid sx={{ width: '100%', '& a': { marginRight: '8px' } }} xs={12} md={8} item>
                    <Typography variant="h3" color={'white'} >
                        YOUSUI PJT
                    </Typography>
                    <Typography variant='body1' color={'white'} my={isMobile ? 2 : 4}>
                        A is the easiest and fastest way to approach for developers who want to experime Web3, enabling the best addition of blockchain features to their games in a few minutes for the future of gaming…
                    </Typography>
                    <SocialFooter />
                    <TokenPoolBox sx={{ padding: '20px 48px', marginTop: isMobile ? '24px' : '40px' }}>
                        <ProcessBarBox
                            percent={1250 * 100 / 2000}
                            title={<>
                                <Typography>UNLOCKED AMOUNT</Typography>
                                <Typography>TOTAL AMOUNT</Typography>

                            </>}
                            subtitle={<>
                                <Typography>1,250,000 XUI</Typography>
                                <Typography>2,000,000 XUI</Typography>
                            </>}
                        />
                    </TokenPoolBox>
                </Grid>
            </Grid>
            {VestingListContent.map((item, index) => (
                <VestingList {...item} index={index} key={index} />
            ))}
        </Box>
    );
}

function VestingList({ index = 0, amount, token, releaseTime, status = false }) {
    const isMobile = useResponsive('down', 'sm');
    return (
        <TokenPoolBox>
            <Grid container alignItems={'center'} spacing={isMobile ? 2 : 5}>
                <Grid item md={1} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant={isMobile ? 'h5' : 'h3'}>{index + 1}</Typography>
                </Grid>
                <Grid item md={2.5} sm={3.5} xs={5}
                    sx={{
                        lineHeight: '24px', textAlign: 'right',
                        '& .MuiTypography-body1': {
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }
                    }}>
                    <Typography
                        sx={{
                            height: isMobile ? '42px' : '48px',
                            mt: isMobile ? '16px' : '0',
                            alignItems: isMobile ? 'flex-start' : 'flex-end',
                        }}>
                        Schedule (release time):
                    </Typography>
                    <Typography
                        sx={{ height: isMobile ? '67px' : '56px', mt: isMobile ? '16px' : '8px' }}
                    >
                        Unlock amount:
                    </Typography>
                </Grid>
                <Grid item md={6} sm={8.5} xs={7}>
                    <Typography
                        variant={isMobile ? 'body1' : 'h6'}
                        sx={{
                            fontWeight: isMobile && 700, height: isMobile ? '42px' : '48px',
                            display: 'flex',
                            alignItems: isMobile ? 'flex-start' : 'flex-end',
                        }}
                    >
                        {releaseTime}
                    </Typography>
                    <Box sx={{
                        display: 'flex', gap: 2,
                        height: isMobile ? '67px' : '56px'
                    }}>
                        <Typography
                            variant={isMobile ? 'body1' : 'h6'}
                            sx={{
                                display: 'flex',
                                gap: 0.5, flexWrap: 'wrap',
                                mt: isMobile ? '16px' : '4px',
                                fontWeight: isMobile && 700,
                            }}
                        >
                            {formatAmount(amount)} {token}
                            <Typography variant='body1' sx={{ fontStyle: 'italic', fontWeight: 400, fontSize: '16px' }}>
                                (~ 10% of total vesting amount)
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
                <Hidden mdUp>
                    <Grid item md={0} xs={12} >
                        <Divider flexItem orientation={'horizontal'} sx={{ color: 'white' }} />
                    </Grid>
                </Hidden>
                <Grid item md={2.5} xs={12}
                    sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-end' }}>
                    <BorderGradientButton
                        sx={{ minWidth: 160 }}
                        disabled={!status}
                    >
                        {status ? 'Claim Now' : 'Claimed'}
                    </BorderGradientButton>
                </Grid>
            </Grid>
        </TokenPoolBox >
    );
}