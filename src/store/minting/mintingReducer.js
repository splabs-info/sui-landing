import { MintingConstants } from "./mintingConstants";

const initialState = {
  mintingRounds: null,
};

export const MintingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MintingConstants.GET_ROUND:
      return { ...state, mintingRounds: payload };
    default:
      return { ...state };
  }
};
