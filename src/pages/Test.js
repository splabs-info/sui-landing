import { SuiWallet, SuietWallet, WalletProvider, useWallet } from '@suiet/wallet-kit';
import React from 'react';

const TestPage = () => {
    const wallet = useWallet();

    console.log('wallet__', wallet);
    React.useEffect(() => {
        if (!wallet.connected) return;
        console.log('connected wallet name: ', wallet.name);
        console.log('account address: ', wallet.account?.address);
        console.log('account publicKey: ', wallet.account?.publicKey);
    }, [wallet.connected]);

    // async function handleMoveCall() {
    //     const tx = new TransactionBlock();
    //     const packageObjectId = '0x1';
    //     tx.moveCall({
    //         target: `${packageObjectId}::nft::mint`,
    //         arguments: [tx.pure('Example NFT')],
    //     });
    //     await wallet.signAndExecuteTransactionBlock({
    //         transactionBlock: tx,
    //     });
    // }

    // // launch a move call for the connected account via wallet
    // async function handleSignMessage() {
    //     await wallet.signMessage({
    //         message: new TextEncoder().encode('Hello World'),
    //     });
    // }

    return <WalletProvider defaultWallets={[SuiWallet, SuietWallet]}>abc</WalletProvider>;
};
export default TestPage;
