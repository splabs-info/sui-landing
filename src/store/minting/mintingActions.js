import { post } from "../../utils/api";
import { MintingEndpoint, MintingConstants } from "./mintingConstants";

export const _getMintingRounds = () => (dispatch) => {
  post(MintingEndpoint.GetRounds, {}, (data) => {
    const result = data?.items?.filter((d) => d.isActive);
    dispatch({
      type: MintingConstants.GET_ROUND,
      payload: result,
    });
  });
};
