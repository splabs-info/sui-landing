import { Box, IconButton, Menu, MenuItem, Popover, Stack, Typography, styled } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { useState } from 'react';
import { NotifiNetworkHelper } from './init';

const NotifiBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 24px',
  borderRadius: '15px',
  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) -16.33%, rgba(0, 67, 71, 0.5) 93.92%)',
  position: 'relative',
  boxShadow: 'inset 0px 0px 15px rgba(255, 255, 255, 0.3), inset 0px 0px 20.203px rgba(185, 247, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  maxWidth: '350px',
  "&:before": {
    content: '""',
    position: 'absolute',
    width: '100%',
    background: 'linear-gradient(0deg, #00C5D3 0%, #42EECF 94.62%)',
    borderRadius: '15px',
    inset: '0px',
    padding: '1px',
    WebkitMask:
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    WebkitMaskComposite: 'xor',
    zIndex: 0,
  },
  '& div, span': {
    zIndex: 1,
  },
}))
const histories = [
  {
    title: 'Title 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '12/12/2021',
    status: true,
  },
  {
    title: 'Title 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '12/12/2021',
    status: true,
  },
  {
    title: 'Title 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '12/12/2021',
    status: true,
  },
  {
    title: 'Title 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '12/12/2021',
    status: true,
  },
]
export default function NotifiHistory() {
  // const wallet = useWallet();
  // const notifiAction = NotifiNetworkHelper.useAction();
  // const notifiState = NotifiNetworkHelper.useState();
  // const { notifications } = notifiState;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // useEffect(() => {
  //   if (!wallet.address) {
  //     throw new Error('Wallet not connected');
  //   } else {
  //     (async () => {
  //       await notifiAction.syncData();
  //       await notifiAction.getNotifications();
  //     })();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [wallet.address])
  // console.log('notifications', notifications);
  return (
    <Box>
      <IconButton sx={{ width: "48px", height: "48px" }} onClick={handleClick}>
        {anchorEl !== null ?
          <img src="/images/icon/icon-bell-active.png"
            alt="icon-bell" /> :
          <img src="/images/icon/icon-bell.png"
            alt="icon-bell" />
        }
      </IconButton>
      <Popover
        id='simple-popover'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '15px',
          },
        }}
      >
        <NotifiBox>
          <Typography variant='h5' sx={{ p: 2 }}>Notifications</Typography>
          {histories.map((item, index) => (
            <Box key={index}>
              <Stack flexDirection={'row'} gap={2} justifyContent={'space-between'}>
                <Typography >{item.title}</Typography>
                <Typography >{item.date}</Typography>
              </Stack>
              <Stack flexDirection={'row'} gap={2} justifyContent={'space-between'}>
                <Typography sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  '-webkit-line-clamp': '2',
                  '-webkit-box-orient': 'vertical',
                  maxHeight: '50px',
                }}>{item.description}</Typography>
                <Typography >{item.status}</Typography>
              </Stack>

            </Box>
          ))}
        </NotifiBox>
      </Popover>
    </Box>
  );
}
