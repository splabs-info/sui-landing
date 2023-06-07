import SDK from '@cetusprotocol/cetus-sui-clmm-sdk';
import { JsonRpcProvider, mainnetConnection } from '@mysten/sui.js';
import { mainnet } from './mainnet.config';
const BN = require('bn.js');

export const sdk = new SDK(mainnet);
const provider = new JsonRpcProvider(mainnetConnection);

export const SwapHelper = {
  sdk,
  provider,
  BN,
};
