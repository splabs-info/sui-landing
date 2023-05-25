import { Coin, Ed25519Keypair, JsonRpcProvider, RawSigner, TransactionBlock, testnetConnection } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { ethers } from 'ethers';
import React from 'react';
const provider = new JsonRpcProvider(testnetConnection);

export const SuiContext = React.createContext({});

export const SUIWalletContext = ({ children }) => {
    const [allObjectsId, setAllObjects] = React.useState();
    const [balances, setBalance] = React.useState();

    const wallet = useWallet();

    const keypair = new Ed25519Keypair();
    const signer = new RawSigner(keypair, provider);
    const tx = new TransactionBlock();

    React.useEffect(() => {
        if (!provider || !wallet.address) return;

        (async () => {
            const objects = await provider.getOwnedObjects({
                owner: wallet?.address,
                options: { showContent: true },
            });
            const allObjectsId = objects.data.filter((obj) => Coin.isSUI(obj));

            const suiBalance = await provider.getBalance({
                owner: wallet?.address,
                options: { showContent: true },
            });

            setBalance(ethers.utils.formatUnits(suiBalance?.totalBalance, 9));
            setAllObjects(allObjectsId);
        })();
    }, [wallet.address, balances]);

    return (
        <SuiContext.Provider
            value={{
                balances,
                provider,
                signer,
                tx,
                keypair,
                allObjectsId,
            }}
        >
            {children}
        </SuiContext.Provider>
    );
};
