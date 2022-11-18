import { combineReducers } from "redux";
import { MintingReducer } from "./minting/mintingReducer";
import { SettingReducer } from "./setting/settingReducer";
import { UserReducer } from "./user/userReducer";

const rootReducer = combineReducers({
  setting: SettingReducer,
  userStore: UserReducer,
  mintingStore: MintingReducer,
  waller: {},
});

export default rootReducer;
