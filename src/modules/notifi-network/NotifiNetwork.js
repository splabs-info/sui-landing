import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, FormControlLabel, FormGroup, Stack, Switch, TextField, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import CustomModal from 'components/common/CustomModal';
import React from 'react';
import { NotifiNetworkHelper } from './init';

export default function NotifiNetwork({ open, handleClose, data }) {
  const wallet = useWallet();
  const [loading, setLoading] = React.useState(false);
  const notifiAction = NotifiNetworkHelper.useAction();
  const notifiState = NotifiNetworkHelper.useState();
  const { client, currentEmail, alerts, userState, notifications } = notifiState;
  const [userAlerts, setUserAlerts] = React.useState(null);

  React.useEffect(() => {
    if (notifications) {
      console.log(notifications);
    }
  }, [notifications]);

  React.useEffect(() => {
    if (wallet.address) {
      (async () => {
        await notifiAction.init(wallet.address);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.address]);

  React.useEffect(() => {
    if (userState?.status === 'authenticated') {
      (async () => {
        await notifiAction.syncData();
        await notifiAction.getNotifications();
      })();
    }
  }, [userState]);

  React.useEffect(() => {
    if (alerts) {
      setUserAlerts(alerts);
    }
  }, [alerts]);

  const login = async (e) => {
    e.preventDefault();
    await notifiAction.login();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    await notifiAction.updateAlerts(email, userAlerts);
    setLoading(false);
    handleClose();
  };

  return (
    <CustomModal
      _close={handleClose}
      open={open}
      style={{ position: 'relative' }}
      className="container"
      isShowCloseButton={true}
    >
      <Box>
        {userState?.status === 'authenticated' ? (
          <Box component="form" p={2} onSubmit={handleSubmit}>
            <TextField
              label="Email"
              id="email"
              value={currentEmail}
              // onChange={(e) => setCurrentEmail(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            {userAlerts &&
              userAlerts.map((a, index) => (
                <Stack direction={'row'} justifyContent={'space-between'} key={index}>
                  <Typography>{a.name}</Typography>
                  <Switch
                    defaultChecked={a.isOn}
                    onChange={(e) => {
                      const temp = [...alerts];
                      temp[index].isOn = e.target.checked;
                      setUserAlerts(temp);
                    }}
                  />
                </Stack>
              ))}
            <LoadingButton variant="contained" type="submit" loading={loading}>
              Subscribe
            </LoadingButton>
          </Box>
        ) : (
          <Box component="form" onSubmit={login}>
            <Typography>{wallet.address}</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Agree disclaimer" />
            </FormGroup>
            <LoadingButton variant="contained" type="submit">
              Sign
            </LoadingButton>
          </Box>
        )}
      </Box>
    </CustomModal>
  );
}
