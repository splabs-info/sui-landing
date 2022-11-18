import { ethers } from "ethers";
import { toast } from "react-toastify";

export let prefix = null;
export let provider = null;
export let signer = null;

export const _checkLogin = async (walletName, _updateAddress, _handleError) => {
  _setProvider(walletName, async () => {
    try {
      const address = await signer.getAddress();
      _updateAddress(address, walletName);
    } catch (error) {
      _handleError();
      console.log(error);
    }
  });
};

export const _setProvider = async (walletName, _callback) => {
  if (walletName === "bitkeep") {
    prefix = window.bitkeep.ethereum;
  } else {
    prefix = window.ethereum;
  }
  provider = new ethers.providers.Web3Provider(prefix, "any");
  signer = provider.getSigner();
  _callback();
};

export const _checkOldWalletAddress = async (walletAddress = "", _callback) => {
  try {
    const address = await signer.getAddress();
    if (address === walletAddress) {
      _callback(true);
    } else {
      _callback(false);
    }
  } catch (error) {
    _callback(false);
  }
};

export const _connectToMetamaskWallet = (walletName, _updateAddress) => {
  _setProvider(walletName, async () => {
    if (prefix) {
      try {
        const accounts = await prefix.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        _updateAddress(address, walletName);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Please install wallet");
    }
  });
};

//change network when wrong BSC chain
export const _changeChain = async (chainInfo, _handleSuccess) => {
  await prefix.request({
    method: "wallet_addEthereumChain",
    params: [chainInfo],
  });
  _handleSuccess();
};

export const _addToken = async ({
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
}) => {
  try {
    console.log({
      tokenAddress,
      tokenSymbol,
      tokenDecimals,
      tokenImage,
    });
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await prefix.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });
    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
};
