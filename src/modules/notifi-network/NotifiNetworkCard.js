// import { NotifiContext, NotifiSubscriptionCard } from '@notifi-network/notifi-react-card';
// import '@notifi-network/notifi-react-card/dist/index.css';
// import { ConnectButton, useWallet } from '@suiet/wallet-kit';
// import CustomModal from 'components/common/CustomModal';

// export default function NotifiNetwork({ open, handleClose, data }) {
//   const wallet = useWallet();

//   const signMessage = async (message) => {
//     if (!wallet) {
//       throw new Error('Wallet not connected');
//     }

//     const signature = await wallet.signMessage({
//       message,
//     });

//     const signatureBuffer = Buffer.from(signature.signature);

//     console.log(signatureBuffer);

//     return signatureBuffer;
//   };

//   const inputLabels = {
//     label: {
//       email: 'Email',
//       sms: 'Text Message',
//       telegram: 'Telegram',
//     },
//     placeholderText: {
//       email: 'Email',
//     },
//   };

//   const inputSeparators = {
//     smsSeparator: {
//       content: '',
//     },
//     emailSeparator: {
//       content: '',
//     },
//   };

//   console.log('odnqwoidjoi');

//   return (
//     <CustomModal _close={handleClose} open={open} isShowCloseButton={true}>
//       <div className="container">
//         <NotifiContext
//           dappAddress="demorileynotifi"
//           walletBlockchain="SUI"
//           env="Development"
//           accountAddress={wallet.address}
//           walletPublicKey={wallet.address}
//           signMessage={signMessage}
//         >
//           <NotifiSubscriptionCard
//             darkMode
//             inputs={{ userWallet: wallet.address }}
//             inputLabels={inputLabels}
//             inputSeparators={inputSeparators}
//             cardId="2e0dba2a3ecb46e6b7c0da951b0b9add"
//             onClose={() => alert('nope you must stay')}
//           />
//         </NotifiContext>
//       </div>
//     </CustomModal>
//   );
// }

import { NotifiContext, NotifiSubscriptionCard } from '@notifi-network/notifi-react-card';
import '@notifi-network/notifi-react-card/dist/index.css';
import { useWallet } from '@suiet/wallet-kit';

export default function NotifiNetwork({ open, handleClose, data }) {
  const wallet = useWallet();

  const signMessage = async (message) => {
    if (!wallet.address) {
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
    <div className="container" style={{ position: 'relative' }}>
      <h1>Notifi Card: Sui</h1>
      {wallet ? (
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
            cardId="57609687cd0d4063bd0318a51cd16e42"
            onClose={() => alert('nope you must stay')}
          />
        </NotifiContext>
      ) : null}
    </div>
  );
}
