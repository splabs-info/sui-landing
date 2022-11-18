import { en } from "../../languages/en";
import { jp } from "../../languages/jp";
import { kr } from "../../languages/kr";
import { vn } from "../../languages/vn";
import { get } from "../../utils/api";
import { SettingEndpoint, SettingStoreConstant } from "./settingConstants";

export const _getUserCount = () => (dispatch) => {
  get(SettingEndpoint.USER_COUNT, (data) => {
    const result = data.filter((d) => d.payload === "ARITNT_ACTIVE_USERS")[0];
    const payload = result ? result.value : 0;
    dispatch({
      type: SettingStoreConstant.SET_ACTIVE_USERS,
      payload,
    });
  });
};

export const _changeLanguage =
  (lang = "en") =>
    (dispatch) => {
      let library;
      localStorage.setItem("lang", lang);
      switch (lang) {
        case "vn":
          library = { ...en, ...vn };
          break;
        case "kr":
          library = { ...en, ...kr };
          break;
        case "jp":
          library = { ...en, ...jp };
          break;
        default:
          localStorage.setItem("lang", "en");
          library = en;
          break;
      }
      dispatch({
        type: SettingStoreConstant.CHANGE_LANGUAGE,
        payload: library,
      });
    };

export const _setLoading = (payload) => (dispatch) => {
  dispatch({
    type: SettingStoreConstant.SET_LOADING,
    payload,
  });
};

export const _showAppError = (error) => (dispatch) => {
  dispatch({
    type: SettingStoreConstant.SET_ERROR_CODE,
    payload: error,
  });
};

const convertDecToHexString = (dec) => `0x${Number(dec).toString(16)}`;

export const _getApplicationConfig = () => (dispatch) => {
  get(SettingEndpoint.APPLICATION_CONFIG, (data) => {
    dispatch({
      type: SettingStoreConstant.GET_APPLICATION_CONFIG,
      payload: data.configuration
        ? data.configuration
        : {
          networkConfig: {
            chainId: 137,
            info: {
              chainId: convertDecToHexString(137),
              rpcUrls: ["https://polygon-rpc.com"],
              chainName: "Polygon Mainnet",
              nativeCurrency: {
                name: "Polygon Mainnet",
                decimals: 18,
                symbol: "MATIC",
              },
              blockExplorerUrls: ["https://polygonscan.com"],
            },
            currencies: [],
          },
        },
    });
  });
};
