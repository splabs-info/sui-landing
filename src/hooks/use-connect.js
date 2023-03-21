import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal as Web3ModalReact } from '@web3modal/react';
import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, polygon } from 'wagmi/chains';
import Web3Modal from 'web3modal';

const chains = [arbitrum, goerli, polygon];
const web3modalStorageKey = 'WEB3_CONNECT_CACHED_PROVIDER';

// Wagmi client
const { provider } = configureChains(chains, [
    w3mProvider({ projectId: 'a6d4a9db5776c4ad9b324588b10c7ee5' }),
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({
        projectId: 'a6d4a9db5776c4ad9b324588b10c7ee5',
        version: '1', // or "2"
        appName: 'gate-landing',
        chains,
    }),
    provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [address, setAddress] = useState();
    const [balance, setBalance] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const web3Modal = typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });

    /* This effect will fetch wallet address if user has already connected his/her wallet */
    useEffect(() => {
        async function checkConnection() {
            try {
                if (window && window.ethereum) {
                    // Check if web3modal wallet connection is available on storage
                    if (localStorage.getItem(web3modalStorageKey)) {
                        // await connectToWallet();
                        return;
                    }
                } else {
                    console.log('window or window.ethereum is not available');
                }
            } catch (error) {
                console.log(error, 'Catch error Account is not connected');
            }
        }
        checkConnection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setWalletAddress = async (provider) => {
        try {
            const signer = provider.getSigner();
            if (signer) {
                const web3Address = await signer.getAddress();
                setAddress(web3Address);
                getBalance(provider, web3Address);
            }
        } catch (error) {
            console.log('Account not connected; logged from setWalletAddress function');
        }
    };

    const setBitkeepWalletAddress = async (prefix) => {
        try {
            const accounts = await prefix.request({
                method: 'eth_requestAccounts',
            });

            const address = accounts[0];

            setAddress(address);
            getBalance(prefix, address);
        } catch (error) {
            console.log('Account not connected; logged from setBitkeepWalletAddress function');
        }
    };

    const getBalance = async (provider, walletAddress) => {
        const walletBalance = await provider.getBalance(walletAddress);
        const balanceInEth = ethers.utils.formatEther(walletBalance);
        setBalance(balanceInEth);
    };

    const disconnectWallet = () => {
        setAddress(undefined);
        web3Modal && web3Modal.clearCachedProvider();
    };

    const checkIfExtensionIsAvailable = () => {
        if ((window && window.web3 === undefined) || (window && window.ethereum === undefined)) {
            setError(true);
            web3Modal && web3Modal.toggleModal();
        }
    };

    const subscribeBitkeepProvider = async (prefix) => {
        prefix.on('accountsChanged', async (accounts) => {
            if (accounts?.length) {
                setAddress(accounts[0]);
                const provider = new ethers.providers.Web3Provider(prefix);
                getBalance(provider, accounts[0]);
            } else {
                setAddress(undefined);
            }
        });
    };

    const connectToWallet = async () => {
        try {
            setLoading(true);
            checkIfExtensionIsAvailable();
            const connection = web3Modal && (await web3Modal.connect());
            const provider = new ethers.providers.Web3Provider(connection);

            await subscribeProvider(connection);

            setWalletAddress(provider);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error, 'got this error on connectToWallet catch block while connecting the wallet');
        }
    };

    const connectBitkeepWallet = async () => {
        try {
            setLoading(true);
            checkIfExtensionIsAvailable();
            const prefix = window.bitkeep?.ethereum;
            if (!prefix) {
                throw new Error('Bitkeep extension is not available');
            }

            await subscribeBitkeepProvider(prefix);

            setBitkeepWalletAddress(prefix);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error, 'got this error on connectBitkeepWallet catch block while connecting the wallet');
        }
    };

    const disconnectBitkeepWallet = () => {
        setAddress(undefined);
        web3Modal && web3Modal.clearCachedProvider();
    };

    const subscribeProvider = async (connection) => {
        connection.on('close', () => {
            disconnectWallet();
        });
        connection.on('accountsChanged', async (accounts) => {
            if (accounts?.length) {
                setAddress(accounts[0]);
                const provider = new ethers.providers.Web3Provider(connection);
                getBalance(provider, accounts[0]);
            } else {
                disconnectWallet();
            }
        });
    };

    return (
        <WalletContext.Provider
            value={{
                address,
                balance,
                loading,
                error,
                connectToWallet,
                disconnectWallet,
                connectBitkeepWallet,
                disconnectBitkeepWallet,
            }}
        >
            <>
                <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
                <Web3ModalReact projectId="a6d4a9db5776c4ad9b324588b10c7ee5" ethereumClient={ethereumClient} />
            </>
        </WalletContext.Provider>
    );
};
