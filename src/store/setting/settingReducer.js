import { en } from "../../languages/en";
import { SettingStoreConstant } from "./settingConstants";

const initialState = {
  library: en,
  loading: true,
  activeUserCount: 0,
  applicationConfig: null,
};

export const SettingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SettingStoreConstant.SET_ACTIVE_USERS:
      return { ...state, activeUserCount: payload };
    case SettingStoreConstant.SET_ERROR_CODE:
      return { ...state, serverError: payload };
    case SettingStoreConstant.GET_APPLICATION_CONFIG:
      return { ...state, applicationConfig: payload };
    case SettingStoreConstant.SET_LOADING:
      return { ...state, loading: payload };
    case SettingStoreConstant.CHANGE_LANGUAGE:
      return { ...state, library: payload };
    default:
      return { ...state };
  }
};
