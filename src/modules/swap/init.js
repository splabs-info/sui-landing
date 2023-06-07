import { SDK } from '@cetusprotocol/cetus-sui-clmm-sdk';
import { testnet } from './testnet.config';

export const sdk = new SDK(testnet);
