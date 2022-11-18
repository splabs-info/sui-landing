import { UserConstant } from "./userConstants";

const initialState = {
  informationByAddress: null,
  information: null,
  balances: null,
  myFeeds: null,
  metamaskProvider: null,
  myItems: null,
  walletName: null,
  walletSignature: null,
  walletAddress: null,
  ref: null,
  partnerRef: null,
  preSaleTokenBalances: null,
  onChainBalances: null,
  lockBalances: null,
  profileLoading: true,
  riUserType: null,
};

export const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UserConstant.SET_INFORMATION_BY_ADDRESS:
      return { ...state, informationByAddress: payload };
    case UserConstant.SET_RI_USER_TYPE:
      return { ...state, riUserType: payload };
    case UserConstant.SET_USER_PROFILE_LOADING:
      return { ...state, profileLoading: payload };
    case UserConstant.GET_USER_LOCK_BALANCE:
      return { ...state, lockBalances: payload };
    case UserConstant.GET_ONCHAIN_BALANCE:
      return { ...state, onChainBalances: payload };
    case UserConstant.GET_PRE_SALE_BALANCE:
      return { ...state, preSaleTokenBalances: payload };
    case UserConstant.UPDATE_PARTNER_REF:
      return { ...state, partnerRef: payload };
    case UserConstant.UPDATE_REF:
      return { ...state, ref: payload };
    case UserConstant.ADD_WALLET_SIGNATURE:
      return { ...state, walletSignature: payload };
    case UserConstant.ADD_MY_ITEMS:
      return { ...state, myItems: payload };
    case UserConstant.ADD_METAMASK_PROVIDER:
      return { ...state, metamaskProvider: payload };
    case UserConstant.ADD_WALLET_ADDRESS:
      return { ...state, walletAddress: payload };
    case UserConstant.GET_BALANCE:
      return { ...state, balances: payload };
    case UserConstant.FETCH_USER:
      return {
        ...state,
        information: payload,
      };
    case UserConstant.UPDATE_WALLET_NAME:
      return {
        ...state,
        walletName: payload,
      };
    default:
      return { ...state };
  }
};
