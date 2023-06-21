
import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import { BorderGradientButton } from 'components/common/CustomButton';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';

const AvatarBox = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    boxShadow: '0px 0px 15.0429px rgba(159, 241, 236, 0.5), inset 1.50429px 2.25643px 7.52145px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('sm')]: {
    },
}));
const ReleaseBox = styled(Box)(({ theme }) => ({
    borderRadius: '20px',
    background: 'linear-gradient(98.21deg, rgba(104, 230, 184, 0.1) -9.15%, rgba(109, 133, 218, 0.1) 102.32%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '12px 24px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '24px',
    [theme.breakpoints.down('sm')]: {
    },
}));
export const OnGoingCard = ({ avatar, releaseTime, endTime, hardCap, access, title, status, link, ...props }) => {
    const navigate = useNavigate();
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box
            sx={{
                background: 'linear-gradient(323.96deg, rgba(45, 126, 200, 0.1) 0%, rgba(181, 255, 211, 0.1) 89.18%)',
                boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(25px)',
                borderRadius: isMobile ? '10px' : '15px',
                padding: '32px',
                mt: isMobile ? 5 : 7,
            }}
        >
            <Grid container alignItems={'center'} spacing={4}>
                <Grid
                    item
                    md={5}
                    xs={12}
                >
                    <AvatarBox component={'img'} src={avatar} alt={title} />
                </Grid>
                <Grid item md={7} xs={12} >
                    <Typography variant='h3' mb={2}>
                        {title}
                    </Typography>

                    <ProcessBarBox
                        title={
                            <>
                                <Typography>Progress</Typography>
                                <Typography>Total: {hardCap} </Typography>
                            </>
                        }
                        subtitle={
                            <>
                                <Typography>0%</Typography>
                                <Typography>0/{hardCap}</Typography>
                            </>
                        }
                        percent={0}
                        //   percent={minted / total ? (minted / total) * 100 : 0}
                        sx={{ margin: isMobile ? '24px 0px' : '0px' }}
                    />
                    <Stack spacing={1.5} direction={isMobile ? 'column' : 'row'}
                        justifyContent={'space-between'}
                        sx={{ marginTop: isMobile ? '24px' : '24px' }}
                    >
                        <ReleaseBox>
                            <Typography >
                                Start at:
                            </Typography>
                            <Typography fontWeight={700}>
                                {releaseTime}
                            </Typography>
                        </ReleaseBox>
                        <BorderGradientButton onClick={() => navigate(link)} className='animated-bg'>
                            JOIN NOW
                        </BorderGradientButton>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};
