import { CetusClmmSDK } from '@cetusprotocol/cetus-sui-clmm-sdk';
import { mainnet } from './mainnet.config';
import { testnet } from './testnet.config';

export const currSdkEnv = 'mainnet';

export function buildSdkOptions() {
  switch (currSdkEnv) {
    case 'mainnet':
      return mainnet;
    case 'testnet':
      return testnet;
    default:
  }
}

const sdkEnv = buildSdkOptions();

export function buildSdk() {
  const sdk = new CetusClmmSDK(sdkEnv);
  console.log(`currSdkEnv: ${currSdkEnv} ; fullRpcUrl: ${sdk.sdkOptions.fullRpcUrl}`);
  return sdk;
}
