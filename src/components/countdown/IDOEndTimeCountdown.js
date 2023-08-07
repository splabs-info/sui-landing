import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import Countdown from 'react-countdown';
import { _formatUtcUnix } from '../../setting/format';
import React from 'react';
const CountdownStack = styled(Stack)(({ theme }) => ({
  width: '52px',
  height: '44px',
  color: '#fff',
  borderRadius: '10px',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.30)',
  '& .MuiTypography-body1': {
    margin: '0!important',
    textShadow: '0px 0px 4.56352px rgba(255, 255, 255, 0.5)',
    fontWeight: 900,
    fontSize: '18px',
  },
  '& .MuiTypography-caption': {
    marginTop: '-6px',
    color: 'white',
    display: 'initial',
    background: 'linear-gradient(309deg, #2D7EC8 0%, #B5FFD3 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  [theme.breakpoints.down('sm')]: {
    width: '50px',
    height: '50px',
    '& .MuiTypography-body1': {
      fontSize: '0.875rem',
    },
  },
}));

export const IDOEndTimeCountdown = ({ endTime, _handleComplete }) => {


  const now = moment().unix();
  const end = _formatUtcUnix(endTime);


  const render = React.useCallback(({days, hours, minutes, seconds, completed}) => {
    const hoursDay = Number(days) * 24 + Number(hours);
  
    if (completed) {
      return '';
    } else {
      return (
        <Stack direction="row" spacing={1}>
          <CountdownStack>
            <Typography variant="body1">
              {hoursDay < 10 ? '0' : ''}
              {hoursDay}
            </Typography>
            <Typography variant="caption">hours</Typography>
          </CountdownStack>
          <CountdownStack>
            <Typography variant="body1">
              {minutes < 10 ? '0' : ''}
              {minutes}
            </Typography>
            <Typography variant="caption">mins</Typography>
          </CountdownStack>
          <CountdownStack>
            <Typography variant="body1">
              {seconds < 10 ? '0' : ''}
              {seconds}
            </Typography>
            <Typography variant="caption">secs</Typography>
          </CountdownStack>
        </Stack>
      );
    }
  }, [])

  const renderCountDown = React.useCallback(() => {
    return (
      <Countdown
        date={(now + (end - now)) * 1000}
        renderer={(props) => render(props)}
        onComplete={_handleComplete}
      />
    );
  }, [_handleComplete, end, now, render])
  // let countdownComponent = null;
  // countdownComponent = (
  //   <Countdown
  //     date={(now + (end - now)) * 1000}
  //     renderer={(props) => {
  //       return countDownRenderer(props)
  //     }}
  //     onComplete={_handleComplete}
  //   />
  // );
  return <Box display="flex">{renderCountDown()}</Box>;
};

const countDownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  const hoursDay = Number(days) * 24 + Number(hours);
  
  if (completed) {
    return '';
  } else {
    return (
      <Stack direction="row" spacing={1}>
        <CountdownStack>
          <Typography variant="body1">
            {hoursDay < 10 ? '0' : ''}
            {hoursDay}
          </Typography>
          <Typography variant="caption">hours</Typography>
        </CountdownStack>
        <CountdownStack>
          <Typography variant="body1">
            {minutes < 10 ? '0' : ''}
            {minutes}
          </Typography>
          <Typography variant="caption">mins</Typography>
        </CountdownStack>
        <CountdownStack>
          <Typography variant="body1">
            {seconds < 10 ? '0' : ''}
            {seconds}
          </Typography>
          <Typography variant="caption">secs</Typography>
        </CountdownStack>
      </Stack>
    );
  }
};
