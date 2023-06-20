import { NotifiContext, NotifiSubscriptionCard } from '@notifi-network/notifi-react-card';
import { useWallet } from '@suiet/wallet-kit';
import { EthosConnectStatus, SignInButton } from 'ethos-connect';

export const SuiNotifiCard = () => {
  const { status, wallet } = useWallet();

  const signMessage = async (message) => {
    if (!wallet) {
      throw new Error('Wallet not connected');
    }

    const signature = await wallet.signMessage({
      message,
    });

    const signatureBuffer = Buffer.from(signature.signature);
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
    <div className="container">
      <h1>Notifi Card: Sui</h1>
      {status === EthosConnectStatus.Connected && wallet ? (
        <NotifiContext
          dappAddress="2e0dba2a3ecb46e6b7c0da951b0b9add"
          walletBlockchain="SUI"
          // keep this "Production" unless you have a special Development environment set up by Notifi
          env="Production"
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
            cardId="< YOUR OWN CARD ID HERE >"
            onClose={() => alert('nope you must stay')}
          />
        </NotifiContext>
      ) : (
        <SignInButton>CONNECT SUI WALLET</SignInButton>
      )}
    </div>
  );
};
