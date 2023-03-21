// import { Chain, Client } from '@coin98-com/connect-sdk';
// import { createContext, useContext, useEffect, useState } from 'react';

// export const C98ProviderContext = createContext(null);

// const C98Provider = ({ children }) => {
//     const [coin98Installed, setCoin98Installed] = useState(false);
//     const [coin98Connected, setCoin98Connected] = useState(false);
//     const [account, setAccount] = useState('');
//     const [balance, setBalance] = useState(0);
//     const [client, setClient] = useState(null);

//     const checkCoin98Extension = async () => {
//         const coin98Extension = window.coin98;

//         console.log('coin98Extension', coin98Extension);
//         if (coin98Extension) {
//             setCoin98Installed(true);
//         } else {
//             setCoin98Installed(false);
//         }
//     };

//     useEffect(() => {
//         checkCoin98Extension();
//     }, []);

//     const connectToCoin98 = async () => {
//         const newClient = new Client();

//         try {
//             const result = await newClient.connect(Chain.matic, {
//                 logo: 'Dapps Logo URL',
//                 name: 'Dapps Name',
//                 url: 'https://yousui.io/',
//             });

//             console.log('result', result);
//             setCoin98Connected(true);
//             const currentAccount = await newClient.getAccount();
//             setAccount(currentAccount);
//             const currentBalance = await newClient.getBalanceOfAccount();
//             setBalance(currentBalance);
//         } catch (error) {
//             console.log('error', error);
//             setCoin98Connected(false);
//         }
//     };

//     const disconnectFromCoin98 = async () => {
//         if (client) {
//             await client.disconnect();
//             setClient(null);
//             setCoin98Connected(false);
//             setAccount('');
//             setBalance(0);
//         }
//     };

//     const sendTransaction = async (tx) => {
//         try {
//             const txHash = await client.sendTransaction(tx);
//             console.log(txHash);
//             return txHash;
//         } catch (error) {
//             console.log(error);
//             return null;
//         }
//     };

//     const signMessage = async (message) => {
//         try {
//             const signature = await client.signMessage(message);
//             console.log(signature);
//             return signature;
//         } catch (error) {
//             console.log(error);
//             return null;
//         }
//     };

//     const contextValue = {
//         coin98Installed,
//         coin98Connected,
//         account,
//         balance,
//         connectToCoin98,
//         disconnectFromCoin98,
//         sendTransaction,
//         signMessage,
//     };

//     return <C98ProviderContext.Provider value={contextValue}>{children}</C98ProviderContext.Provider>;
// };

// const useC98Provider = () => {
//     const context = useContext(C98ProviderContext);
//     if (!context) {
//         throw new Error('useProvider must be used within a Provider');
//     }
//     return context;
// };

// export { C98Provider, useC98Provider };
export { }