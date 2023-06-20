import { Container, Paper } from '@mui/material';
import { NotifiContext, NotifiSubscriptionCard } from '@notifi-network/notifi-react-card';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';

export const SuiNotifiCard = () => {
  const wallet = useWallet();

  const signMessage = async (message) => {
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

  const inputLabels = {
    label: {
      email: 'Email',
      sms: 'Text Message',
      telegram: 'Telegram',
    },
    placeholderText: {
      email: 'Email',
    },
  };

  const inputSeparators = {
    smsSeparator: {
      content: '',
    },
    emailSeparator: {
      content: '',
    },
  };

  return (
    <Page title="Swap">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg6.png')",
        }}
      >
        <Container maxWidth={'xl'}>
          <Paper
            sx={{
              marginBottom: '64px',
              marginTop: '24px',
            }}
          >
            <div style={{ position: 'relative' }} className="container">
              <h1>Notifi Card: Sui</h1>
              {wallet.address ? (
                <NotifiContext
                  dappAddress="demorileynotifi"
                  walletBlockchain="SUI"
                  env="Development"
                  accountAddress={wallet.address}
                  walletPublicKey={wallet.address}
                  signMessage={signMessage}
                >
                  Connected SUI Wallet: <br /> {wallet?.address}
                  <button onClick={wallet.disconnect}> DISCONNECT</button>
                  <NotifiSubscriptionCard
                    darkMode
                    inputs={{ userWallet: wallet.address }}
                    inputLabels={inputLabels}
                    inputSeparators={inputSeparators}
                    cardId="2e0dba2a3ecb46e6b7c0da951b0b9add"
                    onClose={() => alert('nope you must stay')}
                  />
                </NotifiContext>
              ) : (
                <ConnectButton>CONNECT SUI WALLET</ConnectButton>
              )}
            </div>
          </Paper>
        </Container>
      </SectionBox>
    </Page>
  );
};
