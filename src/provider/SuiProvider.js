import { Sui } from '@mysten/sui.js@experimental';
import WalletConnectProvider from '@walletconnect/web3-provider';
import React, { useState } from 'react';
import Web3 from 'web3';

const WalletContext = React.createContext();

const WalletProvider = ({ children }) => {
    const [isConnect, setIsConnect] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [web3, setWeb3] = useState(null);
    const [sui, setSui] = useState(null);
    const [wallet, setWallet] = useState(null);

    const connect = async () => {
        const provider = new WalletConnectProvider({
            rpc: {
                139: 'https://rpc.sui.coinxlab.com',
                140: 'https://rpc-testnet.sui.coinxlab.com',
            },
        });
        await provider.enable();
        const web3 = new Web3(provider);
        const sui = new Sui(web3);
        const wallet = sui.getWallet();
        const walletAddress = await wallet.getAddress();
        const balance = await wallet.getBalance();
        setIsConnect(true);
        setWeb3(web3);
        setSui(sui);
        setWallet(wallet);
        setWalletAddress(walletAddress);
        setBalance(balance);
    };

    const disconnect = () => {
        wallet?.disconnect();
        setIsConnect(false);
        setWeb3(null);
        setSui(null);
        setWallet(null);
        setWalletAddress('');
        setBalance(0);
    };

    const getBalance = async () => {
        const balance = await wallet?.getBalance();
        setBalance(balance);
    };

    const getAccount = async () => {
        const walletAddress = await wallet?.getAddress();
        setWalletAddress(walletAddress);
    };

    const sendToken = async (to, amount) => {
        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
        const tx = await wallet.send(to, amountInWei);
        console.log('Transaction hash:', tx.transactionHash);
    };

    const approveToken = async (spender, amount) => {
        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
        const tx = await wallet.approve(spender, amountInWei);
        console.log('Transaction hash:', tx.transactionHash);
    };

    // const transferTokenFrom = async (from, to, amount) => {
    //     try {
    //         const provider = new SuiProvider();
    //         const wallet = await provider.getWallet();

    //         // Kiểm tra xem tài khoản có đủ token để chuyển không
    //         const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI, wallet);
    //         const balance = await tokenContract.balanceOf(from);
    //         if (balance.lt(amount)) {
    //             throw new Error('Insufficient balance');
    //         }

    //         // Lấy thông tin contract
    //         const contractAddress = '0x...';
    //         const contractABI = [];
    //         const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    //         const overrides = {
    //             gasLimit: 500000,
    //             gasPrice: ethers.utils.parseUnits('10', 'gwei'),
    //         };

    //         // Thực hiện gọi hàm transferFrom trong smart contract
    //         const tx = await contract.transferFrom(from, to, amount, overrides);

    //         // Chờ đợi giao dịch được xác nhận
    //         const receipt = await tx.wait();

    //         // Trả về kết quả giao dịch
    //         return {
    //             txHash: receipt.transactionHash,
    //             status: receipt.status,
    //             blockNumber: receipt.blockNumber,
    //             timestamp: receipt.timestamp,
    //             confirmations: receipt.confirmations,
    //         };
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // };

    return (
        <WalletContext.Provider
            value={{
                isConnect,
                walletAddress,
                balance,
                connect,
                disconnect,
                getBalance,
                getAccount,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;
