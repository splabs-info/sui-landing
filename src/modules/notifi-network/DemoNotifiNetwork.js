import { Box, Container } from '@mui/material';
import { newFrontendClient } from '@notifi-network/notifi-frontend-client';
import { useWallet } from '@suiet/wallet-kit';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import React from 'react';
import { toast } from 'react-toastify';

export default function DemoNotifiNetwork() {
  const wallet = useWallet();
  const connected = wallet.status === 'connected';
  const [userState, setUserState] = React.useState(null);
  const [clientData, setClientData] = React.useState();

  const signMessage = async (message) => {
    console.log(message);
    if (!wallet) {
      throw new Error('Wallet not connected');
    }

    const signature = await wallet.signMessage({
      message,
    });

    const signatureBuffer = Buffer.from(signature.signature);

    console.log(signatureBuffer);

    return signatureBuffer;
  };

  const client = React.useMemo(() => {
    if (wallet && wallet.address) {
      return newFrontendClient({
        account: {
          address: wallet?.address,
          publicKey: wallet?.address,
        },
        tenantId: 'DemoRileyNotifi',
        env: 'Development',
        walletBlockchain: 'SUI',
      });
    }
  }, [wallet.address]);

  console.log(client);

  const initClient = async () => {
    if (!client) {
      toast.error('Client not initialized');
    }
    const newUserState = await client.initialize();
    setUserState(newUserState);
  };

  const login = async () => {
    if (!client || !wallet.address) {
      toast.error('Client or wallet not initialized');
    }
    await client.logIn({
      walletBlockchain: 'SUI',
      signMessage: signMessage,
    });
    setUserState(client.userState);
  };

  const logOut = async () => {
    if (!client) {
      throw new Error('Client not initialized');
    }
    await client.logOut();
    const newUserState = await client.initialize();
    setUserState(newUserState);
  };

  const fetchData = async () => {
    if (!client) {
      throw new Error('Client not initialized');
    }
    if (userState && userState.status === 'authenticated') {
      const data = await client.fetchData();
      setClientData(data);
    }
  };

  return (
    <Page title="Swap">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg6.png')",
        }}
      >
        <Container maxWidth={'xl'}>
          <Box
            sx={{
              marginBottom: '64px',
              marginTop: '24px',
            }}
          >
            <div>
              <h1>Frontend Client Example: SUI</h1>
              {!!!userState && <button onClick={initClient}>initialize FrontendClient</button>}
              {userState?.status === 'loggedOut' || userState?.status === 'expired' ? (
                <button onClick={login}>login</button>
              ) : null}
              {!!userState && userState.status === 'authenticated' ? (
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
                        {/* {clientData[length}{' '} */}
                        {key}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </Box>
        </Container>
      </SectionBox>
    </Page>
  );
}
