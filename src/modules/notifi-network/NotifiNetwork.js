import { Box, Button, Paper, Typography } from '@mui/material';
import { newFrontendClient } from '@notifi-network/notifi-frontend-client';
import { useWallet } from '@suiet/wallet-kit';
import CustomModal from 'components/common/CustomModal';
import moment from 'moment';
import React from 'react';
import { toast } from 'react-toastify';

export default function NotifiNetwork({ open, handleClose, data }) {
  const wallet = useWallet();
  const connected = wallet.status === 'connected';
  const [userState, setUserState] = React.useState(null);
  const [clientData, setClientData] = React.useState();
  const [notifications, setNotifications] = React.useState(null);
  const [alerts, setAlerts] = React.useState(null);

  const client = React.useMemo(() => {
    if (wallet.address) {
      return newFrontendClient({
        account: {
          address: wallet.address,
          publicKey: wallet.address,
        },
        tenantId: 'demorileynotifi',
        env: 'Development',
        walletBlockchain: 'SUI',
      });
    }
  }, [wallet.address]);

  const logOut = async () => {
    if (!client) {
      toast.error('Client not initialized');
    }
    await client.logOut();
    const newUserState = await client.initialize();
    setUserState(newUserState);
  };

  const syncData = async () => {
    const clientData = await client.fetchData();
    setClientData(clientData);
  };

  React.useEffect(() => {
    const signMessage = async (message) => {
      const signature = await wallet.signMessage({
        message,
      });
      const signatureBuffer = Buffer.from(signature.signature);
      return signatureBuffer;
    };
    if (client && open) {
      (async () => {
        try {
          const newUserState = await client.initialize();
          if (newUserState.status !== 'authenticated') {
            await client.logIn({
              walletBlockchain: 'SUI',
              signMessage: signMessage,
            });
          }
          setUserState(client.userState);
          const clientData = await client.fetchData();
          setClientData(clientData);
          const subscriptionCardConfig = await client.fetchSubscriptionCard({
            id: '4c60bbecb1b24e38917d8d25c26f74ee',
            type: 'SUBSCRIPTION_CARD',
          });
          setAlerts(subscriptionCardConfig.eventTypes);
          await syncData();
          const history = await getNotificationHistory();
          console.log(history);
          setNotifications(history);
        } catch (error) {
          toast.error(error.toString());
        }
      })();
    }
  }, [client, open, wallet]);

  const subscribeAlert = async (alert) => {
    try {
      await client.ensureAlert({
        eventType: alert,
        inputs: {},
      });
      toast.success('Success');
      await syncData();
    } catch (error) {
      console.log(error);
      toast.error('Error');
    }
  };

  const handleDeleteAlert = async (id) => {
    try {
      await client.deleteAlert({
        id,
      });
      toast.success('Success');
      await syncData();
    } catch (e) {
      console.log(e);
      toast.error('Error');
    }
  };

  const getNotificationHistory = async (first = 0, after = 1) => {
    // Fetch `first` items after the `after` cursor (leave undefined for first page)
    const { nodes, pageInfo } = await client.getNotificationHistory({});

    nodes.forEach((item) => {
      if (item.detail?.__typename === 'BroadcastMessageEventDetails') {
        console.log('I have a broadcast message', item.detail?.subject, item.detail?.message);
      }
    });

    console.log('pageInfo', pageInfo.hasNextPage, pageInfo.endCursor);

    return {
      nodes,
      pageInfo,
    };
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
        <Typography>Notifications</Typography>
        {alerts &&
          alerts.map((a) => (
            <Box>
              {a.name} ~ {a.broadcastId.value} <Button onClick={() => subscribeAlert(a)}>Add</Button>
            </Box>
          ))}

        {clientData &&
          clientData.alert.map((a) => (
            <Box>
              {a.name} ~ {a.id} <Button onClick={() => handleDeleteAlert(a.id)}>Delete</Button>
            </Box>
          ))}
        {notifications &&
          notifications.map((n) => (
            <Paper sx={{ p: 1, mb: 1 }}>
              <Typography textAlign={'left'} mb={1}>
                {n.detail?.subject}
              </Typography>
              <Typography textAlign={'left'}>{n.detail?.message}</Typography>
              <Typography textAlign={'right'}>{moment(n.createdDate).format('YYYY-MM-DD HH:mm:ss')}</Typography>
            </Paper>
          ))}
      </Box>
      {connected ? (
        <div>
          {/* <h1>Frontend Client Example: SUI</h1> */}
          {/* {userState?.status === 'loggedOut' || userState?.status === 'expired' ? (
            <button onClick={login}>login</button>
          ) : null} */}
          {/* {!!userState && userState.status === 'authenticated' ? (
            <>
              <button onClick={fetchData}>fetch client data</button>
              <button onClick={logOut}>logout</button>
            </>
          ) : null}
          <h2>User State: {userState?.status}</h2>
          {!!clientData && userState?.status === 'authenticated' && (
            <>
              <h2>Client Data: The logged in user has</h2>
              {Object.keys(clientData).map((key, id) => {
                return (
                  <div key={id}>
                    {clientData[key]?.length} {key}
                  </div>
                );
              })}
            </>
          )} */}
        </div>
      ) : null}
    </CustomModal>
  );
}
