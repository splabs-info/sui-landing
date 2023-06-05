// import { Coin, Ed25519Keypair, JsonRpcProvider, RawSigner, testnetConnection } from '@mysten/sui.js';
// import { useWallet } from '@suiet/wallet-kit';
// import { TXUI_PROJECT_STORAGE } from 'constant/sui-chain';
// import { ethers } from 'ethers';
// import React from 'react';
// import { toast } from 'react-toastify';

// const provider = new JsonRpcProvider(testnetConnection);
// export const SuiContext = React.createContext({});


// let rounds = [];
// let typeOfRound = [];
// export const SUIWalletContext = ({ children }) => {

//     const [allCoinObjectsId, setAllObjects] = React.useState();
//     const [assets, setAssets] = React.useState();
//     const [balances, setBalance] = React.useState();

//     const [allRound, setAllRound] = React.useState();
//     const [allTypeRound, setAllTypeRound] = React.useState();
//     const [projects, setProjects] = React.useState();

//     const wallet = useWallet();

//     const keypair = new Ed25519Keypair();
//     const signer = new RawSigner(keypair, provider);



//     React.useEffect(() => {
//         if (!provider || !wallet.address || !wallet?.connected) return;

//         const fetchData = async () => {
//             try {
//                 const objects = await provider.getOwnedObjects({
//                     owner: wallet.address,
//                     options: { showContent: true },
//                 });

//                 const allCoinObjectsId = objects.data.filter((obj) => Coin.isSUI(obj));

//                 const allProjects = await provider.getObject({
//                     id: TXUI_PROJECT_STORAGE,
//                     options: { showContent: true },
//                 });

//                 if (!allProjects?.data) return;

//                 const allOfProjectDetailPromises = allProjects?.data?.content?.fields?.projects.map(
//                     async (project) => {
//                         const allOfProjectDetail = await provider.getDynamicFields({
//                             parentId: project,
//                             options: { showContent: true },
//                         });

//                         if (!allOfProjectDetail || allOfProjectDetail.data.length <= 0) return null;

//                         const vestingElement = allOfProjectDetail.data.filter((element) => {
//                             const found = element.name?.value.split(' <> ');

//                             // console.log('element___', element)
//                             if(found.length === 1) rounds.push(element);
//                             if(found.length === 2) typeOfRound.push(element);

//                             // return found && found.indexOf('Vesting');
//                             return null;
//                         });

//                         // if (vestingElement.length > 0) {
//                         //     return vestingElement;
//                         // }


//                         setAllRound(rounds);
//                         setAllTypeRound(typeOfRound);
//                     }
//                 );


//                 // const vestingElements = await Promise.allSettled(allOfProjectDetailPromises)

//                 // const filteredVestingElements = vestingElements.filter((element) => element !== null);

//                 const suiBalancePromise = provider.getBalance({
//                     owner: wallet.address,
//                     options: { showContent: true },
//                 });

//                 const allBalancesPromise = provider.getAllBalances({
//                     owner: wallet.address,
//                 });

//                 const [suiBalance, allBalances] = await Promise.all([
//                     suiBalancePromise,
//                     allBalancesPromise,
//                 ]);

//                 const allAssetsPromises = allBalances.map(async (balance) => {
//                     const { coinType } = balance;
//                     const metadata = await provider.getCoinMetadata({ coinType });
//                     const balanceObj = allBalances.find((balance) => balance.coinType === coinType);

//                     return {
//                         id: metadata?.id,
//                         decimals: metadata?.decimals,
//                         description: metadata?.description,
//                         iconUrl: metadata?.iconUrl,
//                         name: metadata?.name,
//                         symbol: metadata.symbol,
//                         balance: balanceObj ? parseInt(balanceObj.totalBalance) : 0,
//                     };
//                 });

//                 const allAssets = await Promise.all(allAssetsPromises);

//                 setAssets(allAssets);
//                 setProjects(allProjects.data.content.fields.projects);
//                 setBalance(ethers.utils.formatUnits(suiBalance?.totalBalance, 9));
//                 setAllObjects(allCoinObjectsId);
//             } catch (error) {
//                 console.log('error', error);
//                 toast.error('Error fetching data');
//             }
//         };

//         fetchData();
//     }, [wallet.address, wallet?.connected]);



//     console.log('round___', rounds)
//     console.log('typeOfRound___', typeOfRound)
//     console.log('AllRoundround___', allRound)
//     return (
//         <SuiContext.Provider
//             value={{
//                 assets,
//                 allCoinObjectsId,
//                 balances,
//                 provider,
//                 projects,
//                 signer,
//                 keypair,
//             }}
//         >
//             {children}
//         </SuiContext.Provider>
//     );
// };


// Chat GPT versions

import { Coin, Ed25519Keypair, JsonRpcProvider, RawSigner, testnetConnection } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { TXUI_PROJECT_STORAGE } from 'constant/sui-chain';
import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { uniq } from 'lodash'
const provider = new JsonRpcProvider(testnetConnection);
export const SuiContext = createContext({});

export const SUIWalletContext = ({ children }) => {
    const wallet = useWallet();

    const [allCoinObjectsId, setAllObjects] = useState();
    const [assets, setAssets] = useState([]);
    const [balances, setBalance] = useState();
    const [allRound, setAllRound] = useState([]);
    const [allTypeRound, setAllTypeRound] = useState([]);
    const [projects, setProjects] = useState([]);

    const keypair = new Ed25519Keypair();
    const signer = new RawSigner(keypair, provider);

    useEffect(() => {
        if (!provider || !wallet.address || !wallet?.connected) return;

        const fetchData = async () => {
            try {
                const objects = await provider.getOwnedObjects({
                    owner: wallet.address,
                    options: { showContent: true },
                });

                const allCoinObjectsId = objects.data.filter((obj) => Coin.isSUI(obj));

                const allProjects = await provider.getObject({
                    id: TXUI_PROJECT_STORAGE,
                    options: { showContent: true },
                });

                if (!allProjects?.data) return;

                allProjects?.data?.content?.fields?.projects.map(
                    async (project) => {
                        const allOfProjectDetail = await provider.getDynamicFields({
                            parentId: project,
                            options: { showContent: true },
                        });

                        if (!allOfProjectDetail || allOfProjectDetail.data.length <= 0) return;

                        const foundElements = allOfProjectDetail.data.filter((element) => {
                            const found = element.name?.value.split(' <> ');

                            return found.length === 1 || found.length === 2;
                        });

                        const roundElements = foundElements.filter((element) => element.name?.value.split(' <> ').length === 1);
                        const typeRoundElements = foundElements.filter(
                            (element) => element.name?.value.split(' <> ').length === 2
                        );

                        setAllRound((prev) => uniq([...prev, ...roundElements], 'objectId'));
                        setAllTypeRound((prev) => uniq([...prev, ...typeRoundElements]), 'objectId');
                    }
                );

                const [suiBalance, allBalances] = await Promise.all([
                    provider.getBalance({
                        owner: wallet.address,
                        options: { showContent: true },
                    }),
                    provider.getAllBalances({
                        owner: wallet.address,
                    }),
                ]);

                const allAssetsPromises = allBalances.map(async (balance) => {
                    const { coinType } = balance;
                    const metadata = await provider.getCoinMetadata({ coinType });
                    const balanceObj = allBalances.find((balance) => balance.coinType === coinType);

                    return {
                        id: metadata?.id,
                        decimals: metadata?.decimals,
                        description: metadata?.description,
                        iconUrl: metadata?.iconUrl,
                        name: metadata?.name,
                        symbol: metadata.symbol,
                        balance: balanceObj ? parseInt(balanceObj.totalBalance) : 0,
                    };
                });

                const allAssets = await Promise.all(allAssetsPromises);

                setAssets(allAssets);
                setProjects(allProjects.data.content.fields.projects);
                setBalance(ethers.utils.formatUnits(suiBalance?.totalBalance, 9));
                setAllObjects(allCoinObjectsId);
            } catch (error) {
                console.log('error', error);
                toast.error('Error fetching data');
            }
        };

        fetchData();
    }, [wallet.address, wallet?.connected]);


    return (
        <SuiContext.Provider
            value={{
                assets,
                allRound,
                allTypeRound,
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
