import { CetusClmmSDK } from '@cetusprotocol/cetus-sui-clmm-sdk';
import { clmm_mainnet } from './mainnet.config';
import { clmm_testnet } from './testnet.config';

export const currSdkEnv = 'mainnet';

export function buildSdkOptions() {
  switch (currSdkEnv) {
    case 'mainnet':
      return clmm_mainnet;
    case 'testnet':
      return clmm_testnet;
    default:
  }
}

const sdkEnv = buildSdkOptions();

export function buildSdk() {
  const sdk = new CetusClmmSDK(sdkEnv);
  console.log(`currSdkEnv: ${currSdkEnv} ; fullRpcUrl: ${sdk.sdkOptions.fullRpcUrl}`);
  return sdk;
}
