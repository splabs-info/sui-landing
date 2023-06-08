import SDK from '@cetusprotocol/cetus-sui-clmm-sdk';
import { JsonRpcProvider, mainnetConnection, testnetConnection } from '@mysten/sui.js';
import { mainnet } from './mainnet.config';
import { testnet } from './testnet.config';
const BN = require('bn.js');

export const sdk = new SDK(testnet);
const provider = new JsonRpcProvider(testnetConnection);

export const SwapHelper = {
  sdk,
  provider,
  BN,
};
