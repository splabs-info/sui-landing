import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import Countdown from 'react-countdown';
import { _formatUtcUnix } from 'setting/format';


export const PoolCountdown = ({ endTime, _handleComplete }) => {
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
      <Stack minWidth={'165px'}>
        <Typography variant='body2'>
          {days < 10 ? '0' : ''}
          {days}<b> D</b> : {hours < 10 ? '0' : ''}
          {hours}<b>  H</b> : {minutes < 10 ? '0' : ''}
          {minutes}<b>  M</b> : {seconds < 10 ? '0' : ''}
          {seconds} <b> S</b>
        </Typography>
      </Stack>
    );
  }
};
