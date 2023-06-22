import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomSlider from 'components/common/CustomSlider';
import useResponsive from 'hooks/useResponsive';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const PreviousINOBox = styled(Box)(({ theme }) => ({
    p: '1px',
    border: '1px solid #42EECF',
    background: 'linear-gradient(323.96deg, #5394CF 0%, #8CE9C7 89.18%)',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
    },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    background: '#142436',
    borderRadius: '10px',
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '16px',
    '& .avatar-ino-previous': {
        width: '40%',
        borderRadius: '10px',
        boxShadow: '0px 0px 15.0429px rgba(159, 241, 236, 0.5), inset 1.50429px 2.25643px 7.52145px rgba(0, 0, 0, 0.3)',
    },
    '& .content-ino-previous': {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: '24px',
        '& .avatar-ino-previous': {
            width: '100%',
        },
        '& .content-ino-previous': {
            width: '100%',
        },
    },
}));

const ReleaseBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 40,
    '& .MuiTypography-root': {
        borderRadius: '50px',
        background: 'linear-gradient(178.73deg, rgba(204, 204, 204, 0.3) -8.02%, rgba(255, 255, 255, 0.3) 98.69%)',
        border: '1px solid #e4e4e4',
        padding: '6px 32px',
        '&:hover': {
            background: 'linear-gradient(98.21deg, #68E6B8 -9.15%, #6D85DA 102.32%)'
        },
        '&.active': {
            background: 'linear-gradient(98.21deg, #68E6B8 -9.15%, #6D85DA 102.32%)'
        },
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: 0,
    },
}));

export const PreviousCard = ({ avatar, releaseTime, endTime, hardCap, access, title, status, link, ...props }) => {
    const navigate = useNavigate();
    const isMobile = useResponsive('down', 'sm');
    return (
        <Box mx={isMobile ? 3 : 0}>
            <PreviousINOBox
                sx={{ cursor: link && 'pointer' }}
                onClick={() => {
                    if (link)
                        navigate(link)
                }}>
                <ContentBox>
                    <Box component={'img'} src={avatar} alt={title} className='avatar-ino-previous' />
                    <Box className='content-ino-previous'>
                        <Typography variant="h4" fontWeight={700}>
                            {title}
                        </Typography>
                        <Typography>
                            HardCap: <span style={{ color: '#00C5D3', fontWeight: 700 }}> {hardCap}</span>
                        </Typography>

                        {access !== '' &&
                            <Typography>
                                Access: <span style={{ color: '#00C5D3', fontWeight: 700 }}>{access}</span>
                            </Typography>
                        }
                        {releaseTime &&
                            <ReleaseBox>
                                <Typography fontWeight={700} variant={'body2'}
                                    className={status && !moment().isAfter(endTime) ? 'active' : ''}>
                                    {moment().isAfter(endTime) ? 'SOLD OUT' : releaseTime}
                                </Typography>
                            </ReleaseBox>
                        }
                    </Box>
                </ContentBox>
                <Box p={3} />
            </PreviousINOBox>
            <Box mt={3}>
                <CustomSlider
                    color="linear-gradient(10deg, rgba(91, 210, 218, 0.8) 17.27%, rgba(128, 255, 217, 0.8) 59.07%, rgba(255, 255, 255, 0.8) 100%)"
                    disabledBorder={isMobile ? false : true}
                    disabledMark={true}
                    value={Number(100)}
                    max={Number(100)}
                    height={12}
                    sx={{
                        border: '2px solid #B9E3E7',
                        boxShadow: isMobile ? '0 0 7px 2px rgb(255,255,255,0.5)' : '0 0 10px 2px rgb(255,255,255,0.7)',
                    }}
                    title={
                        <Stack direction="row" justifyContent="space-between" mb={0.5}>
                            <Typography variant="body2">Progress</Typography>
                            <Typography variant="body2">Total: {hardCap}</Typography>
                        </Stack>
                    }
                />
                <Stack direction="row" justifyContent="space-between" mt={0.5}>
                    <Typography variant="body2">100%</Typography>
                    <Typography variant="body2">{hardCap} / {hardCap} NFT</Typography>
                </Stack>
            </Box>
        </Box>
    );
};
