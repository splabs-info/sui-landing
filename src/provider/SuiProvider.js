import { Coin, Ed25519Keypair, JsonRpcProvider, RawSigner, testnetConnection, mainnetConnection } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { ethers } from 'ethers';
import React from 'react';
import { toast } from 'react-toastify';
import { TXUI_PROJECT, TXUI_PROJECT_STORAGE } from 'constant/sui-chain'
const provider = new JsonRpcProvider(testnetConnection);


export const SuiContext = React.createContext({});

export const SUIWalletContext = ({ children }) => {
    const [allCoinObjectsId, setAllObjects] = React.useState();
    const [balances, setBalance] = React.useState();
    const [assets, setAssets] = React.useState();
    const [projects, setProjects] = React.useState();

    const wallet = useWallet();

    const keypair = new Ed25519Keypair();
    const signer = new RawSigner(keypair, provider);


    React.useEffect(() => {
        if (!provider || !wallet.address || !wallet?.connected) return;

        (async () => {

            const objects = await provider.getOwnedObjects({
                owner: wallet?.address,
                options: { showContent: true },
            });

            const allCoinObjectsId = objects.data.filter((obj) => Coin.isSUI(obj));


            const projects = await provider.getObject(({
                id: TXUI_PROJECT_STORAGE,
                options: { showContent: true },
            }))

            const suiBalance = await provider.getBalance({
                owner: wallet?.address,
                options: { showContent: true },
            });

            // // Refactor
            // const roundId = await provider.getObject({
            //     id: TXUI_PROJECT,
            //     options: { showContent: true }
            // })

            // console.log('roundId___', roundId)

            const allBalances = await provider.getAllBalances({
                owner: wallet?.address,
            });

            const allCoinTypes = allBalances.map((item) => item?.coinType);

            const allAssetsPromises = allCoinTypes.map(async (coinType) => {
                // Fetch metadata and balance concurrently
                const [metadata, balances] = await Promise.all([
                    provider.getCoinMetadata({ coinType }),
                    provider.getAllBalances({ owner: wallet?.address }),
                ]);

                // Find balance for current coinType
                const balanceObj = balances.find((balance) => balance.coinType === coinType);

                // Return new Asset object
                return {
                    id: metadata?.id,
                    decimals: metadata?.decimals,
                    description: metadata?.description,
                    iconUrl: metadata?.iconUrl,
                    name: metadata?.name,
                    symbol: metadata.symbol,
                    balance: balanceObj ? parseInt(balanceObj.totalBalance) : 0, // assumes balance is in smallest unit of coin
                };
            });
            Promise.all(allAssetsPromises)
                .then((allAsset) => {
                    setAssets(allAsset);
                })
                .catch((error) => {
                    toast.error('Error fetching assets')
                });

            setProjects(projects?.data?.content?.fields?.projects)
            setBalance(ethers.utils.formatUnits(suiBalance?.totalBalance, 9));
            setAllObjects(allCoinObjectsId);
        })();
    }, [wallet.address, balances, wallet?.connected]);


    return (
        <SuiContext.Provider
            value={{
                assets,
                allCoinObjectsId,
                balances,
                provider,
                projects,
                signer,
                keypair,
            }}
        >
            {children}
        </SuiContext.Provider>
    );
};