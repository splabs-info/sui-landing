import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import Countdown from 'react-countdown';
import { _formatUtcUnix } from '../../setting/format';

const CountdownStack = styled(Stack)(({ theme }) => ({
  width: '70px',
  height: '60px',
  color: '#fff',
  borderRadius: '10px',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.25) -8.02%, rgba(109, 133, 218, 0.25) 98.69%)',
  boxShadow: 'inset 0px 0px 4.56352px rgba(0, 0, 0, 0.3)',
  '&::before': {
    content: "''",
    position: 'absolute',
    inset: '0px',
    borderRadius: '10px',
    padding: ' 1px',
    background: 'linear-gradient(0deg, #00C5D3, #42EECF)',
    WebkitMask:
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    WebkitMaskComposite: 'xor',
    zIndex: '1',
  },
  '& .MuiTypography-body1': {
    margin: '0!important',
    textShadow: '0px 0px 4.56352px rgba(255, 255, 255, 0.5)',
    fontWeight: 700,
    fontSize: '1.25rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: '50px',
    height: '50px',
    '& .MuiTypography-body1': {
      fontSize: '0.875rem',
    },
  }
}));

export const MintingCountdown = ({ endTime, _handleComplete }) => {
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
      <Stack direction="row" spacing={2} mt={1}>
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
