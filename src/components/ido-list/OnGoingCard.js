import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import { BorderGradientButton } from 'components/common/CustomButton';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import { IDOEndTimeCountdown } from 'components/countdown/IDOEndTimeCountdown';
import useResponsive from 'hooks/useResponsive';
import { useNavigate } from 'react-router-dom';
import { formatAmount, formatNumberWithDecimal } from 'setting/format';

const AvatarBox = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    boxShadow: '0px 0px 15.0429px rgba(159, 241, 236, 0.5), inset 1.50429px 2.25643px 7.52145px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('sm')]: {},
}));
const ReleaseBox = styled(Box)(({ theme }) => ({
    borderRadius: '12px',
    background: 'rgba(29, 245, 255, 0.10)',
    padding: '6px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    [theme.breakpoints.down('sm')]: {
        padding: '12px 24px',
    },
}));
export const OnGoingCard = ({
    avatar,
    endTime,
    title,
    link,
    total,
    participants,
    sold,
    token,
    ...props
}) => {
    const navigate = useNavigate();
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box
            sx={{
                background: 'linear-gradient(323.96deg, rgba(45, 126, 200, 0.1) 0%, rgba(181, 255, 211, 0.1) 89.18%)',
                boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(25px)',
                borderRadius: isMobile ? '10px' : '15px',
                padding: '24px',
            }}
        >
            <Grid container alignItems={'center'} spacing={4}>
                <Grid item md={4} xs={12}>
                    <AvatarBox component={'img'} src={avatar} alt={title} />
                </Grid>
                <Grid item md={8} xs={12}>
                    <Typography variant="h5" mb={1}>
                        {title}
                    </Typography>

                    <ProcessBarBox
                        title={
                            <>
                                <Typography variant="body2">Progress</Typography>
                                <Typography variant="body2">Participants: {participants} </Typography>
                            </>
                        }
                        subtitle={
                            <>
                                <Typography variant="body2">{formatNumberWithDecimal((sold / total) * 100, 2)}%</Typography>
                                <Typography variant="body2">
                                    {formatAmount(sold)}/{formatAmount(total)}
                                </Typography>
                            </>
                        }
                        percent={sold / total ? (sold / total) * 100 : 0}
                        sx={{ margin: isMobile ? '24px 0px' : '0px' }}
                    />
                    <Stack
                        spacing={1.5}
                        direction={isMobile ? 'column' : 'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        sx={{ marginTop: '20px' }}
                    >
                        <ReleaseBox>
                            <Typography
                                fontWeight={600}
                                variant="body2"
                                sx={{
                                    color: 'white',
                                    display: 'initial',
                                    background: 'linear-gradient(270deg, #03EDFE 0%, #29FFD9 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {' '}
                                EndTime
                            </Typography>
                            <IDOEndTimeCountdown endTime={endTime} />
                        </ReleaseBox>
                        <BorderGradientButton onClick={() => navigate(link)} className="animated-bg">
                            JOIN NOW
                        </BorderGradientButton>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};
