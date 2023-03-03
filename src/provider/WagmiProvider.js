import { InjectedConnector } from '@wagmi/connectors/injected';
import { MetaMaskConnector } from '@wagmi/connectors/metaMask';
import { configureChains, createClient, WagmiConfig } from '@wagmi/core';
import React from 'react';

const { chains, provider, webSocketProvider } = configureChains();

const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
    ],
    provider,
    webSocketProvider,
});

const WagmiContext = React.createContext();

export const useWagmi = () => React.useContext(WagmiContext);

export const WagmiProvider = ({ children }) => {
    const [address, setAddress] = React.useState(null);
    const [balance, setBalance] = React.useState(null);

    const onAccountsChanged = React.useCallback(([newAddress]) => {
        setAddress(newAddress);
    }, []);

    React.useEffect(() => {
        if (!client) return;

        client.on('accountsChanged', onAccountsChanged);
        client.getSigner().then((signer) => setAddress(signer.getAddress()));
        return () => {
            client.off('accountsChanged', onAccountsChanged);
        };
    }, [client, onAccountsChanged]);

    // const connect = React.useCallback(async () => {
    //     try {
    //         await client.connect();
    //         const signer = await client.getSigner();
    //         setAddress(signer.getAddress());
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, []);

    const connect = React.useCallback(() => {
        client
            .connect()
            .then(() => client.getSigner())
            .then((signer) => setAddress(signer.getAddress()))
            .catch((error) => console.error(error));
    }, [client]);

    const disconnect = React.useCallback(async () => {
        try {
            await client.disconnect();
            setAddress(null);
            setBalance(null);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchSigner = React.useCallback(async () => {
        try {
            const signer = await client.getSigner();
            return signer;
        } catch (error) {
            console.error(error);
        }
    }, []);

    const signMessage = React.useCallback(async (message) => {
        try {
            const signer = await client.getSigner();
            const signature = await signer.signMessage(message);
            return signature;
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchBalance = React.useCallback(async () => {
        try {
            const signer = await client.getSigner();
            const balance = await signer.getBalance();
            setBalance(balance.toString());
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getAccount = React.useCallback(async () => {
        try {
            const signer = await client.getSigner();
            const account = await signer.getAddress();
            return account;
        } catch (error) {
            console.error(error);
        }
    }, []);

    const sendTransaction = React.useCallback(async (to, value, data) => {
        try {
            const signer = await client.getSigner();
            const txResponse = await signer.sendTransaction({
                to,
                value,
                data,
            });
            await txResponse.wait();
            return txResponse.hash;
        } catch (error) {
            console.error(error);
        }
    }, []);

    const multicall = React.useCallback(async (abi, calls) => {
        try {
            const multicallAddress = client.multicallContract.address;
            const signer = await client.getSigner();
            const multicallContract = new client.Contract(abi, multicallAddress, signer);
            const result = await multicallContract.aggregate(calls);
            return result;
        } catch (error) {
            console.error(error);
        }
    }, []);
    const readContract = async (abi, address, method, args = []) => {
        try {
            const contract = client.getContract(abi, address);
            const result = await contract[method](...args);
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    const reactContracts = async (abi, address) => {
        try {
            const contract = client.getContract(abi, address);
            const react = contract.react();
            return react;
        } catch (error) {
            console.error(error);
        }
    };

    const waitForTransaction = async (txHash, timeout = 120000) => {
        try {
            const tx = await client.waitForTransaction(txHash, timeout);
            return tx;
        } catch (error) {
            console.error(error);
        }
    };

    const getContract = (abi, address) => {
        try {
            const contract = client.getContract(abi, address);
            return contract;
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <WagmiConfig client={client}>
            <WagmiContext.Provider
                value={{ client, address, balance, connect, disconnect, fetchSigner, signMessage, fetchBalance }}
            >
                {children}
            </WagmiContext.Provider>
        </WagmiConfig>
    );
};
