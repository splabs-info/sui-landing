import { Coin, Ed25519Keypair, JsonRpcProvider, RawSigner, testnetConnection, mainnetConnection } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { ethers } from 'ethers';
import React from 'react';
import { toast } from 'react-toastify';

const provider = new JsonRpcProvider(mainnetConnection);

const investmentCertificate = '0xe5bad555746563f1429f651a0dc79d47f0cbf68a84349e85ea7882bcd18cda4f::launchpad_presale::InvestmentCertificate'
export const SuiContext = React.createContext({});

export const SUIWalletContext = ({ children }) => {
    const [allObjectsId, setAllObjects] = React.useState();
    const [balances, setBalance] = React.useState();
    const [assets, setAssets] = React.useState();

    const wallet = useWallet();

    const keypair = new Ed25519Keypair();
    const signer = new RawSigner(keypair, provider);

    React.useEffect(() => {
        if (!provider || !wallet.address || !wallet?.connected) return;

        (async () => {
            // const otherObjects = await provider.getOwnedObjects({
            //     owner: '0x187ddc06de7b0eca49797f3e95050a8234afd51e054c489b9b71b710d92ea815',
            //     options: { showContent: true },
            // })

            // const certificateObjects = otherObjects?.data.find((item) => {
            //     if( item?.data?.content?.type === investmentCertificate) {
            //         return item?.data?.content
            //     }
            // })

            // console.log('certificateObjects___', certificateObjects)

            // console.log('otherObjects__', otherObjects)
            const objects = await provider.getOwnedObjects({
                owner: wallet?.address,
                options: { showContent: true },
            });

            const allObjectsId = objects.data.filter((obj) => Coin.isSUI(obj));

            const suiBalance = await provider.getBalance({
                owner: wallet?.address,
                options: { showContent: true },
            });

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

            setBalance(ethers.utils.formatUnits(suiBalance?.totalBalance, 9));
            setAllObjects(allObjectsId);
        })();
    }, [wallet.address, balances, wallet?.connected]);

    return (
        <SuiContext.Provider
            value={{
                assets,
                balances,
                provider,
                signer,
                keypair,
                allObjectsId,
            }}
        >
            {children}
        </SuiContext.Provider>
    );
};