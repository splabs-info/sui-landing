import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import Countdown from 'react-countdown';
import { _formatUtcUnix } from '../../setting/format';

const CountdownStack = styled(Stack)(({ theme }) => ({
  width: '64px',
  height: '56px',
  color: '#fff',
  borderRadius: '10px',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#00112C',
  '& .MuiTypography-body1': {
    margin: '0!important',
    textShadow: '0px 0px 4.56352px rgba(255, 255, 255, 0.5)',
    fontWeight: 900,
    fontSize: '1.35rem',
  },
  '& .MuiTypography-caption': {
    marginTop: '-6px',
    color: 'white',
    display: 'initial',
    background: 'linear-gradient(90deg, rgb(129,236,197,0.9) 0%, rgb(148,203,255,0.9) 50%,rgb(133,150,255,0.9) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  [theme.breakpoints.down('sm')]: {
    width: '50px',
    height: '50px',
    '& .MuiTypography-body1': {
      fontSize: '0.875rem',
    },
  }
}));

export const IDOCountdown = ({ endTime, _handleComplete }) => {
  const now = moment().unix();
  const end = _formatUtcUnix(endTime);

  let countdownComponent = null;
  countdownComponent = (
    <Countdown
      date={(now + (end - now)) * 1000}
      renderer={(props) => countDownRenderer(props)}
      onComplete={_handleComplete}
    />
  );
  return (
    <Box display="flex">
      {countdownComponent}
    </Box>
  );
};

const countDownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return '';
  } else {
    return (
      <Stack direction="row" spacing={1} mt={1}>
        <CountdownStack>
          <Typography variant='body1'>
            {days < 10 ? '0' : ''}
            {days}
          </Typography>
          <Typography variant='caption'>
            days
          </Typography>
        </CountdownStack>
        <CountdownStack>
          <Typography variant='body1'>
            {hours < 10 ? '0' : ''}
            {hours}
          </Typography>
          <Typography variant='caption'>
            hours
          </Typography>
        </CountdownStack>

        <CountdownStack>
          <Typography variant='body1'>
            {minutes < 10 ? '0' : ''}
            {minutes}
          </Typography>
          <Typography variant='caption'>
            min
          </Typography>
        </CountdownStack>
        <CountdownStack>
          <Typography variant='body1'>
            {seconds < 10 ? '0' : ''}
            {seconds}
          </Typography>
          <Typography variant='caption'>
            sec
          </Typography>
        </CountdownStack>
      </Stack>
    );
  }
};
