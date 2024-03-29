import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IDOCountdown } from 'components/countdown/IDOCountdown';
import { useNavigate } from 'react-router-dom';
import { isArray, toNumber } from 'lodash';
import * as moment from 'moment'
const UpComingIDOBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(128.67deg, rgba(104, 230, 184, 0.15) 10.81%, rgba(109, 133, 218, 0.15) 75.48%)',
    borderRadius: '20px',
    boxShadow: 'inset 0px 0px 15.0429px rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(15px)',
    padding: 24,
    width: 'min(350px,100%)',
    '&.active': {
        background: 'linear-gradient(128.67deg, rgba(104, 230, 184, 0.35) 10.81%, rgba(109, 133, 218, 0.35) 75.48%)',

        boxShadow: 'inset 0px 0px 15.0429px rgba(255, 255, 255, 0.3), 0px 0px 10px rgba(255, 255, 255, 0.4)',
    },
    [theme.breakpoints.down('sm')]: {},
}));

const AvatarBox = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    boxShadow: '0px 0px 15.0429px rgba(159, 241, 236, 0.5), inset 1.50429px 2.25643px 7.52145px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('sm')]: {},
}));

const InfoBox = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    background: '#0C1B27',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    textAlign: 'center',
    width: '32%',
    minHeight: '64px',
    fontSize: 11,
    '& p:first-of-type': { fontWeight: 'bold' },
    [theme.breakpoints.down('sm')]: {},
}));
const ReleaseBox = styled(Box)(({ theme }) => ({
    borderRadius: '50px',
    background: 'linear-gradient(178.73deg, rgba(204, 204, 204, 0.3) -8.02%, rgba(255, 255, 255, 0.3) 98.69%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #e4e4e4',
    padding: '12px 16px',
    margin: '24px 8px 16px',
    '&:hover': {
        background: 'linear-gradient(98.21deg, #68E6B8 -9.15%, #6D85DA 102.32%)',
    },
    '&.active': {
        background: 'linear-gradient(98.21deg, #68E6B8 -9.15%, #6D85DA 102.32%)',
    },
    [theme.breakpoints.down('sm')]: {},
}));

const CountDownBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: -52,
    top: -20,
    transform: 'scale(0.6)',
    [theme.breakpoints.down('sm')]: {
        right: -32,
        top: -20,
        transform: 'scale(0.7)',
    },
}));

export const UpComingIDOCard = ({
    avatar,
    releaseTime,
    title,
    description,
    status,
    startTime,
    link,
    startAt,
    salePeriod,
    roundName,
    imageUrl,
    ...props
}) => {
    const navigate = useNavigate();
    return (
        <UpComingIDOBox
            className={status ? 'active' : ''}
            sx={{ cursor: link && 'pointer' }}
            onClick={() => {
                if (link) navigate(link);
            }}
        >
            <Box>
                <AvatarBox component={'img'} src={avatar ? avatar : imageUrl} alt={title} />
            </Box>
            <Box position={'relative'}>
                <Typography mt={3} sx={{ fontSize: 22, fontWeight: 'bold' }}>
                    {title}
                </Typography>
                {roundName ? <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>{roundName}</Typography> : ''}
                {startAt && (
                    <CountDownBox>
                        <IDOCountdown endTime={startTime} />
                    </CountDownBox>
                )}
            </Box>
            {salePeriod && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography> Sale period: </Typography>
                    <Typography sx={{ color: '#00C5D3', fontWeight: 700 }}> {salePeriod}</Typography>
                </Box>
            )}
            {startAt && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography> Start at:</Typography>
                    <Typography sx={{ color: '#00C5D3', fontWeight: 700 }}>{startAt}</Typography>
                </Box>
            )}
            <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5, mt: 2 }}>
                {isArray(description) && <>
                    {description?.map((item, index) => (
                        <InfoBox key={index}>{item}</InfoBox>
                    ))}
                </>}

            </Stack>
            <ReleaseBox className={status ? 'active' : ''}>
                <Typography fontWeight={700} variant={'body2'}>
                    {releaseTime}
                </Typography>
            </ReleaseBox>
        </UpComingIDOBox>
    );
};
