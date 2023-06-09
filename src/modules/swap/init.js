import SDK from '@cetusprotocol/cetus-sui-clmm-sdk';
import { JsonRpcProvider, mainnetConnection, testnetConnection } from '@mysten/sui.js';
import { mainnet } from './mainnet.config';
import { testnet } from './testnet.config';
const BN = require('bn.js');

const config = {
  swapPartner: process.env.REACT_APP_CETUS_SWAP_PARTNER
    ? process.env.REACT_APP_CETUS_SWAP_PARTNER
    : '0x62da05b0008c2a07edd407016fea0ba72fa27495d582f1c6209ff9fd7eca6bca',
  sdkEnv: process.env.REACT_APP_ENV === 'production' ? mainnet : testnet,
  providerConnection: process.env.REACT_APP_ENV === 'production' ? mainnetConnection : testnetConnection,
};

console.log(config);

export const sdk = new SDK(config.sdkEnv);
const provider = new JsonRpcProvider(config.providerConnection);

export const SwapHelper = {
  sdk,
  provider,
  BN,
  config,
};
