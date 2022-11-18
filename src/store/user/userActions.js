import { ethers } from "ethers";
import { ADDRESS_0, StatusList } from "../../constant";
import { prefix } from "../../onchain";
import { ERC20_ABI } from "../../onchain/abi-bytecode";
import { get, post } from "../../utils/api";
import { logout } from "../../utils/auth";
import { UserConstant, UserEndpoint } from "./userConstants";

export const _handleLogout = () => (dispatch) => {
  dispatch({
    type: UserConstant.FETCH_USER,
    payload: null,
  });
  dispatch({
    type: UserConstant.GET_BALANCE,
    payload: null,
  });
  dispatch({
    type: UserConstant.ADD_MY_ITEMS,
    payload: null,
  });
  dispatch({
    type: UserConstant.ADD_WALLET_SIGNATURE,
    payload: null,
  });
};

export const _getNewProfile = () => (dispatch) => {
  dispatch({
    type: UserConstant.SET_USER_PROFILE_LOADING,
    payload: true,
  });
  get(
    UserEndpoint.ENDPOINT_GET_PROFILE,
    (data) => {
      dispatch({
        type: UserConstant.FETCH_USER,
        payload: data,
      });
      dispatch({
        type: UserConstant.SET_USER_PROFILE_LOADING,
        payload: false,
      });
    },
    (error) => {
      console.log(error);
      dispatch({
        type: UserConstant.SET_USER_PROFILE_LOADING,
        payload: false,
      });
      logout();
    }
  );
};

export const _getLockBalances = () => (dispatch) => {
  get(UserEndpoint.FUND_LOCK_AMOUNT, (data) =>
    dispatch({
      type: UserConstant.GET_USER_LOCK_BALANCE,
      payload: data,
    })
  );
};

export const _getOnchainBalance =
  (assets, walletAddress, metamaskProvider) => async (dispatch) => {
    const balances = [...assets];
    for (let e of balances) {
      var balance = null;
      if (e.contractAddress === ADDRESS_0 && prefix) {
        balance = await prefix.request({
          method: "eth_getBalance",
          params: [walletAddress, "latest"],
        });
      } else {
        try {
          const contractInstance = new ethers.Contract(
            e.contractAddress,
            ERC20_ABI,
            metamaskProvider
          );
          balance = await contractInstance.balanceOf(walletAddress);
        } catch (error) {}
      }
      balance = balance ? Number(ethers.utils.formatEther(balance)) : 0;
      e.onChainBalance = balance;
    }
    dispatch({
      type: UserConstant.GET_ONCHAIN_BALANCE,
      payload: balances,
    });
  };

export const _getBalance = () => (dispatch) => {
  get(UserEndpoint.ENDPOINT_GET_BALANCE, (data) => {
    const balances = data;
    dispatch({
      type: UserConstant.GET_BALANCE,
      payload: balances,
    });
  });
};

export const _getMyItems = (successCallback) => (dispatch) => {
  get(UserEndpoint.ENDPOINT_MY_NFT, (data) => {
    if (successCallback) {
      successCallback(data);
    }
    dispatch({
      type: UserConstant.ADD_MY_ITEMS,
      payload: data,
    });
  });
};

export const _setWalletName = (value) => (dispatch) => {
  window.localStorage.setItem("wallet-name", value);
  dispatch({
    type: UserConstant.UPDATE_WALLET_NAME,
    payload: value,
  });
};

export const _setWalletAddress = (value) => (dispatch) => {
  window.localStorage.setItem("wallet-address", value);
  dispatch({
    type: UserConstant.ADD_WALLET_ADDRESS,
    payload: value,
  });
};

export const _setWalletSignature = (value) => (dispatch) => {
  window.localStorage.setItem("wallet-signature", value);
  dispatch({
    type: UserConstant.ADD_WALLET_SIGNATURE,
    payload: value,
  });
};

export const _removeWalletSignature = () => (dispatch) => {
  window.localStorage.removeItem("wallet-signature");
  dispatch({
    type: UserConstant.ADD_WALLET_SIGNATURE,
    payload: null,
  });
};

export const _getWalletInformation = () => (dispatch) => {
  const walletName = window.localStorage.getItem("wallet-name")
    ? window.localStorage.getItem("wallet-name")
    : null;
  dispatch({
    type: UserConstant.UPDATE_WALLET_NAME,
    payload: walletName,
  });
  const walletSignature = window.localStorage.getItem("wallet-signature")
    ? window.localStorage.getItem("wallet-signature")
    : StatusList.UNKNOWN;
  dispatch({
    type: UserConstant.ADD_WALLET_SIGNATURE,
    payload: walletSignature,
  });
};

export const _handleProfileLogout = () => (dispatch) => {
  dispatch({
    type: UserConstant.FETCH_USER,
    payload: null,
  });
  dispatch({
    type: UserConstant.GET_BALANCE,
    payload: null,
  });
  dispatch({
    type: UserConstant.ADD_MY_ITEMS,
    payload: null,
  });
};

export const _getWalletLogout = () => (dispatch) => {
  window.localStorage.removeItem("wallet-name");
  window.localStorage.removeItem("wallet-address");
  window.localStorage.removeItem("wallet-signature");
  dispatch({
    type: UserConstant.UPDATE_WALLET_NAME,
    payload: null,
  });
  dispatch({
    type: UserConstant.ADD_WALLET_ADDRESS,
    payload: null,
  });
  dispatch({
    type: UserConstant.ADD_WALLET_SIGNATURE,
    payload: "UNKNOWN",
  });
  dispatch({
    type: UserConstant.FETCH_USER,
    payload: null,
  });
  dispatch({
    type: UserConstant.GET_BALANCE,
    payload: null,
  });
  dispatch({
    type: UserConstant.ADD_MY_ITEMS,
    payload: null,
  });
};

export const _addRef = () => (dispatch) => {
  let ref = window.localStorage.getItem("ref");
  ref = ref ? ref : null;
  dispatch({
    type: UserConstant.UPDATE_REF,
    payload: ref,
  });
};

export const _addPartnerRef = () => (dispatch) => {
  let ref = window.localStorage.getItem("partner-ref");
  ref = ref ? ref : null;
  dispatch({
    type: UserConstant.UPDATE_PARTNER_REF,
    payload: ref,
  });
};

export const _getInformationByAddress =
  (address = null) =>
  (dispatch) => {
    if (address) {
      post(
        UserEndpoint.GET_INFORMATION_BY_ADDRESS,
        {
          address,
        },
        (data) =>
          dispatch({
            type: UserConstant.SET_INFORMATION_BY_ADDRESS,
            payload: data,
          })
      );
    } else {
      dispatch({
        type: UserConstant.SET_INFORMATION_BY_ADDRESS,
        payload: null,
      });
    }
  };
